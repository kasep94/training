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
      this.url = decodeURIComponent(option.url)
  },
  methods: {}
};
</script>

<style>
</style>