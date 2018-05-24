<template>
  <div class="wrap">
    <Top :title="title"></Top>

    <div class="content">
      <img src="../../../../static/img/logo.png">
      <p class="align">版本号：v1.0</p>
      <p class="align">发布时间：2017-5-15</p>
    </div>

    <footer>
      <p class="align">@2016-2017 陕西维尔尼斯健康科技有限公司</p>
    </footer>
  </div>
</template>
<style lang="less" >
  body{
    background: #FFFFFF;
  }
  .content {
    margin-top: 4.5rem;
    padding: 6.5rem 0 8rem;
    border-top: 1rem solid #f3f3f3;
  /*  background: #FFFFFF;*/

  }

  .content img {
    width: 12rem;
    height: 15rem;
    margin-left: 32%;
    margin-bottom: 1rem;
  }

  .align {
    text-align: center;
    margin-top: 1.3rem;
    color: #585858;
    font-size: 1.2rem;
  }
  footer{
    padding: 0.7rem 0 1.5rem;
    background: #f3f3f3;
    position: absolute;
    bottom: 0;
    width: 100%;

  }
  footer .align{
    color: #ADADAD;
    font-size: 1rem;
  }
  /* body{
     min-height: 50rem;
     display: flex;
   }
   .content{
     width: 46%;
     height: 14rem;
     margin: auto;
   }
   .content img{
     width: 10rem;
     height: 7.5rem;
     margin-left: 18%;
     margin-bottom: 1rem;
   }
   .align{
     text-align: center;
     margin-top: 1.3rem;
     color: #585858;
     font-size: 1.2rem;
   }
   footer .align{
     color: #ADADAD;
     font-size: 1rem;
   }*/
</style>
<script>
  import Top from '../../../../src/components/commom/top2.vue';

  export default {
    data() {
      return {
        title: "关于我们"
      }
    },
    created() {

    },
    methods: {},
    components: {
      Top
      // 引入组件
    }
  }
</script>
