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
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/style/variables.scss')
      ]
    })
}
// // 自动化导入
// pluginOptions: {
//   'style-resources-loader': {
//     preProcessor: 'scss',
//     patterns: [
//       resolve('src/assets/style/variables.scss'),
//       resolve('src/assets/style/mixin.scss')
//     ]
//   }
// }
// }
