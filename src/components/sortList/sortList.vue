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
      <li @click="onNodeClick(item)">{{item.label}}<i :class="['icon icon-down', item.isShow ? 'up' : 'down']"/></li>
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
    }
  },
  methods: {
    /** 单击节点
     * @param {Object} node 节点属性
     */
    onNodeClick(node) {
      this.data.find(value => {
        const keep = value.isShow
        if (value.isShow) value.isShow = false
        return keep
      })
      node.isShow = !node.isShow;
      this.$emit('onSortClick', node)
    }
  }
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
.icon {
  width: 16rpx;
  height: 13rpx;
  margin: 0 37rpx 0 5rpx;
}
.up {
  transform: rotate(180deg);
  transition: 0.5s;
}
.down {
  transform: rotate(0deg);
  transition: 0.5s;
}
</style>


