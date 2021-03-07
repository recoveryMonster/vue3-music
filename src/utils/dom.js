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

export function getData (el, name, value) {
  const attr = 'data-' + name;
  if (value) {
    el.setAttribute(attr, value)
  } else {
    return el.getAttribute(attr)
  }
}

const elementStyle = document.createElement('div').style

const vendor = (() => {
  const transformsNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformsNames) {
    if (elementStyle[transformsNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (!vendor) {
    return
  }
  if (vendor === 'standard') {
    return vendor
  }

  return vendor + style.charAt(0).toUpperCase() + style.slice(1)
}