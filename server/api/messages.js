import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { getAuthFromEvent } from '../utils/auth'
import { initFirebase } from '../utils/firebase'

export default defineEventHandler(async (event) => {
  try {
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
    
    // Query messages
    try {
      const messagesRef = collection(firestore, 'messages')
      
      // Nota: Esta consulta requiere un índice compuesto en Firestore
      // Si ves un error, sigue el enlace proporcionado para crear el índice
      const q = query(
        messagesRef,
        where('to', '==', username),
        orderBy('createdAt', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }))
      
      return {
        success: true,
        messages
      }
    } catch (firestoreError) {
      console.error('Firestore error:', firestoreError)
      
      // Si el error es sobre índices, proporciona instrucciones claras
      if (firestoreError.message && firestoreError.message.includes('index')) {
        console.log('Este error indica que necesitas crear un índice en Firestore. Sigue el enlace proporcionado en el mensaje de error para crearlo.')
      }
      
      if (firestoreError.code === 'permission-denied') {
        return createError({
          statusCode: 403,
          statusMessage: 'Firestore permission denied. Please make sure Firestore is enabled in your Firebase project.'
        })
      }
      
      return createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch messages from database'
      })
    }
  } catch (error) {
    console.error('Error fetching messages:', error)
    
    return createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
}) 