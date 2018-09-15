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
                    <i @click='onRemove(i)' class="icon icon-delete"/>
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
      data: {}
    };
  },
  onLoad(option) {
    if (option.hasOwnProperty("hasData")) {
      this.data = service.getData();
      console.log(this.data)
      this.data.rules.map(value => {
        const week = value.rule;
        const end = week.end.split(":");
        const start = week.start.split(":");
        const weeks = [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日"
        ];
        if (week.day === "*") {
          // 每天
          weeks.forEach(w => {
            this.timeArr.push([w, ...end, ...start]);
          });
        } else {
          this.timeArr.push([weeks[Number(week.day)], ...end, ...start]);
        }
      });
    }
  },
  mounted() {
    global.PUBLIC.util.setTitle("习惯详情编辑");
  },
  components: { Picker },
  computed: {},
  methods: {
    /** 删除选中的日期 */
    onRemove(index) {
      this.timeArr.splice(index, 1);
    },
    /** 获取日期选择的数据
     * @param {Array} data 选择的数据
     * @memberof Picker
     */
    onSelectTime(data) {
      console.log(data);
      this.timeArr.push(data);
    },
    /** 单机保存 */
    onSubmit() {
      console.log(this.data.describe);
      const {describe} = this.data
      // 修改习惯备注
      global.PUBLIC.util
        .httpOther("PUT" ,`/habit/user/${this.data.id}`, {
          describe
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped lang='less'>
.course-add-page {
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