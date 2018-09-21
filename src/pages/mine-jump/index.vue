/**
 * 文档作者: kasepa94
 * 创建时间：2018年09月21日
 * 修改时间：2018年09月21日
 * 描述信息：我的页面跳转
 */
<template>
    <div class="home_page">
        <p>我的页面</p>
    </div>
</template>

<script>
export default {
  onLoad(option) {
    switch (option.page) {
      case "1":
        // 我的徽章
        break;
      case "2":
        //我的收藏（课程 | 文章）
        break;
      case "3":
        // 我参加过的（课程 | 活动）
        break;
      case "4":
        //我的评价（课程 | 内容）
        break;
      case "5":
        //最近浏览
        break;
    }
  },
  computed: {},
  methods: {}
};
</script>

<style>
</style>