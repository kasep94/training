/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月18日
 * 修改时间：2018年09月18日
 * 描述信息：图文列表，图片在右
 * 影响模块：perspective
 */
 <template>
   <div class="icon-right-list">
     <div class="flex-both content" v-for="item of data" :key="item.id" @click="onNodeClick(item)">
       <img v-if="type === 'left'" mode='widthFix' :src="item.remark.pic_url || onlineUrl + 'mrtx/back1.png'" />
       <div>
          <p class="title">{{item.title}}</p>
          <p class="gray gray1">{{item.tags}}</p>
          <div class="flex-both">
            <p class="gray">{{item.create_date}}</p>
            <p v-if="hasCol" @click="onCollection(item)" class="collection flex-left-center"><img src="../../../static/images/all/e_collection.png"/><span>{{item.has_collected ? '取消收藏' : '收藏'}}</span></p>
          </div>
          
       </div>
       <img v-if="type === 'right'" mode='widthFix' :src="item.remark.pic_url || onlineUrl + 'mrtx/back1.png'" />
     </div>
   </div>
 </template>

 <script>
export default {
  data() {
    return {
      onlineUrl: process.env.onlineUrl,
      isOnCollection: false
    };
  },
  props: {
    data: {
      type: Object
    },
    // 图片在左还是右
    type: {
      type: String,
      default: "right"
    },
    // 是否显示收藏
    hasCol: {
      type: Boolean
    }
  },
  methods: {
    /** 单击节点属性
     * @param {Object} node 节点属性
     */
    onNodeClick(node) {
      if (this.isOnCollection) {
        this.isOnCollection = false
      } else {
        this.$emit("onNodeClick", node);
      }
    },
    /** 单击收藏
     * @param {Object} node 节点属性
     */
    onCollection(node) {
      this.isOnCollection = true;
      this.$emit("onCollection", node);
    }
  }
};
</script>

 <style lang='less'>
.icon-right-list {
  .collection {
    font-size: 26rpx;
    color: @cl-1;
    img {
      height: 58rpx;
      width: 58rpx;
      margin-right: 10rpx;
    }
  }
  .content {
    width: 690rpx;
    margin: 0 auto;
    border-bottom: 1px solid @cl-6;
    padding: 38rpx 0 30rpx 0;
  }
  img {
    width: 259rpx;
    height: 180rpx;
    border-radius: 8rpx;
  }
  .title {
    width: 403rpx;
    height: 77rpx;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 40rpx;
    color: @cl-1;
    .clamp(2);
  }
  .gray1 {
    margin: 23rpx 0 5rpx 0;
  }
}
</style>
 
 
 