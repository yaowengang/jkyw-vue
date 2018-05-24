<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRemember:false
    }
  },
  created(){
    this.isRemember = sessionStorage.getItem('demo');
    if(this.isRemember){
    console.log(2222)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
