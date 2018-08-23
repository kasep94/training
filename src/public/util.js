/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：工具类
 */

const util = (() => {
  const ip = 'https://www.baidu.com/';

  /**
   * 
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
  return {
    setTitle,
    httpGet
  }
})()

export default util;
