/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月22日
 * 修改时间：2018年09月22日
 * 描述信息：最近浏览页面
 */
<template>
    <div class="home_page">
        <Navbar @onNodeClick='onNavbar' :data='navbar5' />
        <IconRlList @onNodeClick="onWebView" v-if="tabName === 'article'" :data='articleData'/>
        <ViewListEval v-else-if="tabName === 'course'" @onViewList='onViewListClick' :data='courseData' />
        <IconRlList @onNodeClick="onWebView" type='left' v-else-if="tabName === 'active'" :data='activeData'/>
    </div>
</template>

<script>
import Navbar from "../../components/navbar/navbar";
import { navbar5 } from "../../components/navbar/data.js";
import IconRlList from "../../components/icon-rl-list/icon-rl-list";
import data from "../../components/icon-rl-list/data.js";
import ViewListEval from "../../components/view-list-eval/view-list-eval";
import courseData from "../../components/view-list/data.js";
import service from "../evaluation/service.js";

export default {
  components: { Navbar, IconRlList, ViewListEval },
  data() {
    return {
      navbar5,
      // 保存tab切换节点名
      tabName: "article",
      // 文章列表数据
      articleData: [],
      // 课程列表数据
      courseData: [],
      // 活动列表数据
      activeData: []
    };
  },
  onLoad() {
    global.PUBLIC.util
      .httpOther("GET", `/visit`, {
        // 获取收藏
        login_id: global.PUBLIC.util.getUser().id
      })
      .then(res => {
        const { course, activity, document } = res.data;
        this.courseData = course;
        this.articleData = document;
        this.activeData = activity;
      });
  },
  computed: {},
  methods: {
    /** 单击导航栏
     * @param {Object} node 节点属性
     * @memberof Navbar
     */
    onNavbar(node) {
      this.tabName = node.name;
    },
    /** 单击文章和活动
     * @param {Object} node
     */
    onWebView(node) {
      console.log(node);
      global.PUBLIC.util.jumpNavigateTo(
        `web-view/main?url=${encodeURIComponent(node.url)}`
      );
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