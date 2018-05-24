<template>
  <div class="projectManage">
    <top :title="title"></top>
    <div class="order-wrap">
       <ul class="order-nav clear">
         <router-link to="/myOrder">
           <li class="active">全部</li>
         </router-link>
         <router-link to="/paymentOrder">
           <li>待付款</li>
         </router-link>
         <router-link to="/unDeliveryOrder">
           <li>待收货</li>
         </router-link>
         <router-link to="/finishOrder">
           <li>已完成</li>
         </router-link>
       </ul>

      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import top from '../../commom/top2.vue'


  export default {
    data() {
      return {
        title: '我的订单',
        selected:0
      }
    },
    components: {
      top,


    },
    created() {

    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .order-wrap {
    margin-top: 4.5rem;
  }

  .order-wrap .order-nav {
    margin-bottom: 1rem;
  }

  .order-wrap .order-nav a {
    width: 25%;
    float: left;
    text-align: center;
    font-size: 1.3rem;
    background: #FFFFFF;
    color: #000;
  }

  .order-wrap .order-nav li {
    width: 70%;
    height: 100%;
    padding: .8rem 0;
    margin: auto;
    text-align: center;
    border-bottom: 2px solid #FFFFFF;

  }

  .order-wrap .order-nav .router-link-active {
    color: #03a9f4;
    border-bottom: 2px solid #03a9f4;
  }

</style>
