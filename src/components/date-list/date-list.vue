/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：课题表组件
 * 影响模块：course、
 */
<template>
<div class="data-list-comp">
  <scroll-view scroll-x >
    <div :class="['content', {second: index !== 0}]" v-for="(item, index) of data" :key='index'>
      <div v-for="(value, i) of item"
        @click='onDateList(value)'
        :class="['box', {active: index >= 1 && i >=1 && value}]"
        :key="i">
        <div v-if="value" v-for="(v, z) of value" :key="z">
          <span :class="['date', z !== 0 ? 'hide' : '']" v-if="index === 0 || i === 0">{{z===0 ? value : ''}}</span>
          <p v-else-if='value'>
            <span>{{v.start_hour}}~{{v.end_hour + '\n'}}</span>
            <span>{{v.schedule.title}}</span>
          </p>
        </div>
        
      </div>
    </div>
  </scroll-view>
  
</div>
  
</template>

<script>
export default {
  props: [
    "data" // Array
  ],
  created() {
  },
  methods: {
    /** 节点属性
     * @param {Object} node 节点属性
     */
    onDateList(node) {
      if (node) {
        this.$emit("onNodeClick", node);
      }
    }
  }
};
</script>

<style scoped lang='less'>
.data-list-comp {
  .content {
    width: 500px;
    display: flex;
    font-size: 20rpx;
    height: 152rpx;
  }
  .content:nth-of-type(1) {
    background: rgba(245, 247, 249, 1);
    box-shadow: 0px 4px 10px 0px rgba(142, 167, 199, 0.05);
    font-size: 22rpx;
    height: 88rpx;
    .box {
      border-color: rgba(245, 247, 249, 1);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .box:nth-of-type(1) {
    width: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    border: 1rpx solid rgba(232, 235, 242, 1);
    width: 134rpx;
    margin-top: -1rpx;
    margin-right: -1rpx;
    .date {
      display: block;
      width:50rpx;
    }
    .hide {
      display: none;
    }
  }
  .content:nth-of-type(2) .active {
    border: 1rpx solid @cl-10;
    border-top: 4rpx solid @cl-11;
    background-color: @cl-10;
    z-index: 2;
  }
  .content:nth-of-type(3) .active {
    border: 1rpx solid @cl-12;
    border-top: 4rpx solid @cl-13;
    background-color: @cl-12;
    z-index: 2;
  }
  .content:nth-of-type(4) .active {
    border: 1rpx solid @cl-14;
    border-top: 4rpx solid @cl-15;
    background-color: @cl-14;
    z-index: 2;
  }
  .active span {
    display: block;
    width: 110rpx !important;
    margin: 0 0 0 6rpx;
  }
  .active {
    overflow: auto;
    span:nth-of-type(1) {
      margin-top: 14rpx;
    }
  }
  .second span:nth-of-type(1),
  .content .box:nth-of-type(1) span {
    width: 20rpx;
    text-align: center;
  }
}
</style>
