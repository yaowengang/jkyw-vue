<template>
    <div class="order-main">
      <!--等待买家付款-->
      <unpayment></unpayment>
    </div>
</template>

<script>
  import unpayment from './unpayment2.vue'
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
      unpayment
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../static/css/reset.css';

</style>
