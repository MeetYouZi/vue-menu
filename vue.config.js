const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',

  productionSourceMap: false,
  lintOnSave: true,
  chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js']
    config.resolve.alias
      .set('@', resolve('src'))
      .set('style', resolve('src/assets/style'))
      .set('components', resolve('src/components'))
  },
  // 自动化导入
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/style/variables.scss";@import "~@/assets/style/mixin.scss";'
      }
    }
  }
}
