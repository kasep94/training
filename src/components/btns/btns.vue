/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月03日
 * 修改时间：2018年09月03日
 * 描述信息：选中按钮
 * 影响模块：course
 */
<template>
  <div class="btns-comp">
    <p v-for="item of data.data"
      @click="onNodeClick(item)" 
      :key="item.id" 
      :class="['btn-1', !data.isMore && data.selected === item.name ? 'active' : '', data.isMore && item.selected ? 'active' : '' ]"
    >
      {{item.label}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  created() {
  },
  methods: {
    /** 单击节点
     * @param {Object} node 节点属性
     */
    onNodeClick(node) {
      this.$emit('onBtnsClick', node)
    }
  }
}
</script>

<style lang='less' scoped>

</style>


