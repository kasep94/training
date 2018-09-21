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

<style lang='less'>
@import './style/style.less';

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
