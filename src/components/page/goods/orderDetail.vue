<template>
  <div class="orderDetail">
    <top :title="title"></top>
    <div class="order-wrap">
      <div class="order-main-wrap">
        <h3>订单详情<span class="order-status" v-text="orderList.status == 1 ? '未支付' : ''|| orderList.status == 2 ? '已取消' : ''
          || orderList.status == 3 ? '已支付' : ''  || orderList.status == 4 ? '已发货' : '' || orderList.status == 5 ? '已签收' : ''
|| orderList.status == 6 ? '已评价' : ''|| orderList.status == 7 ? '未评价' : ''|| orderList.status == 8 ? '退货申请中' : ''
|| orderList.status == 9 ? '已退货' : ''|| orderList.status == 10 ? '已清算' : ''"></span></h3>
        <div class="order-main clear">
          <div class="consignee">
            <p>收货人：{{orderList.receiver}}</p>
            <p>收货地址：{{orderList.address}}</p>
          </div>
          <div class="goods-name clear" v-for="list in orderList.itemVOs">
            <a>
              <i> <img :src="list.picurl"></i>
              <span>{{ list.goodsName }}</span>
              <div>
                <p class="price-color price-col ">¥{{ list.price }}</p>
                <s class="price-color color646464">¥{{list.originalPrice}}</s>
                <p>×{{ list.amount}}</p>
              </div>
            </a>
          <!--  <div class="pay-box" v-if="show">
              <button @click="returnGoods">退货退款</button>
              <button class="colorff3300" @click="evaluate">评价</button>
            </div>-->
          </div>

          <div class="sj-pay">
            <p>实际付款 <span class="price-color price-col ">¥{{orderList.sumPrice}}</span></p>
          </div>
        </div>
      </div>

      <ul class="order-info">
        <li>订单编号：{{orderList.orderno }}</li>
        <li>创建时间：{{orderList.createTime}}</li>
        <li v-if="orderList.payTime === '' ? false : true ">付款时间：{{orderList.payTime}}</li>
        <li v-if="orderList.deliverTime === '' ? false : true ">发货时间：{{orderList.deliverTime}}</li>
        <li v-if="orderList.signTime === '' ? false : true ">签收时间：{{orderList.signTime}}</li>
      </ul>

    </div>
    <div class="delete_box">
      <button @click="delOrder(orderList.id)">删除订单</button>
      <button class="colorff3300" v-show="show" @click="pay">
        <!-- <router-link to="">付款</router-link>-->
        付款
      </button>
    </div>

    <div class="ceng" v-show="popupStatus">
    </div>
    <div class="dialog" v-show="popupStatus">
      <p>确定删除该订单吗？</p>
      <span @click="attentionEnsure">确定</span>
      <span @click="attentionCancel">取消</span>
    </div>
  </div>
</template>

<script>
  import top from '../../commom/top2.vue'

  export default {
    data() {
      return {
        title: '订单详情页',
        orderList: [],
        show: false,
        goodsId: this.$route.query.id,
        popupStatus: false,
        deleteId:0


      }
    },
    components: {
      top
    },
    created() {
      this.$http.post("/healthFront/out/order/orderItem.do", this.Qs.stringify({
          orderId: this.goodsId
        })
      ).then((res) => {
        this.orderList = res.data.orderItem;
        console.log(this.orderList);

        for (var j = 0; j < this.orderList.itemVOs.length; j++) {
          var b2 = 0;
          b2 += this.orderList.itemVOs[j].amount * this.orderList.itemVOs[j].price;
          this.orderList.sumPrice = b2;
        }
      })
    },
    mounted() {

    },
    methods: {
      //删除事件
      delOrder(params) {
        this.popupStatus = true
        this.deleteId=params
      },
      //确认删除
      attentionEnsure() {
        this.popupStatus = false;
        var _this = this;
        _this.$http.post("/healthFront/out/order/deleteOrder.do", _this.Qs.stringify({
            orderId: this.deleteId,
          })
        ).then((res) => {
          _this.$router.go(-1);

        })


      },

      /* 关注取消*/
      attentionCancel() {
        this.popupStatus = false;
      },

      returnGoods() {

        this.$router.push({
          path: '/returnGoods'
        })
      },
      evaluate() {
        this.$router.push({
          path: '/evaluate'
        })
      },
      pay() {
        this.$router.push({path: '/payment', query: {id: this.orderList[0]._id}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/css/reset.css';
  @import '../../../../static/css/mui.min.css';

  body {
    background: #f6f6f6 !important;
  }

  .order-wrap {
    margin: 5rem 0;
  }

  .order-wrap .order-info {
    background: #FFFFFF;
    margin-top: 0.9rem;
    padding: 1.2rem;
    color: #585858;
    font-size: 1.2rem;
  }

  .order-wrap .order-main-wrap h3 {
    font-size: 1.3rem;
    color: #000000;
    padding: 0.7rem 1.2rem;
  }

  .price-col {
    color: #ff3300;
  }

  .order-status {
    color: #ff3300;
    float: right;
  }

  .order-wrap .order-main-wrap .order-main {
    background: #FFFFFF;
    width: 100%;
    font-size: 1.2rem;
  }

  .consignee {
    padding: 0.8rem 1.5rem;
  }

  .order-wrap .order-main-wrap .order-main .goods-name {
    background: #fbfbfb;
    padding: 0.7rem 1.2rem 0.7rem 1.2rem;
    position: relative;
  }

  .order-wrap .order-main-wrap .order-main .sj-pay {
    padding: 1.2rem 1.2rem 2.2rem;
    font-size: 1.3rem;
  }

  .order-wrap .order-main-wrap .order-main .consignee p {
    line-height: 3.2rem;
    font-size: 1.2rem;
    color: #000;
  }

  .order-wrap .order-main-wrap .order-main .goods-name i {
    display: inline-block;
    float: left;
    width: 7rem;
    height: 7rem;
    background: #FFFFFF;
  }

  .order-wrap .order-main-wrap .order-main .goods-name i img {
    width: 80%;
    height: 80%;
    margin: 10%;
  }

  .order-wrap .order-main-wrap .order-main .goods-name a span {
    display: inline-block;
    width: 45%;
    margin-left: 1rem;
    line-height: 2.2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #000;
    float: left;
  }

  .order-wrap .order-main-wrap .order-main .goods-name a > div {
    /*position: absolute;
    top: 1.2rem;
    right: 1rem;*/
    text-align: right;
  }

  .order-wrap .order-main-wrap .order-main .goods-name a > div p {
    margin-bottom: 1rem;
  }

  .goods-name .color646464 {
    color: #646464;
  }

  .order-wrap .order-main-wrap .order-main .sj-pay span, .order-wrap .order-main-wrap .order-main .sj-pay button {
    float: right;
  }

  .order-wrap .order-info {
    background: #FFFFFF;
    margin-top: 0.9rem;
    padding: 1.2rem;
    color: #585858;
    font-size: 1.2rem;
  }

  .order-wrap .order-info li {
    margin: 0.8rem 0;
  }

  .delete_box {
    position: fixed;
    bottom: 0;
    height: 4.5rem;
    line-height: 4.5rem;
    border-top: 1px solid #d9d9d9;
    width: 100%;
    background: #ffffff;
    text-align: right;
  }

  .delete_box button {
    margin-right: 1rem;
    vertical-align: middle;
  }

  .sj-pay button, .pay-box button, .delete_box button {
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

  .ceng {
    width: 100%;
    height: 100%;
    background: rgba(105, 105, 105, 0.5);
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
  }

  .doctor .show {
    width: 60%;
    background: #ffffff;
    border-radius: 0.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .dialog {
    width: 70%;
    margin: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2.3rem 0.7rem;
    background: #fff;
    z-index: 100;
    border-radius: 0.3rem;
  }

  .dialog p {
    font-size: 1.4rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }

  .dialog span {
    display: inline-block;
    width: 35%;
    font-size: 1.2rem;
    border: solid 1px #03a9f4;
    color: #03a9f4;
    text-align: center;
    padding: 0.7rem 0;
    margin-left: 1.8rem;
    border-radius: 0.3rem;
  }

  .dialog span:last-of-type {
    color: #fff;
    background: #03a9f4;
  }
</style>
