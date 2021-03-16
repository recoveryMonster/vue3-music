let uid = ''

export function getUid () {
  if (uid) {
    return uid
  }
  const t = (new Date()).getMilliseconds()
  // 2^31-1 = 2147483647 是32位操作系统中最大的符号型整型常量
  uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10
  return uid
}