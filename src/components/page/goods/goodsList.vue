<template>
  <div>
    <Top :title="title"></Top>
  </div>
</template>

<script>
  import Top from '../../commom/top2.vue'
  export default {
    data() {
      return {
        title: "商品列表"
      }
    },
    components: {
      Top
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../static/css/reset.css';

</style>
