<template>
 <div class="register-box">
   <Top :title="title"></Top>
   <form id="form1" action="" method="post" name="">
     <div class="register">
       <ul>
         <li>
           <div class="">
             <i></i>
             <input type="tel" placeholder="请输入手机号" v-model="regInfo.phone" v-verify.phone="regInfo.phone"/>
             <span class="verification" @click="sendCode">{{text}}</span>
             <label class="fl" v-remind="regInfo.phone" ></label>

           </div>
         </li>
         <li>
           <div class="">
             <i></i>
             <input type="number" v-model="code" v-verify="code" placeholder="请输入手机验证码" />
             <label class="f1" v-remind="code"></label>
           </div>
         </li>
         <li>
           <div class="">
             <i></i>
             <input type="text" v-model="userName" v-verify="userName" placeholder="请输入昵称" />
              <label class="f1" v-remind="userName"></label>
           </div>
         </li>
         <li>
           <div class="">
             <i></i>
             <input type="text"  v-model="pwd" v-verify="pwd" placeholder="请输入密码" />
             <label class="f1" v-remind="pwd"></label>
           </div>
         </li>
         <li>
           <div class="">
             <i></i>
             <input type="password" v-model="rePwd" v-verify="rePwd" placeholder="请再次输入密码" />
             <label class="f1" v-remind="rePwd"></label>
           </div>
         </li>
       </ul>
       <div class="done_button" @click="submit">完成</div>
     </div>
   </form>
 </div>
</template>

<script>
import Top from '@/components/commom/top2.vue'
import Vue from 'vue'
import verify from "vue-verify-plugin"

  Vue.use(verify,{
    blur: true
  });
  export default {
    data() {
        return {
          title: "注册",
          regInfo: {
            phone: ""
          },
          code: "",
          userName: "",
          pwd: "",
          rePwd: "",
          second:60, //发送验证码倒计时
          time: 0,
          open: true,
          nowCode:"", //验证码
          returnInfo:"" ,//注册的时候返回的信息
          flag: 0
        }
    },
    verify: {
      regInfo: {
        phone: ["required","mobile"]
      },
      code: [
        "required",
        {
          test:function (val) {
            if(val != this.nowCode){
              return false
            }
            return true
          },
          message:"验证码输入有误"
        }
      ],
      userName: [
        "required",
        {
          minLength:2,
          message: "姓名不得小于两位"
        },
        {
          maxLength:5,
          message: "姓名不得大于5位"
        }
      ],
      pwd: [
        "required",
        {
          minLength:6,
          message: "密码不得小于6位"
        }
      ],
      rePwd: [
        "required",
        {
          test:function(val){
            if(val != this.pwd){
              return false
            }
            return true;
          },
          message:"两次输入密码不一致"
        }
      ]
    },
    created() {
      //this.getMessageData();
    },
    components:{
      Top
    },
    methods: {
      sendCode() {
        console.log(this.$verify.check("phone"));
        if(this.$verify.check("phone")){
          if(this.open){
            //this.codeExist();
            this.getCode();
          }
        }
      },
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }else if(this.time == 0){
          this.open = true;
          //this.timer = false;
        }
      },
      /*提交信息*/
      submit() {
        //console.log(this.$verify.check());
        if(this.$verify.check()){
          this.getRegisterInfo();
        }
      },
      getCode: function () {
        var _this = this;
        _this.$http.post("/healthFront/out/common/getValidateCode.do", _this.Qs.stringify({
            userMobile:_this.regInfo.phone ,
            flag: _this.flag
          })
        ).then((res) => {
          // console.log(res.data);
          if(res.data.stateCode=="001"){
            _this.time = _this.second;
            _this.timer();
            _this.open = false
            _this.nowCode=res.data.validateCode;
            console.log(_this.nowCode);
          }else{
            mui.alert(res.data.message)
          }

        })
      },
      getRegisterInfo: function () {
        this.$http.post("/healthFront/out/login/toRegister.do", this.Qs.stringify({
          userMobile:this.regInfo.phone ,
          validateCode:this.code,
          userName:this.userName,
          userPassword:this.pwd
          })
        ).then((res) => {
          var _this = this;
          console.log(res.data);
          /*this.returnInfo = res.data.message;
          console.log(this.returnInfo)*/
          if(res.data.stateCode == "001"){
            mui.alert(res.data.message , function () {
              _this.$router.push({ path:'/' })
            });
          }else{
            mui.alert(res.data.messag)
          }
        })
      }
    },
    computed: {
      text: function () {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
@import '/static/css/register.css';
@import '/static/css/materialize.min.css';
@import '/static/css/dialog.css';
.f1{
  position: absolute;
  right: 0;
  top: 1rem;
  font-size:1.2rem;
}
li label{
  position: absolute;
  right: 0;
  top: 3rem;
  font-size:1.2rem;
}

</style>
