/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月12日
 * 修改时间：2018年09月12日
 * 描述信息：编辑课程页面
 */
<template>
    <div @click="onHidePop" class="edit-course-page flex-content-center">
        <div class="content">

            <div class="label-inp selected">
                <p><i class="icon icon-mechanism" />机构名称</p>
                <input class="btn-1" @input="onMechanismChange" v-model='mechanismVal' placeholder='请选择机构'/>
                <div v-if="mechanismArr.length > 0">
                  <p @click="onSelected(item, 'mechanism')" v-for="item of mechanismArr" :key="item.id">
                    {{item.org_name}}
                  </p>
                </div>
            </div>
            
            <div class="label-inp selected">
                <p><i class="icon icon-book" />课程名称</p>
                <input class="btn-1" @input="getCourses" v-model="courseVal" placeholder='请选择课程名称'/>
                <div v-if="courseArr.length > 0">
                  <p @click="onSelected(item, 'course')" v-for="item of courseArr" :key="item.id">
                    {{item.product_name}}
                  </p>
                </div>
            </div>
            
            <div class="label-inp">
                <p><i class="icon icon-time" />上课时间</p>
                <div class="time-select" v-for="(item, i) of timeArr" :key="i">
                    <input class="btn-1" disabled type="text" :placeholder="item[0] + '  ' + item[1] + ':' + item[2] + '~' + item[3] + ':' + item[4]"/>
                    <i @click='onRemove(item, i)' class="icon icon-delete"/>
                </div>
                <Picker @onTimePicker='onSelectTime' info='选择课程时间' type='time' />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-book" />上课地点</p>
                <input class="btn-1" type="text" v-model="address" placeholder="填写书籍名称" />
            </div>

            <p @click="onSubmit" class="btn-1 add-course">保  存</p>
        </div>
    </div>
</template>

<script>
import Picker from "../../components/picker/picker";
import service from "../course/service.js";
import SinglePicker from "../../components/single-picker/single-picker";
import courseService from "../course/course.service.js";

export default {
  components: { Picker, SinglePicker },
  data() {
    return {
      // 选中的时间
      timeArr: [],
      // 发送给接口
      apiArr: [],
      // course页面带过来到参数
      data: {},
      // {'add' | 'edit'}是修改还是添加
      type: "",
      // 输入的机构名
      mechanismVal: "",
      // 保存3个搜索的
      mechanismArr: [],
      // 输入的课程名
      courseVal: "",
      // 课程保存3个搜索的
      courseArr: [],
      // 保存延迟
      saveSetTime: null,
      // 地址
      address: "",
      // 更新需要的id
      id: null
    };
  },
  onShow() {
    // 重置data 完成初始化
    Object.assign(this.$data, this.$options.data());
  },
  onLoad(option) {
    this.data = service.getData();
    this.type = option.type;

    if (this.type === "add") {
      // TODO
    } else if (this.type === "edit") {
      // 课程表弹出框的编辑TODO
      const { id } = this.data.schedule;
      // 获取课程数据
      global.PUBLIC.util.httpGet(`/lesson/user`, { id }).then(res => {
        const items = res.data.items[0];
        const { lesson_name, address, merchant, id } = items;
        this.courseVal = lesson_name;
        this.address = address;
        this.mechanismVal = merchant;
        this.id = id;
        console.log(items);
        // 时间
        this.timeArr = global.PUBLIC.util.jumpApiDate(items.rules);
      });
    }
  },
  mounted() {
    global.PUBLIC.util.setTitle("编辑课程");
  },
  computed: {},
  methods: {
    /** 全局单击隐藏 */
    onHidePop() {
      setTimeout(() => {
        this.mechanismArr = [];
        this.courseArr = [];
      });
    },
    /** 选中下拉
     * @param {Object} node 节点属性
     * @param {'mechanism' | 'course'} name 名字
     */
    onSelected(node, name) {
      if (name === "mechanism") {
        this.mechanismVal = node.org_name;
      } else {
        this.courseVal = node.product_name;
      }
    },
    /** 输入机构名 */
    onMechanismChange() {
      if (this.saveSetTime) {
        this.saveSetTime = null;
      } else {
        // 获取所有机构
        this.saveSetTime = setTimeout(() => {
          global.PUBLIC.util
            .httpGet(`/merchants/search?query=${this.mechanismVal}`, {})
            .then(res => {
              const { data } = res;
              if (Object.prototype.toString.call(data) === "[object Object]") {
                this.mechanismArr = [];
              } else {
                if (data.length > 3) {
                  this.mechanismArr = data.slice(0, 3);
                } else {
                  this.mechanismArr = data;
                }
              }
            });
        }, 50);
      }
    },
    /** 输入获取所有课程 */
    getCourses() {
      if (this.saveSetTime) {
        this.saveSetTime = null;
      } else {
        this.saveSetTime = setTimeout(() => {
          global.PUBLIC.util
            .httpGet(`/courseDetail`, {
              show: "product_name",
              "@product_name": this.courseVal
            })
            .then(res => {
              const data = res.data.items;
              if (Object.prototype.toString.call(data) === "[object Object]") {
                this.courseArr = [];
              } else {
                if (data.length > 3) {
                  this.courseArr = data.slice(0, 3);
                } else {
                  this.courseArr = data;
                }
              }
            });
        }, 500);
      }
    },
    /** 删除选中的日期
     * @param {Array} node 节点属性
     * @param {number} index 索引
     */
    onRemove(node, index) {
      if (node[5] && node[5].id) {
        global.PUBLIC.util
          .httpOther("DELETE", `/rule/${node[5].id}`, {})
          .then(res => {});
      }
      this.timeArr.splice(index, 1);
      this.apiArr.find((v, i) => {
        if (v === node) {
          this.apiArr.splice(i, 1);
        }
        return v === node;
      });
    },
    /** 获取日期选择的数据
     * @param {Array} data 选择的数据
     * @memberof Picker
     */
    onSelectTime(data) {
      this.timeArr.push(data);
      this.apiArr.push(data);
    },
    /** 保存 */
    onSubmit() {
      global.PUBLIC.util
        .httpOther(
          this.type === "add" ? "POST" : "PUT",
          `/lesson/user${this.type === "add" ? "" : "/" + this.id}`,
          {
            trainee_id: global.PUBLIC.util.getUser().trainee_id,
            merchant: this.mechanismVal,
            address: this.address,
            lesson_name: this.courseVal
          }
        )
        .then(res => {
          return res.data;
        })
        .then(res => {
          if (this.apiArr.length > 0) {
            global.PUBLIC.util
              .httpOther("POST", `/rule/batch`, {
                batch: global.PUBLIC.util.conversionDate(this.apiArr).map(v => {
                  return {
                    ...v,
                    type: "lesson",
                    object_id: res.id,
                    trainee_id: global.PUBLIC.util.getUser().trainee_id
                  };
                })
              })
              .then(res => {
                courseService.courseSub.next();
                if (res.code !== 0) {
                  wx.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 2000
                  });
                } else {
                  wx.navigateBack({ changed: true });
                }
              });
          } else {
            courseService.courseSub.next();
            wx.navigateBack({ changed: true });
          }
        });
    }
  }
};
</script>

<style lang='less' scoped>
.edit-course-page {
  padding-bottom: 30rpx;
  .content {
    width: 690rpx;
  }
  .selected {
    position: relative;
    div {
      position: absolute;
      border: 1rpx solid @cl-2;
      border-radius: 6rpx;
      background: white;
      z-index: 3;
      width: 690rpx;
      p {
        font-size: 28rpx;
        height: 60rpx;
        line-height: 60rpx;
        border-bottom: 1rpx solid @cl-2;
        margin-bottom: -1rpx;
        padding-left: 5rpx;
        .nowrap();
      }
    }
  }
  .label-inp {
    margin-top: 40rpx;
  }
  .icon-address {
    height: 35rpx;
  }
  .add-course {
    background: @cl-4;
    color: white;
    margin: 0 auto;
    width: 690rpx;
    margin-top: 188rpx;
  }
}
</style>