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
                <img class="avatar1" @click="onAvatar" v-if='onlineUrl' :src="userInfo.head_pic ? userInfo.head_pic : onlineUrl + 'mrtx/avatar.png'"/>
                <div class="header-content">
                    <p class="user-name">{{userInfo.name || '无'}}</p>
                    <div class="flex">
                        <span>身份: {{userInfo.role === 'parent' ? '家长' : userInfo.role}}</span>
                        <span class="children">(孩子) {{userInfo.grade || 1}}年级</span>
                    </div>
                </div>
            </div>
            <div v-if="hasPop"  class="pop">
              <div class="flex-left-center" @click="selectUser(item)" v-for="item of othterInfo" :key="item.id">
                <img class="other-img" v-if="onlineUrl" :src="item.img ? item.img : onlineUrl + 'mrtx/avatar.png'"/>
                <p class="other-name">{{item.name}}</p>
              </div>
              <div @click="onAdd" class="flex-left-center add">
                <p class="other-add">+</p>
                <p class="other-name">添加一个孩子信息</p>
              </div>
            </div>
            <div class="flex-left-center bottom">
                <div class="flex-center"><img class="img1" src="../../../static/images/all/grade.png" />等级: Lv{{userInfo.level}}</div>
                <div class="flex-center"><img src="../../../static/images/all/integral.png" />积分: {{userInfo.points}}</div>
            </div>
        </div>
        <div class="content">
          <div>
            <div class="flex-left-center progress">
              <i class="icon icon-calendar" />
              <span>习惯养成打卡进展</span>
            </div>
            <div class="habit">
              <NextList v-if="content2 && content2.length > 0" @onNodeClick='onJumpPunch' :data="content2" />
              <p v-else class='no-punch'>今日无打卡安排</p>
              <!-- <div class="more flex-center">
                <i class="icon icon-down-more" />
              </div> -->
            </div>
          </div>
          
          <div class="footer-bottom">
            <NextList @onNodeClick='onNextList' :data="mine2" />
          </div>
        </div>
    </div>
</template>

<script>
import { othterInfo } from "./data.js";
import NextList from "../../components/next-list/next-list";
import listData from "../../components/next-list/data.js";
import mineService from "./mine.server.js";

export default {
  components: { NextList },
  data() {
    return {
      onlineUrl: process.env.onlineUrl,
      // 登入的用户信息
      userInfo: {},
      // 保存选中的信息
      childrenInfo: {},
      othterInfo: [],
      date: global.PUBLIC.util.getDate(),
      // 列表数据
      ...listData,
      // 是否显示弹出框
      hasPop: false,
      // 习惯
      content2: []
    };
  },
  async onLoad() {
    await this.init();
    mineService.updatePage.subscribe(() => {
      wx.login({
        success: res => {
          global.PUBLIC.util
            .httpOther("POST", `/login`, {
              // 登入
              wechat_id: res.code,
              role: "parent"
            })
            .then(res => {
              this.userInfo.children = res.data.children;
            });
        }
      });
    });
  },

  computed: {},
  methods: {
    /** 单击习惯列表
     * @param {Object} node 节点属性
     */
    onJumpPunch(node) {
      global.PUBLIC.util.jumpNavigateTo("punch/main");
    },
    /** 初始化 */
    init() {
      wx.login({
        success: res => {
          global.PUBLIC.util
            .httpOther("POST", `/login`, {
              // 登入
              wechat_id: res.code,
              role: "parent"
            })
            .then(res => {
              this.userInfo = res.data;
              return res.data;
            })
            .then(res => {
              if (res.children.length === 0) {
                global.PUBLIC.util
                  .httpOther("POST", `/login/${res.id}/trainee`, {
                    relation: "child",
                    head_pic: res.remark.icon
                  })
                  .then(res => {
                    this.userInfo.children.push(res.data);
                  });
              }
              return this.userInfo;
            })
            .then(() => {
              // 获取习惯
              this.userInfo.trainee_id = this.userInfo.children[0].id;
              this.userInfo.grade = this.userInfo.children[0].grade;
              global.PUBLIC.util.setUser(this.userInfo);
              this.othterInfo = this.userInfo.children.map(v => {
                return {
                  ...v,
                  img: v.head_pic
                };
              });
            })
            .then(() => {
              global.PUBLIC.util
                .httpGet(
                  `/schedule/trainee/${
                    global.PUBLIC.util.getUser().trainee_id
                  }`,
                  {
                    start: this.date.calendar1,
                    end: this.date.calendar1
                  }
                )
                .then(res => {
                  if (
                    Object.prototype.toString.call(res.data) ===
                    "[object Object]"
                  ) {
                    this.content2 = [];
                  } else {
                    res.data.forEach(value => {
                      const schedules = value.schedules[0];
                      if (schedules.schedule.type !== "leaning") {
                        this.content2.push({
                          ...schedules,
                          time: `${schedules.start_hour}~${schedules.end_hour}`,
                          label: schedules.schedule.title,
                          img: schedules.schedule.habit_lib.remark.icon
                        });
                      }
                    });
                  }
                });
            });
        }
      });
    },
    /** 切换用户
     * @param {Object} node 节点属性
     */
    selectUser(node) {
      this.hasPop = false;
      const { grade, id, head_pic, name } = node;
      this.userInfo.grade = grade;
      this.userInfo.trainee_id = id;
      this.userInfo.head_pic = head_pic;
      this.userInfo.name = name;
      mineService.changeUser.next()
      global.PUBLIC.util.setUser(this.userInfo);
    },
    /** 单击头像 */
    onAvatar() {
      this.hasPop = !this.hasPop;
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
          global.PUBLIC.util.jumpNavigateTo(`mine-badge/main`);
          break;
        case "my_collection":
          //我的收藏（课程 | 文章）
          global.PUBLIC.util.jumpNavigateTo(`mine-collection/main`);
          break;
        case "my_participated":
          // 我参加过的（课程 | 活动）
          global.PUBLIC.util.jumpNavigateTo(`mine-participated/main`);
          break;
        case "my_evaluation":
          //我的评价（课程 | 内容）
          break;
        case "my_browse":
          //最近浏览
          global.PUBLIC.util.jumpNavigateTo(`mine-browse/main`);
          break;
      }
    }
  }
};
</script>

<style scoped lang='less'>
.no-punch {
  font-size: 28rpx;
  margin-left: 30rpx;
  padding: 15rpx 0;
}
.header {
  position: relative;
  .children {
    margin-left: 56rpx;
  }
  .pop {
    position: absolute;
    background-color: @cl-17;
    border-radius: 6rpx;
    overflow: hidden;
    top: 110px;
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