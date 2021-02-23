const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;

class Singer {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

export const normalizeSingerList = (rawList) => {
  const singerMap = {
    hot: {
      list: [],
      title: HOT_NAME,
    }
  };
  rawList.forEach((singerInfo, index) => {
    const { Findex, Fsinger_mid, Fsinger_name } = singerInfo
    const singer = new Singer(Fsinger_name, Fsinger_mid)
    if (index < HOT_SINGER_LEN) {
      singerMap.hot.list.push(singer)
    }

    if (!singerMap[Findex]) {
      singerMap[Findex] = {
        list: [],
        title: Findex,
      }
    }

    singerMap[Findex].list.push(singer)
  })

  // 为了得到有序列表，需对map进行处理
  const hot = [];
  const ret = [];
  Object.entries(singerMap).forEach(([index, singerObj]) => {
    if (singerObj.title === HOT_NAME) {
      hot.push(singerObj)
    } else if (index.match(/[a-zA-Z]/)) {
      ret.push(singerObj)
    }
  })
  ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
  return hot.concat(ret)
}