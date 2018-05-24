<template>
  <div>
    <top :title="title"></top>
    <div class="details-wrap">
      <h3 class="details-title">
        {{ $route.params.id }}
        <span>90天</span>
      </h3>
      <div class="details-main">
        {{ TextList.schemeInfo.content }}
      </div>
      <h3 class="details-title">
        具体计划
      </h3>

      <ul>
        <router-link :to="$route.params.id + scc">
        <li class="add-main clear">
          <p>监测尿常规 <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i> <span>90天 </span></p>
          <p>重复：周一</p>
        </li>
        </router-link>

        <li class="add-main clear">
          <p>监测血糖 <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i> <span>90天 </span></p>
          <p>重复：周一</p>
        </li>
      </ul>
      <button type="button">添加该方案</button>

    </div>
  </div>
</template>
<style lang="less" scoped="">
  body{
    background:#f6f6f6;
    .details-wrap{
      margin-top:4.5rem;
      .details-title{
        width: 94%;
        margin: 0 3%;
        padding: 1.5rem 0.5rem;
        font-size: 1.6rem;
        color: #4f4f4f;
        span{
          float: right;
          background: #03a9f4;
          color: #ffffff;
          -webkit-border-radius: 3rem;
          -moz-border-radius: 3rem;
          -ms-border-radius: 3rem;
          -o-border-radius: 3rem;
          border-radius: 3rem;
          padding: 0.3em 1.2rem;
          font-size: 1.1rem;
        }
      }
      .details-main{
        width: 94%;
        margin: 0 3%;
        background: #ffffff;
        padding: 2rem 1.5rem;
        font-size: 1.3rem;
        color: #464646;
      }
      .add-main{
        background: #ffffff;
        width: 94%;
        margin: 0 3%;
        padding: 1.5rem 1rem 0.8rem 1.2rem;
        font-size: 1.4rem;
        border-bottom: 1px solid #f3f3f3;
        p{
          color: #464646;
          padding: 0.8rem 0;
        };
       p:nth-child(2){
         font-size: 1.2rem;
       }
        span{
          float: right;
          background: #03a9f4;
          color: #ffffff;
          -webkit-border-radius: 3rem;
          -moz-border-radius: 3rem;
          -ms-border-radius: 3rem;
          -o-border-radius: 3rem;
          border-radius: 3rem;
          padding: 0.3em 1.2rem;
          font-size: 1.1rem;
        }
        i{
          float: right;
          display: inline-block;
          width: 1.3rem;
          height: 2rem;
          margin-left: 0.4rem;
          font-size: 2rem;
          color: #ccc;
        }
      }
      button{
        width: 94%;
        margin: 5rem 0 1rem 3%;
        padding: 1.3rem 0;
        color: #ffffff;
        font-size: 1.5rem;
        background: #03a9f4;
        -webkit-border-radius: 0.5rem;
        -moz-border-radius: 0.5rem;
        -ms-border-radius: 0.5rem;
        -o-border-radius: 0.5rem;
        border-radius: 0.5rem;
      }
    }
  }
</style>
<script>
  import Top from '@/components/commom/top2.vue';
  export default{
    data (){
      return {
        title:'添加方案',
        scc:'/ss',
        TextList:[]
      }
    },
    components: {
      Top
    },
    created() {
      this.$http.post("/healthFront/out/index/schemeDetail.do",this.Qs.stringify({
          memberId: '1',
          schemeId: '1'
        })
      ).then((res) => {
        this.TextList = res.data;
        var sw = JSON.stringify(this.TextList);
        console.log(sw);
        console.log(this.TextList);
      })
    },
  }
</script>
