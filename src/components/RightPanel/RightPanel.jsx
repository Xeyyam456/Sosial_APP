import { useMemo } from 'react'
import useUsers from '@shared/hooks/useUsers'
import styles from './RightPanel.module.css'

const LATEST_PHOTOS = [
  'https://picsum.photos/seed/flower1/120/120',
  'https://picsum.photos/seed/burger1/120/120',
  'https://picsum.photos/seed/camera1/120/120',
  'https://picsum.photos/seed/honey1/120/120',
]

const RightPanel = () => {
  const { users, loading } = useUsers(8)

  const onlineFriends = useMemo(() => users.slice(0, 6), [users])
  const conversations = useMemo(
    () =>
      users.slice(6).map((u) => ({
        key: u.login?.uuid ?? u.name.first,
        name: `${u.name.first} ${u.name.last}`,
        avatar: u.picture.medium,
        preview: 'Sent you a message...',
      })),
    [users]
  )

  return (
    <aside className={styles.panel}>
      {/* Online Friends */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Online Friends</h3>
        <div className={styles.avatarRow}>
          {loading
            ? [1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`${styles.avatarSkel} ${styles.pulse}`} />
              ))
            : onlineFriends.map((u) => (
                <div key={u.login?.uuid ?? u.name.first} className={styles.friendAvatar}>
                  <img src={u.picture.medium} alt={`${u.name.first} ${u.name.last}`} />
                  <span className={styles.onlineDot} />
                </div>
              ))}
        </div>
      </section>

      <hr className={styles.divider} />

      {/* Latest Photos */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Latest Photos</h3>
        <div className={styles.photoGrid}>
          {LATEST_PHOTOS.map((src, i) => (
            <img key={i} src={src} alt={`photo ${i + 1}`} className={styles.photo} />
          ))}
        </div>
      </section>

      <hr className={styles.divider} />

      {/* Latest Conversations */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Latest Conversations</h3>
        {loading ? (
          [1, 2].map((i) => (
            <div key={i} className={styles.convSkel}>
              <div className={`${styles.avatarSkel} ${styles.pulse}`} />
              <div className={styles.convLines}>
                <div className={`${styles.skelLine} ${styles.pulse} ${styles.skelLineShort}`} />
                <div className={`${styles.skelLine} ${styles.pulse} ${styles.skelLineLong}`} />
              </div>
            </div>
          ))
        ) : (
          conversations.map((c) => (
            <div key={c.key} className={styles.convItem}>
              <img src={c.avatar} alt={c.name} className={styles.convAvatar} />
              <div className={styles.convText}>
                <p className={styles.convName}>{c.name}</p>
                <p className={styles.convPreview}>{c.preview}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </aside>
  )
}

export default RightPanel
