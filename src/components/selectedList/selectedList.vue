<template>
    <div class="selected-list-comp">
        <p>{{title}}</p>
        <div class="main">
            <span 
                class="flex-left" 
                v-for="item of data" 
                :key="item.name"
                @click="onClick(item)"
            >{{item.label}}</span>
        </div>
        
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    },
    title: {
      type: String
    }
  },
  mounted() {},
  methods: {
    /** 单击节点
     * @param {Object} node 节点属性
     */
    onClick(node) {
      this.$emit('onNodeClick', node)
    }
  }
};
</script>

<style scoped>
.selected-list-comp {
  height: 82rpx;
  padding: 20rpx 0;
  border-bottom: 1px solid rgba(229,232,240,1);
}
.main {
  display: flex;
}
p {
  font-size: 28rpx;
  font-weight: 500;
  color: rgba(46, 60, 80, 1);
  padding-left: 30rpx;
  margin-bottom: 5rpx;
}
span {
  height: 37rpx;
  padding: 0 30rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(103, 120, 151, 1);
  line-height: 37rpx;
  border-right: 1rpx solid rgba(103, 120, 151, 1);
}
span:last-child {
  border-right: 0;
}
</style>

