import { useEffect, useMemo, useCallback } from 'react'
import PostCard from '@components/PostCard/PostCard'
import { CURRENT_USER } from '@utils'
import styles from './Feed.module.css'

const PostSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.skelHeader}>
      <div className={styles.skelAvatar} />
      <div className={styles.skelLines}>
        <div className={styles.skelLine} style={{ width: '40%' }} />
        <div className={styles.skelLine} style={{ width: '25%', height: 12 }} />
      </div>
    </div>
    <div className={styles.skelImg} />
    <div style={{ padding: '12px 16px' }}>
      <div className={styles.skelLine} style={{ width: '90%' }} />
      <div className={styles.skelLine} style={{ width: '65%', marginTop: 8 }} />
    </div>
  </div>
)

const Feed = ({ posts, loading, error, searchQuery = '', fetchPosts, deletePost, toggleLike, onCreatePost }) => {
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // useMemo: only recompute when posts or searchQuery changes
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const filtered = q
      ? posts.filter(
          (p) =>
            p.title?.toLowerCase().includes(q) ||
            p.body?.toLowerCase().includes(q)
        )
      : posts
    return [...filtered].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
  }, [posts, searchQuery])

  const handleRetry = useCallback(() => fetchPosts(), [fetchPosts])

  if (loading) {
    return (
      <div className={styles.feed}>
        {[1, 2, 3].map((i) => <PostSkeleton key={i} />)}
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <span>{error}</span>
        <button className={styles.retryBtn} onClick={handleRetry}>Retry</button>
      </div>
    )
  }

  if (!filteredPosts.length) {
    return (
      <div className={styles.empty}>
        {searchQuery ? 'No posts match your search.' : 'No posts yet. Create the first one!'}
      </div>
    )
  }

  return (
    <div className={styles.feed}>
      {/* Create Post Box */}
      <div className={styles.createBox}>
        <img src={CURRENT_USER.avatar} alt="avatar" className={styles.createAvatar} />
        <button className={styles.createInput} onClick={onCreatePost}>
          What's on your mind, Sarkhan?
        </button>
      </div>

      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          deletePost={deletePost}
          toggleLike={toggleLike}
        />
      ))}
    </div>
  )
}

export default Feed
