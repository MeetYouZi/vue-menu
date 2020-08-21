<template>
  <div class="collapse-item" :class="{'is-active': isActive}">
    <div class="tab" @click="handleHeaderClick">
      <p>{{data.date}}</p>
    </div>
    <w-collapse-transition>
      <ul class="dataList" v-show="isActive">
        <li class="dataItem" v-for="(item,index) in data.list" :key="index">
          <div class="circle"></div>
          <div class="content">
            <h2 class="date">{{item.date}}</h2>
            <p class="desc">{{item.desc}}</p>
          </div>
        </li>
      </ul>
    </w-collapse-transition>
  </div>
</template>

<script>
import wCollapseTransition from "mAssets/transitions/collapse-transition"

export default {
  name: "collapse",
  components: {
    wCollapseTransition
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isActive: false,
    }
  },
  computed: {
    // isActive() {
    //   return this.collapse.activeNames.indexOf(this.name) > -1;
    // }
  },
  methods: {
    handleHeaderClick () {
      this.isActive = !this.isActive;
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-item {
  margin-bottom: 10px;
}
.tab {
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.09);
}

.dataList {
  overflow: hidden;
  background: #f5f8fb;
  box-shadow: 0px 3px 7px 0px rgba(0,0,0,0.09);
  .dataItem {
    display: flex;
    align-items: flex-start;
    padding: 10px;
  }
  .circle {
    flex: 0 0 5px;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background: #F27D48;
    margin-top: 6px;
  }
  .content {
    padding-left: 7px;
    .date {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #f27d48;
      line-height: 17px;
      margin-bottom: 5px;
    }
    .desc {
      font-size: 11px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #899fab;
      line-height: 15px;
    }
  }
}

</style>
