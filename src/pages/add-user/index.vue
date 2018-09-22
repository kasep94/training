/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月20日
 * 修改时间：2018年09月20日
 * 描述信息：添加用户
 */
<template>
    <div class="add-user-page">
        <div class="flex-center">
            <div>
                <img @click="uploadPhoto" v-if="onlineUrl" class="avatar" :src="imgUrl ? imgUrl : onlineUrl + 'mrtx/avatar.png'"/>
                <p>上传头像</p>
            </div>
        </div>
        <p class="label flex-left-center"><img src="../../../static/images/all/pan.png" /><span>昵称</span></p>
        <input class="btn-1" type="text" placeholder="填写昵称" />
        <p @click='onSubmit' class="submit">确  定</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      onlineUrl: process.env.onlineUrl,
      // 上传的图片地址
      imgUrl: null
    };
  },
  computed: {},
  methods: {
    /** 提交 */
    onSubmit() {
      wx.navigateBack({ changed: true });
    },
    /** 从相册选择图片，或者拍照 */
    uploadPhoto() {
      const that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          this.imgUrl = tempFilePaths[0];
          // this.upload(that, tempFilePaths);
        }
      });
    },
    /** 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data */
    upload(page, path) {
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
        wx.uploadFile({
          url: constant.SERVER_URL + "/FileUploadServlet",
          filePath: path[0],
          name: "file",
          header: { "Content-Type": "multipart/form-data" },
          formData: {
            //和服务器约定的token, 一般也可以放在header中
            session_token: wx.getStorageSync("session_token")
          },
          success: function(res) {
            console.log(res);
            if (res.statusCode != 200) {
              wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: false
              });
              return;
            }
            var data = res.data;
            page.setData({
              //上传成功修改显示头像
              src: path[0]
            });
          },
          fail: function(e) {
            console.log(e);
            wx.showModal({
              title: "提示",
              content: "上传失败",
              showCancel: false
            });
          },
          complete: function() {
            wx.hideToast(); //隐藏Toast
          }
        });
    }
  }
};
</script>

<style lang='less'>
.add-user-page {
  padding: 50rpx 30rpx;
  .flex-center {
    p {
      font-size: 28rpx;
      color: @cl-1;
      margin-top: 21rpx;
      margin-bottom: 57rpx;
    }
  }
  .avatar {
    height: 122rpx;
    width: 122rpx;
    border-radius: 100%;
  }
  .label {
    font-size: 28rpx;
    img {
      height: 28rpx;
      width: 28rpx;
      margin-right: 20rpx;
    }
  }
  input {
    margin-top: 27rpx;
  }
  .submit {
    background: @cl-4;
    height: 100rpx;
    width: 690rpx;
    line-height: 100rpx;
    border-radius: 55px;
    color: white;
    text-align: center;
    margin-top: 80rpx;
  }
}
</style>