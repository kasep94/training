/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：工具类
 */

const util = (() => {
  const ip = 'https://api.check-check.cn/api';
  // 小程序经纬度
  let wxDistamce = null;

  /**
   * @param {String} url 请求地址
   * @param {Object<method: string, data: Object>} params 请求参数和传给服务器的数据
   * @param {Boolean} showError 是否显示错误信息
   */
  function httpGet(url = '', body = {}, showError = true) {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${ip + url}`,
        data: {...body, page_size: 10},
        method: 'GET',
        header: {
          "content-type": "application/json"
        },
        success: res => {
          wx.hideLoading()
          if (showError) {
            if (res.statusCode < 200 || res.statusCode > 300) {
              wx.showToast({
                title: '服务器异常',
                icon: 'none',
                duration: 2000
              })
              return reject(res.data || {});
            }
          }

          return resolve(res.data || {});
        },
        fail: res => {
          wx.hideLoading()
          if (showError) {
            wx.showToast({
              title: '服务器异常',
              icon: 'none',
              duration: 2000
            })
          }
        }
      });
    });
  }

  /** 动态设置当前页面的标题
   * @param {string} title 标题
   */
  function setTitle(title) {
    wx.setNavigationBarTitle({
      title: title
    });
  }

  /** 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
   * @param {string} url 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。
   * @param {() => void} success 接口调用成功的回调函数
   * @param {() => void} fail 接口调用失败的回调函数
   * @param {() => void} complete 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  function jumpNavigateTo(url, success = null, fail = null, complete = null) {
    wx.navigateTo({
      url: '../' + url,
      success,
      fail,
      complete
    })
  }

  /** 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
   * @returns Promise<Object>
   */
  function getLocation() {
    return new Promise(resolve => {
      if (wxDistamce) {
        resolve(wxDistamce)
      } else {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            /* var latitude = res.latitude
            var longitude = res.longitude
            var speed = res.speed
            var accuracy = res.accuracy */
            wxDistamce = res;
            resolve(res)
          }
        })
      }
    })
  }

  /** 计算距离
   * @param {number} la2 纬度
   * @param {number} lo2 经度
   */
  function calDistance(la2, lo2) {
    return new Promise(resolve => {
      this.getLocation().then(res => {
        var La1 = res.latitude * Math.PI / 180.0;
        var La2 = la2 * Math.PI / 180.0;
        var La3 = res.latitude - La2;
        var Lb3 = res.longitude * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
        s = s * 6378.137; //地球半径
        s = Math.round(s * 10000) / 10000;
        if (isNaN(s)) {
          resolve('0m')
        } else {
          let sArr = String(s).split('.')[0];
          resolve(sArr > 1000 ? `${String(sArr/1000).split('.')[0]}km` : `${sArr}m`)
        }
        // console.log(s)
      })
    })

    /* var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137; //地球半径
    s = Math.round(s * 10000) / 10000;
    console.log(s) */
    // return s
    // console.log("计算结果",s)
  }


  return {
    setTitle,
    httpGet,
    jumpNavigateTo,
    getLocation,
    calDistance
  }
})()

export default util;
