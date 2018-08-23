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
    <div v-for="(value, i) of item" :key="i">
      <span>{{value}}</span>
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

<style>
.data-list-comp .content {
  width: 750px;
  display: flex;
}
</style>
