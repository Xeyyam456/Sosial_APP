import { memo, useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { getAvatarColor } from '@utils'
import useModal from '@shared/hooks/useModal'
import PostCardHeader from './PostCardHeader'
import PostCardActions from './PostCardActions'
import PostDeleteConfirm from './PostDeleteConfirm'
import styles from './PostCard.module.css'

const PostCard = memo(({ post, deletePost, toggleLike }) => {
  const avatarColor  = useMemo(() => getAvatarColor(post.userId ?? post.id), [post.userId, post.id])
  const avatarLetter = useMemo(() => String(post.userId ?? post.id ?? '?').charAt(0).toUpperCase(), [post.userId, post.id])
  const { isOpen: confirmOpen, open: openConfirm, close: closeConfirm } = useModal()

  const handleLike = useCallback(() => toggleLike(post.id), [toggleLike, post.id])

  const handleShare = useCallback(() => {
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href)
    toast.info('Link copied!')
  }, [])

  const handleConfirmDelete = useCallback(() => {
    closeConfirm()
    deletePost(post.id)
  }, [deletePost, post.id, closeConfirm])

  return (
    <article className={styles.card}>
      <PostCardHeader
        avatarColor={avatarColor}
        avatarLetter={avatarLetter}
        author={post.author}
        userId={post.userId}
        createdAt={post.createdAt}
      />

      {/* Content */}
      {post.title && (
        <div className={styles.content}>
          <p className={styles.title}>{post.title}</p>
          {post.body && <p className={styles.body}>{post.body}</p>}
        </div>
      )}

      {/* Image */}
      {post.imageUrl && (
        <img src={post.imageUrl} alt="post" className={styles.postImg} />
      )}

      {/* Body only (no title) */}
      {!post.title && post.body && (
        <div className={styles.content}>
          <p className={styles.body}>{post.body}</p>
        </div>
      )}

      <PostCardActions
        liked={post.liked}
        onLike={handleLike}
        onShare={handleShare}
        onDelete={openConfirm}
      />

      <PostDeleteConfirm
        isOpen={confirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirmDelete}
      />
    </article>
  )
})

PostCard.displayName = 'PostCard'

export default PostCard
