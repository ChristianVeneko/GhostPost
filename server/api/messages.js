import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { getAuthFromEvent } from '../utils/auth'
import { initFirebase } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    // Get postId from query params (optional)
    const queryParams = getQuery(event)
    const postId = queryParams.postId
    
    // Authenticate user
    let userId
    try {
      const auth = getAuthFromEvent(event)
      userId = auth.uid
    } catch (authError) {
      console.error('Authentication error:', authError)
      return createError({
        statusCode: 401,
        statusMessage: `Unauthorized: ${authError.message}`
      })
    }
    
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
    
    // If postId is provided, get messages for that specific post
    if (postId) {
      try {
        // Check if it's a post-based message or user-based message
        // First check if it's a valid post
        const postRef = doc(firestore, 'posts', postId)
        const postSnap = await getDoc(postRef)

        if (postSnap.exists()) {
          // It's a post - verify ownership and get post messages
          const postData = postSnap.data()

          if (postData.userId !== userId) {
            console.error('Access denied:', { postUserId: postData.userId, requestUserId: userId })
            return createError({
              statusCode: 403,
              statusMessage: 'Access denied to this post'
            })
          }

          // Get messages for this post
          const messagesRef = collection(firestore, 'messages')
          const q = query(
            messagesRef,
            where('postId', '==', postId)
          )

          const querySnapshot = await getDocs(q)
          const messages = querySnapshot.docs
            .map(doc => ({
              id: doc.id,
              postId: doc.data().postId,
              content: doc.data().content,
              isRead: doc.data().isRead || false,
              createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

          return {
            success: true,
            messages
          }
        }
      } catch (error) {
        console.error('Error fetching messages for post:', error)
        return createError({
          statusCode: 500,
          statusMessage: 'Failed to fetch messages'
        })
      }
    }
    
    // Otherwise, get all messages for the user (both post-based and direct)
    try {
      const messagesRef = collection(firestore, 'messages')
      const allMessages = []

      // Get direct messages (userId field)
      const directMessagesQuery = query(
        messagesRef,
        where('userId', '==', userId)
      )
      const directSnapshot = await getDocs(directMessagesQuery)
      const directMessages = directSnapshot.docs.map(doc => ({
        id: doc.id,
        userId: doc.data().userId,
        content: doc.data().content,
        isRead: doc.data().isRead || false,
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        type: 'direct' // Mark as direct message
      }))
      allMessages.push(...directMessages)

      // Get post-based messages
      const postsRef = collection(firestore, 'posts')
      const postsQuery = query(
        postsRef,
        where('userId', '==', userId)
      )

      const postsSnapshot = await getDocs(postsQuery)
      const userPostIds = postsSnapshot.docs.map(doc => doc.id)

      if (userPostIds.length > 0) {
        // Get messages for all user's posts
        // Note: Firestore 'in' queries are limited to 10 items
        const batchSize = 10

        for (let i = 0; i < userPostIds.length; i += batchSize) {
          const batch = userPostIds.slice(i, i + batchSize)
          const q = query(
            messagesRef,
            where('postId', 'in', batch)
          )

          const querySnapshot = await getDocs(q)
          const batchMessages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            postId: doc.data().postId,
            content: doc.data().content,
            isRead: doc.data().isRead || false,
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            type: 'post' // Mark as post message
          }))

          allMessages.push(...batchMessages)
        }
      }

      // Sort by date
      allMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      return {
        success: true,
        messages: allMessages
      }
    } catch (error) {
      console.error('Error fetching all messages:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch messages'
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
