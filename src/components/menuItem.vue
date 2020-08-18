<template>

<!--  <ul class="menubar">-->
    <li class="submenu"
        @click.stop="handleSubmenuClick(menu)"
    >
      <div class="submenu-title">
        <p>{{ menu.title }}</p>
        <div class="iconArrow" :class="{'collapse': !collapse}">
          >
<!--          <img src="../../assets/images/iconDown@2x.png"/>-->
        </div>
      </div>
      <transition
        name="collapse"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @after-enter="afterEnter"
        @leave="leave"
      >
      <div class="menuList"
           :class="{'menu-collapse': collapse}"
           ref="menuList"
           v-show="isShow"
      >
        <transition name="menu-collapse" @enter="enter">

        <ul class="menu" ref="menu">
            <slot></slot>
        </ul>
        </transition>

        <!--        <ul class="menu"-->
<!--            ref="menu"-->
<!--        >-->
<!--          <li class="menu-item-group"-->
<!--              ref="menuGroupList"-->
<!--          >-->
<!--            <slot></slot>-->
<!--          </li>-->
<!--        </ul>-->
      </div>
      </transition>
    </li>
<!--  </ul>-->

</template>

<script>
// import { addClass, removeClass, hasClass } from '../utils/dom'

export default {
  name: 'menuItem',
  components: {
    // 'el-menu-collapse-transition': {
    //   functional: true,
    //   render (createElement, context) {
    //     const data = {
    //       props: {
    //         mode: 'out-in'
    //       },
    //       on: {
    //         beforeEnter (el) {
    //           el.style.opacity = 0.2
    //         },
    //
    //         enter (el) {
    //           console.log(el, '')
    //           addClass(el, 'el-opacity-transition')
    //           el.style.opacity = 1
    //         },
    //
    //         afterEnter (el) {
    //           removeClass(el, 'el-opacity-transition')
    //           el.style.opacity = ''
    //         },
    //
    //         beforeLeave (el) {
    //           if (!el.dataset) el.dataset = {}
    //
    //           if (hasClass(el, 'el-menu--collapse')) {
    //             removeClass(el, 'el-menu--collapse')
    //             el.dataset.oldOverflow = el.style.overflow
    //             el.dataset.scrollWidth = el.clientWidth
    //             addClass(el, 'el-menu--collapse')
    //           } else {
    //             addClass(el, 'el-menu--collapse')
    //             el.dataset.oldOverflow = el.style.overflow
    //             el.dataset.scrollWidth = el.clientWidth
    //             removeClass(el, 'el-menu--collapse')
    //           }
    //
    //           el.style.width = el.scrollWidth + 'px'
    //           el.style.overflow = 'hidden'
    //         },
    //
    //         leave (el) {
    //           addClass(el, 'horizontal-collapse-transition')
    //           el.style.width = el.dataset.scrollWidth + 'px'
    //         }
    //       }
    //     }
    //     return createElement('transition', data, context.children)
    //   }
    // }
  },
  props: {
    menu: {
      type: Object
    }
  },
  data () {
    return {
      isShow: false,
      collapse: true,
      openedMenus: [],
      clientHeight: ''
    }
  },
  methods: {
    beforeEnter (el) {
      console.log('beforeEnter')
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom

      el.style.height = '0'
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
    enter (el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
      console.log('enter')
    },
    afterEnter (el) {
      el.style.height = ''
      console.log('afterEnter')
    },
    beforeLeave (el) {
      if (!el.dataset) el.dataset = {}
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
      console.log('beforeLeave')
    },
    leave (el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },
    handleSubmenuClick (submenu) {
      const { index } = submenu
      const isOpened = this.openedMenus.indexOf(index) !== -1
      this.clientHeight = this.$refs.menu.clientHeight
      this.collapse = !this.collapse
      this.isShow = !this.isShow
      if (isOpened) {
        this.closeMenu(index)
        // this.$refs.menuList.style.display = 'none'
      } else {
        this.openMenu(index)
        // this.$refs.menuList.style.display = 'block'
      }
    },
    openMenu (index) {
      const openedMenus = this.openedMenus
      if (openedMenus.indexOf(index) !== -1) return
      this.openedMenus.push(index)
    },
    closeMenu (index) {
      const i = this.openedMenus.indexOf(index)
      if (i !== -1) {
        this.openedMenus.splice(i, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*@import "~mStyles/variable.scss";*/
/*@import "~mStyles/mixins.scss";*/
.collapse-enter, .collapse-leave-active {
  height: 0;
}

.collapse-enter-active, .collapse-leave-active {
  transition: height 0.3s ease-in-out;
}

.submenu-title {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #191C3D;
  padding: 0 12px 0 25px;
  cursor: pointer;
  position: relative;
  //transition: border-color .3s,background-color .3s,color .3s;
  //transition-property: border-color, background-color, color;
  //transition-duration: 0.3s, 0.3s, 0.3s;
  //transition-timing-function: ease, ease, ease;
  //transition-delay: 0s, 0s, 0s;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // @include border-bottom-1px(#eeeeee);

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

.collapse-transition {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}

</style>
