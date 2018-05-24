<template>
  <div class="health">
    <top :title="title"></top>
    <ul class="content">
      <li>
        <router-link :to="'/perventDetails'+ 55">
          <h4>春季吃韭菜正当时</h4>
          <p>俗语说春初早韭，秋末晚菘，是指初春早生的韭菜和秋末晚生的青菜是最好吃的。民间韭菜的功效大家......</p>
        </router-link>
        <div class="li-bot">
          <span><i class="iconfont icon icon-dianzan"></i>502</span>
          <span><i class="iconfont icon icon-fenxiang"></i>620</span>
          <span><i class="iconfont icon icon-pinglun1"></i>460</span>
        </div>
      </li>
      <li>
        <h4>女性体寒应该吃什么 </h4>
        <p>女人体质冷、手脚易凉和痛经是普遍的现象。中医理论认为这是气虚、气滞、阳气不足的反应。女性在......</p>
        <div class="li-bot">
          <span><i class="iconfont icon icon-dianzan"></i>502</span>
          <span><i class="iconfont icon icon-fenxiang"></i>620</span>
          <span><i class="iconfont icon icon-pinglun1"></i>460</span>
        </div>
      </li>
      <li>
        <h4>缓解干眼症的小妙招</h4>
        <p>眼睛是心灵的窗户，大家一定要爱护，不要把本来清澈的眼睛，逐渐变得浑浊、不清晰。生活中许许多......</p>
        <div class="li-bot">
          <span><i class="iconfont icon icon-dianzan"></i>502</span>
          <span><i class="iconfont icon icon-fenxiang"></i>620</span>
          <span><i class="iconfont icon icon-pinglun1"></i>460</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  .health {
    background: #fff;
    .content {
      li {
        border-bottom: solid 1px #e4e4e4;
        padding: 1.5rem 1.1rem 0 1.1rem;
        h4 {
          font-size: 1.4rem;
        }
        p {
          font-size: 1.2rem;
          margin-top: 1.7rem;
          line-height: 2rem;
        }
        .li-bot {
          padding: 1.7rem 1.4rem;
          width: 100%;
          span {
            display: inline-block;
            width: 32%;
            line-height: 1.6rem;
            font-size: 1rem;
            i {
              display: inline-block;
              width: 1.5rem;
              height: 1.6rem;
              margin-right: 0.7rem;
              color: #9a9a9a;
            }
          }
        }
      }
    }
  }


</style>
<script>
  import top from '../../commom/top2.vue'
  export default {
    data() {
      return {
        title: "预防宝典",
        user:JSON.parse(localStorage.getItem('loginStatus')),
      }
    },
    components: {
      top
    },
    created() {
      this.$http.post("/healthFront/out/prevention/preventionIndex.do",this.Qs.stringify({
          memberId: this.user.memberId,
          currentPage:'1',
          showCount:'5'
        })
      ).then((res) => {
        this.bannerTop = res.data.prebookroots;
        this.stickConsultList = res.data.prebooks;
        this.classlist = res.data.BookTypes;
        this.containTitle =  res.data.prebooks.title;
        var sw = JSON.stringify(this.stickConsultList);
        //this.stickConsultList= this.stickConsultList[0].cover;
        console.log(this.stickConsultList)
      });
    },

  }
</script>
