/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：我的页面
 */
<template>
    <div class="home_page">
        <div class="header">
            <div class="flex-left-center top">
                <img :src="userInfo.img"/>
                <div class="header-content">
                    <p class="user-name">{{userInfo.name}}</p>
                    <div class="flex">
                        <span>身份: {{userInfo.identity}}</span>
                        <span>(孩子) {{userInfo.grade}}</span>
                    </div>
                </div>
            </div>
            <div class="flex-left-center bottom">
                <div class="flex-center"><img class="img1" src="../../../static/images/all/grade.png" />等级: Lv{{userInfo.level}}</div>
                <div class="flex-center"><img src="../../../static/images/all/integral.png" />积分: {{userInfo.integral}}</div>
            </div>
        </div>
        <div class="content">
          <div class="flex-left-center progress">
            <i class="icon icon-calendar" />
            <span>习惯养成打卡进展</span>
          </div>
          <div class="habit">
            <NextList :data="mine1" />
            <div class="more flex-center">
              <i class="icon icon-down-more" />
            </div>
          </div>
          <div class="footer-bottom">
            <NextList :data="mine2" />
          </div>
        </div>
    </div>
</template>

<script>
import data from "./data.js";
import NextList from "../../components/next-list/next-list";
import listData from "../../components/next-list/data.js";

export default {
  components: { NextList },
  data() {
    return {
      ...data,
      // 列表数据
      ...listData
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang='less'>
.header {
  .top {
    padding-left: 30rpx;
    border-bottom: 1rpx solid @cl-6;
    height: 252rpx;
  }
  .bottom {
    height: 53rpx;
    padding: 21rpx 0;
    border-bottom: 20rpx solid @cl-8;
    div:nth-of-type(1) {
      border-right: 1rpx solid @cl-6;
    }
    div {
      width: 375rpx;
      height: 50rpx;
    }
    .img1 {
      height: 35rpx !important;
    }
    img {
      height: 40rpx;
      width: 40rpx;
      margin-right: 15rpx;
    }
  }
  .header-content {
    margin-left: 25rpx;
  }
  .user-name {
    font-size: 34rpx;
    margin: 14rpx 0;
  }
  .flex {
    span {
      font-size: 28rpx;
      color: @cl-5;
    }
  }
  img {
    height: 122rpx;
    width: 122rpx;
    border-radius: 100%;
  }
}
.progress {
  border-bottom: 1rpx solid @cl-6;
  padding: 40rpx 0;
  i.icon-calendar {
    margin-right: 28rpx;
    margin-left: 30rpx;
    height: 40rpx;
    width: 40rpx;
  }
  span {
    font-size: 28rpx;
  }
}
.habit {
  border-bottom: 20rpx solid @cl-8;
  .more {
    height: 55rpx;
  }
  /deep/ .list-comp {
    .flex-both {
      padding: 36rpx 0;
      margin: 0 30rpx;
      border-bottom: 1rpx dashed @cl-6;
    }
    img {
      height: 80rpx;
      width: 80rpx;
    }
  }
}
.footer-bottom {
  border-bottom: 20rpx solid @cl-8;
}
</style>