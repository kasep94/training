/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：课程表页面
 */
<template>
    <div class="course_page">
        <p>课程表页面</p>
        <DateList :data='data' />
    </div>
</template>

<script>
import DateList from "../../components/dateList/dateList";

export default {
  data() {
    return {
      data: [
        ["8月", "周一13日", "周二14日", "周三15日", "周三15日", "周三15日"],
        ['上午', '9:00~9.45\n奥数', '', '', '', ''],
        ['下午', '9:00~9.45', '', '', '', ''],
        ['晚上', '', '', '', '9:00~9.45', '']
      ]
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