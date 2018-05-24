<template>
  <div class="personal-wrap  view">
    <div class="herder-wrap">
      <div class="personal-header-tittle ">
        <a href=""><i></i></a>
        <p>个人中心</p>
        <router-link to="/systemMsg" :class="messageStyle"></router-link>

      </div>
      <div class="personal-header-photo  clear">
        <i>
          <router-link to="/personalInfo">
            <img :src="user.memberImg">
          </router-link>
        </i>

        <dl>
          <dt v-text="user.memberName"></dt>
          <router-link to="/integral">
            <dd>积分：{{sumIntegral}}</dd>
          </router-link>
        </dl>
      </div>
      <div class="personal-domain ">
        <ul>
          <li>
            <router-link to="/projectManage">
              <div class="domain_aer">
                <i class="icon iconfont icon-wodefangan"></i>
                <span>我的方案</span>
              </div>

            </router-link>
          <li>
            <router-link to="/information">
              <div class="domain_aer">
                <i class="icon iconfont icon-wenzhen-xianxing"></i>
                <span>我的问诊</span>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/MyPhysician">
              <div class="domain_aer">
                <i class="icon iconfont icon-yisheng"></i>
                <span>我的医师</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="parting">我的商城</div>
    <ul class="personal-main">
      <router-link to="/myOrder">
        <li>
          <i class="icon iconfont icon-02sousuokuangzuoceshaixuan"></i>
          <div>
            我的订单
            <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
          </div>
        </li>
      </router-link>

      <router-link to="/shopCart">
        <li>
          <i class="icon iconfont icon-cart"></i>
          <div>
            购物车
            <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
          </div>
        </li>
      </router-link>

      <router-link to="/myDiscountCoupon">
        <li>
          <i class="icon iconfont icon-umidd01"></i>
          <div>
            优惠券
            <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
          </div>
        </li>
      </router-link>

      <router-link to="/myCollect">
        <li>
          <i class="icon iconfont icon-shoucang1"></i>
          <div>
            收藏
            <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
          </div>
        </li>
      </router-link>

      <a href="https://static.meiqia.com/dist/standalone.html?_=t&eid=64388">
        <li style="margin-top: 1rem">
          <i class="icon iconfont icon-kefu"></i>
          <div>
            客服
            <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
          </div>
        </li>
      </a>

      <router-link to="/setting">
        <li>
          <i class="icon iconfont icon-set"></i>
          <div>
            设置
            <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
          </div>
        </li>
      </router-link>
    </ul>
    <Bottom></Bottom>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex';
  import Bottom from '@/components/Bottom.vue'

  export default {
    data() {
      return {
        personalInfoArr: [],
        sumIntegral: "",
        messageStatus: 0,
        messageStyle: "",
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息

      }
    },

    components: {
      Bottom
    },
    computed: {
      ...mapGetters(['personalInfo', 'stateCode'])
    },
    created() {
      this.$store.dispatch('personalInfoApi');

    },

    methods: {
      getpersonalInfosData: function () {
        let _this = this;
        setTimeout(function () {
          _this.personalInfoArr.push(_this.personalInfo);
          _this.sumIntegral = _this.personalInfoArr[0].sumIntegral;
          _this.messageStatus = parseInt(_this.personalInfoArr[0].messageStatus);
        }, 500);

        console.log(_this.personalInfoArr)

        if (_this.messageStatus !== 0) {
          _this.messageStyle = "message";
        } else {
          _this.messageStyle = "message-active";

        }
      }
    },
    mounted() {
      this.getpersonalInfosData()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .view {
    margin-bottom: 4.5rem;
  }

  body {
    background: #f6f6f6;
  }

  .personal-wrap .herder-wrap {
    padding: 1rem 0 2rem;
    background: -webkit-linear-gradient(left top, #49c8f3, #118ce2);
    background: -o-linear-gradient(bottom right, #49c8f3, #118ce2);
    background: -moz-linear-gradient(bottom right, #49c8f3, #118ce2);
    background: linear-gradient(to bottom right, #49c8f3, #118ce2);
  }

  .personal-wrap .personal-header-tittle {
    position: relative;
  }

  .personal-wrap .personal-header-tittle p {
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 1.7rem;
  }

  .personal-wrap .personal-header-tittle a i {
    display: inline-block;
    width: 2rem;
    height: 2rem;
  }

  .personal-wrap .personal-header-tittle a:first-child i {
    position: absolute;
    left: 1.4rem;
    top: 0;
    background: url(../../static/img/icon_1.png) no-repeat;
    background-size: 100% 100%;
  }

  .message-style {
    position: absolute;
    display: inline-block;
    right: 1.5rem;
    top: 0;
    width: 2.2rem;
    height: 2.2rem;
  }

  .message {
    /* .message-style();*/
    position: absolute;
    display: inline-block;
    right: 1.5rem;
    top: 0;
    width: 2.2rem;
    height: 2.2rem;

    background: url(../../static/img/ring.png) no-repeat;
    background-size: 66% 66%;
  }

  .message-active {
    /* .message-style();*/
    position: absolute;
    display: inline-block;
    right: 1.5rem;
    top: 0;
    width: 2.2rem;
    height: 2.2rem;

    background: url(../../static/img/icon_2.png) no-repeat;
    background-size: 100% 100%;

  }

  .personal-wrap .personal-header-photo {
    padding: 1rem;
    padding-bottom: 0 !important;
  }

  .personal-wrap .personal-header-photo i {
    display: inline-block;
    float: left;
    width: 6.8rem;
    height: 6.8rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
  }

  .personal-header-photo a {
    color: #FFFFFF;
  }

  .personal-wrap .personal-header-photo i img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .personal-header-photo dl {
    display: inline-block;
    font-size: 1.5rem;
    margin: 1.3rem 0 0 1.5rem;
    color: #FFFFFF;
    float: left;
  }

  .personal-header-photo dt {
    margin-bottom: 0.7rem;
  }

  .personal-domain {
    height: 6.3rem;
    width: 100%;
    margin: 2.3rem auto 0;
  }

  .personal-domain ul {
    display: flex;
    height: 100%;
    justify-content: space-between;
    margin: auto;
  }

  .personal-domain ul li {
    width: 100%;
    border-right: 1px #ffffff solid;
  }

  .domain_aer {
    width: 5rem;
    height: 6.5rem;
    margin: auto;
    text-align: center;
    color: #FFFFFF;
  }

  .domain_aer i {
    width: 4.5rem;
    height: 4rem;
    display: inline-block;
    font-size: 3rem;
    text-align: center;
    color: #FFFFFF;
  }

  .domain_aer span {
    font-size: 1.2rem;
  }

  .parting {
    width: 100%;
    height: 3.7rem;
    line-height: 3.7rem;
    padding-left: 1rem;
    color: #999999;
    font-size: 1.2rem;
  }

  .personal-wrap .personal-main li {
    background: #ffffff;
    height: 4.25rem;
    padding-left: 1rem;
    color: #000000;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }

  .personal-main li > i {
    width: 2.2rem;
    height: 2.2rem;
    display: inline-block;
    font-size: 2rem;
    color: #03a9f4;
    margin-right: 0.5rem;
  }

  .personal-main li > div {
    width: calc(100% - 2.2rem);
    height: 100%;
    border-bottom: 1px solid #f2f2f2;
    line-height: 4.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .personal-wrap .personal-main li div > i {
    position: relative;
    top: -0.7rem;
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin-right: .5rem;
    color: #ccbfbf;
  }

  .personal-domain ul li:last-of-type {
    border: none;
  }
</style>
