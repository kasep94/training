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
                <input class="btn-1" type="text" placeholder="填写书籍名称" />
            </div>

            <div class="label-inp">
                <p><i class="icon icon-book" />机构名称</p>
                <input class="btn-1" type="text" placeholder="填写书籍名称" />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-time" />上课时间</p>
                <div class="time-select" v-for="(item, i) of timeArr" :key="i">
                    <input class="btn-1" disabled type="text" :placeholder="item[0] + '  ' + item[1] + ':' + item[2] + '~' + item[3] + ':' + item[4]"/>
                    <i @click='onRemove(i)' class="icon icon-delete"/>
                </div>
                <Picker @onTimePicker='onSelectTime' info='选择课程时间' type='time' />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-book" />上课地点</p>
                <input class="btn-1" type="text" placeholder="填写书籍名称" />
            </div>

            <p class="btn-1 add-course">保  存</p>
        </div>
    </div>
</template>

<script>
import Picker from "../../components/picker/picker";

export default {
  data() {
    return {
      // 选中的时间
      timeArr: []
    };
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