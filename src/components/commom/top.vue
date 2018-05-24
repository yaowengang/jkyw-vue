<template>
    <div class="head">
      <router-link to="">
        <i class="icon iconfont icon-02sousuokuangzuoceshaixuan"></i>
      </router-link>
        <h1>{{ title }}</h1>
      <router-link to="">
        <i class="icon iconfont icon-sousuo"></i>
      </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: [
    	'title'
    ]

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.head {
    height: 4.5rem;
    background: #FFFFFF;
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
}
.head i{
	width: 2rem;
    height: 2rem;
    display: inline-block;
    margin-top: 1.5rem;
    font-size: 1.7rem;
    color: #03A9F4;
}
.head a:nth-of-type(1) {
    margin-left: 1.4rem;
}
.head a:nth-of-type(2) {
    margin-right: 1.4rem;
    float: right;
}

.head h1{
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
}
</style>
