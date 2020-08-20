import mMenuItem from './menuItem'

// 这里是重点
const menuItem = {
  install: function (Vue) {
    Vue.component('vHeader', mMenuItem)
  }
}

// 导出组件
export default menuItem
