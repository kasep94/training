/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月03日
 * 修改时间：2018年09月03日
 * 描述信息：课题表组件
 * 影响模块：course、
 */

<template>
  <div class="edit-card-comp">
    <div class="flex-both" v-for="(item, i) of data" :key="item.id">
      <p class="flex-left-center">
        <img :class="'icon icon-' + i" :src="item.icon" />
        <span class="col-big-black">{{item.info}}</span>
      </p>
      <p @click="onEdit(item)" class="edit">编辑</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 渲染数据
    data: {
      type: Array
    }
  },
  methods: {
    /** 点击编辑
     * @param {Object} node 节点属性
     */
    onEdit(node) {
      this.$emit('onEdit', node)
    }
  }
};
</script>

<style scoped lang='less'>
.edit-card-comp {
  .flex-both {
    background: #f5f7f9;
    border-radius: 6rpx;
    height: 130rpx;
    width: 632rpx;
    margin-top: 30rpx;
    border-left: 8rpx solid #fd6d69;
    .icon {
      margin-left: 36rpx;
      margin-right: 25rpx;
      height: 80rpx;
      width: 80rpx;
    }
  }
  .edit {
    font-size: 24rpx;
    color: white;
    border-radius: 25rpx;
    background: @cl-4;
    height: 50rpx;
    width: 122rpx;
    line-height: 50rpx;
    text-align: center;
    margin-right: 30rpx;
  }
}
</style>


