<template>
  <div class="unused-wrap">


    <div class="clear" v-for=" item in leaguerArr" v-if="dataStatus">
      <span> {{item.amount}}<font>￥</font></span>
      <dl>
        <dt v-text="item.types ==1 ? item.name : '抵用券' ">

        </dt>
        <dd>
          到期时间：
          {{ item.endTime|timeFn}}
        </dd>
      </dl>
      <p>
        <router-link to="/shop"> 去使用</router-link>
      </p>

    </div>


    <div class="no-data" style='border:none' v-if="!dataStatus">
      <img src='http://1c73388p57.imwork.net:23510/healthFront/images/noData/null-yhj_03.png'
           style='width:80%; margin:0 auto;display: block'>
      <div style='text-align: center; color:#8f8f94;font-size:1.4rem;; float:none'>您暂时没有优惠券</div>
    </div>

  </div>

</template>
<style lang="less" scoped>
  @import '../../../../../static/css/reset.css';
  @import '../../../../../static/css/mui.min.css';
  .unused-wrap div {
    padding: 2.5rem 1.5rem;
    border-bottom: 1px solid #eeeeee;
    background: #ffffff;
    position: relative;
  }

  .unused-wrap div dl {
    float: left;
    margin-left: 1.5rem;
  }

  .unused-wrap div dl dt {
    font-size: 1.3rem;
    color: #383838;
    margin-bottom: 1.2rem;
  }

  .unused-wrap div dl dd {
    color: #999999;
    font-size: 1.1rem;
  }

  .unused-wrap div p {
    font-size: 1.3rem;
    color: #1696e5;
    position: absolute;
    right: 2.3rem;
    top: 1rem;
  }

  .unused-wrap div > span {
    width: 10rem;
    height: 5rem;
    background: url(../../../../../static/img/receive_185_96.png) no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
    font-size: 2.4rem;
    padding: 0.7rem 0 0 1rem;
    float: left;
  }

  .unused-wrap div span.coupon_box_already {
    background: url(../../../../../static/img/already_received_185_96.png) no-repeat !important;
    background-size: 100% 100% !important;
  }

  .unused-wrap div font {
    font-size: 1.3rem;
  }

  .unused-wrap div p {
    float: right;
    margin-top: 1.5rem;
  }

  .unused-wrap div p a {
    font-size: 1.3rem;
    color: #1696e5;
  }

  p.used {
    color: #999999 !important;
  }
</style>
<script>

  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        leaguerArr: [],
        dataStatus: true
      }
    },
    created() {
      this.$http.post("/healthFront/out/shop/findLeaguer.do", this.Qs.stringify({
          memberId: this.user.memberId,
          type: 0,
        })
      ).then((res) => {

        if (res.data.leaguers.length > 0) {
          this.leaguerArr = res.data.leaguers;
          console.log(this.leaguerArr)
          this.dataStatus=true
        } else {
          this.dataStatus=false
        }
      })

    },
    filters: {
      timeFn: function (value) {
        return new Date(parseInt(value)).toLocaleString().substr(0, 17)
      }
    },
    methods: {},
    components: {
      // 引入组件
    }
  }
</script>
