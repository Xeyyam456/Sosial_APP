import { useReducer, useCallback } from 'react'
import { toast } from 'react-toastify'
import { postsReducer, initialState, POST_ACTIONS } from '@shared/reducers/postsReducer'
import { getPosts, createPost, removePost } from '@services/postsService'

/**
 * Custom hook — manages all posts state via useReducer.
 * Encapsulates fetchPosts, addPost, deletePost, toggleLike.
 */
const usePosts = () => {
  const [state, dispatch] = useReducer(postsReducer, initialState)

  const fetchPosts = useCallback(async () => {
    dispatch({ type: POST_ACTIONS.FETCH_START })
    try {
      const { data } = await getPosts()
      const raw = Array.isArray(data) ? data : (data.posts ?? [])
      const posts = raw.map((p, i) => ({
        ...p,
        id: p.id ?? (100 + i),
        createdAt: p.createdAt ?? new Date(Date.now() - (i + 1) * 43 * 60000).toISOString(),
      }))
      dispatch({ type: POST_ACTIONS.FETCH_SUCCESS, payload: posts })
    } catch (err) {
      dispatch({ type: POST_ACTIONS.FETCH_ERROR, payload: err.message })
      toast.error('Failed to load posts')
    }
  }, [])

  const addPost = useCallback(async (postData) => {
    let apiData = {}
    try {
      const { data } = await createPost(postData)
      apiData = data ?? {}
    } catch {
      // API uğursuz olsa da, postu lokal əlavə edirik
    }
    const newPost = {
      ...postData,
      ...apiData,
      id: apiData.id ?? Date.now(),
      createdAt: apiData.createdAt ?? new Date().toISOString(),
    }
    dispatch({ type: POST_ACTIONS.ADD_POST, payload: newPost })
    toast.success('Post created!')
    return newPost
  }, [])

  const deletePost = useCallback(async (id) => {
    try {
      await removePost(id)
    } catch {
      // API uğursuz olsa da lokal silirik
    }
    dispatch({ type: POST_ACTIONS.DELETE_POST, payload: id })
    toast.success('Post deleted')
  }, [])

  const toggleLike = useCallback((id) => {
    dispatch({ type: POST_ACTIONS.TOGGLE_LIKE, payload: id })
  }, [])

  return {
    posts: state.posts,
    loading: state.loading,
    error: state.error,
    fetchPosts,
    addPost,
    deletePost,
    toggleLike,
  }
}

export default usePosts
