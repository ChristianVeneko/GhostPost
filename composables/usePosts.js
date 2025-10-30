import { ref, computed } from 'vue'
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp 
} from 'firebase/firestore'

export const usePosts = () => {
  const { $firestore } = useNuxtApp()
  const { user } = useAuth()
  
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // Generar key aleatoria única para el post
  const generatePostKey = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let key = ''
    for (let i = 0; i < 8; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return key
  }
  
  // Crear un nuevo post
  const createPost = async (title) => {
    loading.value = true
    error.value = null
    
    try {
      if (!user.value) {
        throw new Error('Debes iniciar sesión para crear un post')
      }
      
      if (!title || title.trim().length === 0) {
        throw new Error('El título no puede estar vacío')
      }
      
      if (title.length > 100) {
        throw new Error('El título es demasiado largo (máximo 100 caracteres)')
      }
      
      const postData = {
        userId: user.value.uid,
        username: user.value.email.split('@')[0],
        title: title.trim(),
        key: generatePostKey(),
        createdAt: serverTimestamp(),
        isActive: true,
        messageCount: 0
      }
      
      const postsRef = collection($firestore, 'posts')
      const docRef = await addDoc(postsRef, postData)
      
      // Retornar con fecha actual para UI inmediata
      const newPost = {
        id: docRef.id,
        ...postData,
        createdAt: new Date() // Usar fecha local para UI
      }
      
      // Agregar a la lista local inmediatamente
      posts.value = [newPost, ...posts.value]
      
      return newPost
    } catch (err) {
      console.error('Error creating post:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Obtener posts del usuario actual
  const getUserPosts = async () => {
    loading.value = true
    error.value = null
    
    try {
      if (!user.value) {
        throw new Error('Debes iniciar sesión')
      }
      
      const postsRef = collection($firestore, 'posts')
      const q = query(
        postsRef,
        where('userId', '==', user.value.uid)
      )
      
      const snapshot = await getDocs(q)
      posts.value = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .sort((a, b) => {
          // Ordenar por fecha de creación descendente (más reciente primero)
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || 0)
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || 0)
          return dateB - dateA
        })
      
      return posts.value
    } catch (err) {
      console.error('Error fetching posts:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Obtener un post por username y key (para página pública)
  const getPostByKey = async (username, key) => {
    loading.value = true
    error.value = null
    
    try {
      const postsRef = collection($firestore, 'posts')
      const q = query(
        postsRef,
        where('username', '==', username),
        where('key', '==', key),
        where('isActive', '==', true)
      )
      
      const snapshot = await getDocs(q)
      
      if (snapshot.empty) {
        return null
      }
      
      const postDoc = snapshot.docs[0]
      return {
        id: postDoc.id,
        ...postDoc.data()
      }
    } catch (err) {
      console.error('Error fetching post:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Activar/desactivar post
  const togglePostStatus = async (postId) => {
    try {
      const postRef = doc($firestore, 'posts', postId)
      const postSnap = await getDoc(postRef)
      
      if (!postSnap.exists()) {
        throw new Error('Post no encontrado')
      }
      
      const currentStatus = postSnap.data().isActive
      await updateDoc(postRef, {
        isActive: !currentStatus
      })
      
      // Actualizar en la lista local
      const postIndex = posts.value.findIndex(p => p.id === postId)
      if (postIndex !== -1) {
        posts.value[postIndex].isActive = !currentStatus
      }
      
      return !currentStatus
    } catch (err) {
      console.error('Error toggling post status:', err)
      throw err
    }
  }
  
  // Eliminar post
  const deletePost = async (postId) => {
    try {
      const postRef = doc($firestore, 'posts', postId)
      await deleteDoc(postRef)
      
      // Remover de la lista local
      posts.value = posts.value.filter(p => p.id !== postId)
    } catch (err) {
      console.error('Error deleting post:', err)
      throw err
    }
  }
  
  // Incrementar contador de mensajes
  const incrementMessageCount = async (postId) => {
    try {
      const postRef = doc($firestore, 'posts', postId)
      await updateDoc(postRef, {
        messageCount: increment(1)
      })
    } catch (err) {
      console.error('Error incrementing message count:', err)
    }
  }
  
  // Computed properties
  const activePosts = computed(() => posts.value.filter(p => p.isActive))
  const inactivePosts = computed(() => posts.value.filter(p => !p.isActive))
  const totalMessages = computed(() => posts.value.reduce((sum, p) => sum + (p.messageCount || 0), 0))
  
  return {
    posts,
    loading,
    error,
    createPost,
    getUserPosts,
    getPostByKey,
    togglePostStatus,
    deletePost,
    incrementMessageCount,
    activePosts,
    inactivePosts,
    totalMessages
  }
}
