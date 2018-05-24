<template>
  <header>
    <span @click="goback(gopath)"><i class="iconfont icon icon-fanhui1"></i></span>
    <h1>{{ title }}</h1>
  </header>
</template>
<script type="text/ecmascript-6">
export default {
    data() {
        return {
        }
    },
    props: [
      'title',
      'gopath'
    ],
    methods:{
      goback:function(path){
        console.log(path)
        this.$router.push(path)
      }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  header {
    max-width: 640px;
    min-width: 320px;
    height: 4.5rem;
    margin: auto;
    background: #FFFFFF;
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    span {
      text-decoration: none;
      color: #007aff;
      i {
        width: 2rem;
        height: 2rem;
        display: inline-block;
        margin-top: 1.5rem;
        &:nth-of-type(1) {
          margin-left: 1.4rem;
        }
      }
    }
    h1 {
      right: 4.5rem;
      left: 4.5rem;
      letter-spacing: 0.3rem;
      font-size: 1.8rem;
      font-weight: 500;
      position: absolute;
      color: #4f4f4f;
      line-height: 4.5rem;
      text-align: center;
      display: inline-block;
      overflow: hidden;
      width: auto;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
