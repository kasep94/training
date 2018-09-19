<template>
  <div class='header flex-center'>
      <img class="search" src="../../../static/images/evaluation/search.png" />
      <input placeholder="搜索内容" type="text" v-model="inputVal"/>
      <span @click="searchinput">搜索</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal: null
    }
  },
  methods: {
    searchinput() {
      this.$emit('onSearch', this.inputVal)
    }
  }
}
</script>



<style scoped lang='less'>
.header {
  position: relative;
  height: 115rpx;
  width: 750rpx;
  border-bottom: 1px solid rgba(229, 232, 240, 1);
}
.header {
  input {
    width: 510rpx;
    height: 60rpx;
    background: rgba(245, 247, 249, 1);
    border-radius: 100rpx;
    padding-left: 80rpx;
    font-size: 26rpx;
  }
  span {
    font-size: 26rpx;
    margin-left: 20rpx;
  }
}
.search {
  height: 26rpx;
  width: 26rpx;
  left: 70rpx;
  position: absolute;
  z-index: 2;
  top: 46rpx;
}
</style>