<template>

  <div class="tabCon-third">
    <ul>
      <li class="clear">
        <span><a>1</a></span>
        <router-link to="/message">
          <div class="detail-three">
            <h3>维尔尼斯客服-小明<span>14:24</span></h3>
            <p>您好，请问有什么可以帮您吗？</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>

  .tabCon-third li {
    padding: 1.4rem 1rem 0 1.4rem;
    overflow: hidden;
  }

  .tabCon-third li > span {
    display: inline-block;
    width: 3.7rem;
    height: 3.7rem;
    border-radius: 100%;
    background: url("/static/img/service-icon.png") 0 0 no-repeat;
    background-size: 100%;
    position: relative;
    float: left;
  }

  .tabCon-third li > span > a {
    display: inline-block;
    color: #fff;
    background: red;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 100%;
    padding: 0 0.3rem;
    font-size: 0.9rem;
  }

  .tabCon-third li .detail-three {
    float: right;
    width: 83%;
    border-bottom: solid 1px #eeeeee;
    padding-bottom: 1.1rem;
  }

  li .detail-three h3 {
    font-size: 1.4rem;
  }

  li .detail-three h3 span {
    display: inline-block;
    color: #a1a1a1;
    float: right;
    font-size: 1rem;
  }

  .tabCon-third li .detail-three p {
    font-size: 1.2rem;
    color: #999999;
    margin-top: 0.7rem;
  }
</style>
<script>


    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {},
        components: {
            // 引入组件
        }
    }
</script>
