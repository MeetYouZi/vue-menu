<template>
  <div class="home">
    <div @click="handleClick">展开</div>
    <MenuList ref="Menu"></MenuList>
    <div>collapse</div>
    <collapse :data="list"></collapse>
  </div>
</template>

<script>
// @ is an alias to /src
import MenuList from '../components/menu'
import collapse from '../components/collapse/collapse'

export default {
  name: 'Home',
  components: {
    MenuList,
    collapse
  },
  data () {
    return {
      list: [
        {

        }
      ]
    }
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
