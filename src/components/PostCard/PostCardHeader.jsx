import { memo } from 'react'
import { MdPublic, MdMoreVert } from 'react-icons/md'
import { formatDate } from '@utils'
import styles from './PostCard.module.css'

const PostCardHeader = memo(({ avatarColor, avatarLetter, author, userId, createdAt }) => (
  <div className={styles.header}>
    <div className={styles.authorRow}>
      <div className={styles.avatar} style={{ background: avatarColor }}>
        {avatarLetter}
      </div>
      <div className={styles.authorMeta}>
        <p className={styles.name}>{author ?? `User ${userId}`}</p>
        <div className={styles.metaRow}>
          <span className={styles.time}>{formatDate(createdAt)}</span>
          <MdPublic className={styles.publicIcon} size={12} />
        </div>
      </div>
    </div>
    <button className={styles.dotsBtn} aria-label="more">
      <MdMoreVert size={20} />
    </button>
  </div>
))

PostCardHeader.displayName = 'PostCardHeader'

export default PostCardHeader
