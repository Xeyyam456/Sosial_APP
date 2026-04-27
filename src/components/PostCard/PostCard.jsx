import { memo, useCallback, useMemo } from 'react'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import { formatDate, getAvatarColor } from '@utils'
import useModal from '@shared/hooks/useModal'
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
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.authorRow}>
          <div className={styles.avatar} style={{ background: avatarColor }}>
            {avatarLetter}
          </div>
          <div className={styles.authorMeta}>
            <p className={styles.name}>{post.author ?? `User ${post.userId}`}</p>
            <div className={styles.metaRow}>
              <span className={styles.time}>{formatDate(post.createdAt)}</span>
              <svg className={styles.publicIcon} viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
          </div>
        </div>
        <button className={styles.dotsBtn} aria-label="more">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      {post.title && (
        <div className={styles.content}>
          {post.title && <p className={styles.title}>{post.title}</p>}
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

      {/* Reactions row */}
      {post.likeCount > 0 && (
        <div className={styles.reactions}>
          <div className={styles.reactionRow}>
            <span className={styles.reactionEmojis}>❤️</span>
            <span className={styles.reactionCount}>{post.likeCount} {post.likeCount === 1 ? 'person' : 'people'}</span>
          </div>
          <span className={styles.commentCount}>0 comments</span>
        </div>
      )}

      {/* Action bar */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${post.liked ? styles.liked : ''}`}
          onClick={handleLike}
          aria-label="like"
        >
          {post.liked ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
            </svg>
          )}
          Like
        </button>

        <button className={styles.actionBtn} aria-label="comment">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
          </svg>
          Comment
        </button>

        <button className={styles.actionBtn} onClick={handleShare} aria-label="share">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
          </svg>
          Share
        </button>

        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={openConfirm}
          aria-label="delete"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </div>

      {/* Confirm Delete Modal */}
      {confirmOpen && (
        <div className={styles.confirmBackdrop} onClick={closeConfirm}>
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.confirmCloseBtn} onClick={closeConfirm} aria-label="close">
              <MdClose size={20} />
            </button>
            <p className={styles.confirmText}>Bu postu silmək istədiyinizə əminsiniz?</p>
            <div className={styles.confirmActions}>
              <button className={styles.cancelBtn} onClick={closeConfirm}>Ləğv et</button>
              <button className={styles.confirmDeleteBtn} onClick={handleConfirmDelete}>Sil</button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
})

PostCard.displayName = 'PostCard'

export default PostCard
