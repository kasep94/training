/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：工具类
 */

const util = (() => {
  const ip = 'https://www.baidu.com/';

  /**
   * @param {String} url 请求地址
   * @param {Object<method: string, data: Object>} params 请求参数和传给服务器的数据
   * @param {Boolean} showError 是否显示错误信息
   */
  function httpGet(url = '', params = {}, showError = true) {
    const { method = 'GET', data } = params
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${ip + url}`,
        data,
        method,
        header: {
          "content-type": "application/json"
        },
        success: res => {
          if (showError) {
            if (res.statusCode < 200 || res.statusCode > 300) {
              return reject(res.data || {});
            } else if (Number(res.data.status) !== 0) {
              return reject(res.data || {});
            }
          }

          return resolve(res.data || {});
        },
        complete: res => {
          // TODO:
          console.log('接口报错')
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
      url,
      success, fail, complete
    })
  }
  return {
    setTitle,
    httpGet,
    jumpNavigateTo
  }
})()

export default util;
