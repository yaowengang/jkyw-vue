<template>
    <div class="head">
      <Top :title="title" :gopath="gopath"></Top>
      <div class="quickly-wrap">
        <ul class="quickly-menu clear">
          <router-link to="/InquiryIndex/intelligentInquiry">
            <li>
              <p>智能导诊</p>
            </li>
          </router-link>
          <router-link to="/InquiryIndex/">
            <li>
              <p>专家问诊</p>
            </li>
          </router-link>
        </ul>
        
        <router-view></router-view>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import Top from '../../commom/top3.vue'
  export default {
      data() {
          return {
            title: "快速问诊",
            gopath:"/index",
            isActive: true
          }
      },
      props: [

      ],
      components: {
        Top
      },
      methods:{

      }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .quickly-wrap{
    margin-top:4.5rem;
  }
  .quickly-menu {
    background: #ffffff;
    text-align: center;
    -webkit-border-radius: 0.5rem;
    -moz-border-radius: 0.5rem;
    -ms-border-radius: 0.5rem;
    -o-border-radius: 0.5rem;
    border-radius: 0.5rem;
  }
  .quickly-menu a {
    display: block;
    width: 50%;
    padding: 2rem 0;
    float: left;
    border-bottom: 2px solid #dddddd;
  }
  .quickly-menu .router-link-exact-active{
    border-bottom: 2px solid #4e9bea;
    padding-bottom: 2rem;
  }
  .quickly-menu  a li{
    display: inline-block;
    color: #4f4f4f;
    font-size: 1.4rem;
    margin-top: 0.5rem;
  }
</style>
