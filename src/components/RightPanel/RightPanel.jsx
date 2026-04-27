import { useMemo } from 'react'
import useUsers from '@shared/hooks/useUsers'
import OnlineFriends from './OnlineFriends'
import LatestPhotos from './LatestPhotos'
import LatestConversations from './LatestConversations'
import styles from './RightPanel.module.css'

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
      <OnlineFriends friends={onlineFriends} loading={loading} />
      <hr className={styles.divider} />
      <LatestPhotos />
      <hr className={styles.divider} />
      <LatestConversations conversations={conversations} loading={loading} />
    </aside>
  )
}

export default RightPanel
