import { useCallback } from 'react'
import { MdSearch, MdChat, MdNotifications, MdBolt } from 'react-icons/md'
import { CURRENT_USER } from '@utils'
import styles from './Header.module.css'

const Header = ({ onSearch }) => {
  const handleChange = useCallback(
    (e) => onSearch?.(e.target.value),
    [onSearch]
  )

  return (
    <header className={styles.header}>
      {/* Left: Logo + Search */}
      <div className={styles.left}>
        <div className={styles.logoWrap}>
          <MdBolt className={styles.logoIcon} size={26} />
          <span className={styles.logo}>Sosial</span>
        </div>
        <div className={styles.searchBox}>
          <MdSearch className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search Sosial..."
            className={styles.searchInput}
            onChange={handleChange}
            aria-label="search"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="messenger">
          <MdChat size={22} />
          <span className={styles.badge}>1</span>
        </button>
        <button className={styles.iconBtn} aria-label="notifications">
          <MdNotifications size={22} />
          <span className={styles.badge}>1</span>
        </button>
        <div className={styles.profileBtn}>
          <img
            src={CURRENT_USER.avatar}
            alt="avatar"
            className={styles.avatar}
          />
          <span className={styles.profileName}>Sarkhan</span>
        </div>
      </div>
    </header>
  )
}

export default Header
