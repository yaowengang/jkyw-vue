<template>
  <div>
    <top :title="title"></top>
    <ul class="plan-wrap">
      <li class="plan-main"><img src="/images/plan-icon_01.png"></li>

    </ul>
  </div>
</template>
<style lang="less">
  .plan-wrap{
    margin-top: 4.5rem;
    .plan-main{
      padding: 1.4rem 2rem;
      background: #ffffff;
      margin-top: 1.5rem;
      width: 94%;
      margin-left: 3%;
      position: relative;
    }
  }
</style>
<script>
  import Top from '../../top2.vue'
  export default{
    data (){
      return {
        title:'方案管理'
      }
    },
    components: {
      Top
    }
  }
</script>
