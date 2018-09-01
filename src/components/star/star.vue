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
    const star = '../../../static/images/evaluation/star.png'
    const unStar = '../../../static/images/evaluation/unStar.png'
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


