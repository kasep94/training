/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月04日
 * 修改时间：2018年09月04日
 * 描述信息：添加课程页面
 */
<template>
    <div class="course-add-page flex-content-center">
        <div class="content">
            <div class="label-inp">
                <p><i class="icon icon-book" />课程名称</p>
                <input class="btn-1" type="text" placeholder="填写课程名称" />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-mechanism" />机构名称</p>
                <input class="btn-1" type="text" placeholder="填写机构名称" />
            </div>
            <div class="label-inp">
                <p><i class="icon icon-time" />上课时间</p>
                <div class="time-select">
                    <input class="btn-1" type="text" placeholder="选择课程时间"/>
                    <i class="icon icon-right"/>
                </div>
            </div>
            <div class="label-inp">
                <p><i class="icon icon-address" />上课地点</p>
                <div class="time-select">
                    <input class="btn-1" type="text" placeholder="选择课程时间"/>
                    <i class="icon icon-right"/>
                </div>
            </div>

            <Picker />
            

            <!-- <p class="btn-1 add-course">添加课程</p> -->
        </div>
    </div>
</template>

<script>
import Picker from '../../components/picker/picker'

export default {
  data() {
    return {
      time: '12:01',
    };
  },
  components: {Picker},
  computed: {},
  methods: {}
};
</script>

<style scoped lang='less'>
.course-add-page {
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