<template>
  <div class="payCenter">
    <top :title="title"></top>
    <div class="commodity_con" >
      <!--商品信息-->
      <div class="information" v-for="(item, index) in goodsList" :key="index">
        <router-link to="/orderDetail">
          <img :src="item.picurl" alt="">
        </router-link>
        <div class="infor_text">
          <h4>{{ item.goodsName }}</h4>
          <p class="Package"><!--套餐一：标准套餐--></p>
          <span class="price"><i>￥{{ item.price }}</i><s>￥{{ item.originalPrice }}</s><span>×{{ item.amount }}</span></span>
        </div>
      </div>

      <!--结算信息-->
      <div>
        <ul class="Settlement">
          <!--无地址-->
           <li v-show="!addressState">
               <h4 @click="selectAddress">添加地址 <span>请先去选择或添加收货地址</span></h4>
           </li>
          <!--有地址-->
          <li class="null has_address" v-show="addressState" @click="selectAddress">
            <div class="map-mar icon iconfont icon-weizhi"></div>
            <div>
              <h4>收货人:{{defaultAddress.receiverName}} <span class="tel">{{defaultAddress.receiverPhone}}</span></h4>
              <p class="address">收货地址：{{defaultAddress.receiverArea}}{{defaultAddress.receiverAddress}}</p>
            </div>
          </li>

          <li @click="payMode(0)">
            <h4>支付方式 <span v-text="payValue"></span></h4>
          </li>
          <li @click="payMode(1)">
            <h4>优惠券 <span class="Coupon">{{isTicket}}</span></h4>
          </li>
          <li class="null">
            <h4>买家留言 <input type="text" placeholder="请在此留言" v-model="buyerWord"></h4>
          </li>
        </ul>
       <!-- <p class="Total">共计<span>{{ item.sum }}</span>件商品
          <small>小计:</small>
          {{ item.goodsGather[0].price }}
        </p>-->

        <div class="Total_btn">
          <h3>合计：￥<span class="moneyNum">{{ sum }}</span></h3>
          <button type="submit" id="SettlementBTN" @click="settleAccount">去结算</button>
        </div>
      </div>
    </div>
    <mt-popup v-model="payShade" position="bottom">
      <div class="shadeBox" v-if="shade1">
        <h3>支付方式</h3>
        <ul>
          <li v-for="(option,index) in options" class="payStyle" :key="index">
            <label><span class="icon iconfont" :class="option.cls" @click="aliPay(index)"></span>{{option.txt}}</label>
          </li>
        </ul>
        <div class="cancel" @click="payCancel">取消</div>
      </div>
      <div class="shadeBox" v-else>
        <h3>优惠券</h3>
        <ul>
<<<<<<< .mine
          <li v-for="(option,index) in ticket" class="payStyle" :key="option.id">
||||||| .r256
          <li v-for="(option,index) in ticket" class="payStyle">
=======
          <li v-for="(option,index) in ticket" class="payStyle" :key="index">
>>>>>>> .r258
            <label><span class="icon iconfont" :class="option.cls" @click="ticketPay(index)"></span>{{option.name}}</label>
          </li>
        </ul>
        <div class="cancel" @click="payCancel">取消</div>
      </div>
    </mt-popup>
    <div id="payTag"></div>
  </div>
</template>

<script>
  import top from '../../commom/top2.vue'
  import MtPopup from "../../../../node_modules/mint-ui/packages/popup/src/popup.vue";
  export default {
    data() {
      return {
        title: '结算中心',
        goodsList: [],
        defaultAddress: {},
        addressState:false,
        //goodsPay:{},
        payShade: false,
        payValue : '支付宝', //支付方式要显示的字段
        sum:0, //总价
        options: [
          {
            'txt':"支付宝",
            'cls':'icon-xuanzhong'
          },
          {
            'txt':"微信",
            'cls':'icon-weixuanzhong'
          }
        ],
        ticket: [], //优惠券
        isTicket: '无优惠券', // 优惠券要显示的字段
        shade1: false,
        payFlage: 1,//支付方式的标志， 2微信  1支付宝。默认为1
        couponId:0, //优惠劵id。没有使用优惠劵时 传0
        buyerWord: '', //买家留言
        myOrderId: null //生成订单的ID
      }
    },
    components: {
      MtPopup,
      top
    },
    created () {
      //console.log(this.$route.query.id);
      //显示订单结算中心页商品
      this.$http.post("/healthFront/out/order/orderSettlement.do", this.Qs.stringify({
          cartIds: this.$route.query.id
        })
      ).then((res)=>{
        if(res.data.stateCode == "001"){
          //this.goodsPay = res.data.settlementVO;
          this.goodsList = res.data.settlementVO.items;
          this.sum = res.data.settlementVO.total;
        }
      });
      //默认的收货地址
      this.$http.post("/healthFront/out/order/getMemberAddress.do", this.Qs.stringify({
        memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId
        })
      ).then((res)=>{
        if(res.data.stateCode == "001"){
          //console.log(res.data.postalAddress.id);
          if(res.data.postalAddress.id != '0'){
            this.defaultAddress = res.data.postalAddress;
            this.addressState = true;
          }
        }
      });
      //检测有无可用的优惠券
      var _this = this;
      setTimeout(function () {
       // console.log(_this.sum);
        _this.$http.post("/healthFront/out/shop/ getLeadgerList.do", _this.Qs.stringify({
            memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
            total: _this.sum
          })
        ).then((res)=>{
          if(res.data.stateCode == "001"){
            if(res.data.leaguers){
              _this.isTicket = "有优惠券";
              // 给优惠券数组中的每个对象添加cls字段
              for(var i=0;i<res.data.leaguers.length;i++){
                res.data.leaguers[i].cls="icon-weixuanzhong"
              }
              _this.ticket = res.data.leaguers;
              //console.log(res.data.leaguers)
            }
          }
        });
      },300);
    },
    methods: {
      //判断是支付宝的弹窗还是优惠券
      payMode(n){
        this.payShade = true;
        this.shade1 = false;
        //点击支付方式时
        if(n==0){
          this.shade1 = true
        }
        //点击优惠券时
        if(n==1){
          if(this.isTicket == "无优惠券"){
            this.payShade = false;
          }
        }
      },
      payCancel(){
        this.payShade = false
      },
      aliPay(n){
        //n=0为支付宝，1为微信
        if(n==0){
          this.payFlage = 1
        }else if(n==1){
          this.payFlage = 2
        }
        for(var i=0;i<this.options.length;i++){
          this.options[i].cls = 'icon-weixuanzhong'
        }
        this.options[n].cls = 'icon-xuanzhong';
        this.payValue = this.options[n].txt;
        this.payShade = false
      },
      ticketPay(n){
        for(var i=0;i<this.ticket.length;i++){
          this.ticket[i].cls = 'icon-weixuanzhong'
        }
        this.ticket[n].cls = 'icon-xuanzhong';
        this.isTicket = this.ticket[n].name;
        this.couponId = this.ticket[n].id;//优惠券id
        this.sum = this.sum - this.ticket[n].amount;
        this.payShade = false;
      },
      selectAddress(){
        //跳到选择收货地址界面
        this.$router.push({
          path: '/selectAddress',
          query: {
            defaultId: this.defaultAddress.id
          }
        })
      },
      //去结算
      settleAccount(){
        //if判断是否有默认地址
        if(this.addressState){
          //console.log(this.$route.query.id);
          this.$http.post("/healthFront/out/order/saveOrder.do", this.Qs.stringify({
              couponRecordId: this.couponId,
              paymentType:this.payFlage,
              remark: this.buyerWord,
              total: this.sum,
              idList: this.$route.query.id,
              memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId
            })
          ).then((res)=>{
            if(res.data.stateCode == "001"){
              this.myOrderId = res.data.orderId;
              //console.log(res.data.orderId)
              if(this.myOrderId != '' && this.myOrderId != null){
                this.payPort();
              }else{
                alert("没有接口ID")
              }
            }
          });
        }else{
          mui.alert("您还没选择地址呢!","提示")
        }
      },
      //调用支付宝或微信接口  2微信  1支付宝
      payPort(){
        console.log()
        var portUrl = "";
        if(this.payFlage == 1){
          portUrl="/healthFront/out/order/AliPay.do";
          //portUrl="/healthFront/out/aLiPay/AliPayRech.do";
        }else if(this.payFlage == 2){
          portUrl="/healthFront/out/weixinPay/weChatPayOrder.do";
        }
        this.$http.post(portUrl, this.Qs.stringify({
            orderId: this.myOrderId
          })
        ).then((res)=>{
          //调用支付宝成功
          if(res.data.msg == "11"){
            console.log(res.data)
            if(this.payFlage == 1){
              $("#payTag").append(res.data.result)
            }
          }
        });
      }
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../static/css/reset.css';
  @import '/static/css/mui.min.css';
  .payCenter {
    margin-top: 5rem;
  }
  .commodity_con {
    margin-top: 0.5rem;
    margin-bottom: 5rem;
  }

  .commodity_con .information {
    background: #fff;
    padding: 1rem;
    height: auto;
    overflow: hidden;
  }

  .commodity_con .information img {
    width: 7.6rem;
    height: 7.0rem;
    margin-right: 1rem;
    float: left;
  }

  .commodity_con .information .infor_text {
    width: 21rem;
    float: left;
  }

  .commodity_con .information .infor_text h4 {
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.8rem;
    padding-right: 5rem;
    position: relative;
  }

  .commodity_con .information .infor_text .Package {
    margin-top: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 1.1rem;
    color: #b2b2b2;
  }

  .commodity_con .information .infor_text .price {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: #676767;
    display: inline-block;
    width: 100%;
  }

  .price i {
    color: #ff3300;
    margin-right: 1.4rem;
  }

  .price span {
    float: right;
  }

  .commodity_con .Settlement {
    height: auto;
    overflow: hidden;
    margin-top: 0.5rem;
  }

  .commodity_con .Settlement li {
    border-top: solid 1px #f5f5f5;
    padding: 1.4rem 1.2rem;
    /* background: #ffffff url(../images/right.png) 96 % no-repeat;*/
    background-size: 0.8rem;
    background: #fff;
  }

  .commodity_con .Settlement .null {
    background: #fff;

  }

  .commodity_con .Settlement li.has_address{
    border: none;
    padding-left: 5.5rem;
  }

  .commodity_con .Settlement li h4 {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .commodity_con .Settlement li h4 span {
    float: right;
    //color: #b5b5b5;
    margin-right: 1.6rem;
    font-size: 1.2rem;
  }
  .commodity_con .Settlement .has_address{
    padding: 1.5rem 5.5rem;
  }
  .commodity_con .Settlement .has_address span {
    color: #1a1a1a;
    font-size: 1.2rem;
  }

  .commodity_con .Settlement .has_address .address {
    margin-top: 1.2rem;
    line-height: 2rem;
    font-size: 1.2rem;
    color: #000;
    width: 85%;
  }

  .commodity_con .Settlement li .Coupon {
    color: #ff4013;
  }

  .commodity_con .Settlement li input {
    float: right;
    margin-right: 1.6rem;
    width: 21rem;
    border-bottom: solid 1px #f5f5f5;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    position: relative;
    top: -0.8rem;
  }

  .commodity_con .Total {
    padding: 1.2rem;
    font-size: 1.3rem;
    text-align: right;
    color: #000;
  }

  .commodity_con .Total small {
    color: #999999;
    margin-left: 1rem;
    margin-right: 0.3rem;
    font-size: 1rem;
  }

  .commodity_con .Total_btn {
    height: auto;
    overflow: hidden;
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    box-shadow: 0px -2px 10px #cccccc;
  }

  .commodity_con .Total_btn h3 {
    height: 5rem;
    line-height: 5rem;
    font-size: 1.5rem;
    color: #fc3939;
    font-weight: 500;
    float: left;
    width: 60%;
    padding-left: 5%;
    text-align: right;
  }

  .commodity_con .Total_btn #SettlementBTN {
    height: 5rem;
    width: 35%;
    font-size: 1.5rem;
    background: #03a9f4;
    color: #fff;
    float: right;
  }

  /*支付方式样式*/
  .mint-popup-bottom{
    width:100%;
  }
  .shadeBox{
    width:100%;
    h3{
      margin: 2rem 0;
      color: #03a9f4;
      font-size: 1.6rem;
      text-align: center;
    }
    .payStyle{
      padding-bottom: 1.8rem;
      label{
        margin-left: 40%;
        font-size: 1.4rem;
        span{
          color: #03a9f4;
          font-size: 1.4rem;
        }
      }
    }
    .cancel {
      border-top: solid 1px #cccccc;
      padding: 1.1rem 0;
      font-size: 1.3rem;
      color: #a8a8a8;
      text-align: center;
    }
  }

  .map-mar {
    position: absolute;
    left: 1rem;
    top: 2.5rem;
    font-size: 4rem;
    color: #757575;
  }
  .has_address {
    position: relative;
  }
</style>
