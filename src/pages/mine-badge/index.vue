/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月24日
 * 修改时间：2018年09月24日
 * 描述信息：我的徽章
 */
<template>
    <div class="mine-badge-page">
        <header class="flex-center">
            <div class="flex-content-center">
                <img class="avatar" :src="userInfo.head_pic ? userInfo.head_pic : onlineUrl + 'mrtx/avatar.png'" />
                <p class="star-num flex-left-center"><img class="star" src="../../../static/images/all/star.png" /><span>共获得{{count}}枚</span></p>
            </div>
        </header>
        <div class="content">
            <div class="box" v-for="item of data" :key="item.id">
                <p class="title"><span>{{item.label}}</span><span><span class="mine-badge-blue">{{item.size}}</span>/{{item.data.length}}</span></p>
                <ScrollX :data='item.data'/>
            </div>
        </div>
    </div>
</template>

<script>
import data from "./data.js";
import ScrollX from "../../components/scroll-x/scroll-x";
import mineService from '../mine/mine.server.js'

export default {
  components: { ScrollX },
  data() {
    return {
      onlineUrl: process.env.onlineUrl,
      data: [],
      userInfo: null,
      // 徽章总数
      count: 0,
    };
  },
  onLoad() {
    this.userInfo = mineService.getBadgeData()
    global.PUBLIC.util.httpGet(`/medal?trainee_id=${global.PUBLIC.util.getUser().trainee_id}`, {}).then(res => {
      const learning = { data: [], size: 0};
      const living = { data: [], size: 0 };
      const friend = { data: [], size: 0 };
      const health = { data: [], size: 0 };
      const behave = { data: [], size: 0 };
      res.data.forEach(v => {
        switch (v.type) {
          case "learning":
            learning.label = "学习勋章";
            learning.data.push({
              ...v,
              has_gray: !v.has_achieved,
              img: v.remark.icon
            });
            if (v.has_achieved) {
              learning.size += 1
            }
            break;
          case "living":
            living.label = "生活勋章";
            living.data.push({
              ...v,
              has_gray: !v.has_achieved,
              img: v.remark.icon
            });
            if (v.has_achieved) {
              living.size += 1
            }
            break;
          case "friend":
            friend.label = "交友勋章";
            friend.data.push({
              ...v,
              has_gray: !v.has_achieved,
              img: v.remark.icon
            });
            if (v.has_achieved) {
              friend.size += 1
            }
            break;
          case "health":
            health.label = "健康勋章";
            health.data.push({
              ...v,
              has_gray: !v.has_achieved,
              img: v.remark.icon
            });
            if (v.has_achieved) {
              health.size += 1
            }
            break;
          case "behave":
            behave.label = "行为勋章";
            behave.data.push({
              ...v,
              has_gray: !v.has_achieved,
              img: v.remark.icon
            });
            if (v.has_achieved) {
              behave.size += 1
            }
            break;
        }
        this.count = learning.size + living.size + friend.size + health.size + behave.size
        this.data = [learning, living, friend, health, behave];
      });
    });
  },
  computed: {},
  methods: {}
};
</script>

<style lang='less'>
page {
  width: 100%;
  height: 100%;
  background-color: @cl-21;
}
</style>


<style lang='less' scoped>
.mine-badge-page {
  header {
    width: 750rpx;
    height: 382rpx;
    background-color: @cl-20;
    .avatar {
      height: 122rpx;
      width: 122rpx;
      margin-bottom: 40rpx;
      border-radius: 100%;
      border: 5rpx solid white;
    }
    .star {
      height: 29rpx;
      width: 30rpx;
      margin: 0 11rpx 0 16rpx;
    }
    .star-num {
      width: 215rpx;
      height: 50rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 25rpx;
      opacity: 0.9;
      font-size: 24rpx;
      color: @cl-2;
    }
  }
  .content {
    width: 690rpx;
    margin-left: 30rpx;
    margin-bottom: 60rpx;
    position: relative;
    bottom: 60rpx;
    .mine-badge-blue {
      color: @cl-20;
      margin-left: 20rpx;
    }
    /deep/ .div-2-main {
      .scroll-child {
        // margin-left: 48rpx;
        margin: 0;
      }
      .scroll-child:nth-of-type(1) {
        // margin: 0;
      }
      .cl-black {
        width: 180rpx;
      }
      image {
        height: 122rpx;
        width: 122rpx;
        border-radius: 100%;
      }
    }
    .box {
      background-color: white;
      padding: 31rpx 0 20rpx 20rpx;
      margin-bottom: 20rpx;
      border-radius: 6rpx;
    }
    .title {
      font-size: 28rpx;
      font-weight: 500;
      margin: 0 0 36rpx 0;
    }
    .flex {
      .main {
        img {
          height: 126rpx;
          width: 126rpx;
          border-radius: 100%;
        }
        p {
          font-size: 20rpx;
          color: @cl-2;
          text-align: center;
        }
      }
    }
  }
}
</style>