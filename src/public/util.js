/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：工具类
 */

const util = (() => {
  const ip = process.env.ip;
  // 小程序经纬度
  let wxDistamce = null;

  /** 计算是否是闰年
   * @param {number} year 年份
   */
  function isLeapYear(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      // 闰年
      return 29
    } else {
      // 不是闰年
      return 28
    }
  }

  /** 计算本周星期和星期 */
  function jumpWeek(date = new Date()) {
    const time = date;
    const show_day1 = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    // 年份
    let year = time.getFullYear();
    // 一年中每月的天数
    const dayCountOfMonth = [31, isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // 一个月中的某天
    let day = time.getDate();
    // 星期
    let weekNum = time.getDay()
    // 月份
    let month = time.getMonth() + 1;
    const arr = []
    for (let i = 0; i < 7; i++) {
      if (weekNum === 7) weekNum = 0;
      // 获取当月天数
      const dayCount = dayCountOfMonth[month - 1]
      if (day > dayCount) {
        day = 1
        month += 1
        if (month > 12) {
          month = 1
          year += 1
        }
      }

      arr.push({
        week: show_day1[weekNum],
        day: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
      })
      day++;
      weekNum++;
    }
    return arr
  }

  /** 获取年月日星期等数据
   * @param {Date} date 
   */
  function getDate(date = new Date()) {
    const show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    const time = date;
    // 年份
    const year = time.getFullYear();
    // 月份
    const month = time.getMonth() + 1;
    // 一个月中的某天
    const day = time.getDate();
    // 星期
    const weekNum = time.getDay()
    // 星期几
    const week = show_day[weekNum];
    // 小时
    const hour = time.getHours();
    // 分
    const minutes = time.getMinutes();
    // 秒
    const second = time.getSeconds();
    // 一年中每月的天数
    const dayCountOfMonth = [31, isLeapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 本周星期和星期
    const thisWeek = jumpWeek()
    return {
      week,
      year,
      month,
      day,
      hour,
      minutes,
      second,
      calendar: `${year}年${month}月${day}日`,
      calendar1: `${year}-${month}-${day}`,
      dayCountOfMonth,
      thisWeek
    }
  }

  /** 转换日期
   * @param {Array} data 数据
   * @return {Array} 调用接口数据
   */
  function conversionDate(data) {
    const arr = []
    data.forEach(v => {
      const weeks = [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ];
      arr.push({
        day: weeks.indexOf(v[0]),
        start: `${v[1]}:${v[2]}`,
        end: `${v[3]}:${v[4]}`
      })
    })
    return arr
  }

  /** 计算后台返回时间
   * @param {Array} data 接口返回参数
   * @return 转换的数据
   */
  function jumpApiDate(data) {
    const timeArr = []
    data.map(value => {
      const week = value.rule;
      const end = week.end.split(":");
      const start = week.start.split(":");
      const weeks = [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ];
      if (week.day === "*") {
        // 每天
        weeks.forEach(w => {
          timeArr.push([w, ...start, ...end, value]);
        });
      } else {
        timeArr.push([weeks[Number(week.day)], ...start, ...end, value]);
      }
    });
    return timeArr
  }

  /**
   * @param {'post' | 'put'} method
   * @param {String} url 请求地址
   * @param {Object<method: string, data: Object>} params 请求参数和传给服务器的数据
   * @param {Boolean} showError 是否显示错误信息
   */
  function httpOther(method, url = '', body = {}, showError = true) {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${ip + url}`,
        data: {
          page_size: 10,
          ...body
        },
        method: method,
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

  /**
   * @param {String} url 请求地址
   * @param {Object<method: string, data: Object>} params 请求参数和传给服务器的数据
   * @param {Boolean} showError 是否显示错误信息
   */
  function httpGet(url = '', body = {}, showError = false) {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${ip + url}`,
        data: {
          page_size: 10,
          ...body
        },
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

  /** 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param {String} url 
   */
  function jumpSwitchTab(url) {
    wx.switchTab({
      url: `../${url}`
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
      })
    })

  }


  return {
    setTitle,
    httpOther,
    httpGet,
    jumpNavigateTo,
    getLocation,
    calDistance,
    getDate,
    jumpApiDate,
    conversionDate,
    jumpSwitchTab
  }
})()

export default util;
