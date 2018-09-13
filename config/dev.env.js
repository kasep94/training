var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// 测试
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  onlineUrl: '"https://okcdn.apiweixin.top/asserts/img/"',
  localUrl: '"../../../static/images/all/"',
  ip: '"https://api.check-check.cn/api"',
})
