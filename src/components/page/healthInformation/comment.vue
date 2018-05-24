<template>
  <div class="comment">
    <Top :title="title"></Top>

  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../commom/top2.vue'
  export default {
    data() {
      return {
        title:'历史记录'
      }
    },
    components: {
      Top
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  body{
    background: #f0f0f0 !important;
  }
</style>
