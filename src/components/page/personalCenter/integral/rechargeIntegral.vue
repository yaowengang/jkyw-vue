<template>
  <div class="recharge-wrap">

      <Top :title="title"></Top>
      <dl>
        <dt>您当前积分为 <span v-text="sumIntegral"></span></dt>

        <dd class="buy">
          本次要购买积分数
          <i class="jian icon iconfont icon-jian01" @click="jianFn"></i>
          <input type="number" v-model="integralNub" readonly>
          <i class="jia icon iconfont icon-jia01" @click="jiaFn"></i>
        </dd>
        <dd class="tip"> 一元可购买100积分</dd>

        <dd class="clear">
          <span>支付方式</span>

          <ul>
            <li>
              <input type="radio" id="alipay" value="支付宝" name="pay" checked="checked" v-model="picked">
              <label for="alipay"> 支付宝</label>
            </li>
            <li>
              <input type="radio" id="weixinpay" value="微信" name="pay" v-model="picked">
              <label for="weixinpay"> 微信</label>
            </li>
          </ul>

        </dd>

      </dl>

      <button type="button" @click="subFn">确认购买</button>


    <div class="aliPay"></div>
  </div>
</template>

<script>
  import Top from '../../../../../src/components/commom/top2.vue'
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        title: "积分充值",
        personalInfoArr: [],
        sumIntegral: "",
        integralNub: 100,
        picked: "支付宝",
      }
    },
    computed: {
      ...mapGetters(['personalInfo', 'stateCode'])
    },
    created() {
      this.$store.dispatch('personalInfoApi');


    },
    methods: {

      getpersonalInfosData() {
        let _this = this;
        setTimeout(function () {
          _this.personalInfoArr.push(_this.personalInfo);
          _this.sumIntegral = _this.personalInfoArr[0].sumIntegral;
        }, 100)
      },
      jiaFn() {
        this.integralNub += 100
      },
      jianFn() {
        if (this.integralNub > 100)
          this.integralNub -= 100
      },
      subFn() {
        if (this.picked === "支付宝") {
          this.$http.post("healthFront/out/aLiPay/AliPayRech.do", this.Qs.stringify({
              memberId: this.user.memberId,
              integer:this.integralNub ,
            })
          ).then((res) => {

            $(".aliPay").append(res.data.aLiPay)

          }).catch((err) => {
            console.log(err)
          })
        } else {
          alert("你的支付方式是微信")
        }

      }
    },
    mounted() {
      this.getpersonalInfosData()
    },
    components: {
      Top
    }
  }
</script>

<style lang="less">
  body {
    background: #ffffff;
  }

  .recharge-header {
    position: relative;
    background: #ffffff;
    padding: 3rem 0 1rem;
    border-bottom: 0.5rem solid #f5f5f5;
  }

  dl {
    padding: 1.2rem;
    margin-top: 4.5rem;
  }

  dl dt {
    padding: 1.5rem 0;
    font-size: 1.5rem;
  }

  dl dt span {
    color: #fe9d01;
  }

  dl dd {
    font-size: 1.2rem;
    padding: 1.5rem 0;
  }

  dl dd span {
    float: left;
    font-size: 1.5rem;
  }

  dl dd ul {
    float: left;
  }

  dl dd ul li {
    padding: 0.3rem 1rem 0.8rem 1.5rem;
  }

  input[type="radio"] {
    vertical-align: middle;
    margin-right: 0.2rem;
  }

  dl dd ul li label i {
    width: 1.4rem;
    height: 1.4rem;
    display: inline-block;
    background: url("../../../../../static//img/integral-04.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    top: 0.2rem;
    margin: 0 0.3rem 0 1.5rem;
  }

  dl dd ul li label .check-active {
    background: url("../../../../../static//img/integral-03.png") no-repeat;
    background-size: 100% 100%;
  }

  dl .buy i {
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    vertical-align: middle;
    margin: 0 0.5rem;
    color: #03a9f4;
  }

  dl .buy input {
    padding: 0.6rem 1rem;
    border: 2px solid #03a9f4;
    max-width: 8rem;
    text-align: center;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    -ms-border-radius: 0.3rem;
    -o-border-radius: 0.3rem;
    border-radius: 0.3rem;
  }

  dl .buy input::-webkit-outer-spin-button,
  dl .buy input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  dl .buy input[type="number"] {
    -moz-appearance: textfield;
  }

  dl .tip {
    color: #888888;
    margin-left: 40%;
  }

  button {
    padding: 1.2rem;
    margin: 5rem 12% 0;
    background: #03a9f4;
    width: 76%;
    color: #ffffff;
    -webkit-border-radius: 0.2rem;
    -moz-border-radius: 0.2rem;
    -ms-border-radius: 0.2rem;
    -o-border-radius: 0.2rem;
    border-radius: 0.2rem;
    font-size: 1.3rem;
  }

</style>
