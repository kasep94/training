/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月18日
 * 修改时间：2018年09月18日
 * 描述信息：首页跳转的页面
 */
 <template>
  <div>
    <Search @onSearch='onSearch' />
    <Navbar @onNodeClick='onNavbar' :index='index' :data='navbarData' />
    <IconRightList @onNodeClick='onIconRList' :data='iconRightListData'/>
  </div>
 </template>

 <script>
import Search from "../../components/search/search";
import Navbar from "../../components/navbar/navbar";
import { navbar1, navbar2 } from "../../components/navbar/data.js";
import IconRightList from "../../components/icon-rl-list/icon-rl-list";

export default {
  components: { Search, Navbar, IconRightList },
  data() {
    return {
      // tab数据
      navbarData: null,
      // 列表数据
      iconRightListData: null,
      // 保存单击节点数据 {'活动预告' | '往期活动' | '教育视角' | '育儿分享'}
      saveName: "",
      index: 0
    };
  },
  onLoad(option) {
    const { type } = option;
    switch (type) {
      case "1":
        this.navbarData = navbar1;
        this.saveName = "活动预告";
        break;
      case "2":
        this.index = 1;
        this.navbarData = navbar1;
        this.saveName = "往期活动";
        break;
      case "3":
        this.saveName = "教育视角";
        this.navbarData = navbar2;
        break;
      case "4":
        this.index = 1;
        this.saveName = "育儿分享";
        this.navbarData = navbar2;
        break;
    }
    this.getData();
  },
  methods: {
    /** 单击列表
     * @param {Object} node 节点属性
     * @memberof IconRightList
     */
    onIconRList(node) {
      global.PUBLIC.util.jumpNavigateTo(
        `web-view/main?url=${encodeURIComponent(node.url)}`
      );
    },
    /** 单击搜索
     * @param {String} value 输入的值
     * @memberof Search
     */
    onSearch(value) {
      this.getData(value);
    },
    /** 调用接口获取内容
     * @param {String} title 搜索参数
     */
    getData(title = "") {
      global.PUBLIC.util
        .httpGet("/doc", {
          "@tags": this.saveName,
          order_by: "id",
          "@title": title
        })
        .then(res => {
          this.iconRightListData = res.data.items;
          if (this.iconRightListData.length === 0) {
            wx.showToast({
              title: "空空如也~",
              icon: "none",
              duration: 2000
            });
          }
        });
    },
    /** 单击导航栏
     * @param {Object} node 节点属性
     * @param {Number} index 数组索引
     * @memberof Navbar
     */
    onNavbar(node, index) {
      this.saveName = node.label;
      this.index = index;
      this.getData();
    }
  }
};
</script>

<style scoped lang='less'>
</style>
 
 
 