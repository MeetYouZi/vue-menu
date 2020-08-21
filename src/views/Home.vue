<template>
  <div class="home">
    <div @click="handleClick">展开</div>
    <Menu ref="menu"></Menu>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '../components/menu'

export default {
  name: 'Home',
  components: {
    Menu
  },
  methods: {
    handleClick () {
      this.$refs.menu.handleShow()
    }
  }
}
</script>

<style lang="scss" scoped>

.home {
  font-size: $font-size-medium;
  @include font-weight500
}
</style>
