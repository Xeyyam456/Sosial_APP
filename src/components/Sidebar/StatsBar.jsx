import { memo } from 'react'
import styles from './Sidebar.module.css'

const StatsBar = memo(() => (
  <div className={styles.stats}>
    <div className={styles.stat}>
      <span className={styles.statNum}>128</span>
      <span className={styles.statLabel}>Posts</span>
    </div>
    <div className={styles.statDivider} />
    <div className={styles.stat}>
      <span className={styles.statNum}>2.4k</span>
      <span className={styles.statLabel}>Followers</span>
    </div>
    <div className={styles.statDivider} />
    <div className={styles.stat}>
      <span className={styles.statNum}>391</span>
      <span className={styles.statLabel}>Following</span>
    </div>
  </div>
))

StatsBar.displayName = 'StatsBar'

export default StatsBar
