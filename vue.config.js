module.exports = {
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