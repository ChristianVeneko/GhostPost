import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { getAuthFromEvent } from '../../utils/auth'
import { initFirebase } from '../../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
    // Get message ID from URL
    const messageId = event.context.params.id
    
    // Authenticate user
    let username
    try {
      const auth = getAuthFromEvent(event)
      username = auth.username
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
    
    // Get message document
    try {
      const messageRef = doc(firestore, 'messages', messageId);
      const messageDoc = await getDoc(messageRef);
      
      // Check if message exists
      if (!messageDoc.exists()) {
        return createError({
          statusCode: 404,
          statusMessage: 'Message not found'
        });
      }
      
      // Check if user is authorized to delete this message
      const messageData = messageDoc.data();
      if (messageData.to !== username) {
        return createError({
          statusCode: 403,
          statusMessage: 'Forbidden: You are not authorized to delete this message'
        });
      }
      
      // Delete the message
      await deleteDoc(messageRef);
      
      return {
        success: true,
        message: 'Message deleted successfully'
      };
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError);
      
      if (firestoreError.code === 'permission-denied') {
        return createError({
          statusCode: 403,
          statusMessage: 'Firestore permission denied. Please make sure Firestore is enabled in your Firebase project.'
        });
      }
      
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to delete message from database'
      });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    
    return createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
}); 