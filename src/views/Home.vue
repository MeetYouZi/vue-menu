<template>
  <div class="home">
    <div @click="handleClick">展开</div>
    <MenuList ref="Menu"></MenuList>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuList from '../components/menu'

export default {
  name: 'Home',
  components: {
    MenuList
  },
  methods: {
    handleClick () {
      this.$refs.Menu.handleShow()
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
