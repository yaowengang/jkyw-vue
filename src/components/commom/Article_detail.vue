<template>
  <div>
    <Top :title="title"></Top>

    <div class="detailds_con">
      <input type="hidden" value="3" name="">
      <h1>{{ btname }}</h1>
      <span class="timer">{{ time }}</span>
      <div class="detailds_text" v-html="containtext">
      </div>
    </div>
    <InfoBottom></InfoBottom>
  </div>
</template>

<script>
  import Top from '@/components/commom/top2.vue';
  import InfoBottom from '../commom/infoBottom.vue'
    export default {
        data() {
        return {
          title: '文章详情',
          time:'',
          btname:'',
          user:JSON.parse(localStorage.getItem('loginStatus')),
          containtext:''
          }
        },
        components:{
          Top,
          InfoBottom
        },
      created() {
        this.$http.post("/healthFront/out/prevention/preBookInfoById.do",this.Qs.stringify({
            memberId: this.user.memberId,
          prebookId:this.$route.params.id
          })
        ).then((res) => {
          this.qs = res.data.preBook;
          this.containtext = res.data.preBook.content;
          this.btname = res.data.preBook.title;
          this.time = res.data.preBook.bookType.bookTime;
          var sw = JSON.stringify(this.stickConsultList);
          //this.stickConsultList= this.stickConsultList[0].cover;
          console.log(this.qs)
        });
      }
    }
</script>

<style lang="less" scoped>
  .detailds_con {
    border-top: solid 2px #e7e7e7;
    padding: 1.6rem;
    background: #fff;
    margin-top: 5rem;
    h1 {
      font-weight: 500;
      font-size: 1.7rem;
      text-align: center;
      margin: 1rem 0;
    }
    span {
      font-weight: 100;
      color: #666666;
      display: block;
      font-size: 1.1rem;
      text-align: center;
      margin-bottom: 0.4rem;
    }
    .detailds_text {
      margin-top: 1rem;
      width: 100%;
      overflow: hidden;
      p{
        color: #333;
        text-indent: 2em;
        width: 100%;
        span{
          display: block;
          width: 100%;
        }
        img{ width: 100%}
      }
    }

  }

  .bottom_btn {
    height: auto;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    text-align: center;
    background: #fff;
    border-top: solid 1px #e4e4e4;
    ul {
      width: 100%;
      display: flex;
      li {
        display: inline-block;
        width: 34%;
        padding: 0.6rem;
        i {
          width: 2.2rem;
          height: 2.2rem;
          margin-bottom: 0.4rem;
          display: inline-block;
        }
        p {
          font-size: 1rem;
          color: #9c9c9c;
          height: 1rem;
          line-height: 1rem;
        }
      }
    }
  }
</style>
