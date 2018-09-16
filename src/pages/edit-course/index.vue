/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月12日
 * 修改时间：2018年09月12日
 * 描述信息：编辑课程页面
 */
<template>
    <div class="edit-course-page flex-content-center">
        <div class="content">
            <div class="label-inp">
                <p><i class="icon icon-book" />课程名称</p>
                <input class="btn-1" type="text" v-model="data.name" placeholder="填写书籍名称" />
            </div>

            <div class="label-inp">
                <p><i class="icon icon-book" />机构名称</p>
                <input class="btn-1" type="text" v-model="data.merchantName" placeholder="填写书籍名称" />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-time" />上课时间</p>
                <div class="time-select" v-for="(item, i) of timeArr" :key="i">
                    <input class="btn-1" disabled type="text" :placeholder="item[0] + '  ' + item[1] + ':' + item[2] + '~' + item[3] + ':' + item[4]"/>
                    <i @click='onRemove(item, i)' class="icon icon-delete"/>
                </div>
                <Picker @onTimePicker='onSelectTime' info='选择课程时间' type='time' />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-book" />上课地点</p>
                <input class="btn-1" type="text" v-model="data.addr" placeholder="填写书籍名称" />
            </div>

            <p class="btn-1 add-course">保  存</p>
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
      if (option.hasData === "1") {
        // TODO
      } else {
        // 课程表弹出框的编辑TODO

        const { id } = this.data.schedule;
        // 获取课程数据
        global.PUBLIC.util
          .httpGet(`/lesson/user`, { id })
          .then(res => {
            const items = res.data.items[0];
            // 地址
            this.data.addr = items.merchant.addr;
            // 课程名
            this.data.name = items.class.item_name;
            // 机构名称
            this.data.merchantName = items.merchant.merchantName;
            // 时间
            this.timeArr = global.PUBLIC.util.jumpApiDate(items.rules);
          });
      }
    }
  },
  components: { Picker },
  mounted() {
    global.PUBLIC.util.setTitle("编辑课程");
  },
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
    }
  }
};
</script>

<style lang='less' scoped>
.edit-course-page {
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