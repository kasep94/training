/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月13日
 * 修改时间：2018年09月13日
 * 描述信息：机构产品页面
 */
<template>
    <div class="institutional-products-page">
        <header class="bt-border flex-center">
            <div class="main flex">
                <img v-if="onlineUrl" :src="institutionalInfo.head_pic_more || onlineUrl + 'mrtx/back.png'" />
                <div class="flex-both">
                    <div>
                        <p class="title">{{institutionalInfo.org_name}}</p>
                        <Star :data='institutionalInfo.org_score/10'/>
                        <p class="gray flex"><span>{{institutionalInfo.detail.addr}}</span> | <span>{{institutionalInfo.detail.lola}}</span></p>
                    </div>
                    <p class="collection flex-left-center"><img src="../../../static/images/all/e_collection.png"/><span>收藏</span></p>
                </div>
            </div>
            
        </header>
        <div v-if="hasIntroduction" class="content bt-border">
            <p class="col">课程介绍</p>
            <div v-for="item of listData" @click="onListClick(item)" :key="item.id" class="flex-center main">
                <div class="flex-left-center">
                    <img class="back" v-if="onlineUrl" :src="item.detail.head_pic_more || onlineUrl + 'mrtx/back1.png'"/>
                    <div class="right">
                        <p class="type-name">{{item.detail.product_name}}</p>
                        <p class="gray">{{item.detail.learning_objective}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p class="col">你可能感兴趣的机构</p>
            <ScrollX :data='scrollXData'/>
        </div>
    </div>
</template>

<script>
import service from "../evaluation/service.js";
import Star from "../../components/star/star";
import ScrollX from "../../components/scroll-x/scroll-x";
import scrollXData from "../../components/scroll-x/data.js";

export default {
  components: { Star, ScrollX },
  data() {
    return {
      // 唯一标识
      dp_code: null,
      // 机构信息
      institutionalInfo: null,
      // 列表数据
      listData: null,
      // 底部移动的数据
      scrollXData,
      // 是否有课程介绍
      hasIntroduction: false,
      onlineUrl: process.env.onlineUrl
    };
  },
  onLoad(option) {
    const { dp_code } = option;
    this.dp_code = dp_code;
    this.institutionalInfo = service.getData();
    // 获取课程数据
    global.PUBLIC.util.httpGet(`/merchant/${dp_code}/course`, {}).then(res => {
      this.listData = res.data;
      this.hasIntroduction =
        Object.prototype.toString.call(res.data) === "[object Array]";
    });
    // 获取课程数据
    /* global.PUBLIC.util.httpGet("/course", { dp_code }).then(res => {
      this.listData = res.data.items;
    }); */
  },
  computed: {},
  methods: {
    /** 单击列表
     * @param {Object} node
     */
    onListClick(node) {
      global.PUBLIC.util.jumpNavigateTo(
        `product-evaluation/main?dp_code=${this.dp_code}&course_id=${node.id}`
      );
    }
  }
};
</script>

<style scoped lang='less'>
.institutional-products-page {
  header {
    height: 270rpx;
    .main {
      width: 690rpx;
      position: relative;
      height: 181rpx;
      > img {
        width: 259rpx;
        height: 181rpx;
        margin-right: 30rpx;
      }
      .title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 12rpx;
      }
      .gray {
        margin-top: 30rpx;
        span:nth-of-type(1) {
          display: block;
          max-width: 300rpx;
          margin-right: 5rpx;
          .nowrap();
        }
        span:nth-of-type(2) {
          margin-left: 5rpx;
        }
      }
    }
    .collection {
      font-size: 26rpx;
      position: absolute;
      color: @cl-1;
      right: 0;
      img {
        height: 58rpx;
        width: 58rpx;
        margin-right: 10rpx;
      }
    }
  }
  .col {
    font-weight: 500;
    font-size: 28rpx;
    color: @cl-1;
    margin: 30rpx 0 0 30rpx;
  }
  .content {
    .main {
      > div {
        height: 194rpx;
        width: 690rpx;
        border-bottom: 1px solid @cl-6;
      }
      .right {
        width: 500rpx;
        height: 134rpx;
      }
      img {
        min-width: 135rpx;
        min-height: 134rpx;
        max-width: 135rpx;
        max-height: 134rpx;
        margin-right: 30rpx;
      }
      .gray {
        margin-top: 17rpx;
      }
      .type-name {
        font-size: 26rpx;
      }
    }
  }
  .footer {
    padding-bottom: 80rpx;
    .col {
      margin-bottom: 30rpx;
    }
  }
}
</style>