<template>
  <div class="shop  view">
    <!-- 商城头部搜索部分 -->
    <div class="shop-search-container">
      <div class="search-box">
        <div class="shop-shopping fa fa-shopping-cart"></div>
        <form action="" class="shop-search">
          <div class="search-form-box">
            <input class="search-form-input" @focus="searchFn" >
            <div class="form-search fa fa-search"></div>
          </div>
        </form>
      </div>
    </div>
    <!-- 轮播 -->
    <div class="slider">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in selectedGoods" :key="item.id"><img :src="item.imageName" class="banner-item" alt=""></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="shop-box">
      <router-link class="box-child" to="/goodsClassify">
        <i></i>
        <span>分类查询</span>
      </router-link>
      <router-link class="box-child" to="/todayPurchase">
        <i></i>
        <span>今日必抢</span>
      </router-link>
      <router-link class="box-child" to="/myOrder">
        <i></i>
        <span>我的订单</span>
      </router-link>
      <router-link class="box-child" to="/shopCart">
        <i></i>
        <span>购物车</span>
      </router-link>
    </div>
    <rowbar :rowTitle="rt1" :url="url1"></rowbar>
    <div class="shop-content">
      <ul class="coupon clear">
        <li @click="changeBelong(index,item.id)" v-for="(item, index) in discountCoupon" :key="item.id">      
          <div class="coupon_box" :class="{ coupon_box_already : item.status }">
            <div class="coupon_num_box">
              <div class="coupon_monery">{{ item.amount }}</div>
              <div class="coupon_unit_box">
                <h1 class="coupon_unit">￥</h1>
                <div class="coupon_cill">满<span>{{ item.minAmount }}</span></div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <rowbar :rowTitle="rt2" :url="url2"></rowbar>
    <div class="shop-content">
      <ul class="clear">
        <li @click="toLink(index)" v-for="(item, index) in hotGoodList" :key="item.id">
          <router-link :to="{ path:'GoodsDetail', query:{id:item.goods.id} }">
          <span class="shop-img"><img :src="item.goods.imageName"></span>
          <p>{{ item.goods.goodsName }}</p>
          <div class="price">￥{{ item.goods.price }}<span>￥{{ item.goods.originalPrice }}</span></div>
          </router-link>
        </li>
      </ul>
    </div>
    <rowbar :rowTitle="rt3" :url="url3"></rowbar>
    <div class="shop-content">
      <ul class="clear">
        <li v-for="(item, index) in likeGoodsList" :key="item.id">
          <router-link  :to="{ path:'GoodsDetail', query:{id:item.id} }">
          <span class="shop-img"><img :src="item.imageName"></span>
          <p>{{ item.goodsName }}</p>
          <div class="price">￥{{ item.price }}<span>￥{{ item.originalPrice }}</span></div>
          </router-link>
        </li>
      </ul>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script type="text/ecmascript-6">
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import rowbar from './page/goods/rowBar.vue'
  import Bottom from '@/components/Bottom.vue'
  export default {
    name: 'bottom',
    data() {
      return {
        swiperOption: {
          pagination: 'swiper-pagination',
          paginationClickable: true
        },
        rt1: "优惠券",
        rt2: "热门商品",
        rt3: "猜你喜欢",
        url1: '/discountCoupon',
        url2: '/goodsList',
        url3: '/YouLike',
        discountCoupon: [],
        Cindex: [],
        hotGoodList: [],
        likeGoodsList: [],
        selectedGoods:[]
      }
    },
    created() {
    //   this.$http.get('/static/data/healthInfo.json').then((res) => {
    //     this.discountCoupon = res.data.discountCoupon;
    //     this.goodList = res.data.goods;
    //     for(var i=0; i<this.goodList.length; i++){
    //       if (this.goodList[i].type ) {
    //         this.hotGoodList.push(this.goodList[i])
    //       }
    //     }
    //     console.log(this.hotGoodList)
    // })
    this.$http.post("/healthFront/out/shop/shopIndex.do", this.Qs.stringify({
          memberId:JSON.parse(localStorage.getItem('loginStatus')).memberId
        })
      ).then((res) => {
        console.log(res.data)
        this.discountCoupon = res.data.couponList
        this.hotGoodList = res.data.hotGoodsList
        this.likeGoodsList = res.data.likeGoodsList
        this.selectedGoods = res.data.selectedGoods
      })
       .catch((error) => {
                console.log(error)
                reject(error)
      })
    },
    methods: {
      changeBelong (i,j) {

        this.$http.post("/healthFront/out/shop/addLeag.do", this.Qs.stringify({
          memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
          couponId:j
        })
        )
        .then((res) =>{
          console.log(res)
          if(res.data.stateCode == "001"){
            this.discountCoupon[i].status = 1;
          }
          })

      },
      toLink (i) {

      },

      searchFn(){
        this.$router.push("/goodsSearch")
      }
    },
    components: {
      swiper,
      swiperSlide,
      rowbar,
      Bottom
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .view{
    margin-bottom:4.5rem;
  }
  /* 商城头部搜索部分 */

  .shop-search-container {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    z-index: 10;
    width: 100%;
    position: fixed;
    top: 0;
    height: 4.5rem;
    background: #ffffff;
  }

  .search-box {
    margin: 0 1rem 0 1rem;
    height: 100%;
  }

  .shop-shopping {
    position: absolute;
    left: 10px;
    top: 0;
    display: inline-block;
    font-size: 2.6rem;
    line-height: 4.5rem;
    color: #03a9f4;
  }

  .shop-search {
    padding-left: 3.6rem;
  }
  .shop-search input{
   background:#f6f6f6 ;
  }
  .search-form-box {
    position: relative;
    width: 100%;
    height: 3rem;
    background: #ebebeb;
    margin-top: 0.75rem;
    border-radius: 0.3rem;
  }

  .search-form-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding-left: 0.5rem;
    padding-right: 3.4rem;
  }

  .form-search {
    font-size: 1.6rem;
    text-align: center;
    line-height: 3rem;
    width: 3.4rem;
    height: 100%;
    display: inline-block;
    position: absolute;
    right: 0;
    color: #bcbcbc;
  }

  .slider {
    margin-top: 4.5rem;
  }

  .swiper-slide img {
    width: 100%;
  }

  .shop .shop-box {
    background: #ffffff;
    display: -webkit-flex;
    display: flex;
    padding: 1.8rem 2.3rem;
  }

  .shop .shop-box .box-child {
    display: inline-block;
    flex: 1;
    text-align: center;
    margin-right: 2rem;
  }

  body .shop .shop-box .box-child:first-child i {
    background: url(../../static/img/shop-icon_03.png) 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  body .shop .shop-box .box-child:nth-child(2) i {
    background: url(../../static/img/shop-icon_05.png) 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  body .shop .shop-box .box-child:nth-child(3) i {
    background: url(../../static/img/shop-icon_07.png) 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  body .shop .shop-box .box-child:last-child i {
    background: url(../../static/img/shop-icon_09.png) 0 0 no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  body .shop .shop-box .box-child i {
    display: inline-block;
    width: 4.3rem;
    height: 4.3rem;
  }

  body .shop .shop-box .box-child span {
    font-size: 1.1rem;
    color: rgba(40, 40, 40, 0.8);
  }

  body .shop .shop-box .box-child:last-child {
    margin-right: 0;
  }

  /* 优惠券样式 */
  .shop-content ul {
    overflow: hidden;
    width: 100%;
    background: #ffffff;
    padding: 0 .4rem;
  }
  .shop-content ul li {
    width: 33%;
    float: left;
    padding: 1rem 0.3rem;
  }
  .coupon_box {
    width: 9.3rem;
    height: 4.8rem;
    margin: auto;
    border-radius: 0.25rem;
    position: relative;
    background: url(../../static/img/receive.png) no-repeat;
    background-size: 100%;
  }
  .coupon_box_already {
    background: url(../../static/img/already_received.png) no-repeat !important;
    background-size: 100%!important;
  }
  .coupon_num_box {
    display: inline-block;
    width: 6.5rem;
    height: 3rem;
    position: absolute;
    left: 0;
    top: 1rem;
    color: #ffffff;
  }
  .coupon_monery {
    height: 3rem;
    line-height: 3rem;
    width: 3.5rem;
    text-align: right;
    font-size: 3rem;
    float: left;
  }
  .coupon_unit_box {
    float: right;
    height: 3rem;
  //width: calc(100% - 4rem);
    width: 40%;
  }
  .coupon_unit {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  .coupon_cill {
    font-size: 0.9rem;
    line-height: 1.2rem;
  }

  /* 商城产品样式 */
  body .shop .shop-content .shop-img {
    height: 9.5rem;
    width: 100%;
    display: inline-block;
    overflow: hidden;
  }
  .shop .shop-content ul li span img {
    width: 100%;
    height: 100%;
  }
  .shop .shop-content ul li p {
    font-size: 1.3rem;
    line-height: 1.5rem;
    height: 1.5rem;
    color: #333333;
    font-weight: 100;
    padding: 5px 0;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: content-box;
  }
  .shop .shop-content ul li .price {
    color: red;
    font-size: 1rem;
  }
  .shop .shop-content ul li .price span {
    color: #9e9e9e;
    margin-left: 0.3rem;
    text-decoration: line-through;
  }
</style>
