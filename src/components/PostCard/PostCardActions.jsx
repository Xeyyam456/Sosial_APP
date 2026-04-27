import { memo } from 'react'
import { MdFavorite, MdFavoriteBorder, MdShare, MdDelete } from 'react-icons/md'
import styles from './PostCard.module.css'

const PostCardActions = memo(({ liked, onLike, onShare, onDelete }) => (
  <div className={styles.actions}>
    <button
      className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
      onClick={onLike}
      aria-label="like"
    >
      {liked ? <MdFavorite size={20} /> : <MdFavoriteBorder size={20} />}
      Like
    </button>

    <button className={styles.actionBtn} onClick={onShare} aria-label="share">
      <MdShare size={20} />
      Share
    </button>

    <button
      className={`${styles.actionBtn} ${styles.deleteBtn}`}
      onClick={onDelete}
      aria-label="delete"
    >
      <MdDelete size={20} />
    </button>
  </div>
))

PostCardActions.displayName = 'PostCardActions'

export default PostCardActions
