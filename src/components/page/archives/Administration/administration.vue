<template>
  <div>
    <top :title="title"></top>
    <ul class="plan-wrap" v-if="this.adminList.length > 0">
      <li class="plan-main clear"  v-for="adminlist in adminList">
        <img :src="adminlist.headimg">
        <dl>
          <dt>{{ adminlist.adminName }}</dt>
          <dd>{{ adminlist.joinNum }}人加入该计划</dd>
        </dl>
        <router-link :to="'/helthCenter/administration/join/'+adminlist.id + adminlist.adminName" ><button type="button">加入</button></router-link>
      </li>
    </ul>
    <div class="NoData" v-else>
       暂无方案
    </div>
  </div>
</template>
<style lang="less">
  body{
    background: #f6f6f6;
  }
  .plan-wrap{
    margin-top:6rem;
    margin-bottom: 1rem;
    .plan-main{
      padding: 1.4rem 2rem;
      background: #ffffff;
      margin-top: 1.5rem;
      width: 94%;
      margin-left: 3%;
      position: relative;
      img{
        width: 21%;
        margin-right: 3%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        -o-border-radius: 50%;
        border-radius: 50%;
        float: left;
      }
      dl{
        margin-top: 0.6rem;
        width: 56%;
        float: left;
        dt{
          margin-bottom: 0.5rem;
          color: #4f4f4f;
          font-size: 1.5rem;
        }
        dd{
          font-size: 1.1rem;
          color: #bab9b9;
        }
      }
     button{
       position: absolute;
       right: 1.2rem;
       top: 3rem;
       color: #03a9f4;
       font-size: 1.2rem;
       background: #ffffff;
       border: 1px solid #03a9f4;
       padding: 0.4rem 1rem;
     }
    }
  }
  .NoData{
    margin-top:4.5rem;
    font-size: 1.4rem;
    padding: 2rem;
    text-align: center;
    color:#ccc
  }
</style>
<script>
  import Top from '../../../commom/top2.vue'
  export default{
    data (){
      return {
        title:'方案管理',
        adminList:[
          {id:'0011',headimg:'http://img0.imgtn.bdimg.com/it/u=2605392816,449843748&fm=26&gp=0.jpg',adminName:'30天降血糖计划',joinNum:'25'},
          {id:'0012',headimg:'http://img1.imgtn.bdimg.com/it/u=2508879656,681945443&fm=26&gp=0.jpg',adminName:'28天降脂计划',joinNum:'25'},
          {id:'0013',headimg:'http://img0.imgtn.bdimg.com/it/u=4179762635,2328546803&fm=26&gp=0.jpg',adminName:'临界高血压检测频率',joinNum:'25'},
          {id:'0014',headimg:'http://img5.imgtn.bdimg.com/it/u=3711882095,3932220328&fm=26&gp=0.jpg',adminName:'一级高血压检测频率',joinNum:'25'},
          {id:'0015',headimg:'http://img4.imgtn.bdimg.com/it/u=4008030685,531900727&fm=26&gp=0.jpg',adminName:'二级高血压检测频率',joinNum:'25'},
          {id:'0016',headimg:'http://img0.imgtn.bdimg.com/it/u=203053264,2983555922&fm=26&gp=0.jpg',adminName:'哈哈哈哈啊',joinNum:'25'}
        ]
      }
    },
    mounted(){
      //console.log(this.adminList.length)
    },
    created() {
      this.$http.post("/healthFront/out/index/joinScheme.do",this.Qs.stringify({
        memberId: '1',
        schemeId:'1'
        })

      ).then((res) => {
        this.messageArr = res.data;
        console.log(res.data)
      })
    },
    components: {
      Top
    }
  }
</script>
