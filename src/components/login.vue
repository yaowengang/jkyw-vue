<template>
  <div class="login">
    <div class="col s12 z-depth-6">
      <form class="login-form">
        <div class="row margin-20">
          <div class="input-field col s12 center">
            <img src="/static/img/logo.png" alt="" class="responsive-img valign profile-image-login">
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <i class="icon iconfont icon-zhanghu prefix"></i>
            <input  type="text" v-model="user" v-verify="user" @keydown="doLogin($event)">
            <label  v-show="this.user == ''" >Tel</label>
            <label  v-remind="user" class="f1"></label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <i class="icon iconfont icon-mima prefix"></i>
            <input type="password" v-model="pwd" v-verify="pwd" @keydown="doLogin($event)" @keyup.enter="login">
            <label v-show="this.pwd == ''">Password</label>
            <label  v-remind="pwd" class="f1"></label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12 m12 l12  login-text" >
            <input type="checkbox"  id="remember-me" />
            <label for="remember-me" @click="rememberAccount">记住我</label>
          </div>
        </div>
  <!--      {{rememberPassword}}-->
        <div class="row">
          <div class="input-field col loginbt">
            <div href="" class="btn waves-effect waves-light col loginbtn" @click="login">登　录</div>
          </div>
          <div class="input-field col loginbt">
            <!--<a href="" class="btn waves-effect waves-light col loginbtn register-btn">注　册</a>-->
            <router-link to="/register" class="btn waves-effect waves-light col loginbtn register-btn">
              注　册
            </router-link>
          </div>
          <div class="input-field col loginbt login-text">
            <!--<a href="" class="waves-effect waves-light col loginbtn register-btn border-none">忘记密码？</a>-->
            <router-link to="/forgetPwd" class="waves-effect waves-light col loginbtn register-btn border-none">
              忘记密码？
            </router-link>
          </div>
        </div>

      </form>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import verify from "vue-verify-plugin"
  import { mapGetters , mapActions } from 'vuex'
  Vue.use(verify,{
    blur: true
  });
export default {
  data() {
      return {
        user: "",
        pwd: "",
        userInfo:[],
        //rememberPassword: false
        isRemember:false,
        test1: { "name": "cxh", "sex": "man" }
      }
  },
  verify: {
    user: ["required","mobile"],
    pwd: [
      "required",
      {
        minLength:6,
        message: "密码不得小于6位"
      }
    ]
  },
  created(){
    console.log(this.test1)
    this.isRemember = localStorage.getItem('isLogin');
    console.log(this.isRemember);
    if(this.isRemember){
      console.log(this.getCookie('accountInfo'));
      var arr=[];
      arr=this.getCookie('accountInfo').split("&");
      this.user=arr[0];
      this.pwd=arr[1];
      this.$router.push({ 'path':'/index' });
    }
    this.$http.post("http://192.168.1.110:8080/healthFront/doctorScheme/testJson.do",this.Qs.stringify({
      test:this.test1
    }))
  },
  computed: {
    ...mapGetters(["rememberPassword"])
  },
  methods: {
    login() {
      var _this = this;
      if(this.$verify.check()){
        this.$http.post("/healthFront/out/login/userLogin.do", this.Qs.stringify({
            userMobile:this.user ,
            userPassword:this.pwd,
            isRememberme:this.isRemember
          })
        ).then((res) => {
          console.log(res.data);
          if(res.data.stateCode == "001"){
            this.userInfo.push(res.data.user);
           // console.log(this.userInfo[0]);
            mui.alert("登录成功", function () {
              localStorage.setItem('loginStatus',JSON.stringify(_this.userInfo[0]));
              sessionStorage.setItem('demo','111111')
              _this.$router.push({path: '/index'});
            });
          }else{
            mui.alert("用户名或密码错误");
          }
          //alert(res.data.stateCode)
        });
      }
    },
    doLogin(event){
      var mySelf = this;
      var userName = mySelf.user;
      var userPwd = mySelf.pwd;
      var accountInfo = "";
      accountInfo = userName + "&" + userPwd;
      //this.isRemember = localStorage.getItem('isLogin');
      if (this.isRemember){
        //console.log("勾选了记住密码，现在开始写入cookie");
        console.log(accountInfo);
        mySelf.setCookie('accountInfo',accountInfo,1440*7); // 7天后过期
      }else{
        console.log("没有勾选记住密码，现在开始删除账号cookie");
        mySelf .delCookie('accountInfo')
      }
    },
    setCookie(c_name,value,expiremMinutes){
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + expiremMinutes * 60 * 1000);
      document.cookie= c_name + "=" + escape(value)+((expiremMinutes==null) ? "" : ";expires="+exdate.toGMTString());
    },
    delCookie(c_name){
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(c_name);
      if(cval!=null){
        document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
      }
    },
    getCookie: function(c_name){
      if (document.cookie.length>0)
      {
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
          c_start=c_start + c_name.length+1;
          var c_end=document.cookie.indexOf(";",c_start);
          if (c_end==-1)
            c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end))
        }
      }
      return ""
    },
   // ...mapActions(['rememberMe'])
    rememberAccount(){
      //this.$store.commit('remember_me')
      this.isRemember = !this.isRemember;
      console.log(this.isRemember);
      if(this.isRemember){
        localStorage.setItem('isLogin', this.isRemember);
      }else{
        localStorage.removeItem('isLogin')
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style lang="less" scoped>
  @import '/static/css/materialize.min.css';
  @import '/static/css/newcss.css';
  @import '/static/css/dialog.css';
  .login{
    width: 90%;
    margin: auto;
  }
  .input-field i{
    display: inline-block;
    font-size:1.8rem;
    color: #0089ec;
  }
  .loginbtn {
    border-radius: 100px !important;
  }
  .row{
    margin-bottom:0;
  }
  .input-field{
    position: relative;
  }
  .input-field .f1{
    position: absolute;
    right:0;
    text-align: right;
    z-index: -1;
  }
</style>
<!--<style src="/static/css/materialize.min.css" scoped></style>-->
