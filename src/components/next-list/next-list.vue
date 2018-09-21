/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月11日
 * 修改时间：2018年09月11日
 * 描述信息：下一页列表
 * 影响模块：mine
 */
<template>
  <div class="list-comp">
    <div @click="onNext(item)" class="flex-both" v-for="item of data" :key="item.name">
      <div class="flex-left-center">
        <img :class="item.name" :src="onlineUrl + item.name + '.png'" />
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
  },
  methods: {
    /** 单击列表
     * @param {Object} node 导航栏
     */
    onNext(node) {
      this.$emit('onNodeClick', node)
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
  .my_badge {
    height: 45rpx;
    width: 38rpx;
  }
  .my_collection, .my_participated {
    height: 34rpx;
    width: 38rpx;
  }
}
</style>


