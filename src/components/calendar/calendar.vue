/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月23日
 * 修改时间：2018年09月23日
 * 描述信息：日历组件
 * 影响模块：course、
 */

 <template>
   <div class="calendar-comp">
     <div class="header flex-left-center">
       {{year}}
       <span @click="onShow">{{month}}月</span>
       <i @click="onShow" class="icon icon-down"/>
       <div v-if="showPop" class="select-month">
         <p @click='onMonth(item)' 
          v-for="item of months" 
          :key="item.id">
          {{item}}月
        </p>
       </div>
      </div>
     <div class="box flex">
      <p v-for="item of weekDay" class="main" :key="item.id">{{item}}</p>
     </div>
     <div class="box flex content-box">
      <p v-for="(item, i) of date" 
        :class="['main', i%7 === 0 ? 'first': '', item.crossMonth ? 'cross-month' : '', item.thisDay ? 'this-day' : '']" 
        :key="item.id">
        {{item.day}}
      </p>
     </div>
   </div>
 </template>

 <script>
export default {
  data() {
    return {
      date: null,
      // 年份
      year: null,
      // 月份
      month: null,
      // 日
      day: null,
      // 星期
      weekDay: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      // 是否显示时间选择
      showPop: false,
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  },
  onLoad() {
    const time = new Date();
    // 年份
    this.year = time.getFullYear();
    // 月份
    this.month = time.getMonth() + 1;
    // 一个月中的某天
    this.day = time.getDate();
    this.date = this.getDate(`${this.year}-${this.month}-${this.day}`);
  },
  methods: {
    // 显示或隐藏日期选择
    onShow() {
      this.showPop = !this.showPop;
    },
    /** 单击月份
     * @param {String} node 节点属性
     */
    onMonth(node) {
      this.month = node;
      const time = new Date()
      if (this.month === time.getMonth() + 1) {
        this.date = this.getDate(`${this.year}-${this.month}-${this.day}`);
      } else {
        this.date = this.getDate(`${this.year}-${node}-01`);
      }
      this.showPop = false;
    },
    /** 计算是否是闰年
     * @param {number} year 年份
     */
    isLeapYear(year) {
      if (
        (year % 4 === 0 && year % 100 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
      ) {
        // 闰年
        return 29;
      } else {
        // 不是闰年
        return 28;
      }
    },
    /** 获取年月日星期等数据
     * @param {Date} date 年-月-日
     */
    getDate(date) {
      const time = new Date(Date.parse(date.replace(/-/g, "/"))); //将日期值格式化
      // 年份
      const year = time.getFullYear();
      // 月份
      const month = time.getMonth();
      // 一个月中的某天
      const day = time.getDate();
      // 一年中每月的天数
      const dayCountOfMonth = [
        31,
        this.isLeapYear(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ];
      const days = dayCountOfMonth[month];
      // 一个月中的某一天
      let copyDay = day;
      // 一个月中的某天
      const weekNum = time.getDay();
      let copyWeekNum = weekNum;
      const arr = [];
      // 计算1-day的时间
      for (let i = 0; i < day; i++) {
        arr.push({
          day: copyDay,
          week: copyWeekNum,
          thisDay:
            `${this.year}-${this.month}-${this.day}` ===
            `${year}-${month + 1}-${copyDay}`
        });
        copyDay -= 1;
        copyWeekNum -= 1;
        if (copyWeekNum === -1) {
          copyWeekNum = 6;
        }
      }
      // 计算上个月到本月1号的时间
      const firstDay = arr[day - 1].week;
      let copyFirstDay = firstDay;
      let lastMonth = dayCountOfMonth[month - 1 < 0 ? 11 : month - 1];
      for (let j = 0; j < firstDay; j++) {
        arr.push({
          day: lastMonth,
          week: (copyFirstDay -= 1),
          crossMonth: true
        });
        lastMonth -= 1;
      }
      // 计算day-30号
      const otherDay = days - day;
      let copyDay1 = day;
      let copyOhterWeek = weekNum;
      for (let z = 0; z < otherDay; z++) {
        copyOhterWeek += 1;
        if (copyOhterWeek === 7) copyOhterWeek = 0;
        arr.unshift({
          day: (copyDay1 += 1),
          week: copyOhterWeek
        });
      }
      // 计算下一个月的时间
      const not = arr[0].week;
      let copyNot = not;
      let notDay = 0;
      for (let h = 0; h < 6 - not; h++) {
        let nextWeek = (copyNot += 1);
        if (nextWeek === 7) nextWeek = 0;
        arr.unshift({
          day: (notDay += 1),
          week: nextWeek,
          crossMonth: true
        });
      }
      return arr.reverse();
    }
  }
};
</script>

 <style lang='less' scoped>
.calendar-comp {
  padding: 30rpx;
  .cross-month {
    color: @cl-5;
  }
  .this-day {
    border: 1px solid red;
  }
  .header {
    font-size: 30rpx;
    margin-bottom: 40rpx;
    position: relative;
    .select-month {
      position: absolute;
      background: white;
      top: 45rpx;
      left: 301rpx;
      width: 100rpx;
      text-align: center;
      border: 1px solid @cl-5;
      p {
        height: 55rpx;
        line-height: 55rpx;
        border-bottom: 1px solid @cl-5;
        margin-bottom: -1rpx;
      }
    }
    span {
      margin-left: 242rpx;
    }
    .icon-down {
      height: 13rpx;
      width: 18rpx;
      margin-left: 12rpx;
    }
  }
  .flex {
    flex-wrap: wrap;
  }
  .content-box {
    p {
      height: 50rpx;
      width: 50rpx;
      border-radius: 100%;
      line-height: 50rpx;
    }
  }
  .box {
    p {
      font-size: 27rpx;
      margin-left: 50rpx;
      width: 55rpx;
      text-align: center;
      margin-bottom: 20rpx;
    }
    p:nth-of-type(1) {
      margin: 0;
    }
    p.first {
      margin: 0;
    }
  }
}
</style>
 
 
 