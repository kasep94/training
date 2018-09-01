/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月01日
 * 修改时间：2018年09月01日
 * 描述信息：选择
 * 影响模块：product-evaluation、
 */
<template>
  <div class="comment-list-comp">
    <header>
      <p class="gray" v-for="(item, i) of selected" :key="i">
        {{item.label}}
      </p>
    </header>
    <div class="main">
      <div v-for="v of data" class="flex-left" :key="v.id">
        <img class="avatar" :src="v.img"/>
        <div class="right">
          <p class="cl-gray">{{v.user}}</p>
          <p class="gray">{{v.time}}</p>
          <p class="cl-black">{{v.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 头部选择
    selected: {
      type: Boolean
    },
    // 评论内容
    data: {
      type: Object
    }
  },
}
</script>

<style lang='less' scoped>
.comment-list-comp {
  padding: 0 30rpx;
  header {
    padding-bottom: 50rpx;
    .gray {
      background: #EDF4FA;
      border-radius: 25rpx;
      padding: 8rpx 39rpx;
      display: inline-block;
      margin-right: 20rpx;
      margin-top: 20rpx;
    }
  }
  .main {
    .avatar {
      height: 70rpx;
      width: 70rpx;
      border-radius: 100%;
    }
    .right {
      width: 600rpx;
      margin-left: 20rpx;
    }
  }
}
</style>


