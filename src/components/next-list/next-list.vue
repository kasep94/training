/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月11日
 * 修改时间：2018年09月11日
 * 描述信息：下一页列表
 * 影响模块：mine
 */
<template>
  <div class="list-comp">
    <div class="flex-both" v-for="item of data" :key="item.name">
      <div class="flex-left-center">
        <img :src="onlineUrl + item.name + '.png'" />
        <span>{{item.label}}</span>
      </div>
      <i class="icon icon-more" />
    </div>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      onlineUrl: process.env.onlineUrl
    }
  },
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


