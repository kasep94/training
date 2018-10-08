/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：评测页面
 */
<template>
    <div class="home_page">
        <Search @onSearch='onSearch'/>
        <SelectedList title='年龄:' v-on:onNodeClick="(node) => onSelectedClick('suit_crowds', node)" :data='data.selectedData1' />
        <SelectedList title='科目:' v-on:onNodeClick="(node) => onSelectedClick('config_name', node)" :data='subject' />
        <SortList @onSortClick='onSortClick' :data='sortData' />
        <ViewList @onViewList='onViewListClick' :data='viewListData' />
    </div>
</template>

<script>
import SelectedList from "../../components/selectedList/selectedList";
import SortList from "../../components/sortList/sortList";
import sortData from "../../components/sortList/data.js";
import ViewList from "../../components/view-list/view-list";
import data from "./data.js";
import config from "../../public/config.js";
import service from "./service.js";
import Search from '../../components/search/search'

export default {
  data() {
    return {
      // 静态数据
      data,
      // 列表数据
      viewListData: [],
      // 科目数据
      subject: null,
      // 获取列表请求参数
      params: {},
      // 排序数据
      sortData,
      // 页面
      page: 1,
    };
  },
  onLoad() {
    // 获取搜索头
    global.PUBLIC.util.httpGet("/merchantsTemplate").then(res => {
      this.subject = res.data.items;
    });
    this.getList();
  },
  mounted() {},
  components: {
    SelectedList,
    SortList,
    ViewList,
    Search
  },
  computed: {},
  /** 下拉刷新 */
  onPullDownRefresh() {
    this.page = 1;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    this.getList().then(res => {
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    });
  },
  /** 上拉加载，拉到底部触发 */
  onReachBottom() {
    // 到这底部在这里需要做什么事情
    this.getList();
  },
  methods: {
    /** 输入框
     * @param {String} value 输入都搜索内容
     * @memberof Search
     */
    onSearch(value) {
      if (value) {
        this.page = 1;
        this.getList(value);
      }
    },
    /** 组件通信
     * @param {Object} node 节点属性
     * @memberof SortList
     */
    onSortClick(node) {
      this.page = 1;
      this.params.evironment = 0;
      this.params.teaching = 0;
      this.params.effect = 0;
      this.params[node.name] = 1;
      this.getList();
    },
    /** 获取列表数据
     * @param {string} query 搜索的内容
     */
    getList(query = "") {
      const login_id = global.PUBLIC.util.getUser().id
      return new Promise(resolve => {
        if (this.page !== null) {
          global.PUBLIC.util
            .httpGet("/assess/search", {
              ...this.params,
              page: this.page,
              login_id,
              query
            })
            .then(res => {
              if (
                Object.prototype.toString.call(res.data) === "[object Object]"
              ) {
                wx.showToast({
                  title: "搜索不到内容",
                  icon: "none",
                  duration: 2000
                });
                this.page = query ? 1 : null;
              } else {
                this.page += 1;
              }
              const data = res.data.map(value => {
                if (value.detail.lola) {
                  const lolaArr = value.detail.lola.split(",");
                  global.PUBLIC.util
                    .calDistance(lolaArr[1], lolaArr[0])
                    .then(res => {
                      value.detail.lola = res;
                    });
                }
                return {
                  ...value, 
                  head_pic_more: value.head_pic_more !== 'http://img.weyoo-inc.comnull' ? value.head_pic_more : ''};
              });
              this.viewListData =
                this.page === 2 ? data : this.viewListData.concat(data);
              resolve(true);
            });
        }
      });
    },
    /** 子组件传值
     * @param {'suit_crowds' | 'config_name'} name 判断是哪个点击事件
     * @param {Object} 节点属性
     * @memberof SelectedList
     */
    onSelectedClick(name, node) {
      this.params[name] = node.config_name;
      this.page = 1;
      this.getList();
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
