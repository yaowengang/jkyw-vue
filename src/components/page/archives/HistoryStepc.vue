<template>
  <div>
    <header>
      <a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui1"></i></a>
      <h1>历史记录</h1>
      <router-link to="/"><i class="icon iconfont icon-sangedian"></i></router-link>
    </header>
    <div class="history-wrap">
      <div class="month-step">
        <span>{{ CumulativeNum  }}</span>步
        <p>本月总累计</p>
      </div>
      <ul class="day-step-wrap" v-if="HistoricalRecord != '' ">
        <i></i>
        <li class="day-step" v-for=" (HistoricalList ,key) in HistoricalRecord">
          <p>{{ key }}</p>
          <dl>
            <dt>{{ HistoricalList }}</dt>
            <dd>{{ HistoricalList.distance }} {{ HistoricalList.energy }}千卡</dd>
          </dl>
        </li>
      </ul>
      <nulltext v-else></nulltext>
    </div>
  </div>
</template>

<script>
  import NullText from '../../commom/Nulltext.vue'
  export default {
    data (){
      return {
        CumulativeNum:'',
        HistoricalRecord:[]
      }
    },
    created() {
      this.$http.post("/healthFront/out/healthCenter/getStepRecordShow.do",this.Qs.stringify({
          memberId: '1'
        })

      ).then((res) => {
        this.HistoricalRecord = res.data.monthRecordMap;
       // console.log(this.HistoricalRecord.length);
      })
    },
    mounted (){
      var Cumulative=0;
      for(var i =0; i < this.HistoricalRecord.length; i++ ) {
        var sw = this.HistoricalRecord[i].stepNum;
        Cumulative = Cumulative + parseInt(sw)
      }
      return this.CumulativeNum = Cumulative;
    },
    components: {
      nulltext:NullText
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  header{
    background: #fff;
    height: 4.5rem;
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    h1{
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
    .icon{
      font-size: 16px;
      width: 2rem;
      height: 2rem;
      display: inline-block;
      margin-top: 1.5rem;
    }
    .icon-fanhui1{
      margin-left: 1.4rem;
      color: #4e9bea;
    }
    .icon-sangedian{
      margin-right: 1.4rem;
      float: right;
      color: #4e9bea;
      transform: rotate(90deg);
    }
  }
  .history-wrap{
    margin-top: 4.5rem;
    .month-step{
      padding: 3rem 0;
      background: #ffffff;
      color: #4e9bea;
      font-size: 1.3rem;
      font-weight: 400;
      text-align: center;
      span{
        font-size: 6.4rem;
        display: inline-block;
        transform: rotateY(-40deg);
        margin: 0 -0.5rem 0 0.6rem;
      }
    }
    .day-step-wrap{
      background: #ffffff;
      text-align: center;
      i{
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 0.8rem solid transparent;
        border-right: 0.8rem solid transparent;
        border-bottom: 0.8rem solid #59a1eb;
        margin-bottom: -0.3rem;
      }
      .day-step{
        color: #ffffff;
        padding: 2rem 0 1.8rem;

        p{
          position: absolute;
          font-size: 1.5rem;
          padding: 2.3rem 0 0 2rem;
          transform: rotateY(-40deg);
        }
        dl dt {
          transform: rotateY(-40deg);
          font-size: 3.5rem;
        }
        dl dd {
          margin-top: 1rem;
          font-size: 1.1rem;
        }
      }
      .day-step:nth-child(even){
        font-size: 10rem;
        background: -webkit-linear-gradient(left, #61a6ec, #59a1eb);
        background: linear-gradient(to right, #61a6ec, #59a1eb);
      }
      .day-step:nth-child(odd){
        background: -webkit-linear-gradient(left, #4e9bea, #6babed);
        background: linear-gradient(to right, #4e9bea, #6babed);
      }

      .day-step:nth-child(2) p {
        transform: rotateY(0deg) !important;
      }
    }
  }

</style>
