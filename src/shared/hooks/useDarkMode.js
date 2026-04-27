import { useState, useEffect, useCallback } from 'react'

const useDarkMode = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('darkMode', dark)
  }, [dark])

  const toggle = useCallback(() => setDark((p) => !p), [])

  return { dark, toggle }
}

export default useDarkMode
