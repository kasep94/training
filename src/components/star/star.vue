<template>
  <div>
    <img
      v-for="(star, i) of starArr"
      :key="i"
      :src="star"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Number
    }
  },
  data() {
    return {
      starArr: [0, 0, 0, 0, 0]
    }
  },
  created() {
    const star = 'https://okcdn.apiweixin.top/asserts/img/star1.jpg'
    const unStar = 'https://okcdn.apiweixin.top/asserts/img/star2.jpg'
    this.starArr = [unStar, unStar, unStar, unStar, unStar].fill(star, 0, this.data)
  }
};
</script>

<style lang='less' scoped>
img {
  height: 26rpx;
  width: 26rpx;
  margin-right: 7rpx;
}
</style>


