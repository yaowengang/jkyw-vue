<template>
    <div class="projectManage">
        <top :title="title"></top>
        <div class="order-wrap">
            <div class="logistics-main clear">
                <img src="">
                <ul>
                    <li>物流状态: <span>运输中</span></li>
                    <li>承运公司：中通快递</li>
                    <li>运单编号：102625178859667</li>
                </ul>
            </div>
            <div class="logistics-step clear">
              <div class="clear">
                <i class="icon iconfont icon-goutongye_huangxinyuanquan_xiaoxilanyangshiweidu"></i>
                <p>[西安市]中通快递 西安市厂部光橙服务部收件员已揽件111111111111111111111111111111111111111</p>
                <p>2017-04-24 13:42:27</p>
              </div>
              <div class="clear">
                <i class="icon iconfont icon-goutongye_huangxinyuanquan_xiaoxilanyangshiweidu"></i>
                <p>[西安市]中通快递 西安市厂部光橙服务部收件员已揽件111111111111111111111111111111111111111</p>
                <p>2017-04-24 13:42:27</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import top from '../../commom/top2.vue'
export default {
    data() {
        return {
          title:'物流信息'
        }
    },
    components: {
        top
    },
    created () {
      this.$http.get("http://localhost:8080/static/data/healthInfo.json").then((res) => {

      });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/css/reset.css';
  .order-wrap{
    margin-top:4.5rem;
  }
  .order-wrap .logistics-main {
      background: #ffffff;
      padding: 1.3rem;
      font-size: 1.2rem;
  }
  .order-wrap .logistics-main img {
      width: 6.6rem;
      height: 6.6rem;
      float: left;
      border: 0.1rem solid #c5c5c5;
      margin-right: 1.5rem;
  }
  .order-wrap .logistics-main ul li {
      margin: 0.5rem 0;
  }
  .order-wrap .logistics-main ul li span {
      color: #10adf5;
  }
  .order-wrap .logistics-step {
    background: #ffffff;
    margin-top: 0.5rem;
    padding: 1.8rem 2rem;
  }
  .order-wrap .logistics-step > div {
    border-left: 1px solid #03a9f4;
    margin: 0 1rem;
    position: relative;
    height: 7.8rem;
    padding-left: 1rem;
  }
  .order-wrap .logistics-step > div i {
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    float: left;
    position: absolute;
    top: -0.6rem;
    left: -0.7rem;
    font-size: 1.2rem;
    color: #03a9f4;
  }
  .order-wrap .logistics-step > div p {
    font-size: 1.2rem;
    color: #03a9f4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 0.2rem 1rem;
    position: relative;
    top: -0.7rem;
    letter-spacing: 1px;
  }
</style>
