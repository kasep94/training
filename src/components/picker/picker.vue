<template>
  <view class="section">
    <view class="section__title">多列选择器</view>
    <picker mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="multiArray">
      <view class="picker">
        当前选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
      </view>
    </picker>
    <picker mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="multiArray">
      <view class="picker">
        添加日期：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
      </view>
    </picker>
  </view>
</template>

<script>
import data from "./data.js";

export default {
  data() {
    return {
      multiIndex: [0, 0, 0],
      multiArray: [[], [], []]
    };
  },
  created() {
    const { date } = data;
    // 小时
    const hour = 24;
    // 分
    const minute = 60;
    for (let x = 0; x < hour; x++) {
      date[1].push(x < 10 ? `0${x}` :x);
    }
    for (let y = 0; y < hour; y++) {
      date[2].push(y < 10 ? `0${y}` :y);
    }
    this.multiArray = date;
  },
  methods: {
    bindMultiPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
    }
  }
};
</script>

<style>
</style>


