import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { initFirebase } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    // Get request body
    const body = await readBody(event)
    
    // Validate request
    if (!body.to || typeof body.to !== 'string') {
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
    
    // Sanitize username (remove @ if present, lowercase, trim)
    const sanitizedUsername = body.to.replace('@', '').toLowerCase().trim()
    
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
    
    // Add message to Firestore
    try {
      const messagesRef = collection(firestore, 'messages')
      const newMessage = {
        to: sanitizedUsername,
        message: body.message,
        createdAt: serverTimestamp(),
        ip: event.node.req.headers['x-forwarded-for'] || event.node.req.socket.remoteAddress
      }
      
      const docRef = await addDoc(messagesRef, newMessage)
      
      return {
        success: true,
        messageId: docRef.id
      }
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError)
      
      // Check if it's a permission error
      if (firestoreError.code === 'permission-denied') {
        return createError({
          statusCode: 403,
          statusMessage: 'Firestore permission denied. Please make sure Firestore is enabled in your Firebase project.'
        })
      }
      
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to save message to database'
      })
    }
  } catch (error) {
    console.error('Error sending message:', error)
    
    return createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
}) 