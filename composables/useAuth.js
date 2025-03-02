import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  getIdToken
} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { ref, computed, onMounted, onUnmounted } from 'vue'

export const useAuth = () => {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const user = ref(null)
  const idToken = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = ref(true)
  const error = ref(null)

  // Initialize Firebase if not already initialized
  if (!nuxtApp.$firebaseApp) {
    const firebaseConfig = config.public.firebaseConfig
    let app
    try {
      app = initializeApp(firebaseConfig)
    } catch (error) {
      // App might already be initialized
      console.log('Firebase app initialization error (might be already initialized):', error)
      app = initializeApp(firebaseConfig, 'secondary')
    }
    
    const auth = getAuth(app)
    const firestore = getFirestore(app)

    // Set persistence to LOCAL
    setPersistence(auth, browserLocalPersistence)
      .catch((error) => {
        console.error('Error setting persistence:', error)
      })

    nuxtApp.provide('firebaseApp', app)
    nuxtApp.provide('firebaseAuth', auth)
    nuxtApp.provide('firestore', firestore)
  }

  const auth = nuxtApp.$firebaseAuth

  // Save user data to Firestore
  const saveUserToFirestore = async (userData) => {
    try {
      const firestore = nuxtApp.$firestore
      const userRef = doc(firestore, 'users', userData.uid)
      
      // Extraer username del email
      const username = userData.email.split('@')[0].toLowerCase();
      
      // Check if user already exists
      const userDoc = await getDoc(userRef)
      
      if (!userDoc.exists()) {
        // Create new user document
        await setDoc(userRef, {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          username: username, // Usar solo la parte del email
          createdAt: new Date()
        })
      } else {
        // Update existing user
        await setDoc(userRef, {
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          username: username, // Usar solo la parte del email
          lastLogin: new Date()
        }, { merge: true })
      }
    } catch (err) {
      console.error('Error saving user to Firestore:', err)
    }
  }

  // Get ID token for authenticated user
  const refreshIdToken = async () => {
    if (auth.currentUser) {
      try {
        idToken.value = await getIdToken(auth.currentUser, true)
        return idToken.value
      } catch (err) {
        console.error('Error getting ID token:', err)
        return null
      }
    }
    return null
  }

  // Check if user is already logged in
  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get user data
        const username = currentUser.email.split('@')[0].toLowerCase();
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          username: username // Usar solo la parte del email
        }
        
        user.value = userData
        
        // Get ID token
        await refreshIdToken()
        
        // Save user data to Firestore
        await saveUserToFirestore(userData)
      } else {
        user.value = null
        idToken.value = null
      }
      
      isLoading.value = false
    })

    // Cleanup on component unmount
    onUnmounted(() => {
      unsubscribe()
    })
  })

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      error.value = null
      isLoading.value = true
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      // Get ID token
      await refreshIdToken()
      
      return result.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Sign in with GitHub
  const signInWithGithub = async () => {
    try {
      error.value = null
      isLoading.value = true
      const provider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      // Get ID token
      await refreshIdToken()
      
      return result.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      idToken.value = null
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  return {
    user,
    idToken,
    isAuthenticated,
    isLoading,
    error,
    signInWithGoogle,
    signInWithGithub,
    logout,
    refreshIdToken
  }
} 