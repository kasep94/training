/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：课程表页面
 */
<template>
    <div class="course-page">
        <div class="flex-center header">
          <span class="cl-b-black">18~19学年 第1周</span>
          <i class="icon icon-down" />
          <div class="add-div">
            <img @click="onShowAdd" class="add" src="../../../static/images/all/add.png" />
            <div v-if="hasAdd">
              <p>添加课程</p>
              <p>修改课程</p>
            </div>
          </div>
        </div>
        <DateList :data='dataList' />
        <div class="footer flex-center">
          <div class="content">
            <div class="top flex-both">
              <span class="col-black flex-left-center"><i class="icon icon-calendar" />习惯养成计划</span>
              <span class="cl-b-gray ">添加其他习惯 ></span>
            </div>
            <p class="col-black">可根据孩子实际时间安排拖移模块，养成良好习惯。</p>
            <EditCard :data='editCardData'/>
          </div>
        </div>
    </div>
</template>

<script>
import DateList from "../../components/dateList/dateList";
import dataList from "../../components/dateList/list";
import EditCard from "../../components/edit-card/edit-card";
import editCardData from "../../components/edit-card/data.js";

export default {
  data() {
    return {
      dataList,
      // 是否显示add弹出窗
      hasAdd: false,
      // EditCard组件数据
      editCardData
    };
  },
  components: { DateList, EditCard },
  mounted() {
    global.PUBLIC.util.setTitle("课程表");
  },
  computed: {},
  methods: {
    /** 单击 + 号 */
    onShowAdd() {
      this.hasAdd = !this.hasAdd;
    }
  }
};
</script>

<style scoped lang='less'>
.course-page {
  /deep/ .flex-both:nth-of-type(1) {
    border-color: #5592EE;
  }
  /deep/ .flex-both:nth-of-type(3) {
    border-color: #52bcc5;
  }
  .header {
    width: 750rpx;
    height: 74rpx;
    font-size: 28rpx;
    background: rgba(199, 220, 242, 1);
    box-shadow: 0px 4px 10px 0px rgba(142, 167, 199, 0.05);
    position: relative;
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