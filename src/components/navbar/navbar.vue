/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月18日
 * 修改时间：2018年09月18日
 * 描述信息：tab切换
 * 影响模块：首页
 */
<template>
  <div class="flex navbar-comp">
    <div :style="{width: width + 'rpx'}" 
      v-for="(item, i) of data"
      @click="onSelect(item, i)"
      :class="[i == index ? 'active' : '', 'flex-top-center']"
      :key='item.id'>
      {{item.label}}
      <span v-if="i == index" :style="{marginLeft: botLeft + 'rpx'}" class="bot" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Array
    },
    // 几个标题
    size: {
      type: String,
      default: "2"
    },
    // 选中第几个数组
    index: {
      type: String,
      default: 0
    }
  },
  data() {
    return {
      // 宽度
      width: 750,
      // 选中到线离左边距离
      botLeft: 0
    };
  },
  created() {
    const width = 750;
    const size = Number(this.size);
    this.width = width / size;
    this.botLeft = this.width / 2 - 65 / 2;
  },
  methods: {
    /** 单击节点
     * @param {Object} node 节点属性
     * @param {Number} index 索引
     */
    onSelect(node, index) {
      this.index = index;
      this.$emit("onNodeClick", node, index);
    }
  }
};
</script>

<style scoped lang='less'>
.navbar-comp {
  border-bottom: 1px solid @cl-6;
  div {
    text-align: center;
    font-size: 30rpx;
    height: 87rpx;
    line-height: 87rpx;
    position: relative;
  }
  span.bot {
    height: 6rpx;
    width: 65rpx;
    background-color: @cl-16;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>