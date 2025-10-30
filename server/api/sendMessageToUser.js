import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { initFirebase } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    // Get request body
    const body = await readBody(event)

    // Validate request - expects username instead of postId
    if (!body.username || typeof body.username !== 'string') {
      return createError({
        statusCode: 400,
        statusMessage: 'Username is required and must be a string'
      })
    }

    if (!body.message || typeof body.message !== 'string') {
      return createError({
        statusCode: 400,
        statusMessage: 'Message is required and must be a string'
      })
    }

    if (body.message.length > 500) {
      return createError({
        statusCode: 400,
        statusMessage: 'Message is too long (max 500 characters)'
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

    // Get user by username to verify they exist
    try {
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef, where('username', '==', body.username.toLowerCase()))
      const userSnapshot = await getDocs(q)

      if (userSnapshot.empty) {
        return createError({
          statusCode: 404,
          statusMessage: 'User not found'
        })
      }

      const userDoc = userSnapshot.docs[0]
      const userId = userDoc.id

      // Add message to Firestore
      const messagesRef = collection(firestore, 'messages')
      const newMessage = {
        userId: userId, // Store userId instead of postId
        recipientUsername: body.username.toLowerCase(),
        content: body.message.trim(),
        createdAt: serverTimestamp(),
        isRead: false
      }

      const docRef = await addDoc(messagesRef, newMessage)

      return {
        success: true,
        message: 'Message sent successfully',
        messageId: docRef.id
      }
    } catch (error) {
      console.error('Error adding message:', error)
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to send message'
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
