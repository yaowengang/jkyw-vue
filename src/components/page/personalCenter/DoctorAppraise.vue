<template>
  <div>
    <header>
      <a href="javascript:history.go(-1)"><i class="iconfont icon icon-fanhui1"></i></a>
      <h1>评价</h1>
    </header>
    <div class="appraise">
      <div class="appraise-box clear">
        <div class="d-detail">
          <span>副教授</span>
          <i>
            <img :src="headImg">
          </i>
          <span>性别：女</span>
        </div>
        <h4>蒋傇洋</h4>
        <p>心血管疾病</p>
      </div>
      <Score @Childscorenum="Parentcorenume"></Score>
      <div class="pj-content">
        <evaluate @ChildtextareVal="ParenttextareVal"></evaluate>
      </div>
      <div class="pj-btn"  @click="sumbit">提交评价</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Score from '../../commom/Score.vue'
  import Evaluate from '../../commom/Evaluate.vue'
  export default {
    data() {
      return {
        headImg:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1847607994,868758731&fm=117&gp=0.jpg',
        scorenum:'',
        TextaerVal:'',
        sumbitTxet:[],
        medicalList:''
      }
    },
    mounted(){
      mui('body').on('tap','a',function(){document.location.href=this.href;});
    },
    methods:{
      sumbit:function(){
        if( !this.scorenum=='' && !this.TextaerVal==''&& !this.TextaerVal.match(/^\s+$/g) ){
          let texe = {'scorenum':this.scorenum,'textaerval':this.TextaerVal};
          this.sumbitTxet=texe;
          console.log('提交信息'+this.sumbitTxet)
        } else {
          console.log('请完善评价内容')
        }
      },
      Parentcorenume:function(data){
       this.scorenum = data;
        console.log(this.scorenum)
      },
      ParenttextareVal:function(data){
        this.TextaerVal = data;
      }
    },
    created() {
      this.$http.post("/healthFront/out/personalCenter/toPraiseConsult.do",this.Qs.stringify({
          memberId: '16'
        })
      ).then((res) => {
        this.medicalList = res.data;
        var sw = JSON.stringify(this.medicalList);
        console.log(sw);
      });
    },
    components:{
      Score,
      Evaluate
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  header {
    max-width: 640px;
    min-width: 320px;
    height: 4.5rem;
    margin: auto;
    background: #FFFFFF;
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    a {
      text-decoration: none;
      color: #007aff;
      i {
        width: 2rem;
        height: 2rem;
        display: inline-block;
        margin-top: 1.5rem;
        &:nth-of-type(1) {
          margin-left: 1.4rem;
        }
      }
    }
    h1 {
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
      white-space: nowrap;
    }
  }
  .appraise{ margin-top:5rem;
    .appraise-box{
      background: #ffffff;
      text-align: center;
      padding: 1.1rem 1rem;
      margin: 0.5rem 0;
      .d-detail{
        span{
          display: inline-block;
          font-size: 1.3rem;
          color: #cfcfcf;
        }
        span:first-of-type {
          margin-right: 10%;
        }
       span:last-of-type {
          margin-left: 7%;
        }
        i{
          display: inline-block;
          width: 19%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          img{
            width: 100%;
            border-radius:50%
          }
        }
      }
      h4{font-size: 1.7rem;
        margin-top: 1rem;}
      p{
        font-size: 1.1rem;
        margin-top: 1rem;
      }
    }
    .pj-content{
      min-height: 23rem;
      margin-top: 0.5rem;
      padding: 2rem 1rem;
      background: #ffffff;
      position: relative;
      font-size: 1.3rem;
      color: #e0e0e0;
    }
    .pj-btn{
      width: 53%;
      background: #03a9f4;
      color: #ffffff;
      text-align: center;
      font-size: 1.5rem;
      padding: 0.9rem 0;
      border-radius: 0.2rem;
      margin: 2rem auto;
    }
  }
</style>
