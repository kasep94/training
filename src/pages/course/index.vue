/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：课程表页面
 */
<template>
    <div class="course-page">
        <div class="flex-center header">
          <span class="cl-b-black">18~19学年 本周</span>
          <!-- <i class="icon icon-down" /> -->
          <div class="add-div">
            <img 
              @click="onShowAdd" 
              class="add" 
              v-if="onlineUrl"
              :src="onlineUrl + 'ic6.jpg'" 
            />
            <div v-if="hasAdd">
              <p @click="onJumpCourseAdd">添加课程</p>
              <p>导出表单</p>
            </div>
          </div>
        </div>
        <DateList :data='dataList' @onNodeClick='onDateList' />
        <div class="footer flex-center">
          <div class="content">
            <div class="top flex-both">
              <span class="col-black flex-left-center"><i class="icon icon-calendar" />习惯养成计划</span>
              <span @click="onJumpAddHabit" class="cl-b-gray flex-left-center">添加其他习惯<i class="icon icon-more" /></span>
            </div>
            <p class="col-black">可根据孩子实际时间安排拖移模块，养成良好习惯。</p>
            <EditCard @onEdit='onJumpEdit' :data='editCardData'/>
          </div>
        </div>
        <div v-if="hasShowEdit" @click="onWin" class="pop-comp">
          <div class="pop-content pop-edit flex-content-center">
            <div class="main flex-content-center">
              <div @click="onContent" v-for="item in saveData.lessons" :key="item.id">
                <div class="flex-both">
                  <p>
                    <span>{{item.start_hour}}~{{item.end_hour}}</span>
                    <span>{{item.lesson ? item.lesson.item_name : item.habit.name}}</span>
                  </p>
                  <span class="edit" @click="onPopEdit(item)">编辑</span>
                </div>
                <p class="cl-gray">{{item.lesson ? item.lesson.sub_info : item.describr}}</p>
              </div>  
            </div>
          </div>
        </div>
        <div v-if="page !== 5" class="pop-comp">
          <i class="icon icon-cross" @click="onCross" />
          <div v-if="page === 1" class="pop-content pop-1 flex-content-center">
            <div class="pop-main">
              <p class="title">你孩子现在几岁</p>
              <Btns @onBtnsClick="(e) => onBtnsClick(e, 1)" :data='btns1' />
              <p class="btn-1 next" @click="onNext">继续</p>
              <p class='jump' @click="onJumpOver">跳过此步骤</p>
            </div>
          </div>
          <div v-if="page === 2" class="pop-content pop-1 pop-2 flex-content-center">
            <div class="pop-main">
              <p class="title">您想要培养孩子哪些方面的好习惯？</p>
              <Btns @onBtnsClick="(e) => onBtnsClick(e, 2)" :data='btns2' />
              <p class="btn-1 next" @click="onNext">继续</p>
              <p class='jump' @click="onJumpOver">跳过此步骤</p>
            </div>
          </div>
          <div v-if="page === 3" class="pop-content pop-3 flex-top-center">
            <div class="pop-main">
              <p class="title">您的孩子已经参加过的课程名称：</p>
              <Btns @onBtnsClick="(e) => onBtnsClick(e, 3)" :data='btns3' />
              <input class="btn-1" type="text" placeholder="其他（课程名称）"/>
              <p class="title mechanism">所属机构：</p>
              <Btns @onBtnsClick="(e) => onBtnsClick(e, 4)" :data='btns4' />
              <input class="btn-1" type="text" placeholder="其他（机构名称）"/>
              <p class="btn-1 next" @click="onNext">继续</p>
              <p class='jump' @click="onJumpOver">跳过此步骤</p>
            </div>
          </div>
          <div v-if="page === 4" class="pop-content pop-4 flex-top-center">
            <div class="pop-main">
              <p class="title">您的孩子已经参加过的课程名称：</p>
              <p class="active btn-1">英语</p>
              <div class="time-select">
                <input class="btn-1" type="text" placeholder="选择课程时间"/>
                <i class="icon icon-right"/>
              </div>
              <p class="active btn-1">游泳</p>
              <div class="time-select">
                <input class="btn-1" type="text" placeholder="选择课程时间"/>
                <i class="icon icon-right"/>
              </div>
              <p class="active btn-1">网球</p>
              <div class="time-select">
                <input class="btn-1" type="text" placeholder="选择课程时间"/>
                <i class="icon icon-right"/>
              </div>

              <p class="btn-1 next" @click="onNext">制定专属的日程安排</p>
              <p class='jump' @click="onJumpOver">跳过此步骤</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import DateList from "../../components/date-list/date-list";
import dataList from "../../components/date-list/list";
import EditCard from "../../components/edit-card/edit-card";
// import editCardData from "../../components/edit-card/data.js";
import Btns from "../../components/btns/btns";
import btnsData from "../../components/btns/data.js";
import service from "./service.js";

export default {
  data() {
    return {
      ...dataList,
      // 是否显示add弹出窗
      hasAdd: false,
      // EditCard组件数据
      editCardData: null,
      // 弹出哪个弹出框
      page: 5,
      // btns组件数据
      ...btnsData,
      // 是否显示课程表编辑的弹窗 {0 | 1 | 2}
      hasShowEdit: 0,
      // 保存当天数据
      saveData: null,
      onlineUrl: process.env.onlineUrl,
      // 获取接口数据
      apiData: null
    };
  },
  components: { DateList, EditCard, Btns },
  created() {
    this.initCourse();
    global.PUBLIC.util
      .httpGet("/habit/user", {
        login_id: 1
      })
      .then(res => {
        this.editCardData = res.data.items.map(v => {
          v.info = v.habit.name;
          v.icon = v.habit.remark.icon;
          return v;
        });
      });
  },
  mounted() {
    global.PUBLIC.util.setTitle("课程表");
  },
  computed: {},
  methods: {
    /** 单击课程表节点
     * @param {Object} node 节点属性
     * @memberof DateList
     */
    onDateList(node) {
      const data = this.apiData.find(value => {
        return value.day === node[0].day;
      });
      // console.log(data)
      this.saveData = data;
      this.hasShowEdit = 1;
      service.setData(data);
    },
    /** 课程表数据 */
    initCourse() {
      const date = global.PUBLIC.util.getDate().thisWeek;
      global.PUBLIC.util
        .httpGet("/schedule/trainee/2", {
          start: date[0].day,
          end: date[6].day
        })
        .then(res => {
          this.dataList[0] = [];
          const month = new Date().getMonth() + 1;
          this.dataList[0].push(month + "月");
          this.dataList[0].push(
            ...date.map(value => {
              return `${value.week}${value.day.split("-")[2]}日`;
            })
          );
          this.apiData = res.data;

          res.data.forEach(value => {
            let index = 0;
            date.find((time, i) => {
              // 获取索引
              if (time.day === value.day) {
                index = i;
              }
              return time.day === value.day;
            });
            value.lessons.map(child => {
              const hour = Number(child.end_hour.split(":")[0]);
              // hour <= 12 上午, hour <= 18 下午 否则晚上
              const y = hour <= 12 ? 1 : hour <= 17 ? 2 : 3;
              // 保存day值
              child.day = value.day;
              if (typeof this.dataList[y][index + 1] === "string") {
                this.dataList[y][index + 1] = [];
              }
              this.dataList[y][index + 1].push(child);
            });
          });
        });
    },
    /** 点击弹窗叉号 */
    onCross() {
      this.page = 5;
    },
    /** 单击继续 */
    onNext() {
      this.page += 1;
    },
    /** 跳过此步骤 */
    onJumpOver() {
      this.page += 1;
    },
    /** 单击 + 号 */
    onShowAdd() {
      setTimeout(() => {
        this.hasAdd = !this.hasAdd;
      });
    },
    /** 跳转到习惯详情编辑页面 */
    onJumpEdit() {
      global.PUBLIC.util.jumpNavigateTo("edit-habit/main");
    },
    /** 跳转到添加习惯页面 */
    onJumpAddHabit() {
      global.PUBLIC.util.jumpNavigateTo("add-habit/main");
    },
    /** 跳转到添加课程 */
    onJumpCourseAdd() {
      this.hasAdd = false;
      global.PUBLIC.util.jumpNavigateTo("course-add/main");
    },
    /** 全局单击事件 */
    onWin() {
      this.hasShowEdit = this.hasShowEdit === 2 ? 1 : 0;
    },
    /** 单击弹窗内容弹框不消失 */
    onContent() {
      this.hasShowEdit = 2;
    },
    /** 单击弹窗编辑
     * @param {Object} node 节点属性
     */
    onPopEdit(node) {
      this.hasShowEdit = 0;
      global.PUBLIC.util.jumpNavigateTo(
        node.lesson.hasOwnProperty("price")
          ? "edit-course/main"
          : "edit-habit/main"
      );
    },
    /** 单击节点
     * @param {Object} node 单击节点属性
     * @param {1 | 2 | 3 | 4} index 判断是哪个数据
     * @memberOf Btns
     */
    onBtnsClick(node, index) {
      switch (index) {
        case 1:
          // 问题1
          this.btns1.selected = node.name;
          break;
        case 2:
          // 问题2
          this.btns2.selected = node.name;
          break;
        case 3:
          // 问题3
          this.btns3.data.find((value, i) => {
            if (value.name === node.name) {
              value.selected = !value.selected;
            }
            return value.name === node.name;
          });
          break;
        case 4:
          // 问题4
          this.btns4.data.find((value, i) => {
            if (value.name === node.name) {
              value.selected = !value.selected;
            }
            return value.name === node.name;
          });
          break;
      }
    }
  }
};
</script>

<style scoped lang='less'>
.course-page {
  /deep/ .flex-both:nth-of-type(1) {
    border-color: #5592ee;
  }
  /deep/ .flex-both:nth-of-type(3) {
    border-color: #52bcc5;
  }
  input.btn-1 {
    text-align: left;
    padding: 0 25rpx;
    margin-top: 20rpx;
  }

  .pop-content {
    width: 632rpx;
    background-color: white;
    border-radius: 6rpx;
    .pop-main {
      width: 542rpx;
    }
    .title {
      color: @cl-1;
    }
    .jump {
      font-size: 24rpx;
      color: @cl-5;
      text-align: center;
    }
    .next {
      background: @cl-4;
      color: white;
    }
    .active {
      background: @cl-3;
      color: white;
    }
    /deep/ .btns-comp {
      .active {
        background: @cl-3;
        color: white;
      }
    }
  }
  .pop-edit {
    background-color: transparent;
    margin-top: 150rpx;
    .main {
      width: 503rpx;
      background: white;
      border-radius: 6rpx;
      > div {
        background: white;
        width: 433rpx;
        padding: 25rpx 0;
      }
      > div {
        border-bottom: 1rpx dashed @cl-5;
      }
      div:last-child {
        border-bottom: none;
      }
      span {
        font-size: 30rpx;
        display: block;
      }
      .edit {
        background: @cl-4;
        color: white;
        height: 50rpx;
        line-height: 50rpx;
        width: 122rpx;
        text-align: center;
        border-radius: 25rpx;
        font-size: 24rpx;
      }
    }
  }
  .pop-1 {
    height: 970rpx;
    .title {
      font-size: 40rpx;
      text-align: center;
      margin: 89rpx 0 45rpx 0;
    }
    .next {
      margin: 70rpx 0 35rpx 0;
    }
    /deep/ .btns-comp {
      .btn-1 {
        margin-top: 40rpx;
      }
    }
  }

  .pop-2 {
    height: 1040rpx;
    .title {
      font-size: 40rpx;
      text-align: center;
      margin: 56rpx 0 46rpx 0;
    }
    /deep/ .btns-comp {
      .btn-1 {
        margin-top: 25rpx;
      }
    }
  }
  .pop-3 {
    height: 1040rpx;
    .title:nth-of-type(1) {
      margin: 34rpx 0 20rpx 0;
    }
    .title {
      font-size: 32rpx;
    }
    .mechanism {
      margin: 30rpx 0 20rpx 0;
    }
    .next {
      margin: 78rpx 0 35rpx 0;
    }
    /deep/ .btns-comp {
      .btn-1 {
        display: initial;
        padding: 10rpx 31rpx;
        margin-right: 15rpx;
      }
      .btn-1:nth-child(4n + 4) {
        margin-right: 0;
      }
    }
  }

  .pop-4 {
    height: 1040rpx;
    .title {
      font-size: 32rpx;
      margin: 34rpx 0 20rpx 0;
    }
    .time-select {
      margin-bottom: 30rpx;
    }
    .next {
      margin: 65rpx 0 35rpx 0;
    }
    .active {
      margin-top: 40rpx;
      display: initial;
      padding: 10rpx 31rpx;
      margin-right: 15rpx;
    }
  }

  .header {
    width: 750rpx;
    height: 74rpx;
    font-size: 28rpx;
    background: rgba(199, 220, 242, 1);
    box-shadow: 0px 4px 10px 0px rgba(142, 167, 199, 0.05);
    position: relative;
    z-index: 1;
    .icon-down {
      width: 18rpx;
      height: 13rpx;
      margin-left: 12rpx;
    }
    .add-div {
      position: absolute;
      right: 33rpx;
      top: 12rpx;
      text-align: right;
      div {
        background: #8d8e90;
        box-shadow: 0 10px 20px 0 rgba(103, 120, 151, 0.1);
        border-radius: 6px;
        color: white;
        p {
          z-index: 10;
          height: 57rpx;
          line-height: 57rpx;
          width: 170rpx;
          text-align: center;
        }
        p:nth-of-type(1) {
          border-bottom: 1px solid #b0b0b0;
        }
      }
      .add {
        height: 50rpx;
        width: 50rpx;
      }
    }
  }
  .footer {
    height: 810rpx;
    width: 750rpx;
    background-color: #f2f3f6;

    .content {
      height: 580rpx;
      width: 632rpx;
      padding: 35rpx 30rpx 80rpx 30rpx;
      background-color: white;
      border-radius: 6rpx;
      .top {
        margin-bottom: 19rpx;
      }
      .icon-calendar {
        height: 40rpx;
        width: 40rpx;
        margin-right: 15rpx;
      }
      .col-black {
        opacity: 0.7;
      }
    }
  }
}
</style>