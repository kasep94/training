/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月19日
 * 修改时间：2018年09月19日
 * 描述信息：webview
 */
<template>
    <div class="home_page">
        <web-view :src="url"></web-view>
    </div>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  computed: {},
  onLoad(option) {
    wx.showShareMenu();
    const url = decodeURIComponent(option.url)
    this.url = url.indexOf('%3A') !== -1 ? decodeURIComponent(url) : url;
  },
  methods: {}
};
</script>

<style>
</style>