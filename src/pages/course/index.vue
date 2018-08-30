/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：课程表页面
 */
<template>
    <div class="course_page">
        <div class="flex-center header">18~19学年 第1周</div>
        <DateList :data='dataList' />
    </div>
</template>

<script>
import DateList from "../../components/dateList/dateList";
import dataList from "../../components/dateList/list";

export default {
  data() {
    return {
      dataList
    };
  },
  components: { DateList },
  mounted() {
    global.PUBLIC.util.setTitle("课程表");
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.header {
  width: 750rpx;
  height: 74rpx;
  font-size: 28rpx;
  background: rgba(199, 220, 242, 1);
  box-shadow: 0px 4px 10px 0px rgba(142, 167, 199, 0.05);
}
</style>