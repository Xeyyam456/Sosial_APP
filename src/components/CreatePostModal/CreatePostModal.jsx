import { MdClose } from 'react-icons/md'
import usePostForm from '@shared/hooks/usePostForm'
import styles from './CreatePostModal.module.css'

const CreatePostModal = ({ open, onClose, addPost }) => {
  const { form, errors, loading, handleChange, handleSubmit, handleClose } = usePostForm({ addPost, onClose, open })

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  if (!open) return null

  return (
    <div className={styles.backdrop} onClick={handleBackdrop}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Create Post</h2>
          <button className={styles.closeBtn} onClick={handleClose} disabled={loading} aria-label="close">
            <MdClose size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.field}>
            <label className={styles.label}>Title *</label>
            <input
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Post title"
              disabled={loading}
              autoFocus
            />
            {errors.title && <span className={styles.errorMsg}>{errors.title}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Content *</label>
            <textarea
              className={`${styles.textarea} ${errors.body ? styles.inputError : ''}`}
              name="body"
              value={form.body}
              onChange={handleChange}
              placeholder="What's on your mind?"
              rows={4}
              disabled={loading}
            />
            {errors.body && <span className={styles.errorMsg}>{errors.body}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Image URL (optional)</label>
            <input
              className={styles.input}
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              disabled={loading}
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={handleClose} disabled={loading}>
            Cancel
          </button>
          <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
