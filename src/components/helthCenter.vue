<template>
  <div class="hc  view">
    <top :title="title"></top>
    <div class="health-wrap">
      <ul class="health-menu clear">
        <li>
          <router-link to="/helthCenter/archiveslist">
          <div>
            <i class="icon iconfont icon-jiankangdangan-"></i>
            <p>健康档案</p>
          </div>
          </router-link>
        </li>
        <li>
          <router-link to="/helthCenter/casemanagement">
          <div>
            <i class="icon iconfont icon-quandianzhenduan"></i>
            <p>病例管理</p>
          </div>
          </router-link>
        </li>
        <li>
          <router-link to="/projectManage">
          <div>
            <i class="icon iconfont icon-fanganguihua"></i>
            <p>方案管理</p>
          </div>
          </router-link>
        </li>
      </ul>

      <router-link to="/helthCenter/stepcounter">
        <div class="health-main clear">
          <div class="main-title clear">
            计步
            <span>单位：步数</span>
          </div>
          <div class="contain">
            <div class="left">
              <i class="icon iconfont icon-unie61d"></i>
              <div class="left_con" v-if="statecode == 002 ">
                <span>获取数据失败</span>
                <span>请求无数据</span>
              </div>
              <div class="left_con"  v-else>
                <span>今日未行走</span>
                <span>目标步数：{{ setnumday }}</span>
              </div>
            </div>
            <div class="right">
              <p></p>
              <p><router-link to="/helthCenter/setsteps">手动输入</router-link></p>
            </div>
          </div>
        </div>
      </router-link>



        <div class="health-main clear">
          <div class="main-title clear">
            血压
            <span>单位：mmHg</span>
          </div>
          <div class="contain">
            <div class="left">
              <i class="icon iconfont icon-xieya1"></i>
              <div class="left_con">
                <span>收缩压：今日未测量</span>
                <span>舒张压：今日未测量</span>
              </div>
            </div>
            <div class="right">
              <p><router-link to="/">绑定血压仪</router-link></p>
              <p><router-link to="/helthCenter/setpressure">手动输入</router-link></p>
            </div>
          </div>
        </div>


      <router-link to="/helthCenter/stepcounter">
        <div class="health-main clear">
          <div class="main-title clear">
            血糖
            <span>单位：mmol/L</span>
          </div>
          <div class="contain">
            <div class="left">
              <i class="icon iconfont icon-xietangjiance"></i>
              <div class="left_con">
                <span>血糖值：今日未测量</span>
                <span></span>
              </div>
            </div>
            <div class="right">
              <p></p>
              <p><router-link to="/helthCenter/setsugar">手动输入</router-link></p>
            </div>
          </div>
        </div>
      </router-link>


    </div>
    <router-view></router-view>
    <Bottom></Bottom>
  </div>
</template>

 <script type="text/ecmascript-6">
import Bottom from '@/components/Bottom.vue'
import Top from './commom/top.vue'

export default {
    data() {
        return {
            title: '健康中心',
            setpNumDay:'',
            statecode:'',
            setnumday:'',
            user:JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        }
    },
    components: {
        Top,
        Bottom
    },
  created() {
    let InformationType = this.$route.params.InformationType;
    this.$http.post("healthFront/out/healthCenter/getStepNumDay.do",this.Qs.stringify({
        memberId:this.user.memberId
      })
    ).then((res) => {
      this.setpNumDay = res.data;
      this.setnumday = res.data.setpNumDay;
      this.statecode = res.data.stateCode;
      var sw = JSON.stringify(this.setpNumDay);
      console.log(sw);
    });
  },
  mounted(){
    console.log(this.user.memberId);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .view{
    margin-bottom:4.5rem;
  }
  body {
    background: #f6f6f6;
  }
  .health-wrap{
    margin-top: 5.5rem;
  }
  .health-wrap .health-menu {
    padding: 1.8rem 0;
    display: flex;
    background: #fff;
    margin-bottom: 1rem;
  }
  .health-wrap .health-menu li {
    width: calc(33.33333333%);
    float: left;
    text-align: center;
    color: #b3b3b3;
    border-left:solid 1px #DEDEDE;
  }
  .health-wrap .health-menu li:first-child{
    border: none;
  }
  .health-wrap .health-menu li div {
   flex: 1;
  }
  .health-wrap .health-menu li i {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    font-size: 4.5rem;
  }
  .health-wrap .health-menu li:first-child i{
    color: #35BAF6;
  }
  .health-wrap .health-menu li:nth-child(2) i {
    color: #FEB134;
  }
  .health-wrap .health-menu li:nth-child(3) i {
    color: #37DCE2;
  }
  .health-wrap .health-main {
    width: 90%;
    margin-left: 5%;
    background: #ffffff;
    margin-bottom: 1rem;
    -webkit-border-radius: 0.5rem;
    -moz-border-radius: 0.5rem;
    -ms-border-radius: 0.5rem;
    -o-border-radius: 0.5rem;
    border-radius: 0.5rem;
  }
  .health-wrap .health-main .main-title {
    padding:0 1.7rem;
    padding-top: 2rem;
    font-size: 1.5rem;
    color: #4f4f4f;
  }
  .contain{
    height: auto;
    overflow: hidden;
    padding: 0 1.4rem;
    margin-bottom: 1rem;
  }
  .left{
    width: 70%;
    margin-top: 1rem;
    float: left;
    .left_con{
      display: inline-block;
      width:60%;
      margin-left: 1rem;
      span{
        display: block;
        line-height: 2.5rem;
        font-size: 1.2rem;
      }
    }
    i{
      display: inline-block;
      width: 4rem;
      height: 5.5rem;
      font-size: 4rem;
    }
  }
  .right{
    width: 30%;
    float: right;
    line-height: 2.5rem;
    font-size: 1.2rem;
    p{
      height: 2.5rem;
      font-size: 1.2rem;
      text-align: right;
      a{
        text-decoration: underline;
        color: #FE9D02;
      }
    }
  }
  .health-wrap .health-main .main-title i {
    float: left;
    display: inline-block;
    width: 2.2rem;
    height: 2.2rem;
    margin-right: 0.5rem;
  }
  .health-wrap .health-main .icon1 {
    background: url(../../static/img/health_6.png) no-repeat;
    background-size: 100% 100%;
  }
  .health-wrap .health-main .icon2 {
    background: url(../../static/img/health_7.png) no-repeat;
    background-size: 100% 100%;
  }
  .health-wrap .health-main .icon3 {
    background: url(../../static/img/health_8.png) no-repeat;
    background-size: 100% 100%;
  }

  .health-wrap .health-main .main-title > span {
    float: right;
    font-size: 1rem;
    color: #adadad;
    margin-top: 0.3rem;
  }

  .icon-unie61d{
    color: #35BAF6;
  }
  .icon-xieya1{
    color: #FEB134;
  }
  .icon-xietangjiance{
    color: #37DCE2;
  }


</style>
