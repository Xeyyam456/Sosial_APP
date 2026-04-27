const COLORS = [
  '#e53935', '#d81b60', '#8e24aa', '#3949ab',
  '#1e88e5', '#00897b', '#43a047', '#fb8c00',
]

/**
 * Returns a deterministic MUI color based on a numeric id or string.
 * @param {number|string} id
 * @returns {string} hex color
 */
export const getAvatarColor = (id) => {
  const index = Math.abs(Number(id) || String(id).charCodeAt(0) || 0) % COLORS.length
  return COLORS[index]
}
