<template>
  <div>
    <!--待付款-->
    <div class="order-main-wrap" v-for="(item, index) in paymentOrder">
      <div class="order-main clear">
        <p class="order-main-title">订单号:{{ item.orderno }} <span class="order-status">{{ item.statusDescribe }}</span>
        </p>

        <div class="goods-name clear" v-for="list in item.itemVOs">
          <router-link :to="{ path:'/orderDetail',query:{id:item._id} }">
            <div class="order-detail">
              <i> <img :src="list.picurl"></i>
              <span>{{ list.goodsName }}</span>
              <span class="color646464">{{ list.goodsColor }}</span>
              <div class="price">
                <p class="price-color">¥{{ list.price }}</p>
                <s class="price-color color646464">¥{{ list.originalPrice }}</s>
                <p class="color646464">×{{ list.amount }}</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="sj-pay clear">
          <p><span>共<i>{{ item.sum }}</i>件商品</span>合计：¥{{ item.sumPrice }}（含运费¥0.00） </p>
          <div>
            <button @click="delOrder(item.id)">删除订单</button>
            <button @click="goOrderDetail(item.id)">订单详情</button>
            <button class="colorff3300" @click="goPayment(item.id)">付款</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        paymentOrder: [],
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
      }
    },
    created() {
      this.$http.post("/healthFront/out/order/orderList.do", this.Qs.stringify({
          memberId: this.user.memberId,
          status: 2,
          index: 1
        })
      ).then((res) => {
        this.paymentOrder = res.data.orderlist
        console.log(this.paymentOrder)

        for (var i = 0; i < this.paymentOrder.length; i++) {
          var a2 = 0;
          var b2 = 0;
          for (var j = 0; j < this.paymentOrder[i].itemVOs.length; j++) {
            a2 += this.paymentOrder[i].itemVOs[j].amount;
            b2 += this.paymentOrder[i].itemVOs[j].amount * this.paymentOrder[i].itemVOs[j].price;
            this.paymentOrder[i].sum = a2;
            this.paymentOrder[i].sumPrice = b2;
          }
        }
      });
    },
    methods: {
      delOrder(params) {
        var _this = this;
        var btnArray = ['取消', '确认'];
        mui.confirm('确认删除此订单吗？删除之后无法恢复', '警 告', btnArray, function (e) {
          if (e.index === 1) {
            _this.$http.post("/healthFront/out/order/deleteOrder.do", _this.Qs.stringify({
                orderId: params,
              })
            ).then((res) => {
              console.log((res.data))
              window.location.reload()
            })
          }
        });
      },
      //跳转详情页
      goOrderDetail(id) {
        this.$router.push({
          path: "/orderDetail",
          query: {
            id: id
          }
        });
      },
      //跳转结算页
      goPayment(id) {
        this.$router.push({
          path: "/payment",
          query: {
            id: id
          }
        });
      },


    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/css/reset.css';
  @import '../../../../static/css/mui.min.css';

  a {
    color: #000;
  }

  .order-main-wrap {
    margin-bottom: 1rem;
  }

  .order-wrap .order-main-wrap .order-main {
    background: #FFFFFF;
    width: 100%;
    font-size: 1.2rem;
  }

  .order-wrap .order-main-wrap .order-main .order-main-title {
    padding: 0 1.5rem;
    line-height: 3.8rem;
    color: #666666;
  }

  .order-main-title .order-status {
    color: #ff3300;
    float: right;
  }

  .goods-name {
    background: #fbfbfb;
    padding: 0.7rem 1.2rem 0.7rem 1.2rem;
    position: relative;
  }

  .goods-name i {
    float: left;
    width: 7rem;
    height: 7rem;
    background: #FFFFFF;
  }

  .goods-name i img {
    width: 80%;
    height: 80%;
    margin: 10%;
  }

  .goods-name .order-detail > span {
    display: inline-block;
    width: 45%;
    margin-left: 8rem;
    line-height: 2.2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .goods-name .order-detail > span {
    display: inline-block;
    width: 45%;
    margin-left: 8rem;
    line-height: 2.2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .goods-name .color646464 {
    color: #646464;
  }

  .goods-name .price {
    position: absolute;
    top: 1.2rem;
    right: 1rem;
    text-align: right;
  }

  .goods-name .color646464 {
    color: #646464;
  }

  .sj-pay {
    padding: .5rem 1.2rem 1rem 0rem;
    font-size: 1.3rem;
  }

  .sj-pay p {
    float: right;
    width: 100%;
    text-align: right;
  }

  .sj-pay p span, .sj-pay p span i {
    margin: 0 1rem;
  }

  .sj-pay div {
    float: right;
    width: 100%;
    text-align: right;
    margin-top: 1rem;
  }

  .sj-pay button, .pay-box button {
    padding: 0.4rem;
    width: 6.5rem;
    background: #FFFFFF;
    border: 1px solid #b3b2b2;
    color: #222222;
    margin-left: 1rem;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    -ms-border-radius: 0.4rem;
    -o-border-radius: 0.4rem;
    border-radius: 0.4rem;
  }

  button.colorff3300 {
    border: 1px solid #ff3300 !important;
    color: #ff3300 !important;
  }

  .pay-box {
    margin-top: 1rem;
    text-align: right;
  }
</style>
