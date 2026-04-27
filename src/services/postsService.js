import api from './api'

export const getPosts = () => {
  return api.get('/posts', { params: { id_gte: 101 } })
}

export const createPost = (data) => {
  return api.post('/posts', data)
}

export const removePost = (id) => {
  return api.delete(`/posts/${id}`)
}
