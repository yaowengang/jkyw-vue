<template>
  <div class="order-wrap">
    <Top :title="title"></Top>
    <div class="shop-content">
      <ul>
        <li v-for="item in goodsArr" @click="go()">
          <img :src="item.goods.imageName">
          <p v-text="item.goods.goodsName"></p>
          <div class="price"> ￥{{item.goods.price}}<span class="original-price" v-text="'￥'+item.goods.originalPrice"></span>
          </div>
        </li>

      </ul>


    </div>
  </div>
</template>
<style lang="less" scoped>
  .price-color {
    color: #ff3333;
  }

  .order-wrap .shop-content {
    position: relative;
    margin-top: 4.5rem;
  }

  .order-wrap .shop-content h4 {
    padding: 0.8rem 1.5rem;
    font-size: 1.2rem;
    color: rgba(40, 40, 40, 0.4);
  }

  .order-wrap .shop-content h4 a {
    display: inline-block;
    width: 2rem;
    height: 1rem;
    position: relative;
    top: 0.4rem;
    float: right;
    /*   background: url("../images/today_iocn_03.png") 0 0 no-repeat;*/
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .order-wrap .shop-content ul {
    overflow: hidden;
    width: 100%;
    background: #ffffff;
    padding: 0 1.4rem;
  }

  .order-wrap .shop-content ul li {
    width: 50%;
    float: left;
    padding: 1rem 0.9rem;
  }

  .order-wrap .shop-content ul li img {
    width: 12.8rem;
    height: 12.8rem;
    border: 1px solid #ffffff;
  }

  .order-wrap .shop-content ul li p {
    font-size: 1.3rem;
    color: rgba(40, 40, 40, 0.8);
    font-weight: 700;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .order-wrap .shop-content ul li .price {
    color: red;
    font-size: 1.1rem;
    margin-top: 0.5rem;
    position: relative;
  }

  .order-wrap .shop-content ul li .price .original-price {
    text-decoration: line-through;
    color: #9e9e9e;
  }

  .order-wrap .shop-content ul li .price .integral {
    color: #09abf4;
  }

  .order-wrap .shop-content ul li .price span {
    margin-left: 0.5rem;
    position: absolute;
    right: 0;
  }

  .order-wrap .shop-content .load-more {
    padding: 1rem 0;
    text-align: center;
    color: #b2b2b2;
  }

</style>
<script>
  import Top from '../../../../src/components/commom/top2.vue'

  export default {
    data() {
      return {
        title: "我的收藏",
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        goodsArr: []
      }
    },
    created() {
      this.$http.post("/healthFront/out/personalCenter/getCollectList.do", this.Qs.stringify({
          memberId: this.user.memberId,
          currentPage: 1,
          showCount: 5,
        })
      ).then((res) => {
        this.goodsArr=res.data.collectList.list
        console.log(this.goodsArr)
      })
    },
    methods: {
      go(id){
        this.$router.push({
          path: "/backFeeTimeList",
          query: {
            id: id
          }
        });
      }
    },
    components: {
      Top

    }
  }
</script>
