export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }

  el.classList.add(className)
}

export function hasClass (el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}