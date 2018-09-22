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
                <img class="avatar1" @click="onAvatar" :src="userInfo.img"/>
                <div class="header-content">
                    <p class="user-name">{{userInfo.name}}</p>
                    <div class="flex">
                        <span>身份: {{userInfo.identity}}</span>
                        <span>(孩子) {{userInfo.grade}}</span>
                    </div>
                </div>
            </div>
            <div v-if="hasPop" class="pop">
              <div class="flex-left-center" v-for="item of othterInfo" :key="item.id">
                <img class="other-img" :src="item.img"/>
                <p class="other-name">{{item.name}}</p>
              </div>
              <div @click="onAdd" class="flex-left-center add">
                <p class="other-add">+</p>
                <p class="other-name">添加一个孩子信息</p>
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
            <NextList @onNodeClick='onNextList' :data="mine2" />
          </div>
        </div>
    </div>
</template>

<script>
import { userInfo, othterInfo } from "./data.js";
import NextList from "../../components/next-list/next-list";
import listData from "../../components/next-list/data.js";

export default {
  components: { NextList },
  data() {
    return {
      userInfo,
      othterInfo,
      // 列表数据
      ...listData,
      // 是否显示弹出框
      hasPop: false
    };
  },
  created() {
    wx.login({
      success: res => {
        console.log(res);
      }
    });
  },
  computed: {},
  methods: {
    /** 单击头像 */
    onAvatar() {
      this.hasPop = true;
    },
    /** 单击添加一个孩子信息 */
    onAdd() {
      this.hasPop = false;
      global.PUBLIC.util.jumpNavigateTo("add-user/main");
    },
    /** 单击下一页
     * @param {Object} node 节点属性
     * @memberof NextList
     */
    onNextList(node) {
      switch (node.name) {
        case "my_badge":
          // 我的徽章
          // global.PUBLIC.util.jumpNavigateTo("mine-jump/main?page=1");
          break;
        case "my_collection":
          //我的收藏（课程 | 文章）
          global.PUBLIC.util.jumpNavigateTo(`mine-collection/main`);
          break;
        case "my_participated":
        // 我参加过的（课程 | 活动）
          global.PUBLIC.util.jumpNavigateTo(`mine-participated/main`);
        case "my_evaluation":
        //我的评价（课程 | 内容）
        case "my_browse":
          //最近浏览
          break;
      }
    }
  }
};
</script>

<style scoped lang='less'>
.header {
  position: relative;
  .pop {
    position: absolute;
    background-color: @cl-17;
    border-radius: 6rpx;
    overflow: hidden;
    bottom: -130rpx;
    left: 30rpx;
    .add {
      height: 76rpx;
      line-height: 76rpx;
    }
    .flex-left-center {
      padding: 9rpx 25rpx;
      border-bottom: 1px solid @cl-18;
      .other-img {
        height: 80rpx;
        width: 80rpx;
        border-radius: 100%;
        margin-right: 15rpx;
      }
      .other-name {
        font-size: 26rpx;
        color: white;
        .nowrap();
        max-width: 240rpx;
      }

      .other-add {
        font-size: 32rpx;
        color: white;
        font-weight: 500;
        margin: 0 10rpx 5rpx 0;
      }
    }
  }
  img.avatar1 {
    height: 122rpx;
    width: 122rpx;
    border-radius: 100%;
  }
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