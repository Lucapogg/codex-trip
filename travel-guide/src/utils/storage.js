// localStorage 封装,所有 key 加前缀避免冲突
const PREFIX = 'tg:'

export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch (e) {
    console.warn('storage setItem failed:', e)
    return false
  }
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key)
}