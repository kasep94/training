/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月21日
 * 修改时间：2018年09月21日
 * 描述信息：我的收藏
 */
<template>
  <div>
    <Navbar @onNodeClick='onNavbar' :data='navbar3' />
    <IconRightList v-if="tabName === 'article'" @onNodeClick='onIconRList' :data='iconRightListData'/>
    <ViewList v-else @onSortClick='onSortClick' :data='viewListData' />
  </div>
</template>

<script>
import Navbar from "../../components/navbar/navbar";
import IconRightList from "../../components/icon-rl-list/icon-rl-list";
import { navbar3 } from "../../components/navbar/data.js";
import data from "../../components/icon-rl-list/data.js";
import ViewList from "../../components/view-list/view-list";
import viewListData from "../../components/view-list/data.js";

export default {
  components: { Navbar, IconRightList, ViewList },
  data() {
    return {
      // 导航栏数据
      navbar3,
      // 文章列表数据
      iconRightListData: data,
      // 课程列表数据
      viewListData,
      // { article | course }
      tabName: "article"
    };
  },
  computed: {},
  methods: {
    /** 单击列表
     * @param {Object} node 节点属性
     * @memberof IconRightList
     */
    onIconRList(node) {
      console.log(node);
    },
    /** 单击导航栏
     * @param {Object} node 节点属性
     * @memberof Navbar
     */
    onNavbar(node) {
      this.tabName = node.name;
      this.viewListData = this.viewListData.map(value => {
        if (value.detail.lola) {
          const lolaArr = value.detail.lola.split(",");
          global.PUBLIC.util.calDistance(lolaArr[1], lolaArr[0]).then(res => {
            value.detail.lola = res;
          });
        }
        return value;
      });
    }
  }
};
</script>

<style>
</style>