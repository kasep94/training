import Vue from 'vue'
import App from './index'


const app = new Vue(App)
app.$mount()

// 这个是我们约定的额外的配置
export default {
  // 这个字段下的数据会被填充到 app.json ／ page.json
  config: {
    "navigationBarTitleText": "测评",
    "enablePullDownRefresh": true
  }
};
