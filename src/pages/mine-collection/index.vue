/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月21日
 * 修改时间：2018年09月21日
 * 描述信息：我的收藏
 */
<template>
  <div>
    <Navbar :index='index' @onNodeClick='onNavbar' :data='navbar3' />
    <IconRightList v-if="tabName === 'article'" @onNodeClick='onIconRList' :data='iconRightListData'/>
    <ViewList v-else @onViewList='onViewListClick' :data='viewListData' />
  </div>
</template>

<script>
import Navbar from "../../components/navbar/navbar";
import IconRightList from "../../components/icon-rl-list/icon-rl-list";
import { navbar3 } from "../../components/navbar/data.js";
import data from "../../components/icon-rl-list/data.js";
import ViewList from "../../components/view-list/view-list";
// import viewListData from "../../components/view-list/data.js";
import service from "../evaluation/service.js";

export default {
  components: { Navbar, IconRightList, ViewList },
  data() {
    return {
      // 导航栏数据
      navbar3,
      // 文章列表数据
      iconRightListData: [],
      // 课程列表数据
      viewListData: [],
      // { article | course }
      tabName: "article",
      index: 0,
    };
  },
  onShow() {
    // 重置data 完成初始化
    Object.assign(this.$data, this.$options.data());
  },
  onLoad() {
    global.PUBLIC.util
      .httpOther("GET", `/collect`, {
        // 获取收藏
        login_id: global.PUBLIC.util.getUser().id
      })
      .then(res => {
        this.iconRightListData = res.data.document;
        this.viewListData = res.data.course;
      });
  },
  computed: {},
  methods: {
    /** 单击列表
     * @param {Object} node 节点属性
     * @memberof IconRightList
     */
    onIconRList(node) {
      global.PUBLIC.util.jumpNavigateTo(
        `web-view/main?url=${encodeURIComponent(node.url)}`
      );
    },
    /** 单击导航栏
     * @param {Object} node 节点属性
     * @param {number} index 索引
     * @memberof Navbar
     */
    onNavbar(node, index) {
      this.tabName = node.name;
      this.index = index
      this.viewListData = this.viewListData.map(value => {
        if (value.detail.lola) {
          const lolaArr = value.detail.lola.split(",");
          global.PUBLIC.util.calDistance(lolaArr[1], lolaArr[0]).then(res => {
            value.detail.lola = res;
          });
        }
        return value;
      });
    },
    /** 子组件传值
     * @param {Object} 节点属性
     * @memberof ViewList
     */
    onViewListClick(node) {
      service.setData(node);
      global.PUBLIC.util.jumpNavigateTo(
        `institutional-products/main?dp_code=${node.dp_code}`
      );
    }
  }
};
</script>

<style>
</style>