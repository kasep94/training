/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月23日
 * 修改时间：2018年09月23日
 * 描述信息：日历、打卡
 */
<template>
    <div class="home_page">
        <Calendar v-if="punchDate.length > 0" :data='punchDate' />
        <div class="flex-left-center habit">
          <img :src="source.img"/>
          <p>{{source.label}}</p>
        </div>
        <div class="content">
          <div class="flex-left-center">
            <img class="my_badge" src="https://okcdn.apiweixin.top/asserts/img/my_badge.png"/>
            <p>我的徽章</p>
          </div>
          <div class="main flex-wrap">
            <div v-for="item of badges" :key="item.id">
              <img :src="item.img" />
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Calendar from "../../components/calendar/calendar";
import mineService from "../mine/mine.server.js";

export default {
  components: { Calendar },
  data() {
    return {
      // 打卡日期
      punchDate: [],
      // 数据
      source: {},
      // 徽章数
      badges: []
    };
  },
  onShow() {
    // 重置data 完成初始化
    Object.assign(this.$data, this.$options.data());
  },
  computed: {},
  onLoad(option) {
    global.PUBLIC.util
      .httpGet(`/medal`, {
        trainee_id: global.PUBLIC.util.getUser().trainee_id
      })
      .then(res => {
        console.log(res.data);
        this.badges = res.data.map(v => {
          return {
            ...v,
            img: v.remark.icon
          };
        });
      });
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
  mounted() {
    this.source = mineService.getHabitData();
  },
  methods: {}
};
</script>

<style lang='less' scoped>
p {
  font-size: 28rpx;
}
.habit {
  // font-size: 28rpx;
  color: @cl-1;
  background: white;
  border-top: 1rpx solid @cl-6;
  padding: 20rpx 30rpx;
  margin-bottom: 20rpx;
  img {
    height: 80rpx;
    width: 80rpx;
    margin-right: 30rpx;
  }
}
.content {
  background: white;
  padding: 36rpx 30rpx;
  .my_badge {
    height: 47rpx;
    width: 40rpx;
    margin-right: 20rpx;
  }
  .main {
    margin-top: 20rpx;
    > div {
      margin: 15rpx 25rpx;
    }
    img {
      height: 127rpx;
      width: 127rpx;
    }
    p {
      font-size: 20rpx;
      text-align: center;
    }
  }
}
</style>