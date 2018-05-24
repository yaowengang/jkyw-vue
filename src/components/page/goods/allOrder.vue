<template>
    <div class="order-main-content">
      <!--等待买家付款-->
        <unpayment></unpayment>
      <!--待收货-->
        <undelivery></undelivery>
      <!--交易成功-->
        <finish></finish>
    </div>
</template>

<script>
  import unpayment from './unpayment2.vue'
  import undelivery from './undelivery2.vue'
  import finish from './finish2.vue'
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
      unpayment,
      undelivery,
      finish
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '/static/css/reset.css';

</style>
