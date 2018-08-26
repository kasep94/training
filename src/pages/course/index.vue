/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：课程表页面
 */
<template>
    <div class="course_page">
        <p>课程表页面</p>
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
  created() {
    global.PUBLIC.util.setTitle("课程表");
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>