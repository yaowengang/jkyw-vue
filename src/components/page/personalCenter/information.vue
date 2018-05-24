<template>

  <div class="wrap ">
    <header class="head">
      <i><a @click="goBack()" class="his_to icon iconfont icon-fanhui1"></a></i>
      <h1>消息中心</h1>
    </header>
    <div class="content">
      <div id="tab">
        <ul>
          <li>
            <router-link  to="/information/">对话医师<span></span>
            </router-link>
          </li>
       <!--   <li>
            <router-link to="/information/systemMessages">系统消息<span></span>
            </router-link>
          </li>
          <li>
            <router-link to="/information/serviceMessage">客服消息<span></span>
            </router-link>
          </li>-->

        </ul>
      </div>
      <div id="tabCon">

          <router-view></router-view>

      </div>

    </div>
  </div>
</template>
<style lang="less" scoped>

  .head {
    max-width: 640px;
    margin: auto;
    height: 4.5rem;
    width: 100%;
    position: fixed;
    z-index: 9;
    top: 0;
    background: #fff;
    h1 {
      right: 4.5rem;
      left: 4.5rem;
      font-size: 1.7rem;
      font-weight: 500;
      position: absolute;
      line-height: 4.5rem;
      text-align: center;
      display: inline-block;
      overflow: hidden;
      width: auto;
      margin: 0;
      text-overflow: ellipsis;
    }
  }

  .his_to {
    margin: 1.3rem 0 0 1.5rem;
    float: left;
    img {
      width: 100%;
    }
  }

  .iconfont {
    color: #03a9f4;
    font-size: 1.5rem;
  }

  .content {
    height: auto;
    overflow: hidden;
    background: #fff;
    margin-top: 4.5rem;
  }

  #tab ul {
    display: flex;
  }

  #tab ul li {
    float: left;

    text-align: center;
    line-height: 4rem;
    font-size: 1.4rem;
    flex: 1;
    border-bottom: solid 2px #dddddd;
    position: relative;
  }
  #tab ul li a{
    display: inline-block;
    width: 100%;
    position: relative;
    top: 0.2rem;
  }

  #tab ul li a.router-link-exact-active {
    font-weight: bold;
    border-bottom: solid 2px #03a9f4;
  }

/*  #tab ul li span {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;
    background: red;
    border-radius: 100%;
  }*/

</style>
<script>


  export default {
    data() {
      return {}
    },
    created() {

    },
    methods: {
      goBack(){
        this.$router.push("/personalCenter")
      }
    },
    components: {
      // 引入组件
    }
  }
</script>
