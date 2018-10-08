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
      <img class="image" :mode="item.head_pic_more ? 'center' : 'scaleToFill'" :src="item.head_pic_more || onlineUrl + 'mrtx/back1.png'"/>
      <div class="left-main">
        <p class="title">{{item.org_name}}</p>
        <div class="flex-left-center">
          <p class="score">综合评分</p>
          <Star :data='item.org_score/10'/>
        </div>
        
        <div class="flex-both score">
          <p>{{item.detail.addr}}</p>
          <p>{{item.detail.lola}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../star/star";

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
  components: { Star },
  methods: {
    /** 单击的节点属性 */
    onClick(node) {
      this.$emit("onViewList", node);
    }
  }
};
</script>

<style scoped lang='less'>
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
  margin: 18rpx 7rpx 21rpx 0 !important;
}
.score {
  font-size: 22rpx;
  color: #677897;
  p:nth-of-type(2) {
    width: 100rpx;
    text-align: right;
  }
}
.score:nth-of-type(1) {
  margin-right: 25rpx;
}
.content {
  padding: 30rpx 0;
  border-bottom: 1px solid #e5e8f0;
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


