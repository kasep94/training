/**
 * 文档作者: kasepa94
 * 创建时间：2018年08月16日
 * 修改时间：2018年08月16日
 * 描述信息：首页
 */
<template>
    <div class="home_page">
        <p>首页</p>
        <swiper interval='3000' autoplay=false indicatorDots=false duration=1000>
          <block v-for="item in imgUrls" :key='item'>
            <swiper-item>
              <img :src="item" class="slide-image" width="355" height="150"/>
            </swiper-item>
          </block>
      </swiper>
    </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [
        "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
        "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    };
  },
  created() {},
  computed: {},
  methods: {}
};
</script>

<style>
swiper {
  text-align:center;
}
</style>