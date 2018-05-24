<template>

  <div class="wrap">

    <div class="search-header">
      <input type="text" name="searchName" placeholder="输入关键字" v-model="inputVal" @blur="blurFn(inputVal)" autofocus="autofocus">
      <i class="delete-all icon iconfont icon-cuowuguanbiquxiao-xianxingyuankuang" @click="goBack"></i>
    </div>

    <h3>热门搜索</h3>

    <ul class="hot-tips">

    </ul>

  </div>


</template>

<script>


  export default {
    data() {
      return {
        inputVal: null,
      }
    },
    created() {

    },
    methods: {
      goBack() {
        this.$router.push("/shop")
      },
      blurFn(val) {
        this.$router.push({
          path: "/searchDetail",
          query: {
            goodsName: val
          }
        });
      }
    },
    components: {}
  }
</script>

<style lang="less" scoped>

  .wrap .search-header {
    width: 92%;
    padding: 0 1rem;
    margin: 2.7rem 4%;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    -ms-border-radius: 0.4rem;
    -o-border-radius: 0.4rem;
    border-radius: 0.4rem;
    background: #ebebeb;
  }

  .wrap .search-header input {
    background: #ebebeb;
    width: 83%;
    line-height: 2rem;
    color: #bbbbbb;
    font-size: 1.1rem;
    padding: 0 0.5rem;
    /*border: 1px solid #000000;*/
  }

  .wrap .search-header input::-webkit-input-placeholder {
    color: #bbbbbb;
  }

  .wrap .search-header .delete-all {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    margin-left: 0.3rem;
    position: relative;
    top: -0.1rem;
    margin: 1rem;
  }

  .wrap h3 {
    padding: 1rem 1rem 1rem 1.8rem;
    background: #f5f5f5;
    font-size: 1.1rem;
  }

  .wrap .hot-tips {
    margin: 1rem 1.5rem;
  }

  .wrap .hot-tips li {
    font-size: 1.1rem;
    color: #03a9f4;
    padding: 0.7rem 1rem;
    float: left;
    border: 1px solid #03a9f4;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    -ms-border-radius: 0.4rem;
    -o-border-radius: 0.4rem;
    border-radius: 0.4rem;
    margin: 0.5rem;
  }

  .icon-cuowuguanbiquxiao-xianxingyuankuang {
    color: #03a9f4;
    font-size: 2rem;
  }
</style>
