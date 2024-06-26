export function debounce(fn: Function, wait = 300) {
  let timer: NodeJS.Timeout | null
  return function Fn() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn()
      timer && clearTimeout(timer)
      timer = null
    }, wait)
  }
}

export function isBase64(src: string) {
  return src?.startsWith('data:image')
}
