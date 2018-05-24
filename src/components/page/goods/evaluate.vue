<template>
    <div class="projectManage">
      <top :title="title"></top>
      <div class="goods_box clear">
        <i><img src="/images/goods_04.jpg"></i>
        <div class="goods_right">
          <h4>小米手环2</h4>
          <p>￥149.00</p>
        </div>
      </div>

      <div class="star-comment">
        <div class="star-box clear">
          <span>商品评价：</span>
          <ul>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
          </ul>
        </div>
        <div class="star-box clear">
          <span>客服评价：</span>
          <ul>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
          </ul>
        </div>
        <div class="star-box clear">
          <span>物流评价：</span>
          <ul>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
            <li><i class="icon iconfont icon-xing3"></i></li>
          </ul>
        </div>
      </div>
      <div class="comment-content">
        <textarea placeholder="请输入评价内容"></textarea>
        <div class="pic-box">

        </div>
      </div>
      <div class="comment-btn">提交</div>
    </div>
</template>

<script>
import top from '../../commom/top2.vue'
export default {
    data() {
        return {
          title:'发表评论'
        }
    },
    components: {
        top
    },
    created () {
      this.$http.get("/static/data/healthInfo.json").then((res) => {

      });
    },
    mounted(){
      $('.star-box li').on('click',function () {
        $(this).parents('ul').find('i').attr("class","icon iconfont icon-xing3");
        var index = $(this).index()+1;
        $(this).parents('ul').find("li:lt("+index+") i").attr("class","icon iconfont icon-xing2");
        console.log(index);
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../../../static/css/reset.css';
  .icon-xing3{
    padding-top:0.18rem;
  }
  .goods_box {
    background: #FFFFFF;
    padding: 1rem;
    overflow: hidden;
    margin-top: 5.5rem;
  }
  .goods_box i {
    width: 15%;
    display: inline-block;
    float: left;
    border: solid 1px #dadada;
  }
  .goods_box i img {
    width: 100%;
  }
  .goods_box .goods_right {
    float: right;
    width: 78%;
  }
  .goods_box .goods_right h4 {
    font-size: 1.5rem;
  }
  .goods_box .goods_right p {
    font-size: 1.1rem;
    color: #e34500;
    margin-top: 0.7rem;
  }
  .star-comment {
    padding: 2rem 1rem;
    background: #FFFFFF;
    margin-top: 0.5rem;
  }
  .star-comment .star-box {
    overflow: hidden;
    margin-top: 1.5rem;
  }
  .star-comment .star-box span {
    width: 25%;
    display: inline-block;
    font-size: 1.3rem;
    float: left;
  }
  .star-comment .star-box ul {
    float: left;
    width: 70%;
  }
  .star-comment .star-box li {
    float: left;
    width: 2.2rem;
    height: 2.1rem;
    background-size: 100%;
    margin-left: 0.7rem;
    font-size: 1.5rem;
    i{
      font-size: 1.9rem;
      color: #ff9933;
      display: inline-block;
    }
  }
  .comment-content {
    margin-top: 0.5rem;
    background: #FFFFFF;
    margin-bottom: 4.4rem;
  }
  .comment-content textarea {
    padding: 1rem;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    width: 100%;
    height: 12.5rem;
    margin-top: 1.5rem;
    font-size: 1.3rem;
  }
  .comment-content .pic-box {
    padding: 1rem;
    width: 100%;
  }
  .pic-box .UpimgCon {
    height: auto;
    overflow: hidden;
  }
  .comment-btn {
    width: 100%;
    background: #1696e5;
    color: #ffffff;
    text-align: center;
    font-size: 1.4rem;
    padding: 1.2rem 0;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4.4rem;
    z-index: 10;
  }
</style>
