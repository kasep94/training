<template>
  <view class="section">
    <picker v-if="type === 'time'" mode="multiSelector" @change="bindTimePickerChange" :value="timeIndex" :range="timeArray">
      <view class="picker">
        <div class="time-select">
            <input disabled :class="cls === '1' ? 'btn-1' : 'btn-2'" type="text" :placeholder="info"/>
        </div>
      </view>
    </picker>
  </view>
</template>

<script>
// import data from "./data.js";

export default {
  props: {
    // {'time'}判断哪种选择器
    type: {
      type: String
    },
    info: {
      type: String
    },
    // 样式
    cls: {
      type: String
    }
  },
  data() {
    return {
      timeIndex: [0, 0, 0, 0, 0, 0],
      timeArray: [["周一", "周二", "周三", "周四", "周五", "周六", "周日"],[], [], [], [], [], []]
    };
  },
  created() {
    let date = this.timeArray
    // 小时
    const hour = 24;
    // 分
    const minute = 60;
    for (let x = 0; x < hour; x++) {
      if (x <= 22 && x >= 6) {
        date[1].push(x < 10 ? `0${x}` : x);
      }
    }
    date[2] = ['时']
    for (let y = 0; y < hour; y++) {
      date[3].push(y < 10 ? `0${y}` : y);
    }
    date[4] = ['分']
    date[5] = date[1];
    date[6] = ['时']
    date[7] = date[3];
    date[8] = ['分'];
    this.timeArray = date;
  },
  methods: {
    bindTimePickerChange: function(e) {
      const arr = e.mp.detail.value;
      const { timeArray } = this;
      const select = [
        (timeArray[0][arr[0]]).replace('周', '星期'),
        timeArray[1][arr[1]],
        timeArray[3][arr[3]],
        timeArray[5][arr[5]],
        timeArray[7][arr[7]]
      ];
      this.$emit("onTimePicker", select);
    }
  }
};
</script>

<style>
</style>


