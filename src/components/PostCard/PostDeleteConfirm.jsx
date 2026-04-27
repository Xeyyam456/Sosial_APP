import { memo } from 'react'
import { MdClose } from 'react-icons/md'
import styles from './PostCard.module.css'

const PostDeleteConfirm = memo(({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className={styles.confirmBackdrop} onClick={onClose}>
      <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.confirmCloseBtn} onClick={onClose} aria-label="close">
          <MdClose size={20} />
        </button>
        <p className={styles.confirmText}>Bu postu silmək istədiyinizə əminsiniz?</p>
        <div className={styles.confirmActions}>
          <button className={styles.cancelBtn} onClick={onClose}>Ləğv et</button>
          <button className={styles.confirmDeleteBtn} onClick={onConfirm}>Sil</button>
        </div>
      </div>
    </div>
  )
})

PostDeleteConfirm.displayName = 'PostDeleteConfirm'

export default PostDeleteConfirm
