<template>
  <div class="coupon">
    <div class="head">
      <i><a href="/shop.html"><img src="../../../../static/img/left-ico.png"></a></i>
      <h1>优惠券</h1>
    </div>
    <div class="coupon_box">
      <ul class="coupon_ul">
        <li v-for="(item, index) in discountCoupon">
          <div :class="{ coupon_box_already : item.isBelong }">
            <div class="coupon_num_box">
              <div class="coupon_monery">{{ item.discountNum }}</div>
              <div class="coupon_unit_box">
                <h1 class="coupon_unit">￥</h1>
                <div class="coupon_cill">满<span>{{ item.upperLimit }}</span></div>
              </div>
              <div class="coupon_time">{{ item.timeUse }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">

export default {
    data() {
        return {
          discountCoupon: [],
        }
    },
    created() {
      this.$http.get('http://localhost:8080/static/data/healthInfo.json').then((res) => {
        this.discountCoupon = res.data.discountCoupon
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.head{
  height: 4.5rem;
  background: #FFFFFF;
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
}
  .head i:nth-of-type(1) {
    margin-left: 1.4rem;
  }
  .head i {
    width: 2rem;
    height: 2rem;
    display: inline-block;
    margin-top: 1.5rem;
  }
.head i img{
  width:100%;
}
  .head h1 {
    right: 4.5rem;
    left: 4.5rem;
    letter-spacing: 0.3rem;
    font-size: 1.8rem;
    font-weight: 500;
    position: absolute;
    color: #4f4f4f;
    line-height: 4.5rem;
    text-align: center;
    display: inline-block;
    overflow: hidden;
    width: auto;
    margin: 0;
    text-overflow: ellipsis;
  }
.coupon_box {
  width: 100%;
  background: #ffffff;
  margin-top: 0.5rem;
  padding: 1.5rem 5% 1.5rem 5%;
}
.coupon_ul {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.coupon_ul li {
  width: 100%;
  height: 11rem;
}
.coupon_ul li>div {
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 0.25rem;
  position: relative;
  background: url(../../../../static/image/receive_580_219.png) no-repeat;
  background-size: 100%;
}
.coupon_box_already {
  background: url(../../../../static/image/already_received_580_219.png) no-repeat !important;
  background-size: 100%!important;
}
.coupon_num_box {
  display: inline-block;
  width: 19rem;
  height: 8rem;
  position: absolute;
  left: 3.6rem;
  top: 2.4rem;
  color: #ffffff;
}
.coupon_monery {
  height: 5.1rem;
  line-height: 5.1rem;
  font-size: 6.2rem;
  float: left;
  font-family: HelveticaLTStd;
}
.coupon_unit_box {
  display: inline-block;
  margin-left: 0.3rem;
  height: 5.1rem;
}
.coupon_time {
  width: 100%;
  font-size: 1rem;
  position: absolute;
  bottom: 0;
}
.coupon_unit {
  font-size: 2.5rem;
  line-height: 3rem;
}
.coupon_cill {
  font-size: 1.4rem;
  line-height: 2.1rem;
}

</style>
