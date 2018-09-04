/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月04日
 * 修改时间：2018年09月04日
 * 描述信息：添加习惯页面
 */
<template>
    <div class="add-habit">
      <IconList @onMore='onLoadMore' :data='iconListData.data' />
    </div>
</template>

<script>
import IconList from "../../components/icon-list/icon-list.vue";
import iconListData from "../../components/icon-list/data.js";

export default {
  components: { IconList },
  data() {
    return {
      iconListData
    };
  },
  mounted() {
    global.PUBLIC.util.setTitle("添加习惯");
  },
  computed: {},
  /** 小程序组件销毁调用相应的接口 */
  onUnload() {
    console.log('success')
  },
  methods: {
    /** 组件通信
     * @param {Object} 节点属性
     * @memberof IconList
     */
    onLoadMore(node) {
      // 后面换成接口请求
      if (node.children && node.children.length === 0) node.children = this.iconListData.children;
    }
  }
};
</script>

<style scoped lang='less'>
.add-habit {
}
</style>