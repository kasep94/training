// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import btnsData from "./data.js"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...btnsData
  },
  mutations: {
    /** 单击节点 */
    onBtnsClick: (state, node) => {
      const obj = state
      if (node.index === 1) {
        obj.btns1.selected = node.name
      } else {
        obj.btns2.selected = node.name
      }
    },
  }
})

export default store
