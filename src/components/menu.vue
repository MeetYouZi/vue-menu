<template>
  <div class="vMenuWrapper">
    <transition name="fade">
      <div class="vMenu-mask" v-show="fullScreen" @click="handleShow">
        <transition name="menubar">
          <ul class="menubar-vertical" v-show="fullScreen">
            <menu-item
              v-for="item in list"
              :menu="item"
              :key="item.index"
              @openMenu="openMenu"
              :openedMenus="openedMenus"
            >
              <menu-item
                v-for="children in item.children"
                :menu="children"
                :key="children.index">
                <div>111</div>
              </menu-item>
<!--              <menu-item :menu="item.children"></menu-item>-->
            </menu-item>
          </ul>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import menuItem from './menuItem'
export default {
  name: 'Menu',
  components: {
    menuItem
  },
  data () {
    return {
      isOpen: false,
      fullScreen: false,
      openedMenus: [],
      list: [
        {
          index: '1',
          title: '产品',
          collapse: false,
          children: [
            {
              index: '1-0',
              title: '惟数平台',
              list: [
                {
                  index: '1-1',
                  name: '惟数平台综述'
                }, {
                  index: '1-2',
                  name: '实时开发平台'
                }, {
                  index: '1-3',
                  name: '离线开发平台'
                }, {
                  index: '1-4',
                  name: '数据资产管理平台'
                }, {
                  index: '1-5',
                  name: '机器学习平台'
                }
              ]
            }, {
              title: '惟客宝',
              list: [
                {
                  index: '1-3',
                  name: '电商云'
                }, {
                  index: '1-4',
                  name: '营销云'
                }, {
                  index: '1-5',
                  name: '导购云'
                }, {
                  index: '1-6',
                  name: '客户云'
                }, {
                  index: '1-7',
                  name: '客流云'
                }, {
                  index: '1-8',
                  name: '分析云'
                }
              ]
            }, {
              title: '运营服务',
              list: [
                {
                  index: '1-9',
                  name: '营销代教服务'
                }
              ]
            }
          ]
        }, {
          index: '2',
          title: '解决方案',
          collapse: false,
          children: [
            {
              index: '2-0',
              subTitle: '商业地产'
            }, {
              index: '2-1',
              subTitle: '医药零售'
            }, {
              index: '2-2',
              subTitle: '教育培训'
            }, {
              index: '2-3',
              subTitle: '鞋服家居'
            }
          ]
        }, {
          index: '3',
          title: '客户案例',
          collapse: false,
          children: [
            {
              index: '3-0',
              title: '惟数平台',
              list: [
                {
                  index: '3-1',
                  name: '惟数平台综述'
                }, {
                  index: '3-2',
                  name: '实时开发平台'
                }
              ]
            }, {
              index: '3-3',
              title: '惟客宝',
              list: [
                {
                  index: '3-4',
                  name: '惟数平台综述1'
                }, {
                  index: '3-5',
                  name: '实时开发平台1'
                }
              ]
            }
          ]
        }, {
          index: '4',
          title: '惟客动态',
          collapse: false,
          children: [
            {
              index: '4-0',
              subTitle: '新闻事件'
            }, {
              index: '4-1',
              subTitle: '活动报道'
            }, {
              index: '4-2',
              subTitle: '行业专题'
            }
          ]
        }, {
          index: '5',
          title: '关于我们',
          collapse: false,
          children: [
            {
              index: '5-0',
              title: '公司介绍'
            }, {
              index: '5-1',
              title: '核心团队'
            }, {
              index: '5-2',
              title: '荣誉资质'
            }, {
              index: '5-3',
              title: '加入我们'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleShow () {
      this.fullScreen = !this.fullScreen
    },
    openMenu (openedMenus) {
      this.openedMenus = openedMenus
    }
  }
}
</script>

<style lang="scss" scoped>
/*@import "~mStyles/variable.scss";*/
/*@import "~mStyles/mixins.scss";*/

.vMenuWrapper {
  position: relative;
  z-index: 2;
  .vMenu-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);

    &.fade-enter, &.fade-leave-active {
      opacity: 0;
    }

    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.3s ease-in-out;
    }
  }

  .menubar-vertical {
    position: fixed;
    left: 77px;
    top: 45px;
    right: 0;
    bottom: 0;
    z-index: 1;
    height: 100%;
    background: #FFFFFF;
    backdrop-filter: saturate(180%) blur(6px);
    transition: all 0.4s;
    display: flex;
    flex-direction: column;
    overflow: scroll;

    &.menubar-enter-active, &.menubar-leave-active {
      transition: all 0.4s ease-in-out;
    }

    &.menubar-enter, &.menubar-leave-to {
      transform: translate3d(150px, 0, 0);
      opacity: 0
    }
    .submenu-title {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #191C3D;
      padding: 0 12px 0 25px;
      cursor: pointer;
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .iconArrow {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        transition: all .3s;
        &.collapse {
          transform: rotate(180deg);
        }
        img {
          width: 24px;
        }
      }
    }
    .menuList {
      overflow: hidden;
    }
    .menu {
      background: #f4f6f7;
    }
  }
}
</style>
