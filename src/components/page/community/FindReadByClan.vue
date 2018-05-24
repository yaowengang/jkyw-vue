<template>
  <div>
    <div class="header">
      <i class="back"><a href="javascript:history.go(-1)" class="iconfont icon icon-fanhui1"></a></i>
      <div class="information">
        <div class="information_top">
          <img :src="clan.icon">
          <p>{{clan.name}}</p>
        </div>
        <i class="join"><a href="/healthFront/social/joinClanByclanId.do?clanId=4"
                           class="iconfont icon icon-icon02"></a></i>
        <div class="information_bottom">
          <span>成员{{clan.topicNum}}人</span>
          <span>话题{{clan.peopleNum}}</span>
        </div>
      </div>
    </div>
    <ArticleList :reads="reads"></ArticleList>
  </div>
</template>
<script>
    import ArticleList from '@/components/commom/Article_list.vue'

    export default{
        data() {
          return {
            user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
            clan:[],
            reads:[]
          }
        },
        components:{
            ArticleList
        },
        computed: {

        },
        created () {
          this.getFindReadByClan()
        },
        methods:{
          getFindReadByClan(){
            this.$http.post("/healthFront/out/social/healthTribeDetail.do",this.Qs.stringify({
            memberId: this.user.memberId,
            clanId:this.$route.query.id
            })
            )
            .then((res)=>{
              console.log(res.data)
              this.clan = res.data.reads[0].clan
              this.reads = res.data.reads
            }
            )
            .catch((err)=>{

            })
          }
        },
        beforeRouteLeave (to, from, next) {
          // called when the route that renders this component is about to
          // be navigated away from.
          // has access to `this` component instance.
          console.log(to)
          console.log(from)
        }

    }

</script>
<style lang="less" scoped>
  .header {
    width: 100%;
    height: 20rem;
    display: flex;
    background: url('/static/image/pic.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    .back {
      width: 2.5rem;
      height: 2rem;
      display: inline-block;
      position: absolute;
      top: 2rem;
      left: 2rem;
      a {
        color: #03a9f4;
      }
    }
    .information {
      width: 36.5%;
      margin: auto;
      position: relative;
      div {
        display: inline-block;
        span {
          display: inline-block;
          text-align: center;
          width: 50%;
          float: left;
          &:nth-of-type(1) {
            border-right: 2px solid #fff;
          }
        }

      }
      .information_top {
        width: 100%;
        height: 8.5rem;
        text-align: center;
        img {
          width: 7rem;
          height: 7rem;
          border-radius: 50%
        }
        p {
          color: #ffffff;
          display: inline-block;
          margin: 1rem 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          font-size: 1.3rem;

        }
      }
      .information_bottom {
        width: 100%;
        height: 1.25rem;
        span {
          width: 50%;
        }
      }
      .join {
        width: 2.5rem;
        height: 2.5rem;
        display: inline-block;
        position: absolute;
        right: 0;
        bottom: 3rem;
        a {
          color: #FFFFFF;
          font-size: 2.5rem;
        }
      }
      span {
        color: #fff;
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
  }
</style>

