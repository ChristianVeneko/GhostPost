import { collection, addDoc, doc, getDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore'
import { initFirebase } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  console.log('=== SEND MESSAGE API CALLED ===')
  try {
    const body = await readBody(event)
    console.log('Request body:', body)
    
    if (!body.postId || typeof body.postId !== 'string') {
      console.error('Invalid postId:', body.postId)
      throw createError({
        statusCode: 400,
        statusMessage: 'Post ID is required and must be a string'
      })
    }
    
    if (!body.message || typeof body.message !== 'string') {
      console.error('Invalid message:', body.message)
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required and must be a string'
      })
    }
    
    if (body.message.length > 500) {
      console.error('Message too long:', body.message.length)
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is too long (max 500 characters)'
      })
    }

    let firestore
    try {
      console.log('Initializing Firebase...')
      const firebase = initFirebase()
      firestore = firebase.firestore
      console.log('Firebase initialized successfully')
    } catch (error) {
      console.error('Firebase initialization error:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to initialize Firebase'
      })
    }

    try {
      console.log('Verifying post exists:', body.postId)
      const postRef = doc(firestore, 'posts', body.postId)
      const postSnap = await getDoc(postRef)
      
      if (!postSnap.exists()) {
        console.error('Post not found:', body.postId)
        throw createError({
          statusCode: 404,
          statusMessage: 'Post not found'
        })
      }
      
      const postData = postSnap.data()
      console.log('Post data:', postData)
      
      if (!postData.isActive) {
        console.error('Post is not active:', body.postId)
        throw createError({
          statusCode: 403,
          statusMessage: 'This post is not accepting messages'
        })
      }
      
      console.log('Post verified successfully')
    } catch (error) {
      console.error('Error verifying post:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to verify post'
      })
    }

    try {
      console.log('Adding message to Firestore...')
      const messagesRef = collection(firestore, 'messages')
      const newMessage = {
        postId: body.postId,
        content: body.message.trim(),
        createdAt: serverTimestamp(),
        isRead: false
      }
      
      console.log('Message to add:', newMessage)
      const docRef = await addDoc(messagesRef, newMessage)
      console.log('Message added with ID:', docRef.id)
      
      // Try to update message count, but don't fail if it doesn't work
      try {
        console.log('Updating message count...')
        const postRef = doc(firestore, 'posts', body.postId)
        await updateDoc(postRef, {
          messageCount: increment(1)
        })
        console.log('Message count updated')
      } catch (updateError) {
        console.error('Warning: Could not update message count:', updateError.message)
        // Don't throw - the message was still saved successfully
      }
      
      return {
        success: true,
        message: 'Message sent successfully',
        messageId: docRef.id
      }
    } catch (error) {
      console.error('Error adding message:', error)
      console.error('Error details:', error.code, error.message)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send message'
      })
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
