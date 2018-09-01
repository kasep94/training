/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：排序
 * 影响模块：course、
 */
<template>
  <div class="sort-list-comp">
    <ul v-for="(item, i) of data" :key="i">
      <li>{{item.label}}<img src="../../../static/images/evaluation/down.png"/></li>
      <li v-if="item.data" v-for="(child, index) of item.data" :key="index">
        {{child.label}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    // 父节点
    data: {
      type: Object
    },
  },
};
</script>
<style scoped>
.sort-list-comp {
  display: flex;
  height: 60rpx;
  padding-left: 20rpx;
  padding-top: 30rpx;
  border-bottom: 1px solid rgba(229, 232, 240, 1);
}
li {
  font-size: 26rpx;
  font-weight: 400;
  color: rgba(103, 120, 151, 1);
}
img {
  width: 16rpx;
  height: 13rpx;
  margin: 0 57rpx 0 5rpx;
}
</style>


