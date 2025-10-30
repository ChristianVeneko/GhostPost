import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { initFirebase } from '../../../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    const username = getRouterParam(event, 'username')
    const key = getRouterParam(event, 'key')
    
    if (!username || !key) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and key are required'
      })
    }
    
    // Initialize Firebase
    let firestore
    try {
      const firebase = initFirebase()
      firestore = firebase.firestore
    } catch (error) {
      console.error('Firebase initialization error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to initialize Firebase'
      })
    }
    
    // Query post by username and key
    try {
      const postsRef = collection(firestore, 'posts')
      const q = query(
        postsRef,
        where('username', '==', username),
        where('key', '==', key),
        where('isActive', '==', true)
      )
      
      const snapshot = await getDocs(q)
      
      if (snapshot.empty) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Post not found or inactive'
        })
      }
      
      const postDoc = snapshot.docs[0]
      const postData = postDoc.data()
      
      // Get user profile data
      let userData = null
      try {
        const userRef = doc(firestore, 'users', postData.userId)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          userData = userSnap.data()
        }
      } catch (err) {
        console.log('Could not fetch user data:', err)
      }
      
      return {
        success: true,
        post: {
          id: postDoc.id,
          userId: postData.userId,
          username: postData.username,
          title: postData.title,
          key: postData.key,
          messageCount: postData.messageCount || 0,
          createdAt: postData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          // Include user profile data
          userProfile: userData ? {
            displayName: userData.displayName,
            photoURL: userData.photoURL
          } : null
        }
      }
    } catch (error) {
      if (error.statusCode) throw error
      
      console.error('Error fetching post:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch post'
      })
    }
  } catch (error) {
    if (error.statusCode) throw error
    
    console.error('Unexpected error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
