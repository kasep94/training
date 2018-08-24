/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：课题列表组件
 * 影响模块：course、
 */
<template>
<div class="data-list-comp">
  <div class="content" v-for="(item, index) of data" :key='index'>
    <div v-for="(value, i) of item" 
      :class="['box', {active: index >= 1 && i >=1 && value}]"  :key="i">
      <span >{{value}}</span>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  props: [
    "data" // Object
  ],
  created() {
    console.log(this.data);
  }
};
</script>

<style scoped>
.data-list-comp .content {
  width: 750px;
  display: flex;
  font-size: 20rpx;
  height: 152rpx;
}
.data-list-comp .content:nth-of-type(1) {
  background: rgba(245, 247, 249, 1);
  box-shadow: 0px 4px 10px 0px rgba(142, 167, 199, 0.05);
  font-size: 22rpx;
  height: 88rpx;
}
.data-list-comp .content:nth-of-type(1) .box,
.data-list-comp .box:nth-of-type(1) {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  border: 1rpx solid rgba(232, 235, 242, 1);
  width: 134rpx;
  margin-top: -1rpx;
  margin-right: -1rpx;
}
.box:nth-of-type(1) {
  width: 80rpx;
}
.box span {
  word-break: break-all;
  width: 50rpx;
  overflow: auto;
}
.active {
  border: 1rpx solid red;
  border-top-width: 4px;
  z-index: 1;
}
</style>
