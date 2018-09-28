/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月23日
 * 修改时间：2018年09月23日
 * 描述信息：日历、打卡
 */
<template>
    <div class="home_page">
        <Calendar v-if="punchDate.length > 0" :data='punchDate' />
    </div>
</template>

<script>
import Calendar from "../../components/calendar/calendar";

export default {
  components: { Calendar },
  data() {
    return {
      // 打卡日期
      punchDate: []
    };
  },
  onShow() {
    // 重置data 完成初始化
    Object.assign(this.$data, this.$options.data());
  },
  computed: {},
  onLoad(option) {
    global.PUBLIC.util
      .httpGet(`/punch/habit/${global.PUBLIC.util.getUser().trainee_id}`, {
        start: "2018-09-01",
        end: global.PUBLIC.util.getDate().calendar1,
        habit_id: option.id
      })
      .then(res => {
        const punchArr = res.data.filter(v => {
          return v.has_punched;
        });
        this.punchDate = punchArr.map(v => {
          return v.day;
        });
      });
  },
  methods: {}
};
</script>

<style lang='less' scoped>
</style>