<template>
  <div class="integral-wrap">
    <header class="head">
      <i><a @click="goBack()" class="his_to icon iconfont icon-fanhui1"></a></i>
      <h1>积分</h1>
    </header>

    <div class="main">
      <!--样式 支持积分7位数-->
      <div class="integral-number-wrap">
        <div class="integral-number">
          <p><span v-text="sumIntegral"></span> 分</p>
        </div>
      </div>

      <router-link to="/rechargeIntegral">
        <button type="button">去充值</button>
      </router-link>
    </div>

    <ul class="integral-nav clear">

      <li class="li-active">
        <router-link to="/integral/">
          积分记录
        </router-link>
      </li>

      <li>
        <router-link to="/integral/rechargeRecord">
          充值记录
        </router-link>
      </li>

    </ul>

    <div class="integral-content">
      <router-view></router-view>
    </div>

  </div>
</template>
<style lang="less" socped>
  body {
    background: #ffffff;
  }

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

  .bg-write {
    background: #ffffff;
  }

  .integral-wrap {
    margin-top: 4.5rem;

  }

  .integral-number-wrap {
    margin: 2.4rem auto;
    width: 13rem;
    height: 13rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #fff;
    background: -webkit-linear-gradient(left, #fe9d01, #ffd188);
    background: linear-gradient(to right, #fe9d01, #ffd188);
  }

  .integral-number {
    color: #fe9d01;
    font-size: 1.1rem;
    text-align: center;
    width: 12rem;
    height: 12rem;
    margin: 0.5rem auto;
    padding-top: 4.9rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    position: relative;
    z-index: 999;
    background: #ffffff;
  }

  .integral-number p {
    transform: rotateY(-35deg);
  }

  .integral-number span {
    font-size: 2.1rem;
  }

  button[type=button] {
    padding: 1.2rem;
    margin: 3rem 12% 2.5rem;
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

  .main {
    border-bottom: 1rem solid #f5f5f5;
    padding-top: 3rem;
    background: #FFFFFF;

  }

  .integral-nav li {
    width: 50%;
    float: left;
    text-align: center;
    color: #a3a3a3;
    font-size: 1.4rem;
    background: #ffffff;
  }

  .integral-nav li a {
    display: inline-block;
    width: 100%;
    padding: 1.2rem 0;
    border-bottom: solid 2px #dddddd;
  }

  .integral-nav li a.router-link-exact-active {
    color: #00adfb;
    border-bottom: 2px solid #03a9f4;
  }


</style>
<script type="text/ecmascript-6">
  import Top from '../../../../src/components/commom/top2.vue'
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        title: "积分",
        personalInfoArr: [],
        sumIntegral: "",

      }
    },
    computed: {
      ...mapGetters(['personalInfo', 'stateCode'])
    },
    created() {
      this.$store.dispatch('personalInfoApi');

    },
    methods: {
      goBack() {
        this.$router.push("/personalCenter")
      },
      getpersonalInfosData: function () {
        let _this = this;
        setTimeout(function () {
          _this.personalInfoArr.push(_this.personalInfo);
          _this.sumIntegral = _this.personalInfoArr[0].sumIntegral;

        }, 100)
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
