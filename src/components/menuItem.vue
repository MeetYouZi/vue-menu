<template>
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
           v-show="collapse"
      >
        <ul class="menu" ref="menu">
            <slot></slot>
        </ul>
      </div>
    </transition>
  </li>
</template>

<script>

export default {
  name: 'menuItem',
  components: {},
  props: {
    menu: {
      type: Object
    }
  },
  data () {
    return {
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
      if (isOpened) {
        this.closeMenu(index)
      } else {
        this.openMenu(index)
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
