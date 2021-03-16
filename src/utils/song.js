import { getSongsUrl } from '@/api/song'
export class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong (musicData) {
  const {
    songid: id,
    songmid: mid,
    interval: duration,
    singer,
    songname: name,
    albumname: album,
    albummid
  } = musicData
  return new Song({
    id,
    mid,
    singer: filterSinger(singer),
    name,
    album,
    duration,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function filterSinger (singer) {
  if (!singer) {
    return ''
  }
  return singer.map(s => s.name).join('/')
}


export function isValidMusic (musicData) {
  return musicData.albummid && musicData.songid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

/**
 * @param {Object} songs
 * */
export const processSongsUrl = (songs) => {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  return getSongsUrl(songs).then((purlMap) => {
    songs = songs.filter((song) => {
      const purl = purlMap[song.mid]
      if (purl) {
        song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
        return true
      }
      return false
    })
    return songs
  }).catch(err => {
    // eslint-disable-next-line no-console
    console.log(err)
  })
}