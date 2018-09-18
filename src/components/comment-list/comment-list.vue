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
      <p @click="onSelected(item)" class="gray" v-for="(item, i) of selected" :key="i">
        {{item.label}}{{item.num ? '(' + item.num + ')' : ''}}
      </p>
    </header>
    <div class="main">
      <div v-for="v of data" class="flex-left" :key="v.id">
        <img class="avatar" :src="v.img || onlineUrl + 'mrtx/avatar.png'"/>
        <div class="right">
          <p class="cl-gray">{{v.nick_name}}</p>
          <p class="gray">{{v.create_time}}</p>
          <p class="cl-black">{{v.cnt}}</p>
      </div>
      </div>
    </div>
    <div v-if="hasMore" class="footer flex-content-center" @click="onMore">
      <p>查看更多评论</p>
      <i class="icon icon-bottom" />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      onlineUrl: process.env.onlineUrl
    }
  },
  props: {
    // 头部选择
    selected: {
      type: Boolean
    },
    // 评论内容
    data: {
      type: Array
    },
    // 是否有更多按钮
    hasMore: {
      type: Number
    }
  },
  methods: {
    /** 单击查看更多评论 */
    onMore() {
      this.$emit("onMore");
    },
    /** 单击好评
     * @param {Object} node 节点属性
     */
    onSelected(node) {
      this.$emit('onSelected', node)
    }
  }
};
</script>

<style lang='less' scoped>
.comment-list-comp {
  .cl-black  {
    line-height: 1.3;
    text-align:justify;
  }
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
  .footer {
    p {
      font-size: 22rpx;
      color: @cl-5;
      margin-top: 20rpx;
      margin-bottom: 10rpx;
    }
    .icon {
      height: 14rpx;
      width: 27rpx;
      margin-bottom: 27rpx;
    }
  }
}
</style>


