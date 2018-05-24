<template>
    <div class="projectManage">
      <top :title="title"></top>
      <div class="goods_box clear" v-for="item in orderList">
        <i><img :src="item.goodsImg"></i>
        <div class="goods_right">
          <h4>{{ item.goodsTit }}</h4>
          <p id="price">￥{{ item.price }}</p>
        </div>
      </div>
      <ul class="goods_list">
        <li>是否收到货物：
          <span>
            <span class="fa fa-circle-o" @click="show1" :class="{'fa-dot-circle-o': isActive1}"></span>
            <input type="radio" name="putGoods" >已收到
        </span>
          <span>
            <span class="fa fa-circle-o" @click="show1" :class="{'fa-dot-circle-o': !isActive1}"></span>
            <input type="radio" name="putGoods" >未收到
        </span>
        </li>
        <li>是否需要退货：
          <span>
            <span class="fa fa-circle-o" @click="show2" :class="{'fa-dot-circle-o': isActive2}"></span>
            <input type="radio" name="sales">需要退货
        </span>
          <span>
            <span class="fa fa-circle-o" @click="show2" :class="{'fa-dot-circle-o': !isActive2}"></span>
            <input type="radio" name="sales">不需要退货
        </span>
        </li>
        <li class="reason">
          <span>退款理由:</span>
          <textarea class="height-auto"></textarea>
        </li>
        <li class="reason">
          <span>退款金额:</span>
          <textarea class="height-auto" id="money" disabled="disabled">149.2</textarea>
        </li>
      </ul>
      <div class="refund-tj">提交</div>
    </div>
</template>

<script>
import top from '../../commom/top2.vue'
export default {
    data() {
        return {
          title:'退款申请',
          orderList: [],
          isActive1: false,
          isActive2: false
        }
    },
    components: {
        top
    },
    created () {
      this.$http.get("/static/data/healthInfo.json").then((res) => {
        this.order = res.data.order
        for(var i=0;i<this.order.length;i++){
          if ( this.order[i]._id == this.$route.query.id ){
            this.orderList.push(this.order[i].goodsGather[this.$route.query.key])
          }
        }
        console.log(this.orderList)
      });
    },
    mounted () {
      console.log(this.$route.query.id);
      console.log(this.$route.query.key);
    },
    methods: {
      show1 () {
        this.isActive1 = !this.isActive1
      },
      show2() {
        this.isActive2 = !this.isActive2
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/css/reset.css';
  .fa{
    color: #1696e5;
  }
  .goods_box {
    background: #FFFFFF;
    padding: 1rem;
    overflow: hidden;
    margin-top: 5rem;
  }
  .goods_box i {
    width: 15%;
    display: inline-block;
    float: left;
    border: solid 1px #dadada;
  }
  .goods_box i img {
    width: 100%;
  }
  .goods_box .goods_right {
    float: right;
    width: 78%;
  }
  .goods_box .goods_right h4 {
    font-size: 1.5rem;
  }
  .goods_box .goods_right p {
    font-size: 1.1rem;
    color: #e34500;
    margin-top: 0.7rem;
  }
  .goods_list {
    background: #FFFFFF;
    margin-top: 0.4rem;
    padding: 2rem 1rem;
  }
  .goods_list li {
    font-size: 1.3rem;
    margin-top: 2.3rem;
    width: 100%;
    overflow: hidden;
  }
  .goods_list li > span {
    font-size: 1.2rem;
    margin-left: 0.5rem;
    width: 28%;
    display: inline-block;
  }
 /* .goods_list li span label {
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    !*background: url(../images/check-btn_05.png);
    -webkit-background-size: 100%;*!
    background-size: 100%;
    vertical-align: sub;
  }*/
  .goods_list li span input {
    display: none;
  }
/*  .goods_list li span label.active {
  !*  background: url(../images/check-btn_03.png);
    -webkit-background-size: 100%;*!
    background-size: 100%;
  }*/
  .goods_list li.reason {
    border-bottom: solid 1px #dddddd;
  }
  .goods_list li.reason span {
    display: inline-block;
    width: 22%;
    float: left;
    margin: 0;
  }
  .goods_list li textarea {
    width: 75%;
    float: left;
    background: #FFFFFF;
  }
  .refund-tj {
    width: 60%;
    background: #1696e5;
    color: #ffffff;
    text-align: center;
    font-size: 1.5rem;
    padding: 0.9rem 0;
    border-radius: 3rem;
    margin: 4rem auto 0 auto;
  }
</style>
