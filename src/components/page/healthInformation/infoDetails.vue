<template>
  <div class="programme">
    <Top :title="title"></Top>
    <div class="detailds_con">
      <h1 class="h1_bt">{{ healthDetail.title }}</h1>
      <span class="timer">{{ healthDetail.readTime }}</span>
      <div class="detailds_text">
        <p v-html="healthDetail.content"></p>
      </div>
    </div>
    <!--底部按钮-->
    <InfoBottom v-if="showcom" :status="likeStatus" :healthInfoId="idIndex" :userId="userId"></InfoBottom>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../commom/top2.vue'
  import InfoBottom from '../../commom/infoBottom.vue'
  export default {
    data() {
      return {
        title: '健康资讯',
        healthDetail: {},
        idIndex:this.$route.query.id,
        userId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
        likeStatus: 0,
        showcom: false
      }
    },
    created() {
      // console.log(this.$route.query.id);
      this.$http.post("/healthFront/out/index/healthInfoDetails.do",this.Qs.stringify({
          memberId: this.userId,
          consultId: this.idIndex
        })
      ).then((res) => {
        if (res.data.stateCode == "001"){
          this.healthDetail = res.data.consult;
          this.likeStatus = this.healthDetail.likeStatus;
          this.showcom = true
        }
        //console.log(this.healthDetail.likeStatus)
      })
    },
    components: {
      Top,
      InfoBottom
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  body{
    background: #ffffff !important;
  }
  .detailds_con {
    border-top: solid 2px #e7e7e7;
    padding: 1.6rem;
    background: #fff;
    margin-bottom: 6rem;
    margin-top:4.5rem;
  }
  .detailds_con h1 {
    font-weight: 500;
    font-size: 1.7rem;
    text-align: center;
    margin: 1rem 0;
  }
  .detailds_con span {
    font-weight: 100;
    color: #666666;
    display: block;
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 0.4rem;
  }
  .detailds_text {
    margin-top: 1rem;
    color: #333;
  }
  .detailds_text p {
    font-size: 1.2rem;
    line-height: 3rem;
    text-align: justify;
  }
  .detailds_text img{
    width: 100%;
    margin: 2.4rem 0;
  }

</style>
