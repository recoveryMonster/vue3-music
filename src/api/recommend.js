import { commonParams } from './config';
import { axiosFetch } from '@/utils/request';

/**
 * jsonp 抓取推荐页轮播图数据
 * 接口：https://u.y.qq.com/cgi-bin/musics.fcg
 */
export function getRecommend () {
  const url = '/cgi-bin/musics.fcg'

  const data = Object.assign({}, commonParams, {
    // "-": 'recom14387816465690695',
    platform: 'yqq.json',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 1,
    data: {
      "comm": { "ct": 24 },
      "category": {
        "method": "get_hot_category",
        "param": { "qq": "" },
        "module": "music.web_category_svr"
      },
      "recomPlaylist": {
        "method": "get_hot_recommend",
        "param": { "async": 1, "cmd": 2 },
        "module": "playlist.HotRecommendServer"
      },
      "playlist": {
        "method": "get_playlist_by_category",
        "param": { "id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8 }, "module": "playlist.PlayListPlazaServer"
      },
      "new_song": {
        "module": "newsong.NewSongServer",
        "method": "get_new_song_info",
        "param": { "type": 5 }
      },
      "new_album": {
        "module": "newalbum.NewAlbumServer",
        "method": "get_new_album_info",
        "param": { "area": 1, "sin": 0, "num": 20 }
      },
      "new_album_tag": {
        "module": "newalbum.NewAlbumServer",
        "method": "get_new_album_area",
        "param": {}
      },
      "toplist": {
        "module": "musicToplist.ToplistInfoServer",
        "method": "GetAll",
        "param": {}
      },
      "focus": {
        "module": "music.musicHall.MusicHallPlatform",
        "method": "GetFocus",
        "param": {}
      }
    }
  })
  return axiosFetch(url, data).then((res) => {
    return Promise.resolve(res)
  }).catch(err => {
    return Promise.reject(err)
  })

}