import { useCallback, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usePosts from '@shared/hooks/usePosts'
import useDarkMode from '@shared/hooks/useDarkMode'
import useDebounce from '@shared/hooks/useDebounce'
import useModal from '@shared/hooks/useModal'
import Header from '@components/Header/Header'
import Sidebar from '@components/Sidebar/Sidebar'
import Feed from '@components/Feed/Feed'
import RightPanel from '@components/RightPanel/RightPanel'
import CreatePostModal from '@components/CreatePostModal/CreatePostModal'
import styles from '@/App.module.css'

function App() {
  const { posts, loading, error, fetchPosts, addPost, deletePost, toggleLike } = usePosts()
  const { dark, toggle: toggleDark } = useDarkMode()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 500)
  const { isOpen: modalOpen, open: openModal, close: closeModal } = useModal()

  const handleSearch = useCallback((q) => setSearchQuery(q), [])

  return (
    <div className={styles.app}>
      <Header onSearch={handleSearch} />
      <div className={styles.body}>
        <Sidebar onCreatePost={openModal} darkMode={dark} onToggleDark={toggleDark} />
        <main className={styles.center}>
          <Feed
            posts={posts}
            loading={loading}
            error={error}
            searchQuery={debouncedSearch}
            fetchPosts={fetchPosts}
            deletePost={deletePost}
            toggleLike={toggleLike}
            onCreatePost={openModal}
          />
        </main>
        <RightPanel />
      </div>
      <CreatePostModal open={modalOpen} onClose={closeModal} addPost={addPost} />
      <ToastContainer position="top-right" autoClose={3000} theme={dark ? 'dark' : 'light'} />
    </div>
  )
}

export default App
