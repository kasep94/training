/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月22日
 * 修改时间：2018年09月22日
 * 描述信息：我参加过到页面
 */
<template>
    <div>
        <!-- <Navbar @onNodeClick='onNavbar' :data='navbar4' /> -->
        <!-- <ViewListEval v-if="saveNavbarNode === 'course'" :data='courseData'/> -->
        <IconLeftList type='left' @onNodeClick='onActivity' :data='activeData' />
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
      courseData: [],
      // 保存tab切换数据
      saveNavbarNode: "course",
      // 活动列表数据
      activeData: []
    };
  },
  onLoad() {
    global.PUBLIC.util
      .httpOther("GET", `/punch/login`, {
        // 获取收藏
        login_id: global.PUBLIC.util.getUser().id
      })
      .then(res => {
        this.courseData = res.data.course;
        this.activeData = res.data.activity.map(v => {
          return {
            ...v.activity,
            tags: v.create_date
          };
        });
      });
  },
  computed: {},
  methods: {
    /** 单击节点
     * @param {Object} node 节点属性
     * @memberof Navbar
     */
    onNavbar(node) {
      this.saveNavbarNode = node.name;
    },
    /** 单击节点
     * @param {Object} node 节点属性
     * @memberof IconLeftList
     */
    onActivity(node) {
      global.PUBLIC.util.jumpNavigateTo(
        `web-view/main?url=${encodeURIComponent(node.url)}`
      );
    }
  }
};
</script>

<style>
</style>