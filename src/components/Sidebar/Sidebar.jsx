import { useState, useCallback } from 'react'
import {
  MdHome, MdPeople, MdGroups, MdStorefront,
  MdPlayCircle, MdBookmark, MdSettings,
  MdAdd, MdLightMode, MdDarkMode,
} from 'react-icons/md'
import { CURRENT_USER } from '@utils'
import styles from './Sidebar.module.css'

const NAV_ITEMS = [
  { label: 'Feed',        Icon: MdHome },
  { label: 'Friends',    Icon: MdPeople },
  { label: 'Groups',     Icon: MdGroups },
  { label: 'Marketplace', Icon: MdStorefront },
  { label: 'Watch',      Icon: MdPlayCircle },
  { label: 'Saved',      Icon: MdBookmark },
  { label: 'Settings',   Icon: MdSettings },
]

const Sidebar = ({ onCreatePost, darkMode, onToggleDark }) => {
  const [active, setActive] = useState('Feed')
  const handleNav = useCallback((label) => setActive(label), [])

  return (
    <aside className={styles.sidebar}>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <img src={CURRENT_USER.avatar} alt="avatar" className={styles.profileAvatar} />
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>Sarkhan Rahimli</p>
          <p className={styles.profileHandle}>@sarkhandev</p>
        </div>
      </div>

      {/* Stats */}
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

      <div className={styles.sectionDivider} />

      {/* Nav */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ label, Icon }) => (
          <button
            key={label}
            className={`${styles.navItem} ${active === label ? styles.active : ''}`}
            onClick={() => handleNav(label)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.sectionDivider} />

      {/* Create Post */}
      <div className={styles.createSection}>
        <button className={styles.createBtn} onClick={onCreatePost}>
          <MdAdd size={20} />
          Create Post
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className={styles.bottom}>
        {darkMode ? <MdDarkMode size={18} className={styles.themeIcon} /> : <MdLightMode size={18} className={styles.themeIcon} />}
        <span className={styles.themeLabel}>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        <button
          className={`${styles.toggle} ${darkMode ? styles.on : ''}`}
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
        >
          <span className={styles.knob} />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
