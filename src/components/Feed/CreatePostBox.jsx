import { memo } from 'react'
import { CURRENT_USER } from '@utils'
import styles from './Feed.module.css'

const CreatePostBox = memo(({ onClick }) => (
  <div className={styles.createBox}>
    <img src={CURRENT_USER.avatar} alt="avatar" className={styles.createAvatar} />
    <button className={styles.createInput} onClick={onClick}>
      What&apos;s on your mind, {CURRENT_USER.name.split(' ')[0]}?
    </button>
  </div>
))

CreatePostBox.displayName = 'CreatePostBox'

export default CreatePostBox
