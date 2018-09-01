/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月01日
 * 修改时间：2018年09月01日
 * 描述信息：左右滑动
 * 影响模块：product-evaluation、
 */
<template>
  <div>
    <scroll-view scroll-x class="div-2-main scroll-div">
      <view class="scroll-child" v-for="item of data" :key="item.id">
        <img class="content" :src="item.img" />
        <p class="cl-black">{{item.name}}</p>
        <div class="flex">
          <img
            v-for="(star, i) of [0, 0, 0, 0, 0]"
            class="star"
            :key="i"
            :src="i < item.score ? '../../../static/images/evaluation/star.png': '../../../static/images/evaluation/unstar.png'"
          />
        </div>
      </view>
        <!-- <view v-for="(url, i) of details.imgs" :key="i" ><img :src="url" /></view> -->
    </scroll-view> 
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  }
};
</script>

<style lang='less' scoped>
.scroll-div {
  white-space: nowrap;
  display: flex;
  .content {
    height: 138rpx;
    width: 199.2rpx;
    border-radius: 8rpx;
  }
  .star {
    height: 26rpx;
    width: 26rpx;
    margin-right: 7rpx;
  }
  .scroll-child {
    margin-left: 20rpx;
  }
  .scroll-child:nth-of-type(1) {
    margin-left: 20px;
  }
  .scroll-child:last-child {
    margin-right: 20rpx;
  }
  .cl-black {
    margin: 10rpx 0;
  }
}

</style>


