/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：评测页面
 */
<template>
    <div class="home_page">
        <div class='header flex-center'>
            <img class="search" src="../../../static/images/evaluation/search.png" />
            <input placeholder="搜索内容" type="text"/>
        </div>
        <SelectedList title='年龄:' v-on:onNodeClick='onSelectedClick' :data='data.selectedData1' />
        <SelectedList title='科目:' v-on:onNodeClick='onSelectedClick' :data='data.selectedData2' />
        <SortList :data='data.sortData' />
        <ViewList @onViewList='onViewListClick' :data='viewListData' />
    </div>
</template>

<script>
import SelectedList from '../../components/selectedList/selectedList'
import SortList from '../../components/sortList/sortList'
import ViewList from '../../components/view-list/view-list'
// import viewListData from '../../components/view-list/data.js'
import data from './data.js'
import config from '../../public/config.js'

export default {
  data() {
    return {
      data,
      viewListData: [],
    }
  },
  created() {
    global.PUBLIC.util.httpGet('/assess/search').then(res => {
      this.viewListData = res.data.map(value => {
        if (value.head_pic){
          value.head_pic = config.url + value.head_pic
        }
        if (value.detail.lola) {
          const lolaArr = value.detail.lola.split(',')
          global.PUBLIC.util.calDistance(lolaArr[1], lolaArr[0]).then(res => {
            value.detail.lola = res
          })
        }
        return value
      })
    });
  },
  mounted() {
    global.PUBLIC.util.setTitle("测评");
  },
  components: {
      SelectedList,
      SortList,
      ViewList,
  },
  computed: {},
  methods: {
    /** 子组件传值
     * @param {Object} 节点属性
     * @memberof SelectedList
     */
    onSelectedClick(node) {
      console.log(node)
    },
    /** 子组件传值
     * @param {Object} 节点属性
     * @memberof ViewList
     */
    onViewListClick(node) {
      global.PUBLIC.util.jumpNavigateTo('product-evaluation/main')
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  height: 115rpx;
  width: 750rpx;
  border-bottom: 1px solid rgba(229, 232, 240, 1);
}
.header input {
  width: 610rpx;
  height: 60rpx;
  background: rgba(245, 247, 249, 1);
  border-radius: 100rpx;
  padding-left: 80rpx;
}
.search {
  height: 37rpx;
  width: 37rpx;
  left: 60rpx;
  position: absolute;
  z-index: 2;
}
</style>