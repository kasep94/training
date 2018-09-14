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
    // console.log("success");
  },
  methods: {
    /** 组件通信
     * @param {Object} 节点属性
     * @memberof IconList
     */
    onLoadMore(node) {
      // 后面换成接口请求
      if (node.children && node.children.length === 0)
        this.getHabitList(node.id, node);
        // node.children = this.iconListData.children;
    },
    /** 获取习惯列表接口数据
     * @param {'learning' | 'living' | 'friend' | 'health' | 'behave'} type 接口参数
     * @param {Object} node 节点属性
     */
    getHabitList(type, node) {
      global.PUBLIC.util
        .httpGet("/habit/meta", {
          type,
          login_id: 1,
          page_size: 100
        })
        .then(res => {
          const data = res.data.items.map(value => {
            value.icon = value.remark.icon
            value.label = value.name
            return value
          })
          node.children = data
        });
    }
  }
};
</script>

<style scoped lang='less'>
.add-habit {
}
</style>