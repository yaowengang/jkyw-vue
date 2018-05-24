<template>
  <div class="projectManage">
    <top :title="title"></top>
    <!--购物车为空时显示-->
    <div class="cartNull" v-show="!isFlag">
      <div class="no-data">
        <img src="http://192.168.1.92:8083/healthFront/images/noData/null-cart_03.png">
        <p>购物车空空如也，我要去挑选属于我的商品！</p>
      </div>
      <div class="shopcart">
        <div class="cart-null">
          <div class="btn" @click="goShop">去逛逛</div>
        </div>
      </div>
    </div>
    <div v-show="isFlag">
      <div class="shopcart" >
        <div class="main_con_allchoose">
          <span class="edit_btn" @click="edit">{{ editText }}</span>
        </div>
        <div class="main_con_goods">
          <ul class="shopcart-box" id="ShopBox">
            <li v-for="(item,index) in myGoods">
              <span class="circle" :class="{'select-style': item.status=='2' }" @click="checkSingle(index)"></span>
              <img :src="item.goods.imageName">
              <div class="shop-text">
                <h4>{{ item.goods.title }}</h4>
                <!-- <h3 v-show="showBox1">
                   <span>{{ item.sort }}</span><span>{{ item.content }}</span>
                 </h3>-->
                <div class="num_box" v-show="showBox1">￥<span >{{ item.goods.price }}</span><s>￥<span>{{ item.goods.originalPrice }}</span></s>
                  <span class="num">x<span >{{ item.amount }}</span></span>
                </div>
                <div class="num_box2" v-show="showBox2">
                  <div class="btn-list">
                    <i class="icon iconfont icon-jian01" @click="updateNum(index,-1)"></i>
                    <span>{{item.amount}}</span>
                    <i class="icon iconfont icon-jia01" @click="updateNum(index,1)"></i></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="shopcart-bottom">
        <div class="circle_box" id="select_all">
          <span class="circle" @click="checkAll" :class="{'select-style': isActive}"></span>全选
        </div>
        <span class="money" v-show="showBox1">合计：<a id="total-num">￥{{ goodsNumPrice }}</a></span>
        <span class="pay" id="confirmBtn" @click="del"> <span>{{ footText }}<span class="pay_num" v-show="showBox1">({{ goodsNum }})</span></span></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import top from '@/components/commom/top2.vue'
  export default {
    data() {
      return {
        title:'购物车',
        myGoods:[],
        showBox1: true,
        showBox2: false,
        editText:'编辑',
        footText:'结算',
        goodsNumPrice:0,
        goodsNum:0,
        isActive:false,
        sum:0,
        idArr: [], // 存放ID的数组·
        isFlag: false
      }
    },
    components: {
      top
    },
    created () {
      this.$http.post("/healthFront/out/shopcart/cartGoods.do", this.Qs.stringify({
          memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId
        })
      ).then((res)=>{
        if(res.data.stateCode == "001"){
          if(res.data.cartItems){
            for (var i=0;i<res.data.cartItems.length;i++){
              this.myGoods.push(res.data.cartItems[i]);
              this.isFlag = true;
            }
          }

          console.log(this.myGoods);
          this.checkAllStyle();
          this.calculatePrice();
        }
      });
    },
    mounted() {
      mui.init({
        swipeBack: true //启用右滑关闭功能
      });
    },
    methods: {
      edit() {
        if (this.editText == '编辑'){
          this.editText = '完成';
          this.showBox1 = false;
          this.showBox2 = true;
          this.footText = '删除'
        }else{
          this.editText = '编辑';
          this.showBox1 = true;
          this.showBox2 = false;
          this.footText = '结算'
        }
      },
      updateNum(n,flag){
        this.$http.post("/healthFront/out/shopcart/updateCartNum.do", this.Qs.stringify({
            goodsId: this.myGoods[n].id,
            goodsNum: this.myGoods[n].amount
          })
        ).then((res)=>{
          if(res.data.stateCode == "001"){
            var inventory = this.myGoods[n].goods.commodityRemain.remain;
           // console.log(inventory)
            if(flag > 0){
              // 增加货物
              if (this.myGoods[n].amount < inventory){
                //有库存
                this.myGoods[n].amount++
              }else{
                mui.alert('库存没有多余货物了' , '警 告')
              }
            }else{
              // 减少货物
              if(this.myGoods[n].amount <= 1){
                this.myGoods[n].amount = 1
              }else{
                this.myGoods[n].amount--
              }
            }
            this.calculatePrice()
          }
        });
      },
      checkAll() {
        this.isActive = !this.isActive;
        this.sum = this.myGoods.length;
        if(this.isActive){
          for(var i=0;i<this.myGoods.length;i++){
            this.myGoods[i].status = 2;
          }
        }else{
          for(var i=0;i<this.myGoods.length;i++){
            this.myGoods[i].status = 1;
          }
        }
        this.calculatePrice()
      },
      checkSingle(n){
        this.sum=0;
        if(this.myGoods[n].status == '2'){
          this.myGoods[n].status = 1;
          this.isActive = false;
        }else{
          this.myGoods[n].status = 2;
          this.checkAllStyle()
        }
        this.calculatePrice()
      },
      //是否显示全选的样式
      checkAllStyle(){
        for(var i=0;i<this.myGoods.length;i++){
          if(this.myGoods[i].status == '2'){
            this.sum++;
          }
        }
        if(this.sum == this.myGoods.length){
          this.isActive = true;
        }
      },
      calculatePrice(){
        this.goodsNumPrice=0;
        this.goodsNum=0;
        for(var i=0;i<this.myGoods.length;i++){
          if(this.myGoods[i].status == '2'){
            this.goodsNumPrice += this.myGoods[i].goods.price*this.myGoods[i].amount;
            this.goodsNum += this.myGoods[i].amount;
            //this.idArr.push(this.myGoods[i].id);
          }
        }
      },
      del(){
        var _this = this;
        if(_this.footText == "删除"){
          if(this.sum == 0){
            mui.alert('请先选择商品', '警 告');
          }else{
            var btnArray = ['取消', '确认'];
            mui.confirm('确认从购物车中删除该商品吗？', '警 告', btnArray, function(e) {
              if (e.index == 1) {
                //删除
                for(var i=_this.myGoods.length-1;i>=0;i--){
                  if(_this.myGoods[i].status == '2'){
                    //调用删除的接口
                    _this.$http.post("/healthFront/out/shopcart/batchDelete.do", _this.Qs.stringify({
                      goodsIds: _this.myGoods[i].id
                      })
                    ).then((res)=>{
                      if(res.data.stateCode == "001"){
                        _this.myGoods.splice(i,1);
                        _this.isActive = false;
                        _this.calculatePrice();
                      }else{
                        mui.alert(res.data.message , '警 告');
                      }
                    });
                  }
                }
              } else {
                _this.calculatePrice()
              }
            })
          }
        }else if(_this.footText == "结算"){
          if(_this.goodsNum<=0){
            mui.alert('你还没有选中宝贝哦', '提示', function() {
            });
          }else{
            /*结算跳转页面*/
            _this.idArr = [];
            for(var i=0;i<_this.myGoods.length;i++){
              if(_this.myGoods[i].status == '2'){
                _this.idArr.push(_this.myGoods[i].id);
              }
            }
            //console.log((_this.idArr).join())
            _this.$router.push({
              path: '/payment',
              query: {
                id: (_this.idArr).join()
              }
            })
          }
        }
      },
      goShop(){
        this.$router.push({
          path: "/shop"
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '/static/css/reset.css';
  @import '/static/css/mui.min.css';
  .shopcart {
    margin-top: 4.5rem;
  }
  .main_con_allchoose {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    border-bottom: 1px solid #e7e7e6;
  }
  .main_con_allchoose .edit_btn {
    font-size: 1.2rem;
    color: #222222;
    float: right;
    margin-right: 1.5rem;
  }

  .main_con_goods {
    overflow: hidden;
  ul{
    overflow: hidden;
  }
  }
  .shopcart .shopcart-box {
    overflow: hidden;
  }
  .shopcart .shopcart-box li {
    background: #FFFFFF;
    margin: 0.4rem 0;
    padding: 1rem;
    overflow: hidden;
  }
  .shopcart .shopcart-box li .shop-text div {
    color: #ff3c0e;
    margin: 1.4rem 0 0.8rem 0;
    line-height: 2.5rem;
  }
  s {
    margin: 0 1rem;
    color: #8b8b8b;
  }
  .num {
    color: #858585;
    float: right;
    font-size: 1.4rem;
  }
  .main_con_goods ul li .circle {
    float: left;
    margin: 3rem .6rem;
  }
  .circle {
    width: 1.4rem;
    height: 1.4rem;
    border: 1px solid #bab9b9;
    border-radius: 50%;
    display: block;
    float: left;
    margin: 2rem;
  }
  .select-style {
    background: #bf392a;
    border: 1px solid #bf392a;
  }
  .shopcart .shopcart-box li img {
    border: solid 1px #dadada;
    width: 6rem;
    height: 6rem;
    float: left;
  }
  .shopcart .shopcart-box li .shop-text {
    width: 65%;
    float: right;
    position: relative;
  }
  .shopcart .shopcart-box li .shop-text {
  h4{
    font-size: 1.5rem;
    margin: 0.6rem 0;
  }
  h3{
    color: #999999;
    font-size: 1.2rem;
  span{
    margin-right:1rem;
  }
  }
  }
  .num_box{
    font-size:1.4rem;
  }
  .btn-list {
    width: 10.6rem;
    /*    border: 1px solid #c2c2c2;*/
    padding: 0;
  }
  .btn-list i {
    margin: 0;
    display: inline-block;
    width: 3rem;
    height: 2.8rem;
    vertical-align: top;
    font-size: 2.8rem;
    color: #c2c2c2;
  }
  .btn-list i:last-child {
    float: right;
  }
  .btn-list span {
    display: inline-block;
    font-size: 1.2rem;
    width: 4rem;
    line-height: 2.8rem;
    text-align: center;
    margin: 0;
    color: #c2c2c2!important;
  }
  .shopcart-bottom {
    width: 100%;
    height: 5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
  }
  .circle_box {
    position: absolute;
    left: 0;
    line-height: 5rem;
    font-size: 1.3rem;
  }
  .shopcart-bottom .money {
    color: #222222;
    font-size: 1.3rem;
    width: 65%;
    text-align: right;
    display: inline-block;
    line-height: 5rem;
    padding-right: 1rem;
  }
  .shopcart-bottom .money a {
    color: #ff3300;
    font-size: 1.3rem;
  }
  .shopcart-bottom .pay {
    position: absolute;
    display: inline-block;
    right: 0;
    top: 0;
    background: #03a9f4;
    color: #FFFFFF;
    font-size: 1.5rem;
    width: 35%;
    text-align: center;
    line-height: 5rem;
    height: 5rem;
  }

  /*购物车为空样式*/
  .cartNull{
    .no-data {
      margin-top: 11rem;
      text-align: center;
      font-size: 1.3rem;
      img{
        width: 80%;
        margin: 0 auto;
      }
      p{
        margin-top: 3rem;
        color: #8f8f94;
        font-size: 1.4rem;
      }
    }
    .shopcart {
      margin-bottom: 5rem;
      margin-top: 3rem;
      .cart-null {
        width: 83%;
        margin: 3rem auto 0 auto;
        .btn {
          width: 39%;
          background: #03a9f4;
          color: #FFFFFF;
          font-size: 1.5rem;
          text-align: center;
          padding: 0.4rem;
          border-radius: 1.6rem;
          margin: 0 auto;
        }
      }
    }
  }
</style>
