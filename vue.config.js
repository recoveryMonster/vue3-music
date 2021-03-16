module.exports = {
  devServer: {
    proxy: {
      'api/getBannerList': {
        target: 'https://u.y.qq.com/cgi-bin/musics.fcg',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getBannerList': '', // rewrite path
        },
      },
      '/api/getDiscList': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getDiscList': '', // rewrite path
        },
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
      },
      '/api/getPurlUrl': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        changeOrigin: true,
        pathRewrite: {
          '^/api/getPurlUrl': '', // rewrite path
        },
        headers: {
          referer: 'https://y.qq.com/',
          origin: 'https://y.qq.com',
          'Content-type': 'application/x-www-form-urlencoded'
        }
      },
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        prependData: `@import "@/assets/styles/variable.scss";`
      },
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
      }
    }
  }
}