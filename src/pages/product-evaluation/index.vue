/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月01日
 * 修改时间：2018年09月01日
 * 描述信息：单个产品测评
 */
<template>
    <div v-if="details" class="product-evaluation-page">
        <swiper interval='3000' autoplay=false indicatorDots=false duration=1000>
            <block  v-for="item in details.detail_img_more" :key='item'>
              <swiper-item>
                  <img mode='aspectFill' :src="item" class="slide-image" width="355" height="150"/>
              </swiper-item>
            </block>
        </swiper>
        <div class="header bt-border">
            <div class="top">
                <div class="flex-both"><p>{{details.org_name}}</p><p @click="onCollection" class="collection flex-left-center"><img src="../../../static/images/all/e_collection.png"/><span>{{apiCourseDetail.has_collected ? '取消收藏' : '收藏'}}</span></p></div>
                <div class="flex-left-center">
                  <Star :data='details.org_score/10' />
                    <p class="price">{{price || 0}}元/课时</p>
                </div>
                <div class="flex-both">
                    <p class="gray flex-left-center"><span class="nowrap">{{details.productName}}</span> | {{details.update_time}}完成装修</p>
                    <p class="gray flex-left-center"><span class="nowrap">{{details.addr}}</span> | 距您{{details.detail.lola}}</p>
                </div>
            </div>
            <div class="center">
                <p class="cl-black">敲课评价</p>
                <p class="cl-gray">效果: {{details.the_effect}} | 师资: {{details.teach_quality}} | 环境: {{details.environment}}</p>
            </div>
            <div class="flex-both footer">
                <p class="cl-black flex-left-center">
                <img src="../../../static/images/product-evaluation/address.png" /> 
                  <span>{{details.detail.addr}}</span></p>
                <img src="../../../static/images/product-evaluation/phone.png" />
            </div>
        </div>
        <div class="introduction bt-border">
            <div class="title flex-end">
                <p class="cl-b-black">机构介绍</p>
                <p class="cl-gray addr-1">{{details.detail.addr}}</p>
            </div>
            <p class="cl-gray">{{details.service}}</p>
        </div>
        <div class="div-2 bt-border">
            <p class="cl-b-black">机构环境</p>
            <scroll-view scroll-x class="div-2-main scroll-div">
                <view class="scroll-child"  v-for="(url, i) of details.detail_img_more" :key="i" ><img :src="url" /></view>
            </scroll-view> 
        </div>
        <div class="div-3 bt-border">
            <p class="cl-b-black">老师介绍</p>
            <scroll-view scroll-x class="div-2-main scroll-div">
              <div class="main">
                  <div v-for="v of introduction" :key="v.id">
                      <img :src="v.head_pic_more" />
                      <p class="cl-black">{{v.name}}</p>
                      <p class="cl-gray">{{v.worke_years}}</p>
                  </div>
              </div>
            </scroll-view>
        </div>
        <div class="div-4">
            <p class="cl-b-black">用户评论</p>
            <CommentList 
              :selected='commentListData.selected'
              :hasMore='page'
              @onMore='onMoreComment'
              @onSelected='onCommentSelected'
              @onCollapse='onCollapse'
              :data='commentList'
            />
        </div>
        <div class="div-5 top-border">
            <p class="cl-b-black">你可能感兴趣的机构</p>
            <ScrollX @onNodeClick='onScrollX' :data='scrollXData'/>
        </div>
    </div>
</template>

<script>
// import data from "./data.js";
import CommentList from "../../components/comment-list/comment-list";
// import commentListData from "../../components/comment-list/data.js";
import ScrollX from "../../components/scroll-x/scroll-x";
// import scrollXData from "../../components/scroll-x/data.js";
import Star from "../../components/star/star";
import service from "../evaluation/service.js";

export default {
  components: { CommentList, ScrollX, Star },
  computed: {},
  data() {
    return {
      // 点评的Code
      dp_code: null,
      // 评论页码
      page: 1,
      // 详情数据
      details: null,
      // CommentList数据
      commentListData: {
        selected: [
          {
            label: "全部",
            type: 1,
            num: 0
          },
          {
            label: "好评",
            type: 2,
            num: 0
          },
          {
            label: "中评",
            type: 3,
            num: 0
          },
          {
            label: "差评",
            type: 4,
            num: 0
          }
        ]
      },
      // 评论数据
      commentList: null,
      // scroll-x数据
      scrollXData: [],
      // 课程价格
      price: 0,
      // 老师介绍
      introduction: null,
      // 评论 1:全部评论 2: 好评 3:中评 4:差评
      type: 1,
      course_id: null,
      apiCourseDetail: null,
    };
  },
  onLoad(option) {
    const { dp_code, course_id } = option;
    this.course_id = course_id;
    this.dp_code = dp_code;
    // 获取课程数据
    global.PUBLIC.util
      .httpGet(`/courseDetail/${course_id}`, {
        login_id: global.PUBLIC.util.getUser().id
      })
      .then(res => {
        this.price = res.data.origin_price;
        this.introduction = res.data.teachers;
        this.apiCourseDetail = res.data;
        this.details = {
          ...service.getData(),
          ...res.data.course,
          ...res.data.merchant_detail
        };
        this.details.update_time = this.details.update_time
          .substr(0, 7)
          .replace("-", ".");
      });
    const { latitude, longitude } = service.getData().detail;
    // 获取感兴趣的机构
    global.PUBLIC.util
      .httpGet(`/assess/search`, {
        page_size: 5,
        teaching: 1,
        latitude,
        longitude,
        login_id: global.PUBLIC.util.getUser().id
      })
      .then(res => {
        this.scrollXData = res.data.map(v => {
          return {
            ...v,
            img: v.head_pic_more,
            name: v.org_name,
            score: v.org_score
          };
        });
      });
    // 获取评论数量
    global.PUBLIC.util
      .httpGet(`/merchantCommit/${dp_code}/category`, {})
      .then(res => {
        for (const i in res.data) {
          const num = Number(res.data[i]) || 0;
          this.commentListData.selected[0].num += num;
          switch (i) {
            case "50":
              // 好评数
              this.commentListData.selected[1].num = num;
              break;
            case "40":
            case "30":
              // 中评数
              this.commentListData.selected[2].num += num;
              break;
            case "20":
            case "10":
              // 差评数
              this.commentListData.selected[3].num += num;
              break;
          }
        }
      });
    this.getCommint();
  },
  mounted() {
    global.PUBLIC.util.setTitle("产品测评");
  },
  methods: {
    /** 单击收藏 */
    onCollection() {
      const { has_collected, has_collected_collect_id } = this.apiCourseDetail;
      if (has_collected) {
        // 取消收藏
        global.PUBLIC.util.httpOther(
          "DELETE",
          `/collect/${has_collected_collect_id}`
        );
      } else {
        // 收藏
        global.PUBLIC.util.httpOther("POST", `/collect`, {
          login_id: global.PUBLIC.util.getUser().id,
          type: "course",
          object_id: this.course_id
        }).then(res => {
          this.apiCourseDetail.has_collected_collect_id = res.data.id
        });
      }
      this.apiCourseDetail.has_collected = !has_collected;
    },
    /** 单击节点
     * @param {Object} node 节点属性
     * @memberof ScrollX
     */
    onScrollX(node) {
      const { latitude, longitude } = node.detail;
      global.PUBLIC.util.calDistance(latitude, longitude).then(res => {
        node.detail.lola = res;
      });
      service.setData(node);
      global.PUBLIC.util.jumpNavigateTo(
        `institutional-products/main?dp_code=${node.dp_code}`
      );
    },
    /** 获取评论数据 */
    getCommint() {
      if (this.page !== null) {
        const { dp_code, page, type } = this;
        let arr = [];
        switch (type) {
          case 1:
            // 全部
            arr = [0, 51];
            break;
          case 2:
            // 好评
            arr = [40, 51];
            break;
          case 3:
            // 中评
            arr = [29, 41];
            break;
          case 4:
            // 差评
            arr = [0, 30];
            break;
        }
        global.PUBLIC.util
          .httpGet("/merchantCommit", {
            dp_code,
            page,
            ">score": arr[0],
            "<score": arr[1]
          })
          .then(res => {
            this.page =
              res.data.items.length === 0 || res.data.items.length !== 10
                ? null
                : page + 1;
            const data = res.data.items.map(value => {
              value.create_time = value.create_time.substr(0, 10);
              return value;
            });
            this.commentList =
              page === 1 ? data : this.commentList.concat(data);
          });
      }
    },
    /** 收起评论
     * @memberof CommentList
     */
    onCollapse() {
      this.page = 2;
      this.hasMore = true;
      this.commentList = this.commentList.splice(0, 10)
    },
    /** 组件通信 查看更多评论
     * @memberof CommentList
     */
    onMoreComment() {
      this.getCommint();
    },
    /** 单击好评
     * @param {Object} node 节点属性
     * @memberof CommentList
     */
    onCommentSelected(node) {
      this.type = node.type;
      this.page = 1;
      this.getCommint();
    }
  }
};
</script>

<style lang='less' scoped>
.addr-1 {
  width: 550rpx;
  .nowrap();
}
.product-evaluation-page {
  padding-bottom: 80rpx;
  .collection {
    img {
      height: 58rpx !important;
      width: 58rpx !important;
    }
    span {
      font-size: 26rpx;
      margin-left: 10rpx;
    }
  }
  swiper,
  .slide-image {
    text-align: center;
    width: 750rpx;
    height: 318.6rpx;
  }
  .nowrap {
    width: 80px;
    display: inline-block;
  }
  .header {
    padding: 0 30rpx;
    .top {
      border-bottom: 1px solid #e5e8f0;
      padding: 30rpx 0;
      > .flex-left-center {
        margin: 11rpx 0 17rpx 0;
      }
    }
    .center {
      padding: 20rpx 0;
      border-bottom: 1px solid #e5e8f0;
      .cl-black {
        margin-bottom: 12rpx;
      }
    }
    .footer {
      padding: 20rpx 0;
      img {
        height: 23rpx;
        width: 23rpx;
      }
      img:nth-of-type(1) {
        margin-right: 16rpx;
      }
    }
  }

  .price {
    margin-left: 13rpx;
    font-size: 24rpx;
    color: #2e3c50;
  }
  .introduction {
    padding: 30rpx;
    .title {
      margin-bottom: 20rpx;
      .cl-b-black {
        margin-right: 5rpx;
      }
      .cl-gray {
        color: #a4acb8;
        line-height: 1.5;
      }
    }
  }
  .div-2 {
    padding: 30rpx 0;
    .cl-b-black {
      margin-left: 30rpx;
    }
    .div-2-main {
      margin-top: 26rpx;
      view {
        margin-left: 21rpx;
      }
      view:nth-of-type(1) {
        margin-left: 30rpx;
      }
      view:last-child {
        margin-right: 30rpx;
      }
    }
    img {
      width: 199.2rpx;
      height: 138rpx;
      margin-left: 20rpx;
    }
    img:nth-of-type(1) {
      margin-left: 0;
      border-radius: 8rpx;
    }
  }
  .div-3 {
    padding: 30rpx 0;
    padding-bottom: 48rpx;
    .cl-b-black {
      margin-left: 30rpx;
    }
    .main {
      display: flex;
      width: 120rpx;
      // margin: 0 30rpx;
      div {
        margin-left: 48rpx;
      }
      div:nth-of-type(1) {
        margin-left: 30rpx;
      }
      div:last-child {
        padding-right: 30rpx;
      }
      img {
        height: 120rpx;
        width: 120rpx;
        border-radius: 100%;
        margin-top: 20rpx;
      }
      p {
        text-align: center;
      }
    }
  }
  .div-4 {
    .cl-b-black {
      padding: 30rpx 0 20rpx 30rpx;
    }
  }
  .div-5 {
    .cl-b-black {
      padding: 30rpx 0 16rpx 0;
      margin-left: 20px;
    }
  }
}
</style>