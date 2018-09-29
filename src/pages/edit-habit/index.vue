/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月05日
 * 修改时间：2018年09月05日
 * 描述信息：习惯详情编辑页面
 */
<template>
    <div class="course-add-page flex-content-center">
        <div class="content">
            <div class="label-inp">
                <p><i class="icon icon-book" />详情描述</p>
                <input class="btn-1" type="text" v-model="data.describe" placeholder="请填写详情描述" />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-time" />选择时间</p>
                <div class="time-select" v-for="(item, i) of timeArr" :key="i">
                    <input class="btn-1" disabled type="text" :placeholder="item[0] + '  ' + item[1] + ':' + item[2] + '~' + item[3] + ':' + item[4]"/>
                    <i @click='onRemove(item, i)' class="icon icon-delete"/>
                </div>
                <Picker @onTimePicker='onSelectTime' info='添加时间' type='time' />
            </div>

            <p @click="onSubmit" class="btn-1 add-course">保  存</p>
        </div>
    </div>
</template>

<script>
import Picker from "../../components/picker/picker";
import service from "../course/service.js";
import courseService from "../course/course.service.js";

export default {
  data() {
    return {
      // 选中的时间
      timeArr: [],
      // 发送给接口
      apiArr: [],
      // course页面带过来到参数
      data: {},
      // 保存url search
      hasDataNum: null
    };
  },
  onUnload() {
    this.timeArr = [];
    this.apiArr = [];
    this.hasDataNum = null;
  },
  onLoad(option) {
    this.hasDataNum = option.hasData;
    this.data = service.getData();
    if (this.hasDataNum) {
      if (this.hasDataNum === "1") {
        // 习惯养成计划的编辑
        this.timeArr = global.PUBLIC.util.jumpApiDate(this.data.rules);
      } else if (this.hasDataNum === "2") {
        // 课程表弹出框的编辑 TODO
        const { id } = this.data.schedule;
        global.PUBLIC.util.httpGet(`/habit/user`, { id }).then(res => {
          const items = res.data.items[0];
          this.data = items;
          // 时间
          this.timeArr = global.PUBLIC.util.jumpApiDate(items.rules);
        });
      } else {
        // 添加习惯编辑
      }
    } else {
      this.timeArr = [];
    }
  },
  mounted() {
    global.PUBLIC.util.setTitle("习惯详情编辑");
  },
  components: { Picker },
  computed: {},
  methods: {
    /** 删除选中的日期
     * @param {Array} node 节点属性
     * @param {number} index 索引
     */
    onRemove(node, index) {
      if (node[5] && node[5].id) {
        global.PUBLIC.util
          .httpOther("DELETE", `/rule/${node[5].id}`, {})
          .then(res => {
            courseService.habitSub.next();
          });
      }
      this.timeArr.splice(index, 1);
      this.apiArr.find((v, i) => {
        if (v === node) {
          this.apiArr.splice(i, 1);
        }
        return v === node;
      });
    },
    /** 获取日期选择的数据
     * @param {Array} data 选择的数据
     * @memberof Picker
     */
    onSelectTime(data) {
      this.timeArr.push(data);
      this.apiArr.push(data);
    },
    /** 单击保存 */
    onSubmit() {
      const { describe } = this.data;
      setTimeout(() => {
        courseService.habitSub.next();
      }, 500);
      if (this.hasDataNum === "1" || this.hasDataNum === "2") {
        // 更新框编辑习惯 | 弹出框更新框编辑习惯
        global.PUBLIC.util
          .httpOther(
            "PUT",
            `/habit/user/${this.data.id || this.data.schedule.id}`,
            {
              describe
            }
          )
          .then(res => {});
      } else {
        // 添加习惯备注
        global.PUBLIC.util
          .httpOther("POST", `/habit/user`, {
            describe,
            habit_id: this.data.id,
            trainee_id: global.PUBLIC.util.getUser().trainee_id
          })
          .then(res => {});
      }
      if (this.apiArr.length > 0) {
        global.PUBLIC.util.conversionDate(this.apiArr).forEach(v => {
          global.PUBLIC.util
            .httpOther("POST", `/rule`, {
              ...v,
              type: "habit",
              object_id: this.data.id || this.data.schedule.id,
              trainee_id: global.PUBLIC.util.getUser().trainee_id
            })
            .then(res => {
              if (res.code !== 0 || res.code === 200) {
                wx.showToast({
                  title: res.message,
                  icon: "none",
                  duration: 2000
                });
              } else {
                wx.navigateBack({ changed: true });
              }
            });
        });
      } else {
        wx.navigateBack({ changed: true });
      }
    }
  }
};
</script>

<style scoped lang='less'>
.course-add-page {
  padding-bottom: 30rpx;
  .content {
    width: 690rpx;
  }
  .label-inp {
    margin-top: 40rpx;
  }
  .icon-address {
    height: 35rpx;
  }
  .add-course {
    background: @cl-4;
    color: white;
    margin: 0 auto;
    width: 690rpx;
    margin-top: 188rpx;
  }
}
</style>