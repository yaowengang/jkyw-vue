<template>
  <div>
    <top :title="title"></top>
    <div class="order-wrap">
      <div class="shop-content">
        <h4>今日必抢</h4>
        <mt-loadmore  :bottom-method="loadBottom" ref="loadmore">
          <ul class="Finished_con_ul">
            <li class="Finished_con_li" v-for="list in goodList">
              <router-link to="/">
                <img :src="list.imageName" alt="">
                <p>{{ list.title }}</p>
                <div class="price">
                  ￥{{ list.price}}
                  <span class="original-price">￥{{ list.originalPrice}}</span>
                  <span class="integral">积分{{ list.score }}</span>
                </div>
              </router-link>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '@/components/commom/top2.vue'
  import { Loadmore } from 'mint-ui'
  import { Toast } from 'mint-ui';
  export default{
    data(){
      return {
        title:"今日必抢",
        maplength:0,
        numberLoad:2,
        startNumber:0,
        hasData:false,
        goodList:'',
        startNumber:0, //当前页数
        numberLoad:6,//每页加载个数
        user:JSON.parse(localStorage.getItem('loginStatus')),//用户信息
      }
    },
    created() {
      this.$http.post("healthFront/out/shop/todayGrab.do",this.Qs.stringify({
          startNumber:this.startNumber,
          numberLoad:this.numberLoad
        })
      ).then((res) => {
        this.goodList = res.data.goodsList;
        //this.setnumday = res.data.setpNumDay;
       // this.statecode = res.data.stateCode;
       // var sw = JSON.stringify(this.setpNumDay);
        console.log(this.goodList);
        this.startNumber +=1
      });
    },
    components:{
      top,
      Loadmore
    },
    mounted() {
      this.loadData()
    },
    methods: {
      loadData() {
      },
      loadBottom() {

        console.log(this.startNumber )
        this.$http.post("healthFront/out/shop/todayGrab.do",this.Qs.stringify({
            startNumber:this.startNumber,
            numberLoad:this.numberLoad
          })
        ).then((res) => {
          var newList = res.data.goodsList;
          //this.setnumday = res.data.setpNumDay;
          // this.statecode = res.data.stateCode;
          // var sw = JSON.stringify(this.setpNumDay);
          for(var i=0; i<newList.length; i++){
            this.goodList.push(newList[i])
          }
          this.startNumber +=1
        });
        if(this.startNumber == 5){
          this.allLoaded = true;// 若数据已全部获取完毕
          Toast({
            message: '没有更多数据辣！！',
            position: 'bottom',
            duration: 5000
          });
        }

        this.$refs.loadmore.onBottomLoaded();
      }
    }
  }
</script>
<style lang="less" scoped>
  /*@import '../../../static/css/reset.css';*/
  @import '/static/css/mui.min.css';
  .order-wrap{
    margin-top:4.5rem;
    padding-top: 3rem;
  }
  .order-wrap .shop-content h4 {
    padding: 1rem 1.5rem;
    font-size: 1.2rem;
    background: #efeff4;
    color: rgba(40, 40, 40, 0.4);
    width: 100%;
    position: fixed;
    top: 4rem;
    z-index: 888;
  }
  .order-wrap .shop-content h4 a {
    display: inline-block;
    position: relative;
    float: right;
    top: -0.5rem;
  span{
    font-size:2.2rem;
  }

  }
  .shop-content{
    .Finished_con_ul{
      width: 100%;
      overflow: auto;
      height: auto;
      background: #ffffff;
      padding: 0 1.4rem;
      li{
        width: 50%;
        float: left;
        padding: 1rem 0.9rem;
        height: auto;
        img{
          width: 100%;
          height: 12.8rem;
        }
        p{
          font-size: 1.3rem;
          color: rgba(40, 40, 40, 0.8);
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top: 10px;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .price{
          color: red;
          font-size: 1.1rem;
          margin-top: 0.5rem;
          .original-price{
            text-decoration: line-through;
            color: #9e9e9e;
          }
          .integral{
            color: #09abf4;
            display: block;
            float: right;
          }
        }
      }
    }
  }
</style>
