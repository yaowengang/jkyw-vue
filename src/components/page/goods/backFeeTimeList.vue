<template>
  <div class="order-wrap">

    <Top :title="title"></Top>

    <div class="logistics-main clear">
      <img :src="orderArr.picurl">
      <ul>
        <li>退款状态: <span v-text="backStatusText"></span></li>
        <li>审批意见：{{orderArr.refuseReason}}</li>
        <li>退货金额：{{orderArr.price}}</li>
      </ul>
    </div>

    <div class="logistics-step clear">

      <div class="clear" v-if="orderArr.backReturnGoodsTime === '' ? false : true ">
        <i></i>
        <p>退货申请中</p>
        <p v-text="orderArr.backReturnGoodsTime"></p>
      </div>


      <div class="clear" v-if="orderArr.backReturnGoodsPassTime === '' ? false : true ">
        <i></i>
        <p>同意退货</p>
        <p v-text="orderArr.backReturnGoodsPassTime"></p>
      </div>


      <div class="clear" v-if="orderArr.backReturnGoodsDone === '' ? false : true ">
        <i></i>
        <p>买家已退货</p>
        <p v-text="orderArr.backReturnGoodsDone"></p>
      </div>

      <div class="clear" v-if="orderArr.backReturnGoodsDeliver === '' ? false : true ">
        <i></i>
        <p>卖家已收货</p>
        <p v-text="orderArr.backReturnGoodsDeliver"></p>
      </div>

      <div class="clear" v-if="orderArr.backReturnFeeReject === '' ? false : true ">
        <i></i>
        <p>退款已完成</p>
        <p v-text="orderArr.backReturnFeeReject"></p>
      </div>


    </div>

  </div>


</template>

<script>

  import Top from '../../commom/top2.vue'

  export default {
    data() {
      return {
        title: "退货进度",
        orderId: this.$route.query.id,
        orderArr: [],
        backStatusText: '',

      }
    },
    created() {
      this.$http.post("/healthFront/out/order/getBackFeeTimeList.do", this.Qs.stringify({
          orderItemId: this.orderId,
        })
      ).then((res) => {
        this.orderArr = res.data.returnGoods;
        this.backStatusFn(this.orderArr.status)
        console.log(this.orderArr)
      });
    },
    methods: {
      backStatusFn(text) {
        if (text === 0) {
          this.backStatusText = "退货申请中"
        } else if (text === 1) {
          this.backStatusText = "同意退货"
        } else if (text === 2) {
          this.backStatusText = "拒绝退货"
        } else if (text === 3) {
          this.backStatusText = "买家已退货"
        } else if (text === 4) {
          this.backStatusText = "卖家已收货"
        } else if (text === 5) {
          this.backStatusText = "退货完成"
        } else if (text === 6) {
          this.backStatusText = "卖家拒绝退款"
        }

      }
    },
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

  .order-wrap .logistics-main {
    background: #ffffff;
    padding: 1.3rem;
    font-size: 1.2rem;
    margin-top: 4.5rem;
  }

  .order-wrap .logistics-main img {
    width: 6.6rem;
    height: 6.6rem;
    float: left;
    border: 0.1rem solid #c5c5c5;
    margin-right: 1.5rem;
  }

  .order-wrap .logistics-main ul li {
    margin: 0.5rem 0;
  }

  .order-wrap .logistics-main ul li span {
    color: #10adf5;
  }

  .order-wrap .logistics-step {
    background: #ffffff;
    margin-top: 0.5rem;
    padding: 1.8rem 2rem;
  }

  .order-wrap .logistics-step > div {
    border-left: 1px solid #03a9f4;
    margin: 0 1rem;
    position: relative;
    height: 7.8rem;
    padding-left: 1rem;
  }

  .order-wrap .logistics-step > div i {
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    background: url("../../../../static/img/logistics-info_03.png") no-repeat;
    background-size: 100% 100%;
    float: left;
    position: absolute;
    top: -0.6rem;
    left: -0.7rem;
  }

  .order-wrap .logistics-step > div p {
    font-size: 1.2rem;
    color: #03a9f4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 0.2rem 1rem;
    position: relative;
    top: -0.7rem;
    letter-spacing: 1px;
  }
</style>
