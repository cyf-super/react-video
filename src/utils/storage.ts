export const storage = {
  get(key: string) {
    return this.has(key)
      ? JSON.parse(localStorage.getItem(key) || '{}')
      : undefined
  },
  set(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  has(key: string) {
    return localStorage.getItem(key)
  },
  remove(key: string) {
    return this.has(key) ? localStorage.removeItem(key) : undefined
  },
  clear() {
    return localStorage.clear()
  },
}
