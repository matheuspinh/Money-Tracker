export function getItem(item) {
  const valueStorage = localStorage.getItem(item)
  return valueStorage
}

export function setItem(key, value) {
  localStorage.setItem(key, value)
}

export function removeItem(key) {
  localStorage.removeItem(key)
}

