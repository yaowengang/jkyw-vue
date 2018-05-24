<template>
  <div>
    <remote-js src="//cdn.ronghub.com/RongIMLib-2.2.5.min.js"></remote-js>
  <div class="head">
    <router-link to="/">
      <i class="iconfont icon icon-fanhui1"></i>
    </router-link>
    <h1>{{ title }}</h1>
    <router-link to="/message/appraise" class="evaluate">
      评价
    </router-link>
  </div>
    <transition name="slide-fade">
    <div class="loading" v-show="loading == 1">
      <img src="/static/img/loading.gif" alt="">加载中
    </div>
    </transition>
    <transition name="slide-fade">
    <div class="loading" v-show="noMore == 1">没有更多数据辣！</div>
    </transition>
  <div class='message'>
    <ul class="message_ul">
      <!--<span class="message_time"><i>上午11:20</i></span>-->
      <li v-for="(message,index) in messageVal" :class="[message.talkerType== 0? Other:My]" v-if="index > bars">
         <!--<img :src="message.consult.member.memberImg" class="Head_img">-->
        <img :src="message.consult.member.memberImg" class="Head_img">
        <div class="message_con">
          <s><i></i></s>
          <p v-if="message.messageType == 1">
            <img :src="message.content" alt="" data-preview-src="" data-preview-group="1">
          </p>
          <p v-else-if="message.messageType == 0">{{ message.content }}</p>
          <div v-else-if="message.messageType == 2" class="prescription_con">
             <div class="prescription_bg">
               <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3137191120,2618624655&fm=27&gp=0.jpg" alt="">
               <div class="prescription_text">
                 <span>气血双虚综合调理</span>
                 <span class="see">点击查看</span>
               </div>
             </div>
            <h5>健康处方</h5>
          </div>
        </div>
      </li>

      <div class="bottom">
         <div class="Input_box">
            <div class="Input_div">
              <span class="updataImBtn">
                <label for="file" id="upImg" @click.stop="addPic">
                  <i class="icon iconfont icon-xiangji"></i>
                  <input type="file" id="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange">
                </label>
              </span>
              <textarea  rows=1  id="textarea"   class="text" v-model="InputVal"></textarea>
            </div>
          <button id="send"  :disabled="disabledBtn">发送</button>
           <!--<span style="padding: 2rem; display: block" @click="bars-=10">+++</span>-->
         </div>
      </div>
    </ul>
  </div>
  </div>
</template>
<script>
  import "@/libs/js/mui.zoom";
  import "@/libs/js/mui.previewimage";
  import lrz from  'lrz';
  import Waibu from '@/components/commom/remote-js'
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        handler:'',
        title:'客服',
        Other:'Other',
        My:'My',
        loading:0,
        noMore:0,
        InputVal:'',
        disabledBtn:true,
        bars:'',
        user:JSON.parse(localStorage.getItem('loginStatus')),
        messageList:[],
        messageVal:'',
        pageNum:'1',
        token:'S2Rk4FshYVAiiWxc6PlWc//606dHfMq6lDtpR6CFBK3O+OERpHeIIgzjDoLbPWXnxvo+b4ikBPGu46D6uqvYCiDLoClSKWS2',
        userId:22,
        targetId:'13322223333'
      }
    },
    computed:{
     // ...mapGetters(['counts'])
    },
    components:{
     'remote-js':Waibu
    },
    created() {

      this.$http.post("http://192.168.1.152:8080/healthFront/out/doctors/fromMyConsultsToConsult.do",this.Qs.stringify({
        consultId:264,
        pageNum:this.pageNum
        })
      ).then((res) => {
        var newlist = res.data.consultMessageList;
      //  this.messageVal = newlist.reverse();
       // this.messageVal = res.data.consultMessageList;
       // var sw = JSON.stringify(this.messageVal);
        // console.log(this.medicalRecord);
        console.log(this.messageVal);
        //this.bars = this.messageVal.length-10;
        this.pageNum ++
      });
    },
    mounted(){
      var _this = this;
     // $('<audio id="chatAudio"><source src="/static/img/notify.mp3" type="audio/mp3"></audio>').appendTo('body');
      mui.previewImage();
      $(window).scroll(function(){
        if($('body').scrollTop() == 0){
          _this.loading = 1;
        } else {
          _this.loading = 0;
          _this.noMore = 0
        }
      });
      var userId = _this.userId;
      var token = _this.token;
      RongIMClient.init("bmdehs6pbz1ps");


      //此接口必须在init()方法之后，连接融云服务器 connect 之前调用。
      RongIMClient.getInstance().hasRemoteUnreadMessages(token,{
        onSuccess:function(hasMessage){
          if(hasMessage){
            // 有未读的消息
            console.log('有离线消息！');
          }else{
            // 没有未读的消息
            console.log('无离线消息！');
          }
        },onError:function(err){
          // 错误处理...
          console.log('错误')
        }
      });
      RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
          switch (status) {
            //链接成功
            case RongIMLib.ConnectionStatus.CONNECTED:
              console.log('链接成功');
              break;
            //正在链接
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log('正在链接');
              break;
            //重新链接
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              console.log('断开连接');
              break;
            //其他设备登录
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              console.log('其他设备登录');
              break;
            //网络不可用
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log('网络不可用');
              break;
          }
        }});
      RongIMClient.connect(token, {
        onSuccess: function(userId) {
          console.log("Login successfully." + userId);
        },
        onTokenIncorrect: function() {
          console.log('token无效');
        },
        onError:function(errorCode){
          var info = '';
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时';
              break;
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
              info = '未知错误';
              break;
            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
              info = '不可接受的协议版本';
              break;
            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
              info = 'appkey不正确';
              break;
            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
              info = '服务器不可用';
              break;
          }
          console.log(errorCode);
        }
      });

      $('#send').on('click',function(){
        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
        var msg =new RongIMLib.TextMessage({talkerType:1,consult:{member:{memberImg:_this.user.memberImg } },messageType:0,time:'2017-8-16',content:_this.InputVal});
        //$this.messageVal.push(Mymessage);
        RongIMClient.getInstance().sendMessage(conversationtype, _this.targetId, msg, {
            onSuccess: function (message) {
              //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
              console.log("Send successfully");
            },
            onError: function (errorCode,message) {
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                  info = '在黑名单中，无法向对方发送消息';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                  info = '不在讨论组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                  info = '不在群组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                  info = '不在聊天室中';
                  break;
                default :
                  info = x;
                  break;
              }
              console.log('发送失败:' + info);
            }
          }
        );
      })

//      mui('body').on('tap','#upImg',function(e){
//        e.preventDefault();
//      $('input[type=file]').trigger('click');});
  },
    watch:{
    'messageVal':{
        handler:function(newVal,oldVal){
          this.$nextTick(function () {
           /* $('body').animate({
              scrollTop: $('.message_ul').height()
            },600);
            $('#chatAudio')[0].play();*/
          })
        }
      },
      'loading':{
        handler:function(val,oldVal){
          var _this = this;
          if(val == '1'){
              this.$http.post("http://192.168.1.152:8080/healthFront/out/doctors/fromMyConsultsToConsult.do",this.Qs.stringify({
                  consultId:264,
                  pageNum:_this.pageNum
                })
              ).then((res) => {
                _this.pageNum++;
                var loadinglist = res.data.consultMessageList;
                console.log(loadinglist.length)
                for(var i=0; i<loadinglist.length; i++){
                  _this.messageVal.unshift(loadinglist[i])
                };
                _this.loading = 0;
              });

//           if(_this.bars < 0){
//             _this.loading = 0;
//             _this.noMore = 1;
//           } else {
//             console.log('添加信息');
//             setTimeout(function(){
//               _this.bars -= 10;
//               _this.loading = 0
//             },2000);
//           }
          }
        }
      },
      imgUrls: 'toggleAddPic',
    'InputVal':{
      handler:function(val,oldVal){
      let Send = document.getElementById('send'),$this=this;
      val==''||val.match(/^\s+$/g)?$this.disabledBtn=true:$this.disabledBtn=false;
      // console.log($this.InputVal);
      }
    }
    },
    methods:{
      send:function(){
        RongIMClient.init("bmdehs6pbz1ps");
        var $this=this;
        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 单聊,其他会话选择相应的消息类型即可。
        var msg =new RongIMLib.TextMessage({talkerType:1,consult:{member:{memberImg:this.user.memberImg } },messageType:0,time:'2017-8-16',content:$this.InputVal});
        //$this.messageVal.push(Mymessage);
        RongIMClient.getInstance().sendMessage(conversationtype, $this.targetId, msg, {
            onSuccess: function (message) {
              //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
              console.log("Send successfully");
            },
            onError: function (errorCode,message) {
              var info = '';
              switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                  info = '超时';
                  break;
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                  info = '未知错误';
                  break;
                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                  info = '在黑名单中，无法向对方发送消息';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                  info = '不在讨论组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                  info = '不在群组中';
                  break;
                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                  info = '不在聊天室中';
                  break;
                default :
                  info = x;
                  break;
              }
              console.log('发送失败:' + info);
            }
          }
        );


        $this.InputVal='';
        $('#textarea').focus();
      },
      onFileChange: function(e) {
        var files = e.target.files || e.dataTransfer.files;
        if(!files.length) return;
        this.createImage(files, e);

      },
      createImage: function(file, e) {
        let vm = this;
        lrz(file[0], { width:1920 }).then(function(rst) {
          let baseImg = {type:'0',headImg:vm.user.memberImg,time:'2017-8-16',textimg:rst.base64}
          vm.messageList.push(baseImg);
          return rst;
        }).always(function() {
          // 清空文件上传控件的值
          e.target.value = null;
        });
       // console.log(rst)
      },
      addPic: function(e) {
        let vm = this;
       // $('input[type=file]').trigger('click');
       // return false;
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '/static/css/case-manage.css';
  @import '/static/css/mui.min.css';
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-3rem);
    opacity: 0;
  }
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
  .evaluate{ float: right; font-size: 1.4rem; margin: 1.4rem 1rem 0 0; color: #333}
  .loading{
    position: fixed;
    top: 5rem;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    left: 0;
    color: #333;
    img{ margin-right: 1rem; width: 1.4rem}
  }
  .message{
    margin-top: 4.5rem;
    padding: 2.5rem 1.5rem 5rem 1.5rem;
    .message_ul{
      height: auto;
      overflow: hidden;

      .message_time {
        font-size: 1.4rem;
        height: 1.6rem;
        line-height: 1.6rem;
        font-weight: 100;
        color: #b2b2b2;
        float: left;
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: 1.5rem;
      }
      .Other{ float: left;
         img{
           float: left;
         }
        .message_con{
          max-width: 20rem;
          width: auto;
          height: auto;
          margin-top: 0.3rem;
          border-radius: 5px;
          position: relative;
          float: left;
          margin-left: 1rem;
          display: block;
          border: 1px solid #dddddd;
          background-color: #ffffff;
          p{
            padding: 0.8rem;
            word-break: break-all;
            background: #fff;
            display: inline-block;
            float: left;
            width: auto;
            font-size: 1.2rem;
            line-height: 2rem;
            border-radius: 8px;
            margin: 0;
            img{
              width: auto;
              max-width: 100%;
              border-radius: 3px;
            }
          }
        };
        s{
          position: absolute;
          top: 1.1rem;
          left: -1.2rem;
          display: block;
          height: 0;
          width: 0;
          font-size: 0;
          line-height: 0;
          border-color: transparent #dddddd transparent transparent;
          border-style: dashed solid dashed dashed;
          border-width: 0.6rem;
          i{
            position: absolute;
            top: -0.6rem;
            left: -0.4rem;
            display: block;
            height: 0;
            width: 0;
            font-size: 0;
            line-height: 0;
            border-color: transparent #fff transparent transparent;
            border-style: dashed solid dashed dashed;
            border-width: 0.6rem;
          }
        }
      };
     .My{ float: right;
       .Head_img{
         float: right;
       }
      .message_con{
        max-width: 20rem;
        width: auto;
        border-radius: 5px;
        position: relative;
        float: right;
        margin-right: 1rem;
        display: block;
        border: 1px solid #dddddd;
        background-color: #03a9f4;
        p{
          padding: .8rem;
          word-break: break-all;
          position: relative;
          background: #03a9f4;
          display: inline-block;
          float: right;
          width: auto;
          color: #fff;
          font-size: 1.2rem;
          line-height: 2rem;
          border-radius: 8px;
          margin: 0;
          img{
            width: auto;
            max-width: 100%;
            border-radius: 3px;
          }
        }
        s{
          position: absolute;
          top: 1.2rem;
          right: -1rem;
          display: block;
          height: 0;
          width: 0;
          font-size: 0;
          line-height: 0;
          border-color: transparent transparent transparent #dddddd;
          border-style: dashed solid dashed dashed;
          border-width: 0.6rem;
          i{
            position: absolute;
            top: -0.6rem;
            left: -0.5rem;
            display: block;
            height: 0;
            width: 0;
            font-size: 0;
            line-height: 0;
            border-color: transparent transparent transparent #03a9f4;
            border-style: dashed dashed dashed solid;
            border-width: 0.6rem;
          }
        }
      }
     }
      li{
        height: auto;
        width: 26rem;
        overflow: hidden;
        margin-bottom: 2rem;
        position: relative;
        .Head_img{
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
        }
      }
      .prescription_con{
        width: 20rem;
        height: auto;
        overflow: hidden;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
       .prescription_bg{
         width: 95%;
         margin: 0.5rem auto;
         height: 5.5rem;
         background: url(/static/img/prescription-bg_03.png) no-repeat;
         background-size: 100%;
         img{
           width: 2.3rem;
           height: 2.3rem;
           margin-top: 1.6rem;
           margin-left: 0.5rem;
           border: solid 1px #fff;
           border-radius: 50%;
           float: left;
         }
         .prescription_text{
           width: 14rem;
           float: left;
           margin-left: 2rem;
           padding-top: 1.3rem;
           span{
             display: block;
             font-size: 1rem;
             font-weight: 100;
             height: 1.4rem;
             line-height: 1.4rem;
           }
           .see{
             color: #eb6562;
             margin-top: 0.5rem;
           }
         }
       }
        h5{
          font-weight: 100;
          font-size: 1rem;
          border-top: solid 1px #dddddd;
          color: #999999;
          padding: 0 0.6rem;
          height: 1.6rem;
          line-height: 1.8rem;
        }
      }

    }
    h1{
      font-size: 6rem;
    }
  .bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    left: 0;
    .Input_box{
      background: #fff;
      height: auto;
      overflow: hidden;
      border-top: solid 1px #d9d9d9;
      width: 100%;
      position: relative;
      box-sizing: border-box;
      max-width: 640px;
      left: 0;
      .Input_div{
        height: auto;
        width: 72%;
        float: left;
        position: relative;
        padding: 0.8rem 0;
        .updataImBtn{
          position: absolute;
          bottom: 0.2rem;
          left: 0;
          width: 11%;
          padding:0.8rem;
          box-sizing: content-box;
          #upImg{
            width: 2.9rem;
            border-radius: 4px;
            #file{
              display: none;
            }
          }
          .icon{ font-size: 2.5rem; color: #ccc}
        }
      }
      .text{
        float: right;
        width: 78%;
        margin-right: 1rem;
        border-radius: 0.3rem;
        color: #666;
        border: solid 1px #d9d9d9;
        font-size: 1.2rem;
        height: auto;
        min-height: 2rem;
        max-height: 8rem;
        overflow-y:visible;
        padding: 0.5rem;
        line-height: 2rem;
        margin-bottom: 0;
      }
      #send{
        width: 28%;
        position: absolute;
        height: 100%;
        font-size: 1.6rem;
        color: #fff;
        background: #1696e5;
        padding: 1.3rem 0;
        border: none;
        border-radius:0;
      }
       #send[disabled]{
        background: #dcdcdc;
      }
    }
  }
  }
</style>
