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
    <collapse-transition>
      <div class="menuList"
           :class="{'menu-collapse': collapse}"
           ref="menuList"
           v-show="collapse"
      >
        <ul class="menu" ref="menu">
            <slot></slot>
        </ul>
      </div>
    </collapse-transition>
  </li>
</template>

<script>
import CollapseTransition from "../assets/transitions/collapse-transition"

export default {
  name: 'menuItem',
  components: {
    CollapseTransition
  },
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
