<template>
  <div class="phone-wrap">
    <Top :title="title"></Top>
    <div class="phone">

      <form>
        <div class="telNumber">
          <input type="tel" v-model="phoneNum" maxlength="11" @keyup="keyCodeFn" placeholder="请输入手机号">
          <button type="button" id="subitPhone" :class="buttonStyle" @click="subitPhone">{{phoneText}}</button>
        </div>

        <div class="Verification_Code">
          <input type="text" maxlength="6" v-model="Verification" placeholder="请输入验证码" class="Verification">
        </div>

        <div type="sumbit" value="保存" @click="submitFn" class="Preservation">保存</div>
      </form>
    </div>
  </div>

</template>

<script>

  import Top from '../../../../../src/components/commom/top2.vue'

  export default {
    data() {
      return {
        title: "修改手机号",
        phoneNum: null,// 手机号输入框的值
        buttonStyle: "buttonSty",//验证码样式
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        time: 0,
        second: 60,//秒数
        open: true,//获取验证码按钮的开关
        Verification: null, //验证码输入框的值
        dataVerifica: null //获取的验证码

      }
    },
    created() {

    },
    methods: {
      //获取验证码点击事件
      subitPhone: function () {
        var _regexp = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (_regexp.test(this.phoneNum)) {
          if (this.open) {
            this.codeExist()
          }
        } else {
          mui.alert("手机号输入错误")
        }
      },
      //手机号码输入框输入事件
      keyCodeFn: function (ev) {

        if (this.phoneNum.length > 10) {
          this.buttonStyle = "buttonActiveStyle"

        } else {
          this.buttonStyle = "buttonSty"
        }
      },
      //获取验证码
      getVerificationCode: function () {
        this.$http.post("/healthFront/out/common/getValidateCode.do", this.Qs.stringify({
            memberId: this.user.memberId,
          })
        ).then((res) => {
          console.log(res.data);
          this.dataVerifica = res.data.validateCode

        })
      },
      //定时器
      timer: function () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        } else if (this.time == 0) {
          this.open = true;
          //this.timer = false;
        }
      },
      //检查手机号是否重复
      codeExist: function () {
        this.$http.post("/healthFront/out/login/checkPhone.do", this.Qs.stringify({
            memberPhone: this.phoneNum
          })
        ).then((res) => {
          console.log(res.data.stateCode)
          if (res.data.stateCode === "002") {
            mui.alert(res.data.message)
          } else {
            this.time = this.second;
            this.timer();
            this.open = false;
            this.getVerificationCode()
          }
        })
      },
      //保存按钮点击事件
      submitFn: function () {
        if (parseInt(this.Verification) === parseInt(this.dataVerifica)) {
          this.$router.push({
            path:'/personalInfo'
          })
        } else {
          mui.alert("验证码输入错误")
        }
      }

    },
    components: {
      Top
      // 引入组件
    },
    computed: {
      phoneText: function () {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      }
    }
  }

</script>


<style lang="less" >
  @import '/static/css/dialog.css';

  body{
    background: #fff;
  }
  .phone-wrap {
    background: #FFFFFF;
    padding-bottom: 25rem;
  }

  body {
    background: #FFFFFF;
  }

  .phone {
    border-top: solid 1px #e7e7e7;
    padding: 5.5rem 1.4rem 0;
  }

  .phone .telNumber {
    position: relative;
    border-bottom: solid 1px #dfdfdf;
  }

  .phone .telNumber input {
    font-size: 1.2rem;
    padding: 1.2rem 0 1.2rem 1rem;
    width: 18rem;
    border-bottom: solid 1px #dfdfdf;
  }

  .comBtn {
    display: block;
    width: 7.5rem;
    text-align: center;
    background: #fff;
    padding: 0.5rem 0;
    font-size: 1rem;
    border: solid 1px #03a9f4;
    float: right;
    margin-top: 0.6rem;
    color: #03a9f4;
    border-radius: 0.2rem;
  }

  .buttonSty {
    display: block;
    width: 7.5rem;
    text-align: center;
    background: #fff;
    padding: 0.5rem 0;
    font-size: 1rem;
    border: solid 1px #03a9f4;
    float: right;
    margin-top: 0.6rem;
    color: #03a9f4;
    border-radius: 0.2rem;

    pointer-events: none;
    opacity: 0.3;
  }

  .buttonActiveStyle {
    display: block;
    width: 7.5rem;
    text-align: center;
    background: #fff;
    padding: 0.5rem 0;
    font-size: 1rem;
    border: solid 1px #03a9f4;
    float: right;
    margin-top: 0.6rem;
    color: #03a9f4;
    border-radius: 0.2rem;

    opacity: 1;
  }

  .phone .telNumber .Allow {
    opacity: 1;
    pointer-events: auto;
  }

  .phone .telNumber .warning {
    font-size: 1rem;
    position: absolute;
    right: 0;
    bottom: -2rem;
  }

  .phone .Verification_Code {
    position: relative;
    border-bottom: solid 1px #dfdfdf;
    margin-top: 2rem;
  }

  .phone .Verification_Code input {
    font-size: 1.2rem;
    padding: 1.2rem 0 1.2rem 1rem;
    width: 18rem;
  }

  .phone .Verification_Code .warning {
    font-size: 1rem;
    position: absolute;
    right: 0;
    bottom: -2rem;
  }

  .phone .Preservation {
    display: block;
    padding: 1rem;
    text-align: center;
    width: 80%;
    margin: 8rem auto 0;
    max-width: 640px;
    box-sizing: border-box;
    background: #03a9f4;
    color: #fff;
    border-radius: 0.2rem;
/*    opacity: 0.4;
    pointer-events: none;*/
  }

  .phone .Allow {
    opacity: 1;
    pointer-events: auto;
  }

</style>
