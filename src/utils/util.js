import { useRouter } from 'vue-router'
const _toString = Object.prototype.toString

export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]';
}

export function routerBack () {
  const router = useRouter()
  return router.back
}