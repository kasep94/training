/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月18日
 * 修改时间：2018年09月18日
 * 描述信息：教育视角
 */
 <template>
  <div>
   <Search @onSearch='onSearch' />
   <Navbar @onNodeClick='onNavbar' :data='navbar1' />
   <IconRightList @onNodeClick='onIconRList' :data='iconRightListData'/>
  </div>
 </template>

 <script>
import Search from "../../components/search/search";
import Navbar from "../../components/navbar/navbar";
import { navbar1 } from "../../components/navbar/data.js";
import IconRightList from "../../components/icon-rl-list/icon-rl-list";

export default {
  components: { Search, Navbar, IconRightList },
  data() {
    return {
      // tab数据
      navbar1,
      // 列表数据
      iconRightListData: null,
      // 保存单击节点数据 {'教育视角' | '育儿分享'}
      saveName: '教育视角'
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /** 单击列表
     * @param {Object} node 节点属性
     * @memberof IconRightList
     */
    onIconRList(node) {
      console.log(node)
      global.PUBLIC.util.jumpNavigateTo(`web-view/main?url=${encodeURIComponent(node.url)}`);
    },
    /** 单击搜索
     * @param {String} value 输入的值
     * @memberof Search
     */
    onSearch(value) {
      this.getData(value)
    },
    /** 调用接口获取内容
     * @param {String} title 搜索参数
     */
    getData(title = '') {
      global.PUBLIC.util
        .httpGet("/doc", {
          "@tags": this.saveName,
          order_by: "id",
          '@title': title,
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
     * @memberof Navbar
     */
    onNavbar(node) {
      this.this.saveName = node.label
      this.getData();
    }
  }
};
</script>

<style scoped lang='less'>
</style>
 
 
 