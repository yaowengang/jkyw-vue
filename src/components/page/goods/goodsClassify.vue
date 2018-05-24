<template>
    <div class="projectManage">
      <top :title="title"></top>
      <div class="order-wrap">
        <div class="order-classify">
          <div class="mui-slider">
            <div class="mui-slider-group mui-slider-loop">
              //最后一页替补
              <div class="mui-slider-item mui-slider-item-duplicate">
                <ul class="clear">
                  <li v-for="item in classifyThree">
                    <router-link to="#">
                      <img :src="item.imgLogo">
                      <p>{{ item.classifyTit }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
              //第一页
              <div class="mui-slider-item">
                <ul class="clear">
                  <li v-for="item in classifyOne">
                    <router-link to="#">
                      <img :src="item.imgLogo">
                      <p>{{ item.classifyTit }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
              //第二页
              <div class="mui-slider-item">
                <ul class="clear">
                  <li v-for="item in classifyTwo">
                    <router-link to="#">
                      <img :src="item.imgLogo">
                      <p>{{ item.classifyTit }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
              //第三页a
              <div class="mui-slider-item">
                <ul class="clear">
                  <li v-for="item in classifyThree">
                    <router-link to="#">
                      <img :src="item.imgLogo">
                      <p>{{ item.classifyTit }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
              第一页替补
              <div class="mui-slider-item">
                <ul class="clear">
                  <li v-for="item in classifyOne">
                    <router-link to="#">
                      <img :src="item.imgLogo">
                      <p>{{ item.classifyTit }}</p>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mui-slider-indicator">
              <div class="mui-indicator mui-active"></div>
              <div class="mui-indicator"></div>
              <div class="mui-indicator"></div>
            </div>
          </div>
        </div>
        <p class="tip">法式面膜，美容养颜、效果极佳，大众一致的选择！</p>
        <div class="shop-content">

          <ul>
            <li v-for="item in hotGoodList">
              <img :src="item.goodsImg">
              <p>{{ item.goodsTit }}</p>
              <div class="price">￥{{ item.price }}<span class="original-price">￥{{ item.oldprice }}</span>
              </div>
            </li>
          </ul>

          <p class="load-more">———— 上滑加载更多 ————</p>
        </div>
      </div>
    </div>
</template>

<script>
import top from '../../commom/top2.vue'

export default {
    data() {
        return {
          title:'商品分类查询',
          classifyOne: [],
          classifyTwo: [],
          classifyThree: [],
          hotGoodList: [],
          user:JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        }
    },
    components: {
        top
    },
    created () {
      this.$http.get("healthFront/out/shop/categorySearch.do",this.Qs.stringify({
          categrouNum:6
      })
      ).then((res) => {
        this.hotGoodList = res.data;
        console.log(this.hotGoodList)
        for (var i=0; i<this.goods.length; i++){
          if ( i>=0 && i<8 ){
            this.classifyOne.push(this.goods[i])
          }else if ( i>=8 && i<16 ){
            this.classifyTwo.push(this.goods[i])
          } else {
            this.classifyThree.push(this.goods[i])
          }
        }

        this.goodList = res.data.goods;
        for(var i=0; i<this.goodList.length; i++){
          if (this.goodList[i].type ) {
            this.hotGoodList.push(this.goodList[i])
          }
        }
      });
    },
    mounted  () {
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
      });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '/static/css/mui.min.css';
  .order-wrap{
    margin-top:4.5rem;
  }
  .order-wrap .order-classify ul {
    padding: 1.2rem 0;
    background: #ffffff;
  }
  .order-wrap .order-classify ul li {
    float: left;
    width: 25%;
    text-align: center;
    padding: 0.8rem 0;
  }
  .order-wrap .order-classify ul li img {
    width: 5rem !important;
  }
  .order-wrap .order-classify .mui-slider-indicator {
    bottom: 2px;
  }
  .order-wrap .tip {
    padding: 1rem;
    background: #f5f5f5;
    font-size: 1rem;
    color: #fb9838;
  }
  .order-wrap .shop-content {
    position: relative;
  }
  .order-wrap .shop-content ul {
    overflow: hidden;
    width: 100%;
    background: #ffffff;
    padding: 0 1.4rem;
  }
  .order-wrap .shop-content ul li {
    width: 50%;
    float: left;
    padding: 1rem 0.9rem;
  }
  .order-wrap .shop-content ul li img {
    width: 100%;
  }
  .order-wrap .shop-content ul li p {
    font-size: 1.3rem;
    color: rgba(40, 40, 40, 0.8);
    font-weight: 700;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .order-wrap .shop-content ul li .price {
    color: red;
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }
  .order-wrap .shop-content ul li .price .original-price {
    text-decoration: line-through;
    color: #9e9e9e;
  }
  .order-wrap .shop-content .load-more {
    padding: 1rem 0;
    text-align: center;
    color: #b2b2b2;
  }
</style>
