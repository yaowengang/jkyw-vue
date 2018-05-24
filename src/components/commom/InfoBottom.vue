<template>
  <div>
    <div class="bottom_btn" >
      <input type="hidden" id="likeStatus" value="1">
      <ul>
        <li class="thumbs-up" :class="{ active: isLike }" @click="like">
          <i class="icon iconfont icon-haoping"></i>
          <p v-text="isLike==1 ? '已点赞': '点赞'"></p>
        </li>
        <li class="share" @click.stop="share">
          <i class="icon iconfont icon-fenxiang"></i>
          <p>分享</p>
        </li>
        <li @click.stop="comment">
            <i class="icon iconfont icon-pinglun1"></i>
            <p>评论</p>
        </li>
      </ul>
    </div>
    <transition name="mask-fade">
      <div class="mask" v-show="isShow"></div>
    </transition>
    <transition name="share-fade">
      <div class="share_con" v-show="isShow">
        <h3>分享至</h3>
        <ul>
          <li>
            <a class="icon iconfont icon-sharemoments">
              <p>朋友圈</p>
            </a>
          </li>
          <li>
            <a class="icon iconfont icon-weixinhaoyou">
              <p>微信好友</p>
            </a>
          </li>
        </ul>
        <div class="cancel" @click.stop="sClose()">取消</div></div>
    </transition>

  </div>

</template>

<script>
    export default {
      props:[
        'status', //点赞状态
        'healthInfoId', // 资讯ID
        'userId' // 用户ID
      ],
      data() {
        return {
          isShow: false,
          isLike: this.status,
          likeTxt: ''
        }
      },
      methods: {
        share() {
          this.isShow = true
        },
        sClose() {
          this.isShow = false
        },
        comment() {
          this.$router.push({
            path:'/healthComment',
            query:{ id: this.healthInfoId }
          })
        },
        //点赞
        like() {
          console.log(this.healthInfoId);
          this.$http.post("/healthFront/out/index/likeNumConsult.do",this.Qs.stringify({
              likeStatus: this.status,
              memberId: this.userId,
              consultId: this.healthInfoId
            })
          ).then((res) => {
            if(this.isLike == 1){
              this.isLike = 0
            }else{
              this.isLike = 1
            }
          });

        }
      }
    }


</script>

<style lang="less" scoped>
  /*底部按钮css*/
  .bottom_btn {
    height: auto;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    text-align: center;
    background: #fff;
    border-top: solid 1px #e4e4e4;
  }
  .bottom_btn ul {
    width: 100%;
    display: flex;
  }
  .bottom_btn li {
    display: inline-block;
    width: 34%;
    padding: 0.6rem;
  i{
    font-size:2.2rem;
    color: #888;
  }
  p{
    font-size: 1rem;
    color: #9c9c9c;
    height: 1rem;
    line-height: 1rem;
    margin-top: 0.1rem;
  }
  }
  .bottom_btn li.active i{
    color: #03A9F4;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .mask-fade-enter-active, .mask-fade-leave-active{
    transition: opacity .5s;
  }
  .mask-fade-enter, .mask-fade-leave-active{
    opacity: 0;
  }
/*
  .share-fade-enter-active, .share-fade-leave-active{
    bottom:0;
  }
  .share-fade-enter, .share-fade-leave-active{
    bottom:-20rem;
  }
*/

  .share_con {
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 4px 4px 0 0;
    position: fixed;
    transition: 0.3s;
    z-index:10;
    bottom:0;
  }
  .share_con h3 {
    font-size: 1.4rem;
    text-align: center;
    padding: 2rem;
    font-weight: 500;
  }
  .share_con ul {
    text-align: center;
  }
  .share_con ul li {
    display: inline-block;
    margin: 0 1.6rem;
    a{
      display: inline-block;
      font-size:3rem;
      color: #5ccb6b;
    }
  }
  .share_con ul li p {
    font-size: 1.2rem;
    font-weight: 500;
    color: #8f8f94;
    margin-top:1rem;
  }
  .cancel {
    border-top: solid 1px #e4e4e4;
    display: block;
    padding: 1.4rem;
    text-align: center;
    margin-top: 1.6rem;
    font-size: 1.3rem;
  }

  .share-fade-enter-active{
    bottom:0;
  }
  .share-fade-enter, .share-fade-leave-active{
    bottom: -20rem;
  }

</style>
