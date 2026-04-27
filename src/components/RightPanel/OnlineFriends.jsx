import { memo } from 'react'
import styles from './RightPanel.module.css'

const OnlineFriends = memo(({ friends, loading }) => (
  <section className={styles.section}>
    <h3 className={styles.sectionTitle}>Online Friends</h3>
    <div className={styles.avatarRow}>
      {loading
        ? [1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`${styles.avatarSkel} ${styles.pulse}`} />
          ))
        : friends.map((u) => (
            <div key={u.login?.uuid ?? u.name.first} className={styles.friendAvatar}>
              <img src={u.picture.medium} alt={`${u.name.first} ${u.name.last}`} />
              <span className={styles.onlineDot} />
            </div>
          ))}
    </div>
  </section>
))

OnlineFriends.displayName = 'OnlineFriends'

export default OnlineFriends
