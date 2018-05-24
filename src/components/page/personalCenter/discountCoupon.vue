<template>
  <div class="coupon-wrap clear">
    <header class="head">
      <i><a @click="goBack()" class="his_to icon iconfont icon-fanhui1"></a></i>
      <h1>我的优惠券</h1>
    </header>

    <ul class="coupon-menu clear">
      <li>
        <router-link to="/myDiscountCoupon/CouponUsed">已使用</router-link>
      </li>

      <li class="active">
        <router-link to="/myDiscountCoupon/">未使用</router-link>
      </li>

      <li class="">
        <router-link to="/myDiscountCoupon/outOfDate"> 已过期</router-link>
      </li>
    </ul>

    <div class="coupon-main">
      <router-view></router-view>


    </div>
  </div>
</template>

<style lang="less" scoped>
  .head {
    max-width: 640px;
    margin: auto;
    height: 4.5rem;
    width: 100%;
    position: fixed;
    z-index: 9;
    top: 0;
    background: #fff;

  h1 {
    right: 4.5rem;
    left: 4.5rem;
    font-size: 1.7rem;
    font-weight: 500;
    position: absolute;
    line-height: 4.5rem;
    text-align: center;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
  }

  }

  .his_to {
    margin: 1.3rem 0 0 1.5rem;
    float: left;

  img {
    width: 100%;
  }

  }

  .iconfont {
    color: #03a9f4;
    font-size: 1.5rem;
  }

  .coupon-menu {
    text-align: center;
    -webkit-border-radius: 0.5rem;
    border-radius: 0.5rem;
    margin-top: 4.5rem;
    background: #ffffff;
    border-bottom: 2px solid #dddddd;

  }

  .coupon-menu li {
    width: calc(33.33333333%);
    float: left;

  }

  .coupon-menu li a {
    display: inline-block;
    color: #666666;
    font-size: 1.4rem;
    margin-top: 0.5rem;
    width: 100%;
    padding: 2rem 0;
    position: relative;
    top: 0.2rem;
    z-index: 2;

  }

  .coupon-menu  a.router-link-exact-active {
    border-bottom: 2px solid #1696e5;
    color: #363838;
  }



</style>
<script>


  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      goBack() {
        this.$router.push("/personalCenter")
      }
    },
    components: {
      // 引入组件
    }
  }
</script>
