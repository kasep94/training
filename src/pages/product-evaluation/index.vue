/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月01日
 * 修改时间：2018年09月01日
 * 描述信息：单个产品测评
 */
<template>
    <div class="product-evaluation-page">
        <swiper interval='3000' autoplay=false indicatorDots=false duration=1000>
            <block v-for="item in imgUrls" :key='item'>
              <swiper-item>
                  <img :src="item" class="slide-image" width="355" height="150"/>
              </swiper-item>
            </block>
        </swiper>
        <div class="header bt-border">
            <div class="top">
                <p>{{details.name}}</p>
                <div class="flex-left-center">
                    <img
                    v-for="(star, i) of [0, 0, 0, 0, 0]"
                    :key="i"
                    :src="i < details.score ? '../../../static/images/evaluation/star.png': '../../../static/images/evaluation/unstar.png'"
                    />
                    <p class="price">{{details.price}}/课时</p>
                </div>
                <div class="flex-both">
                    <p class="gray">{{details.mechanism}} | {{details.time}}完成装修</p>
                    <p class="gray">{{details.area}} | 距您{{details.distance}}</p>
                </div>
            </div>
            <div class="center">
                <p class="cl-black">敲课评价</p>
                <p class="cl-gray">效果: {{details.effect}} | 师资: {{details.teacher}} | 环境: {{details.environment}}</p>
            </div>
            <div class="flex-both footer">
                <p class="cl-black flex-left-center"><img src="../../../static/images/product-evaluation/address.png" /> <span>{{details.address}}</span></p>
                <img src="../../../static/images/product-evaluation/phone.png" />
            </div>
        </div>
        <div class="introduction bt-border">
            <div class="title flex-end">
                <p class="cl-b-black">机构介绍</p>
                <p class="cl-gray">{{details.details}}</p>
            </div>
            <p class="cl-gray">{{details.content}}</p>
        </div>
        <div class="div-2 bt-border">
            <p class="cl-b-black">机构环境</p>
            <scroll-view scroll-x class="div-2-main scroll-div">
                <view class="scroll-child" v-for="(url, i) of details.imgs" :key="i" ><img :src="url" /></view>
            </scroll-view> 
        </div>
        <div class="div-3 bt-border">
            <p class="cl-b-black">老师介绍</p>
            <div class="main">
                <div v-for="v of details.introduction" :key="v.id">
                    <img :src="v.img" />
                    <p class="cl-black">{{v.name}}</p>
                    <p class="cl-gray">{{v.position}}</p>
                </div>
            </div>
        </div>
        <div class="div-4">
            <p class="cl-b-black">用户评论</p>
            <CommentList 
              :selected='commentListData.selected' 
              :data='commentListData.data'
            />
        </div>
        <div class="div-5 top-border">
            <p class="cl-b-black">机构环境</p>
            <ScrollX :data='scrollXData'/>
        </div>
    </div>
</template>

<script>
import data from "./data.js";
import CommentList from "../../components/comment-list/comment-list";
import commentListData from "../../components/comment-list/data.js";
import ScrollX from "../../components/scroll-x/scroll-x";
import scrollXData from "../../components/scroll-x/data.js";

export default {
  components: { CommentList, ScrollX },
  computed: {},
  data() {
    return {
      imgUrls: [
        "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
      ],
      // 详情数据
      ...data,
      // CommentList数据
      commentListData,
      // scroll-x数据
      scrollXData
    };
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.product-evaluation-page {
  padding-bottom: 80rpx;
  swiper,
  .slide-image {
    text-align: center;
    width: 750rpx;
    height: 318.6rpx;
  }
  .header {
    padding: 0 30rpx;
    .top {
      border-bottom: 1px solid #e5e8f0;
      padding: 30rpx 0;
      .flex-left-center {
        margin: 11rpx 0 17rpx 0;
      }
      img {
        height: 26rpx;
        width: 26rpx;
        margin-right: 7rpx;
      }
    }
    .center {
      padding: 20rpx 0;
      border-bottom: 1px solid #e5e8f0;
      .cl-black {
        margin-bottom: 12rpx;
      }
    }
    .footer {
      padding: 20rpx 0;
      img {
        height: 23rpx;
        width: 23rpx;
      }
      img:nth-of-type(1) {
        margin-right: 16rpx;
      }
    }
  }

  .price {
    margin-left: 13rpx;
    font-size: 24rpx;
    color: #2e3c50;
  }
  .introduction {
    padding: 30rpx;
    .title {
      margin-bottom: 20rpx;
      .cl-b-black {
        margin-right: 5rpx;
      }
      .cl-gray {
        color: #a4acb8;
        line-height: 1.5;
      }
    }
  }
  .div-2 {
    padding: 30rpx 0;
    .cl-b-black {
      margin-left: 30rpx;
    }
    .div-2-main {
      margin-top: 26rpx;
      view {
        margin-left: 21rpx;
      }
      view:nth-of-type(1) {
        margin-left: 30rpx;
      }
      view:last-child {
        margin-right: 30rpx;
      }
    }
    img {
      width: 199.2rpx;
      height: 138rpx;
      margin-left: 20rpx;
    }
    img:nth-of-type(1) {
      margin-left: 0;
      border-radius: 8rpx;
    }
  }
  .div-3 {
    padding: 30rpx;
    padding-bottom: 48rpx;
    .main {
      display: flex;
      width: 120rpx;
      div {
        margin-left: 48rpx;
      }
      div:nth-of-type(1) {
        margin: 0;
      }
      img {
        height: 120rpx;
        width: 120rpx;
        border-radius: 100%;
        margin-top: 20rpx;
      }
      p {
        text-align: center;
      }
    }
  }
  .div-4 {
    .cl-b-black {
      padding: 30rpx 0 20rpx 30rpx;
    }
  }
  .div-5 {
    .cl-b-black {
      padding: 30rpx 0 16rpx 0;
      margin-left: 20px;
    }
  }
}
</style>