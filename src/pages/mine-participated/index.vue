/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月22日
 * 修改时间：2018年09月22日
 * 描述信息：我参加过到页面
 */
<template>
    <div>
        <Navbar @onNodeClick='onNavbar' :data='navbar4' />
        <ViewListEval v-if="saveNavbarNode === 'course'" :data='courseData'/>
        <IconLeftList v-else type='left' :data='activeData' />
    </div>
</template>

<script>
import { navbar4 } from "../../components/navbar/data.js";
import Navbar from "../../components/navbar/navbar";
import ViewListEval from "../../components/view-list-eval/view-list-eval";
import viewListEvalData from "../../components/view-list-eval/data.js";
import IconLeftList from "../../components/icon-rl-list/icon-rl-list";
import iconLeftListData from "../../components/icon-rl-list/data.js";

export default {
  components: { Navbar, ViewListEval, IconLeftList },
  data() {
    return {
      // navbar数据
      navbar4,
      // 课程列表数据
      courseData: viewListEvalData,
      // 保存tab切换数据
      saveNavbarNode: "course",
      // 活动列表数据
      activeData: iconLeftListData
    };
  },
  computed: {},
  methods: {
    /** 单击节点
     * @param {Object} node 节点属性
     * @memberof Navbar
     */
    onNavbar(node) {
      this.saveNavbarNode = node.name;
    }
  }
};
</script>

<style>
</style>