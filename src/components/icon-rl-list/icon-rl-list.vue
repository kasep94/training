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
       <img v-if="type === 'left'" mode='center' :src="item.remark.pic_url || onlineUrl + 'mrtx/back1.png'" />
       <div>
         <p class="title">{{item.title}}</p>
         <p class="gray gray1">{{item.tags}}</p>
         <p class="gray">{{item.create_date}}</p>
       </div>
       <img v-if="type === 'right'" mode='center' :src="item.remark.pic_url || onlineUrl + 'mrtx/back1.png'" />
     </div>
   </div>
 </template>

 <script>
export default {
  data() {
    return {
      onlineUrl: process.env.onlineUrl
    };
  },
  props: {
    data: {
      type: Object
    },
    // 图片在左还是右
    type: {
      type: String,
      default: 'right'
    }
  },
  methods: {
    /** 单击节点属性
     * @param {Object} node 节点属性
     */
    onNodeClick(node) {
      this.$emit('onNodeClick', node)
    }
  }
};
</script>

 <style lang='less'>
.icon-right-list {
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
 
 
 