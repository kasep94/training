/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：首页
 */
<template>
    <div class="home_page">
      <div class="header">
        <swiper interval='3000' autoplay=false indicatorDots=false duration=1000>
          <block v-for="item in imgUrls" :key='item'>
            <swiper-item>
              <img :src="item" class="slide-image" width="355" height="150"/>
            </swiper-item>
          </block>
        </swiper>
        <div class="flex">
          <div v-for="item in imgIcon" class="flex-content-center content" :key="item.id">
            <img :src="'../../../static/images/all/' + item.name + '.png'" />
            <p>{{item.label}}</p>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="flex-both">
          <div class="flex-left-center">
            <img src="../../../static/images/all/schedule.png" />
            <span class="title">日程安排</span>
            <span class="cl-b-gray">2018年8月15日 |  周三</span>
          </div>
          <span class="cl-b-gray">查看课程表<i class="icon icon-more" /></span>
        </div>
        <div class="content flex" v-for="item of content1" :key='item.id'>
          <span class="left">{{item.time}}</span>
          <div class="right">
            <p class="title-1">{{item.name}}</p>
            <p class="gray">{{item.addr}}</p>
          </div>
        </div>
        <div class="footer flex-center">
          <i class="icon icon-down-more"/>
        </div>
      </div>

      <div class="box">
        <div class="flex-both">
          <div class="flex-left-center">
            <i class="icon icon-calendar" />
            <span class="title">习惯养成</span>
            <span class="cl-b-gray">2018年8月15日 |  周三</span>
          </div>
          <span class="gray"><i class="icon icon-more" /></span>
        </div>
        <div class="content flex" v-for="item of content2" :key='item.id'>
          <span class="left">{{item.time}}</span>
          <div class="right flex-both">
            <div>
              <p class="title-1">{{item.name}}</p>
              <p class="gray">{{item.addr}}</p>
            </div>
            <p class="punch">打卡</p>
          </div>
        </div>
        <div class="footer flex-center">
          <i class="icon icon-down-more"/>
        </div>
      </div>

      <div class="box">
        <div class="flex-both">
          <div class="flex-left-center">
            <i class="icon icon-ranking" />
            <span class="title">课程排行榜</span>
          </div>
          <span class="cl-b-gray">排行分类筛选<i class="icon icon-more" /></span>
        </div>

        <div class="bottom-footer">
          <ScrollX :data='scrollData' />
          <ScrollX :data='scrollData' />
        </div>
      </div>
    </div>
</template>

<script>
import data from "./data.js";
import ScrollX from "../../components/scroll-x/scroll-x";

export default {
  components: {ScrollX},
  data() {
    return {
      ...data,

      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    };
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped lang='less'>
.header {
  border-bottom: 20rpx solid @cl-8;
  .content {
    margin: 28rpx 0 26rpx 65rpx;
    img {
      height: 90rpx;
      width: 90rpx;
    }
    p {
      font-size: 26rpx;
    }
  }
}
.box {
  >.flex-both {
    padding: 40rpx 31rpx;
    border-bottom: 1rpx solid @cl-6;
  }
  .content:nth-of-type(2) {
    padding-top: 0;
    margin-top: 20rpx;
  }
  .content {
    padding-top: 20rpx;
    border-bottom: 1rpx solid @cl-6;
    padding-bottom: 26rpx;
    width: 690rpx;
    margin-left: 30rpx;
    border-left: 3rpx solid black;
    .left {
      width: 163rpx;
      height: 36rpx;
      line-height: 36rpx;
      text-align: center;
      border-radius: 0 20rpx 20rpx 0;
      background-color: @cl-9;
      color: white;
      font-size: 22rpx;
      margin-right: 30rpx;
    }
    .right {
      .title-1 {
        font-size: 26rpx;
        color: @cl-1;
        margin-bottom: 12rpx;
      }
      .punch {
        background: @cl-4;
        color: white;
        border-radius: 25rpx;
        height: 50rpx;
        width: 122rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 24rpx;
      }
    }
  }
  .footer {
    height: 68rpx;
    border-bottom: 20rpx solid @cl-8;
  }
  .bottom-footer {
    padding: 30rpx 0;
  }

  .title {
    margin: 0 20rpx 0 15rpx;
    font-size: 28rpx;
    color: @cl-1;
  }
  img {
    height: 48rpx;
    width: 40rpx;
  }
  .icon-calendar, .icon-ranking {
    height: 40rpx;
    width: 40rpx;
  }
}
swiper {
  text-align: center;
}
swiper {
  text-align: center;
  width: 750rpx;
  height: 318.6rpx;
}
.slide-image {
  width: 750rpx;
  height: 318.6rpx;
}
</style>