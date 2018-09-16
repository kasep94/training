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

export default {
  data() {
    return {
      // 选中的时间
      timeArr: [],
      // course页面带过来到参数
      data: {},
      // 判断是修改还是添加
      hasEdit: false
    };
  },
  onLoad(option) {
    this.hasEdit = option.hasOwnProperty("hasData");
    this.data = service.getData();
    if (option.hasOwnProperty("hasData")) {
      if (option.hasData === "1") {
        // 习惯养成计划的编辑
        this.timeArr = global.PUBLIC.util.jumpApiDate(this.data.rules);
      } else {
        // 课程表弹出框的编辑 TODO
        this.data.describe = this.data.schedule.describe;
        const { id } = this.data.schedule;
        global.PUBLIC.util.httpGet(`/lesson/user`, { id }).then(res => {
          const items = res.data.items[0];
          // 时间
          this.timeArr = global.PUBLIC.util.jumpApiDate(items.rules);
        });
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
      global.PUBLIC.util
        .httpOther("DELETE", `/rule/${node[5].id}`, {})
        .then(res => {
          this.timeArr.splice(index, 1);
        });
    },
    /** 获取日期选择的数据
     * @param {Array} data 选择的数据
     * @memberof Picker
     */
    onSelectTime(data) {
      this.timeArr.push(data);
    },
    /** 单机保存 */
    onSubmit() {
      const { describe } = this.data;
      if (this.hasEdit) {
        // 修改习惯备注
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
            habit_id: this.data[0].habit_id,
            trainee_id: this.data[0].trainee_id
          })
          .then(res => {});
      }
      global.PUBLIC.util
        .httpOther("POST", `/rule/batch`, {
          batch: global.PUBLIC.util.conversionDate(this.timeArr).map(v => {
            return {
              ...v,
              type: "habit",
              object_id: this.data.id,
              trainee_id: this.data.trainee_id
            };
          })
        })
        .then(res => {
          wx.navigateBack({ changed: true });
        });
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
    width: 542rpx;
    margin-top: 188rpx;
  }
}
</style>