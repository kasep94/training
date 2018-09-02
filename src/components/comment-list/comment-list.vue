/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月01日
 * 修改时间：2018年09月01日
 * 描述信息：用户评论
 * 影响模块：product-evaluation、
 */
<template>
  <div class="comment-list-comp">
    <header>
      <p class="gray" v-for="(item, i) of selected" :key="i">
        {{item.label}}{{item.num ? '(' + item.num + ')' : ''}}
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
  }
};
</script>

<style lang='less' scoped>
.comment-list-comp {
  header {
    padding-bottom: 20rpx;
    padding: 0 30rpx;
    .gray {
      background: #edf4fa;
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
    .flex-left {
      border-bottom: 1px solid #e5e8f0;
      padding: 30rpx;
    }
    .gray {
      margin: 7rpx 0 15rpx 0;
    }
    .right {
      width: 600rpx;
      margin-left: 20rpx;
    }
  }
}
</style>


