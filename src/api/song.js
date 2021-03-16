import { commonParams } from './config'
import { getUid } from '@/utils/uid'
import { axiosPost } from '@/utils/request'
import { ERR_OK } from './config'

/**
 * @param {Array} mids
 * @param {Array} types
 * */
const genUrlMid = (mids, types) => {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}

/**
 * 获取歌曲URL
 * */
export function getSongsUrl (songs) {
  const url = '/api/getPurlUrl'

  let mids = []
  let types = []

  songs.forEach((song) => {
    mids.push(song.mid)
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return new Promise((resolve, reject) => {
    let tryTime = 3

    function request () {
      return axiosPost(url, {
        comm: data,
        req_0: urlMid
      }).then((res) => {
        if (res.code === ERR_OK) {
          let urlMid = res.req_0
          if (urlMid && urlMid.code === ERR_OK) {
            const purlMap = {}
            urlMid.data.midurlinfo.forEach((item) => {
              if (item.purl) {
                purlMap[item.songmid] = item.purl
              }
            })
            if (Object.keys(purlMap).length > 0) {
              resolve(purlMap)
            } else {
              retry()
            }
          } else {
            retry()
          }
        } else {
          retry()
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
    }

    function retry () {
      if (--tryTime >= 0) {
        request()
      } else {
        reject(new Error('Can not get the songs url'))
      }
    }

    request()
  })
}