/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：项目入口文件
 */

<script>
import util from "./public";
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    global.PUBLIC = {
      util
    };

    console.log("app created and cache logs by setStorageSync");
  }
};
</script>

<style>
.flex {
  display: flex;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-left {
  display: flex;
  justify-content: row;
}
.flex-left-center {
  display: flex;
  align-items: center;
}
.flex-both {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-end {
  display: flex;
  align-items: flex-end;
}
.gray {
  font-size: 22rpx;
  color: #677897;
}
.cl-gray {
  font-size: 24rpx;
  color: #677897;
}
.cl-black {
  font-size: 24rpx;
  font-weight: 400;
  color: #2e3c50;
}
.cl-b-black {
  font-size: 28rpx;
  color: #2e3c50;
  font-weight: 400;
}
.bt-border {
  border-bottom: 20rpx solid #f4f6f8;
}

.top-border {
  border-top: 20rpx solid #f4f6f8;
}

.scroll-div {
  white-space: nowrap;
  display: flex
}

.scroll-div .scroll-child {
  display: inline-block;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
