<template>
  <div class="split bg_f6f6f6" :class="{ color_fbbc42 : isActive }">
  {{ rowTitle }}
  <a @click="submit({url})" class="icon iconfont icon-xiayiyeqianjinchakangengduo"></a>
</div>
</template>


<script type="text/ecmascript-6">

export default {
    data() {
        return {

        }
    },
    props: [
      'rowTitle',
      'url'
    ],
    computed: {
      isActive () {
        if ( this.rowTitle == "热门商品" ) {
          return true
        }
      }
    },
    methods: {
      submit (url) {
        if (this.url == "/projectManage"){
          this.$router.push({
            path: "/projectManage"
          })
        }else if(this.url == '/informationList'){
          this.$router.push({
            path: "/informationList"
          })
        }else if(this.url == '/discountCoupon'){
          this.$router.push({
            path: "/discountCoupon"
          })
        }else if(this.url == '/goodsList'){
          this.$router.push({
            path: "/goodsList"
          })
        }
        else if(this.url == '/YouLike'){
          this.$router.push({
            path: "/YouLike"
          })
        }        
        // console.log(url);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.split {
    height: 3.3rem;
    padding: 0.8rem 1.7rem;
    color: #b3b2b2;
    line-height: 1.6rem;
}
.bg_f6f6f6 {
    background: #f6f6f6;
}
.con_right{
    height: 1.5rem;
    float: right;
}

.color_fbbc42 {
  color: #fbbc42!important;
}
  a{
    font-size: 1.7rem;
    float: right;
    color: #999;
  }
</style>
