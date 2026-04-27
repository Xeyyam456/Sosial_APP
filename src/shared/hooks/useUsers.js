import { useState, useEffect } from 'react'
import { getRandomUsers } from '@services/usersService'

/**
 * Custom hook — fetches random users from randomuser.me API.
 * Returns { users, loading }.
 */
const useUsers = (count = 8) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getRandomUsers(count)
      .then((data) => {
        if (!cancelled) setUsers(data)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [count])

  return { users, loading }
}

export default useUsers
