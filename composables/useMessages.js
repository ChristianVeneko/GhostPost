import { ref } from 'vue'

export const useMessages = () => {
  const { idToken, refreshIdToken } = useAuth()
  const messages = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Get messages for a specific post
  const fetchPostMessages = async (postId) => {
    try {
      isLoading.value = true
      error.value = null
      
      // Ensure we have a valid token
      const token = idToken.value || await refreshIdToken()
      
      if (!token) {
        throw new Error('Authentication required')
      }
      
      // Fetch messages from API
      const response = await $fetch(`/api/messages?postId=${postId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.success) {
        messages.value = response.messages.map(msg => ({
          ...msg,
          createdAt: msg.createdAt ? new Date(msg.createdAt) : new Date()
        }))
      } else {
        throw new Error('Failed to fetch messages')
      }
      
      return messages.value
    } catch (err) {
      error.value = err.message || 'Error fetching messages'
      console.error('Error fetching messages:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Get all messages for the authenticated user (all their posts)
  const fetchAllUserMessages = async () => {
    try {
      isLoading.value = true
      error.value = null
      
      // Ensure we have a valid token
      const token = idToken.value || await refreshIdToken()
      
      if (!token) {
        throw new Error('Authentication required')
      }
      
      // Fetch messages from API
      const response = await $fetch('/api/messages', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.success) {
        messages.value = response.messages.map(msg => ({
          ...msg,
          createdAt: msg.createdAt ? new Date(msg.createdAt) : new Date()
        }))
      } else {
        throw new Error('Failed to fetch messages')
      }
      
      return messages.value
    } catch (err) {
      error.value = err.message || 'Error fetching messages'
      console.error('Error fetching messages:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Send a message to a post
  const sendMessage = async (postIdOrUsername, message) => {
    try {
      isLoading.value = true
      error.value = null

      // Check if it's a username (string without dashes/numbers pattern)
      // or a postId (Firestore document ID)
      const isUsername = typeof postIdOrUsername === 'string' &&
                        postIdOrUsername.length < 50 &&
                        !postIdOrUsername.includes('-')

      let response
      if (isUsername) {
        // Send to user directly (NGL-like)
        response = await $fetch('/api/sendMessageToUser', {
          method: 'POST',
          body: {
            username: postIdOrUsername,
            message
          }
        })
      } else {
        // Send to specific post (old behavior)
        response = await $fetch('/api/sendMessage', {
          method: 'POST',
          body: {
            postId: postIdOrUsername,
            message
          }
        })
      }

      if (!response.success) {
        throw new Error('Failed to send message')
      }

      return response
    } catch (err) {
      error.value = err.message || 'Error sending message'
      console.error('Error sending message:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete a message
  const deleteMessage = async (messageId) => {
    try {
      isLoading.value = true
      error.value = null
      
      // Ensure we have a valid token
      const token = idToken.value || await refreshIdToken()
      
      if (!token) {
        throw new Error('Authentication required')
      }
      
      // Delete message using the new endpoint
      const response = await $fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      // Remove from local state
      if (response.success) {
        messages.value = messages.value.filter(msg => msg.id !== messageId)
      } else {
        throw new Error('Failed to delete message')
      }
      
      return response
    } catch (err) {
      error.value = err.message || 'Error deleting message'
      console.error('Error deleting message:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    messages,
    isLoading,
    error,
    fetchPostMessages,
    fetchAllUserMessages,
    sendMessage,
    deleteMessage
  }
} 