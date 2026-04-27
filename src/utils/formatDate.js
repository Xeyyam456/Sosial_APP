export const formatDate = (dateStr) => {
  if (!dateStr) return 'just now'

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return 'just now'

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours   = Math.floor(minutes / 60)
  const days    = Math.floor(hours   / 24)

  if (seconds < 60)  return 'just now'
  if (minutes < 60)  return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  if (hours   < 24)  return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (days    < 7)   return `${days} day${days > 1 ? 's' : ''} ago`

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
