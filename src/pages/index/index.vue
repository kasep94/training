/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：登入页
 */
<template>
  <div>
   <view class="userinfo">
     <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">
      <view class="userinfo-avatar">
        <open-data  type="userAvatarUrl"></open-data>
      </view>
      <open-data type="userNickName"></open-data>
    </button>
  </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登入到页面地址
      loginPage: 'mine/main'
    }
  },
  onLoad() {
    const userInfo = wx.getStorageSync("$userInfo");
    if (userInfo) {
      global.PUBLIC.util.jumpSwitchTab(this.loginPage);
    }
  },
  methods: {
    onGotUserInfo: e => {
      // 用户信息
      wx.setStorage({
        key: "$userInfo",
        data: JSON.stringify(e.target.userInfo)
      });
      // 所有信息
      wx.setStorage({
        key: "$loginInfo",
        data: JSON.stringify(e.target)
      });
      global.PUBLIC.util.jumpSwitchTab(this.loginPage);
    }
  }
};
</script>

<style>
.userinfo {
  position: relative;
  width: 750rpx;
  height: 320rpx;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userinfo-avatar {
  overflow: hidden;
  display: block;
  width: 160rpx;
  height: 160rpx;
  margin: 20rpx;
  margin-top: 50rpx;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}
.userinfo {
  margin-top: 200rpx;
  /* color: #fff; */
  font-size: 14px;
  /* background-color: #c0c0c0;
  border-radius: 40%; */
}
button {
  background: white;
  border: 0;
}
</style>

