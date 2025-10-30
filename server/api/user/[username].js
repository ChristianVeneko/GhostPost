import { collection, query, where, getDocs } from 'firebase/firestore'
import { initFirebase } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    const username = getRouterParam(event, 'username')
    
    if (!username) {
      return createError({
        statusCode: 400,
        statusMessage: 'Username is required'
      })
    }
    
    // Sanitize username
    const sanitizedUsername = username.replace('@', '').toLowerCase().trim()
    
    // Initialize Firebase
    let firestore
    try {
      const firebase = initFirebase()
      firestore = firebase.firestore
    } catch (error) {
      console.error('Firebase initialization error:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to initialize Firebase'
      })
    }
    
    // Get user profile from Firestore by username
    try {
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef, where('username', '==', sanitizedUsername))
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        return {
          exists: false,
          username: sanitizedUsername
        }
      }
      
      // Get first matching user
      const userDoc = querySnapshot.docs[0]
      const userData = userDoc.data()
      
      // Return public profile info
      return {
        exists: true,
        username: sanitizedUsername,
        displayName: userData.displayName || sanitizedUsername,
        photoURL: userData.photoURL || null,
        createdAt: userData.createdAt || null
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch user profile'
      })
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
