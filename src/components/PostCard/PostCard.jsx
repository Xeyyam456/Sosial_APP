import { memo, useCallback, useMemo } from 'react'
import { MdClose, MdPublic, MdMoreVert, MdFavorite, MdFavoriteBorder, MdShare, MdDelete } from 'react-icons/md'
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
              <MdPublic className={styles.publicIcon} size={12} />
            </div>
          </div>
        </div>
        <button className={styles.dotsBtn} aria-label="more">
          <MdMoreVert size={20} />
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

      {/* Action bar */}
      <div className={styles.actions}>
        <button
          className={`${styles.actionBtn} ${post.liked ? styles.liked : ''}`}
          onClick={handleLike}
          aria-label="like"
        >
          {post.liked ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
          Like
        </button>

        

        <button className={styles.actionBtn} onClick={handleShare} aria-label="share">
          <MdShare size={20} />
          Share
        </button>

        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={openConfirm}
          aria-label="delete"
        >
          <MdDelete size={20} />
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
