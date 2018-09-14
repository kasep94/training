/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月04日
 * 修改时间：2018年09月04日
 * 描述信息：图文列表二级菜单组件
 */
<template>
    <div class="icon-list">
      <div class="icon-list-main" v-for="item of data" :key="item.id">
        <div class="icon-list-content flex-both" @click='onMore(item)'>
            <div class="flex-left-center">
                <img class="habit-icon" :src="item.icon"/>
                <p class="habit">{{item.label}}</p>
            </div>
            <div class="flex-left-center">
                <p class="expand">{{hasMore === item.id ? '收起' : '展开'}}</p>
                <i :class="['icon icon-more', hasMore === item.id ? 'down' : 'right']" />
            </div>
        </div>
        <!-- 子节点 -->
        <div v-if="hasMore === item.id" class="icon-list-main " v-for="(child, i) of item.children" :key="i">
          <div :class="['icon-list-content', 'flex-both', i < item.children.length - 1 ? 'icon-list-child' : '']">
              <div class="flex-left-center">
                  <img class="child-habit-icon" :src="child.icon"/>
                  <p class="habit">{{child.label}}</p>
              </div>
              <div class="flex-left-center">
                  <span @click="addHabit(child)" :class="['add', child.attached ? 'sel' : '']">{{child.attached ? '已添加' : '添加'}}</span>
              </div>
          </div>
          <items :data='item.children'></items>
        </div>
        <!-- 子节点end -->
      </div>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      // String 展开的节点id
      hasMore: null
    };
  },
  mounted() {
    global.PUBLIC.util.setTitle("添加习惯");
  },
  computed: {},
  methods: {
    /** 单击展开
     * @param {Object} node 单击的节点
     */
    onMore(node) {
      this.hasMore = node.id === this.hasMore ? null : node.id;
      this.$emit('onMore', node)
    },
    /** 添加或者取消添加
     * @param {Object} childNode 子节点节点数据
     */
    addHabit(childNode) {
      // childNode.attached = !childNode.attached
      if (!childNode.attached) {
        global.PUBLIC.util.jumpNavigateTo("edit-habit/main");
      }
    }
  }
};
</script>

<style scoped lang='less'>
.icon-list {
  .icon-list-main {
    width: 750rpx;
  }
  .down {
    transform:rotate(90deg);
    transition: .5s;
  }
  .right {
    transform:rotate(0deg);
    transition: .5s;
  }
  .icon-list-content {
    padding: 0 30rpx;
    height: 120rpx;
    border-bottom: 1px solid @cl-6;
    .add {
      background: @cl-4;
      font-size: 24rpx;
      padding: 8rpx 36rpx;
      color: white;
      border-radius: 25rpx;
    }
    .habit-icon {
      height: 42rpx;
      width: 40rpx;
      margin-right: 15rpx;
    }
    .child-habit-icon {
      height: 80rpx;
      width: 80rpx;
      margin-right: 15rpx;
    }
    .habit {
      font-size: 28rpx;
      color: @cl-1;
    }
    .expand {
      font-size: 26rpx;
      color: @cl-5;
    }
    .sel {
      background: #DDE2F0;
    }
  }
  .icon-list-child {
    width: 690rpx;
    padding: 0;
    margin: 0 auto;
  }
}
</style>