import { memo } from 'react'
import { CURRENT_USER } from '@utils'
import styles from './Sidebar.module.css'

const ProfileCard = memo(() => (
  <div className={styles.profileCard}>
    <img src={CURRENT_USER.avatar} alt="avatar" className={styles.profileAvatar} />
    <div className={styles.profileInfo}>
      <p className={styles.profileName}>{CURRENT_USER.name}</p>
      <p className={styles.profileHandle}>{CURRENT_USER.handle}</p>
    </div>
  </div>
))

ProfileCard.displayName = 'ProfileCard'

export default ProfileCard
