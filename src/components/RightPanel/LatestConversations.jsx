import { memo } from 'react'
import styles from './RightPanel.module.css'

const LatestConversations = memo(({ conversations, loading }) => (
  <section className={styles.section}>
    <h3 className={styles.sectionTitle}>Latest Conversations</h3>
    {loading
      ? [1, 2].map((i) => (
          <div key={i} className={styles.convSkel}>
            <div className={`${styles.avatarSkel} ${styles.pulse}`} />
            <div className={styles.convLines}>
              <div className={`${styles.skelLine} ${styles.pulse} ${styles.skelLineShort}`} />
              <div className={`${styles.skelLine} ${styles.pulse} ${styles.skelLineLong}`} />
            </div>
          </div>
        ))
      : conversations.map((c) => (
          <div key={c.key} className={styles.convItem}>
            <img src={c.avatar} alt={c.name} className={styles.convAvatar} />
            <div className={styles.convText}>
              <p className={styles.convName}>{c.name}</p>
              <p className={styles.convPreview}>{c.preview}</p>
            </div>
          </div>
        ))}
  </section>
))

LatestConversations.displayName = 'LatestConversations'

export default LatestConversations
