<template>
  <div class="comment">
    <Top :title="title"></Top>
    <div class="no-data" v-show="commentArr.length<=0">
      <img src="/static/img/null-message_03.png" style="width:80%; margin:0 auto">
      <p>暂时还没有评论信息</p>
    </div>
    <ul class="comment-list" v-show="commentArr.length>0">
      <li v-for="(item, index) in commentArr">
        <i><img :src="item.picurl"></i>
        <div class="li-right">
          <h4>{{ item.name }}
            <span>{{ item.time }}</span>
          </h4>
          <p>{{ item.com }}</p>
        </div>
        <div class="full-right">
          <span class="like_num">
              <i class="iconfont icon" :class="item.likenumStatus == 0 ? 'icon-dianzan2' : 'icon-dianzan1'" @click="like(item.commentId, index)"></i>
              <span>{{ item.like_num }}</span>
          </span>
        </div>
      </li>
      <infinite-loading :on-infinite="getMessageData" ref="infiniteLoading">
          <span slot="no-more">
            没有更多数据
          </span>
      </infinite-loading>
    </ul>
    <div class="send-bottom">
      <i class="iconfont icon icon-xiaolian" @click="make_face()"></i>
      <input value="输入评论" v-model="commentContent" @focus="done()" id="ipt1" type="text" verification="" wraingpos="Alert" data-type="numb/eg" maxlength="100">
      <span @click="sendComment()"><button id="btn1" type="button">发送</button></span>
    </div>
    <transition name="face-fade">
      <div v-show="faceShow" class="faceBox" @click="done()">
        <div class="qqFace" id="face" >
          <span v-for="(item,index) in emojiFirst" @click="choiceFace(index)">{{item}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../commom/top2.vue';
  import InfiniteLoading from 'vue-infinite-loading';
  var emoji = require('node-emoji');
  export default {
    data() {
      return {
        title:'历史记录',
        userId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
        messageId: this.$route.query.id,
        commentContent: '',
        showNum:5,
        page: 1,
        commentArr:[],
        dataLength: 0,
        userName: JSON.parse(localStorage.getItem('loginStatus')).memberName,
        userUrl:JSON.parse(localStorage.getItem('loginStatus')).memberImg,
        faceShow: false,
        emojiFirst:[]
      }
    },
    created() {
      //this.getMessageData()
      //console.log(JSON.parse(localStorage.getItem('loginStatus')))
    },
    mounted(){
      //var emoji = require('node-emoji');
      var myEmoji = [':smile:',':grinning:',':blush:',':wink:',':heart_eyes:',':kissing_heart:',':kissing_closed_eyes:',
        ':stuck_out_tongue_winking_eye:',':stuck_out_tongue_closed_eyes:',':stuck_out_tongue:',':flushed:',':grin:',':pensive:',
        ':relieved:',':unamused:',':disappointed:',':persevere:',':cry:',':joy:',':sob:',':sleepy:',':disappointed_relieved:',
        ':cold_sweat:',':sweat_smile:',':sweat:',':weary:',':tired_face:',':fearful:',':scream:',':angry:',':rage:',':triumph:',
        ':confounded:',':satisfied:',':yum:',':mask:',':sunglasses:',':sleeping:',':dizzy_face:',':worried:',':frowning:',
        ':anguished:',':smiling_imp:',':imp:',':open_mouth:',':grimacing:',':neutral_face:',':confused:',':hushed:',':no_mouth:',
        ':innocent:',':smirk:',':expressionless:',':man_with_gua_pi_mao:',':man_with_turban:',':cop:',':construction_worker:',':guardsman:',
        ':baby:',':boy:',':girl:',':man:',':woman:',':eyes:',':nose:',':thumbsup:',':thumbsdown:',':ok_hand:',':punch:',':fist:',':v:',
        ':wave:',':raised_hand:',':open_hands:',':point_up_2:',':point_down:',':point_right:',':point_left:',':raised_hands:',':pray:',':clap:',':muscle:'];
      //var len = parseInt(myEmoji.length/5);
      for(var i=0; i< myEmoji.length;i++){
        this.emojiFirst.push( emoji.get(myEmoji[i]))
      }
    },
    methods: {
      getMessageData(){
        this.$http.post("/healthFront/out/index/commentShow.do", this.Qs.stringify({
            consultId: this.messageId,
            memberId: this.userId,
            currentPage: this.page,
            showCount: this.showNum
          })
        ).then((res) => {
          if(res.data.stateCode == "001"){
            if(res.data.commentList){
              this.commentArr = res.data.commentList;
              for(var i=0;i<this.commentArr.length;i++){
                this.commentArr[i].com=emoji.emojify(this.commentArr[i].com);
              }
              this.dataLength = res.data.total;
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              if(this.showNum > this.dataLength){
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              }else{
                this.showNum += this.showNum
              }
            }else{
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          }
        });
      },
      //对评论点赞
      like(id,index) {

        this.$http.post("/healthFront/out/index/likeNumComment .do", this.Qs.stringify({
            commentId: id,
            memberId: this.userId
          })
        ).then((res) => {
          if( this.commentArr[index].likenumStatus == 0 ){
            this.commentArr[index].like_num++;
            this.commentArr[index].likenumStatus = 1
          }else{
            this.commentArr[index].like_num--;
            this.commentArr[index].likenumStatus = 0
          }
          console.log(id);
        });

      },
      /*评论*/
      sendComment(){
        var faceComment = emoji.unemojify(this.commentContent);
        console.log(faceComment);
        this.$http.post("/healthFront/out/index/commentOrReply.do", this.Qs.stringify({
            consultId: this.messageId,
            memberId: this.userId,
            com: faceComment
          })
        ).then((res) => {
          if(res.data.stateCode == "001"){
            if(this.commentArr.length>0){
              this.getMessageData();
              this.commentContent="";
              // console.log(this.commentArr )
            }else{
              this.$router.go(0) // 当是第一条评论时刷新页面
            }
          }
        })

      },
      make_face() {
        this.faceShow = true
      },
      done() {
        this.faceShow = false
      },
      choiceFace(index){
        this.commentContent = this.commentContent+this.emojiFirst[index];
        //console.log(this.commentContent)
        this.faceShow = false
      }
    },
    components: {
      Top,
      InfiniteLoading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  body{
    //background: #f0f0f0 !important;
  }
  .send-bottom {
    width: 100%;
    background: #ffffff;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4rem;
    padding: .5rem;
    z-index: 10;
    i {
      width: 3rem;
      height: 3rem;
      font-size: 2.5rem;
      text-align: center;
      -webkit-background-size: 100%;
      background-size: 100%;
      float: left;
      color: #ccc;
    }
    input{
      margin-left: 0.5rem;
      border: none;
      height: 32px !important;
      border-bottom: solid 1px #e4e4e4;
      padding: 0;
      padding-bottom: 0.6rem;
      line-height: 1.1rem;
      width: 68% !important;
      font-size: 1.1rem;
    }
    span {
      font-size: 1.3rem;
      float: right;
      button {
        font-size: 14px;
        font-weight: 400;
        line-height: 1;
        position: relative;
        display: inline-block;
        margin-bottom: 0;
        padding: 6px 12px;
        cursor: pointer;
        -webkit-transition: all;
        transition: all;
        -webkit-transition-timing-function: linear;
        transition-timing-function: linear;
        -webkit-transition-duration: .2s;
        transition-duration: .2s;
        text-align: center;
        vertical-align: top;
        white-space: nowrap;
        color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        background-color: #03a9f4;
        background-clip: padding-box;
      }
    }
  }
  .comment-list {
    margin: 5rem 0;
    li {
      overflow: hidden;
      background: #FFFFFF;
      padding: 1.7rem 1rem;
      margin-top: 0.5rem;
      position: relative;
      &:first-of-type {
        margin: 0;
      }
      i {
        width: 10%;
        display: inline-block;
        img {
          width: 100%;
        }
      }
      .li-right {
        float: right;
        width: 86%;
        h4 {
          font-size: 1.3rem;
          margin-top: 0.5rem;
          span {
            font-size: 1rem;
            color: #7f7f7f;
            margin-top: 0.4rem;
            float: right;
          }
        }
        p {
          font-size: 1.2rem;
          margin: 1.4rem 0;
        }
        .list-img {
          i {
            width: 5.4rem;
            display: inline-block;
            margin-right: 0.6rem;
            img {
              width: 100%;
            }
          }
        }
      }
      .full-right {
        position: absolute;
        width: 3.6rem;
        height: 2.1rem;
        bottom: 0;
        right: 2rem;
        span {
          display: inline-block;
          font-size: 1rem;
          color: #7f7f7f;
          line-height: 1;
          i {
            width: 1.6rem;
            height: 1.6rem;
            display: inline-block;
            margin-right: 0.6rem;
            vertical-align: bottom;
            font-size: 1.6rem;
          }
          span {
            line-height: 1.6rem;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
  .no-data {
    position: absolute;
    top: 11rem;
    text-align: center;
    font-size: 1.3rem;
    p{
      margin-top: 3rem;
      color: #8f8f94;
      font-size: 1.4rem;
    }
  }
  .face-fade-enter-active{
    bottom:4rem;
  }
  .face-fade-enter, .face-fade-leave-active{
    bottom: -25rem;
  }
  .qqFace{
    background: rgba(246,246,246,0.9);
    border: solid 1px #fff;
    padding: 1rem 0;
    height: 20rem;
    overflow-y: scroll;
    width: 100%;
    width: calc(100vw + 1px);
    position: fixed;
    z-index: 1000;
    bottom: 4rem;
    left: 0px;
    span{
      padding: 0.2rem 0.4rem;
      font-size: 1.8rem;
      display: inline-block;
    }
  }
  .faceBox{
    position: fixed;
    z-index: 10000;
    width:100%;
    height:100%;
    bottom:5rem;
    left:0;
    overflow: hidden;
  }
</style>
