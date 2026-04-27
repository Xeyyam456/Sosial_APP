export const POST_ACTIONS = {
  FETCH_START:   'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR:   'FETCH_ERROR',
  ADD_POST:      'ADD_POST',
  DELETE_POST:   'DELETE_POST',
  TOGGLE_LIKE:   'TOGGLE_LIKE',
}

export const initialState = {
  posts: [],
  loading: false,
  error: null,
}

export const postsReducer = (state, action) => {
  switch (action.type) {
    case POST_ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null }

    case POST_ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, posts: action.payload }

    case POST_ACTIONS.ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] }

    case POST_ACTIONS.DELETE_POST:
      return { ...state, posts: state.posts.filter((p) => String(p.id) !== String(action.payload)) }

    case POST_ACTIONS.TOGGLE_LIKE: {
      const isLiked = state.posts.find((p) => String(p.id) === String(action.payload))?.liked
      return {
        ...state,
        posts: state.posts.map((p) =>
          String(p.id) === String(action.payload)
            ? { ...p, liked: !p.liked, likeCount: (p.likeCount || 0) + (isLiked ? -1 : 1) }
            : p
        ),
      }
    }

    case POST_ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
