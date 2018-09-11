<template>
  <div class="list-comp">
    <div class="flex-both" v-for="item of data" :key="item.name">
      <div class="flex-left-center">
        <img :src="'../../../static/images/all/' + item.name + '.png'" />
        <span>{{item.label}}</span>
      </div>
      <i class="icon icon-more" />
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  }
};
</script>

<style lang='less' scoped>
.list-comp {
  span {
    font-size: 28rpx;
    color: @cl-1;
  }
  .flex-both {
    border-bottom: 1rpx solid @cl-6;
    padding: 36rpx 30rpx;
  }
  img {
    height: 40rpx;
    width: 40rpx;
    margin-right: 30rpx;
  }
}
</style>


