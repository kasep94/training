/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：视图列表
 * 影响模块：course、
 */
<template>
  <div class="view-list-comp">
    <div class="content" v-for="item of data" @click="onClick(item)" :key="item.id">
      <img class="image" :src="item.image"/>
      <div class="left-main">
        <p class="title">{{item.title}}</p>
        <div class="flex-left-center">
          <p class="score">综合评分</p>
          <img
            v-for="(star, i) of [0, 0, 0, 0, 0]"
            :key="i"
            :src="i < item.score ? '../../../static/images/evaluation/star.png': '../../../static/images/evaluation/unstar.png'"
          />
        </div>
        
        <div class="flex-both score">
          <p>地区</p>
          <p>{{item.distance}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
    }
  },
  methods: {
    /** 单击的节点属性 */
    onClick(node) {
      this.$emit('onViewList', node)
    }
  }
}
</script>

<style scoped>
.view-list-comp {
  padding: 0 30rpx;
}
.title {
  font-size: 26rpx;
}
.left-main {
  width: 555rpx;
}
.flex-left-center img {
  height: 26rpx;
  width: 26rpx;
  margin: 18rpx 7rpx 21rpx 0;
}
.score {
  font-size: 22rpx;
  color: #677897;
}
.score:nth-of-type(1) {
  margin-right: 25rpx;
}
.content {
  padding: 30rpx 0;
  border-bottom: 1px solid #E5E8F0;
  height: 133.6rpx;
  display: flex;
}
.image {
  height: 133.6rpx;
  width: 135rpx;
  border-radius: 4rpx;
  margin-right: 30rpx;
}
</style>


