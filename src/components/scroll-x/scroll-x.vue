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
      <view class="scroll-child" v-for="item of data" :key="item.id" @click='onNodeClick(item)'>
        <img mode='aspectFill' :class="['scroll-content', !item.has_gray ? '' : 'img-gray']" :src="item.img || onlineUrl + 'mrtx/back1.png'" />
        <p class="cl-black">{{item.name}}</p>
        <div class="flex" v-if="item.score">
          <Star :data='item.score' />
        </div>
      </view>
        <!-- <view v-for="(url, i) of details.imgs" :key="i" ><img :src="url" /></view> -->
    </scroll-view> 
  </div>
</template>

<script>
import Star from '../star/star'

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
  components: {Star},
  methods: {
    onNodeClick(node) {
      this.$emit('onNodeClick', node)
    }
  }
};
</script>

<style lang='less' scoped>
.scroll-div {
  white-space: nowrap;
  display: flex;
  .img-gray {
    -webkit-filter:grayscale(1);
  }
  .scroll-content {
    height: 138rpx;
    width: 199.2rpx;
    border-radius: 8rpx;
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
    width: 200rpx;
    .nowrap();
  }
}

</style>


