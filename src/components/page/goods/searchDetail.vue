<template>
  <div class="order-wrap">
    <Top :title="title"></Top>
    <div class="shop-content" v-if="dataStatus">
      <ul>
        <li v-for="item in goodsArr">
          <img :src="item.imageName">
          <p v-text="item.title"></p>
          <div class="price">￥{{(item.price).toFixed(2)}}<br><span class="original-price">{{(item.originalPrice).toFixed(2)}}</span> <span class="integral">积分 {{item.score}}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="no-data" v-if="!dataStatus">
      <img src='http://1c73388p57.imwork.net:23510/healthFront/images/noData/null-serch_03.png'>
      <p>未搜索到相关内容</p>
    </div>


  </div>
</template>

<script>
  import Top from '../../../../src/components/commom/top2.vue';

  export default {
    data() {
      return {
        title: '搜索结果',
        goodsName: this.$route.query.goodsName,
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        goodsArr: [],
        dataStatus: true

      }
    },
    created() {
      this.$http.post("/healthFront/out/shop/toSearchGoodsByName.do", this.Qs.stringify({
          memberId: this.user.memberId,
          goodsName: this.goodsName
        })
      ).then((res) => {

        if (res.data.goodsList.length > 0) {
          this.dataStatus = true;
          this.goodsArr = res.data.goodsList

        } else {
          this.dataStatus = false;
        }


      })
    },
    methods: {},
    components: {
      Top
    }
  }
</script>

<style lang="less" scoped>
  body {
    background: #f6f6f6;
  }

  .price-color {
    color: #ff3333;
  }

  .shop-content {
    margin-top: 4.5rem;
  }


  .shop-content ul {
    overflow: hidden;
    width: 100%;
    background: #ffffff;
    padding: 0 1.4rem;
  }

  .shop-content ul li {
    width: 50%;
    float: left;
    padding: 1rem 0.9rem;
    height: 19rem
  }

  .shop-content ul li img {
    width: 100%;
    height: 12.8rem;
  }

  .shop-content ul li p {
    font-size: 1.3rem;
    color: rgba(40, 40, 40, 0.8);
    /*font-weight: 700;*/
    /*display: -webkit-box;*/
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .shop-content ul li .price {
    color: red;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }

  .shop-content ul li .price .original-price {
    text-decoration: line-through;
    color: #9e9e9e;
  }

  .shop-content ul li .price .integral {
    color: #09abf4;
  }

  .shop-content ul li .price span {
    margin-left: 0.5rem;
  }

  .no-data {
    margin-top: 12rem;
    text-align: center;
  }

  .no-data img {
    width: 80%;
    margin: 0 auto
  }

  .no-data p {
    margin-top: 3rem;
    color: #8f8f94;
    font-size: 1.4rem
  }
</style>
