import { useState, useCallback } from 'react'
import {
  MdHome, MdPeople, MdGroups, MdStorefront,
  MdPlayCircle, MdBookmark, MdSettings,
  MdAdd, MdLightMode, MdDarkMode,
} from 'react-icons/md'
import ProfileCard from './ProfileCard'
import StatsBar from './StatsBar'
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

      <ProfileCard />
      <StatsBar />

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
