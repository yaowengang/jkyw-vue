<template>
  <div>
    <Top :title="title"></Top>
    <div class="coupon_box">
      <ul class="coupon_ul">
        <!--已领优惠券-->
        <li  v-for="list in CouponReceive">
          <div class="coupon_box_already">
            <div class="coupon_num_box">
              <div class="coupon_monery">{{ list.amount }}</div>
              <div class="coupon_unit_box">
                <h1 class="coupon_unit">￥</h1>
                <div class="coupon_cill" v-if="list.minAmount">满 {{ list.minAmount }}</div>
                <div class="coupon_cill" v-else>抵用券</div>
              </div>
              <div class="coupon_time">{{ list.startTime | data }} - {{ list.endTime | data }}</div>
            </div>
            <div class="employ">
              去使用
            </div>
          </div>
        </li>
        <!--未领优惠券-->
        <li v-for="list in CouponLead" @click="add(list)">
          <div v-bind:class="[list.status==0?ReceiveClass:'']">
            <div class="coupon_num_box">
              <div class="coupon_monery">{{ list.amount}}</div>
              <div class="coupon_unit_box">
                <h1 class="coupon_unit">￥</h1>
                <div class="coupon_cill" v-if="list.minAmount">满 {{ list.minAmount }}</div>
                <div class="coupon_cill" v-else>抵用券</div>
              </div>
              <div class="coupon_time">{{ list.startTime | data }} - {{ list.endTime | data }}</div>
            </div>
            <div class="employ" v-if="list.status==0">
              去使用
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import Top from '../../commom/top2.vue'
  import { Toast } from 'mint-ui';
export default {
  data() {
      return {
        title: "优惠券",
        CouponLead:'', //未领取
        CouponReceive:'', //已领取
        user:JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        ReceiveClass:'coupon_box_already'

      }
  },
  created() {
    this.$http.post("healthFront/out/shop/couponList.do",this.Qs.stringify({
      memberId:this.user.memberId
      })
    ).then((res) => {
      this.CouponLead = res.data.findStick; //未领取
      this.CouponReceive = res.data.leaguers; //已领取
      //this.setnumday = res.data.setpNumDay;
      // this.statecode = res.data.stateCode;
      // var sw = JSON.stringify(this.setpNumDay);
      console.log(res.data);
    });
  },
  components: {
    Top
  },
  filters:{
    data:function (val) {
      var datas = new Date(val);
     return val = datas.getFullYear() + '.'+ (datas.getMonth()+1) + '.' + (datas.getDay()+1)
    }
  },
  methods:{
    add:function(el){
      this.$http.post("healthFront/out/shop/addLeaguers.do",this.Qs.stringify({
          memberId:this.user.memberId,
          couponId:el.id
        })
      ).then((res) => {
        //this.setnumday = res.data.setpNumDay;
        el.status = 0;
        console.log(el)
        if(res.data.stateCode == '001'){
        //  this.CouponLead.splice(el,1);
        // this.CouponReceive.push(el)

          Toast({
            message: '领取成功，可以尽情的装逼拉！！',
            position: 'bottom',
            duration: 5000
          });
        } else {
          Toast({
            message: '领取失败',
            position: 'bottom',
            duration: 5000
          });
        }
        console.log(res.data);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../static/css/reset.css';
  .coupon_box {
    width: 100%;
    background: #ffffff;
    margin-top: 5rem;
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
    background: url(/static/img/receive_580_219.png) no-repeat;
    background-size: 100%;
  }
  .coupon_num_box {
    display: inline-block;
    width: 19rem;
    height: 8rem;
    position: absolute;
    left: 0.6rem;
    top: 2.4rem;
    color: #ffffff;
  }
  .coupon_monery {
    height: 5.1rem;
    line-height: 5.1rem;
    font-size: 6.2rem;
    float: left;
    width: 12rem;
    text-align: right;
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
    text-align: center;
  }
  .coupon_unit {
    font-size: 2.5rem;
    line-height: 3rem;
  }
  .coupon_cill {
    font-size: 1.4rem;
    line-height: 2.1rem;
  }
  .coupon_ul li:not(:first-child) {
    margin-top: 1.3rem;
  }
  .coupon_box_already {
    background: url(/static/img/already_received_580_219.png) no-repeat !important;
    background-size: 100%!important;
  }
  .employ {
    width: 6.5rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    color: #ffffff;
    font-size: 1.2rem;
    border: 1px solid #ffffff;
    border-radius: 30px;
    position: absolute;
    top: 2rem;
    right: 6.3rem;
  }
</style>
