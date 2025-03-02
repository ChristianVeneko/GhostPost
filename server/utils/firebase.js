import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

/**
 * Initializes Firebase and returns the app and Firestore instances
 * @returns {Object} Object containing the Firebase app and Firestore instances
 */
export const initFirebase = () => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public.firebaseConfig
  
  // Initialize Firebase if not already initialized
  let app
  try {
    const apps = getApps()
    if (apps.length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = apps[0]
    }
  } catch (error) {
    console.log('Firebase app initialization error:', error)
    throw error
  }
  
  // Get Firestore instance
  const firestore = getFirestore(app)
  
  return {
    app,
    firestore
  }
} 