/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月25日
 * 修改时间：2018年09月25日
 * 描述信息：单选
 */

<template>
  <view class="section">
    <picker @change="bindTimePickerChange" :value="timeIndex" :range="data" range-key="name">
      <view class="picker">
        <div class="time-select">
            <input disabled class="btn-1" type="text" :placeholder="info"/>
        </div>
      </view>
    </picker>
  </view>
</template>

<script>

export default {
  props: {
    data: {
      type: Array
    },
    info: {
      type: String
    }
  },
  data() {
    return {
      timeIndex: 0
    };
  },
  methods: {
    bindTimePickerChange: function(e) {
      console.log(e.mp.detail.value)
      this.$emit("onPicker", e.mp.detail.value);
    }
  }
};
</script>


