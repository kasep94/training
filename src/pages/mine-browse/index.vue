/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月22日
 * 修改时间：2018年09月22日
 * 描述信息：最近浏览页面
 */
<template>
    <div class="home_page">
        <Navbar @onNodeClick='onNavbar' :data='navbar5' />
        <IconRlList v-if="tabName === 'article'" @onNodeClick='onIconRList' :data='articleData'/>
        <ViewListEval v-else-if="tabName === 'course'" @onSortClick='onSortClick' :data='courseData' />
        <IconRlList type='left' v-else-if="tabName === 'active'" @onNodeClick='onIconRList' :data='activeData'/>
    </div>
</template>

<script>
import Navbar from "../../components/navbar/navbar";
import { navbar5 } from "../../components/navbar/data.js";
import IconRlList from "../../components/icon-rl-list/icon-rl-list";
import data from "../../components/icon-rl-list/data.js";
import ViewListEval from "../../components/view-list-eval/view-list-eval";
import courseData from "../../components/view-list/data.js";

export default {
  components: { Navbar, IconRlList, ViewListEval },
  data() {
    return {
      navbar5,
      // 保存tab切换节点名
      tabName: "article",
      // 文章列表数据
      articleData: data,
      // 课程列表数据
      courseData,
      // 活动列表数据
      activeData: data
    };
  },
  computed: {},
  methods: {
    /** 单击导航栏
     * @param {Object} node 节点属性
     * @memberof Navbar
     */
    onNavbar(node) {
      this.tabName = node.name;
    }
  }
};
</script>

<style>
</style>