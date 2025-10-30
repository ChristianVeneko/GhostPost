import { collection, query, where, getDocs } from 'firebase/firestore'
import { initFirebase } from '../../../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    const username = getRouterParam(event, 'username')

    if (!username) {
      throw createError({
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
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to initialize Firebase'
      })
    }

    // Query active posts by username
    try {
      const postsRef = collection(firestore, 'posts')
      const q = query(
        postsRef,
        where('username', '==', sanitizedUsername),
        where('isActive', '==', true)
      )

      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        return {
          success: true,
          posts: [],
          username: sanitizedUsername
        }
      }

      const posts = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          userId: data.userId,
          username: data.username,
          title: data.title,
          key: data.key,
          messageCount: data.messageCount || 0,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
        }
      })

      // Sort by creation date (newest first)
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      return {
        success: true,
        posts,
        username: sanitizedUsername
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch posts'
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
