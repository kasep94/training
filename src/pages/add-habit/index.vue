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
      iconListData,
      // 保存点击编辑都节点属性
      saveNode: null
    };
  },
  /** 返回刷新页面 */
  onShow() {
    const node = this.saveNode;
    if (node) {
      node.children = [];
      this.getHabitList(node.id, node);
    }
  },
  mounted() {
    global.PUBLIC.util.setTitle("添加习惯");
  },
  computed: {},
  methods: {
    /** 组件通信
     * @param {Object} 节点属性
     * @memberof IconList
     */
    onLoadMore(node) {
      // 后面换成接口请求
      if (node.children && node.children.length === 0) {
        this.saveNode = node;
        this.getHabitList(node.id, node);
      }
    },
    /** 获取习惯列表接口数据
     * @param {'learning' | 'living' | 'friend' | 'health' | 'behave'} type 接口参数
     * @param {Object} node 节点属性
     */
    getHabitList(type, node) {
      global.PUBLIC.util
        .httpGet("/habit/meta", {
          type,
          trainee_id: 2,
          page_size: 100
        })
        .then(res => {
          const data = res.data.items.map(value => {
            value.icon = value.remark.icon;
            value.label = value.name;
            return value;
          });
          node.children = data;
        });
    }
  }
};
</script>

<style scoped lang='less'>
.add-habit {
}
</style>