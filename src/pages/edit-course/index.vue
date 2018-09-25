/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月12日
 * 修改时间：2018年09月12日
 * 描述信息：编辑课程页面
 */
<template>
    <div class="edit-course-page flex-content-center">
        <div class="content">

            <div class="label-inp">
                <p><i class="icon icon-book" />机构名称</p>
                <SinglePicker :data='mechanismPicker' @onPicker='onMechanismPicker' :info="saveMPicker && saveMPicker.name || '请选择机构'" />
            </div>
            
            <div class="label-inp">
                <p><i class="icon icon-book" />课程名称</p>
                <input v-if="!saveMPicker" @click="onInfo" class="btn-1" placeholder='请选择课程名称'/>
                <SinglePicker v-else :data='coursePicker' @onPicker='onCoursePicker' :info="saveCPicker.name || '请选择课程名称'" />
            </div>
            
            <div class="label-inp">
                <p><i class="icon icon-time" />上课时间</p>
                <div class="time-select" v-for="(item, i) of timeArr" :key="i">
                    <input class="btn-1" disabled type="text" :placeholder="item[0] + '  ' + item[1] + ':' + item[2] + '~' + item[3] + ':' + item[4]"/>
                    <i @click='onRemove(item, i)' class="icon icon-delete"/>
                </div>
                <Picker @onTimePicker='onSelectTime' info='选择课程时间' type='time' />
            </div>
            <!-- <div class="label-inp">
                <p><i class="icon icon-book" />上课地点</p>
                <input class="btn-1" type="text" v-model="data.addr" placeholder="填写书籍名称" />
            </div> -->

            <p @click="onSubmit" class="btn-1 add-course">保  存</p>
        </div>
    </div>
</template>

<script>
import Picker from "../../components/picker/picker";
import service from "../course/service.js";
import SinglePicker from "../../components/single-picker/single-picker";

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
      // 机构picker数据
      mechanismPicker: [],
      // 保存选择的机构Picker数据
      saveMPicker: null,
      // 课程picker数据
      coursePicker: [],
      // 保存选择的机构Picker数据
      saveCPicker: {}
    };
  },
  onLoad(option) {
    this.data = service.getData();
    this.type = option.type;
    // 获取所有机构
    global.PUBLIC.util.httpGet(`/merchants/search?query=`, {}).then(res => {
      this.mechanismPicker = res.data.map(v => {
        return {
          ...v,
          name: v.org_name
        };
      });
    });

    if (this.type === "add") {
      // TODO
    } else if (this.type === "edit") {
      // 课程表弹出框的编辑TODO
      const { id } = this.data.schedule;
      // 获取课程数据
      global.PUBLIC.util.httpGet(`/lesson/user`, { id }).then(res => {
        console.log(JSON.stringify(res.data));
        const items = res.data.items[0];
        this.saveMPicker = {
          // 机构名称
          name: items.merchant.merchantName,
          dp_code: items.merchant.dp_code
        };
        this.saveCPicker = {
          // 课程名
          name: items.class.item_name,
          id: items.class.id
        };
        this.getCourses();
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
    /** 提示 */
    onInfo() {
      wx.showToast({
        title: "请先选择机构",
        icon: "none",
        duration: 2000
      });
    },
    /** 选择机构
     * @param {Object} index 数组索引
     * @memberof single-picker
     */
    onMechanismPicker(index) {
      this.saveMPicker = this.mechanismPicker[index];
      this.getCourses();
    },
    /** 获取所有课程 */
    getCourses() {
      global.PUBLIC.util
        .httpGet(`/merchant/class`, {
          dp_code: this.saveMPicker.dp_code
        })
        .then(res => {
          this.coursePicker = res.data.map(v => {
            return {
              ...v,
              name: v.item_name
            };
          });
        });
    },
    /** 选择课程
     * @param {Object} index 数组索引
     * @memberof single-picker
     */
    onCoursePicker(index) {
      this.saveCPicker = this.coursePicker[index] || {};
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
        .httpOther("POST", `/lesson/user`, {
          trainee_id: global.PUBLIC.util.getUser().trainee_id,
          class_id: this.saveCPicker.id
        })
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
    width: 542rpx;
    margin-top: 188rpx;
  }
}
</style>