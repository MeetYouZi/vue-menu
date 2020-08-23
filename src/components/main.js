import mMenuItem from './menuItem'

const menuItem = {
  install: function (Vue) {
    // 注册组件，传入一个选项对象 (自动调用 Vue.extend)
    Vue.component('vHeader', mMenuItem)
  }
}

// 导出组件
export default menuItem
