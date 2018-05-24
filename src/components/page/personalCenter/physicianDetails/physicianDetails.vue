<template>
  <div class="doctor">
    <div class="top">
      <a href="javascript:history.go(-1)" class="his_go his_to icon iconfont icon-fanhui1"></a>
      <h1 class="title">医生详情</h1>
    </div>

    <div class="doctor-box">
      <div class="content-top clear">
        <div class="top-left">
          <i><img :src="doctorArr.picture"></i>
          <span v-text="doctorArr.title ==1 ? '初级医师' : '' || doctorArr.title ==2 ? '中级医师' : '' || doctorArr.title ==3 ? '副高级医师' : '' || doctorArr.title ==4 ? '高级医师' : ''
|| doctorArr.title ==5 ? '助理营养师' : ''|| doctorArr.title ==6 ? '中级营养师' : ''|| doctorArr.title ==7 ? '高级营养师' : ''"></span>
        </div>
        <div class="top-right">
          <h4>{{doctorArr.name}}<span v-text="doctorArr.sex"></span></h4>
          <p><i></i> <span v-for="i in doctorArr.stArr" v-text="i"></span></p>
          <p><i></i>{{organArr.name}}</p>
          <div class="top-btn">
            <span @click="attentionFn" v-text="attentionText"></span>
            <span id="exchange" @click="chatFn">医患交流</span>
          </div>
          <div class="integral">点击图文咨询开启咨询</div>
        </div>
      </div>
      <h3 class="doctor-tit">医生简介</h3>
      <div class="doctor-content">
        <p v-text="doctorArr.intro"></p>
      </div>
    </div>

    <div class="ceng" v-show="chatStatus"></div>
    <div class="show" id="show" v-show="chatStatus">
      <p>聊天将消耗 {{integralNum}} 积分</p>
      <span @click="chatCancel">取消</span>
      <span @click="chatEnsure">确定</span>
    </div>

    <div class="ceng" v-show="popupStatus">
    </div>
    <div class="dialog" v-show="popupStatus">
      <p>确定请取消对该医生的关注吗？</p>
      <span @click="attentionEnsure">确定</span>
      <span @click="attentionCancel">取消</span>
    </div>


  </div>
</template>

<script>

  export default {
    data() {
      return {
        title: "医生详情",
        doctorId: this.$route.query.id,
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        doctorArr: [],
        organArr: [],
        attentionText: "",
        popupStatus: false,
        chatStatus: false,
        isAttention: 0,
        integralNum: null,
      }
    },
    created() {
      this.$http.post("/healthFront/out/doctors/getDoctorDetail.do", this.Qs.stringify({
          memberId: this.user.memberId,
          doctorId: this.doctorId
        })
      ).then((res) => {

        this.doctorArr = res.data.doctor;
        console.log(this.doctorArr )
        this.organArr = res.data.doctor.organ;

        var str = this.doctorArr.filedString;

        if (str !== undefined) {
          var resArr = (this.tipfun(str));
          res.data.doctor.stArr = resArr;
        }

        this.isAttention = res.data.isAttention;
        this.integralNumFn(this.doctorArr.title);

        if (this.isAttention === "001") {
          this.attentionText = "取消关注"
        } else {
          this.attentionText = "关注"
        }

      }).catch((err) => {
        console.log(err)
      })

    },
    methods: {
      tipfun(s) {
        s = s.substr(0, s.length - 1);
        return s.split(",")
      },
      /* 关注弹窗*/
      attentionFn() {
        if (this.attentionText === "取消关注") {
          this.popupStatus = true;
        } else {
          this.$http.post("/healthFront/out/personalCen/toConcernDoctor.do", this.Qs.stringify({
              memberId: this.user.memberId,
              doctorId: this.doctorId,
            })
          ).then((res) => {
            this.attentionText = "取消关注"
          }).catch((err) => {
            console.log(err)
          })
        }

      },

      /* 关注确认*/
      attentionEnsure() {
        this.popupStatus = false;

        this.$http.post("/healthFront/out/personalCen/toCancelAttention.do", this.Qs.stringify({
            memberId: this.user.memberId,
            doctorId: this.doctorId,
          })
        ).then((res) => {
          this.attentionText = "关注"
        }).catch((err) => {
          console.log(err)
        })
      },

      /* 关注取消*/
      attentionCancel() {
        this.popupStatus = false;
      },
      /* 积分弹窗*/
      chatFn() {
        this.chatStatus = true;
      },
      /* 积分取消*/
      chatCancel() {
        this.chatStatus = false;
      },
      /* 积分确定*/
      chatEnsure() {
        this.chatStatus = false;
      },
      /*积分弹窗函数*/
      integralNumFn(str) {
        if (str === 1) {
          this.integralNum = 15
        } else if (str === 2) {
          this.integralNum = 20
        } else if (str === 3) {
          this.integralNum = 25
        } else if (str === 4) {
          this.integralNum = 30
        } else if (str === 5) {
          this.integralNum = 10
        } else if (str === 6) {
          this.integralNum = 20
        } else if (str === 7) {
          this.integralNum = 30
        }

      }
    },
    components: {}
  }
</script>

<style lang="less" scoped>

  .doctor .top {
    position: fixed;
    width: 100%;
    z-index: 10;
    background: #49c8f3;
    top: 0;
    left: 0;
    padding: 0 1.2rem;
    height: 4.5rem;
    line-height: 4.5rem;
  }

  .doctor-box {
    margin-top: 4.5rem;
  }

  .doctor .top a {
    display: inline-block;
    width: 2.25rem;
    height: 1.7rem;
    float: left;
    color: #FFFFFF;
    position: absolute;

  }

  .doctor .top h1 {
    font-size: 1.7rem;
    width: 100%;
    text-align: center;
    color: #ffffff;
  }

  .doctor-box .content-top {
    padding: 2.4rem 1.9rem;
    overflow: hidden;
    color: #ffffff;
    background: linear-gradient(#49c8f3, #1ea6ea);
  }

  .doctor-box .content-top .top-left {
    float: left;
    width: 6rem;
    height: 6rem;
  }

  .doctor-box .content-top .top-left i {
    width: 100%;
    height: 100%;
  }

  .top-left i img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    margin-top: 0.6rem;
  }

  .top-left span {
    display: inline-block;
    font-size: 1.4rem;
    text-align: center;
    margin-top: 1.2rem;
    width: 7rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  .doctor .content-top .top-right {
    float: right;
    width: 78%;
    padding-left: 2.3rem;
  }

  .top-right h4 {
    font-size: 1.7rem;
  }

  .top-right h4 span {
    font-size: 1.2rem;
    color: #c1ecfd;
    margin-left: 0.7rem;
  }

  .top-right p {
    font-size: 1.1rem;
    margin-top: 0.5rem;
  }

  .top-right p i {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
    position: relative;
    top: -0.2rem;
  }

  .top-right p span {
    margin-right: 0.2rem;
  }

  .top-right p:first-of-type i {
    width: 0.6rem;
    height: 1rem;
    background: url("../../../../../static/img/small-i_03.png");
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .top-right p:last-of-type i {
    width: 0.8rem;
    height: 1rem;
    background: url("../../../../../static/img/small-i_07.png");
    -webkit-background-size: 100%;
    background-size: 100%;
  }

  .top-right .top-btn {
    margin: 1.2rem 0 0.9rem 0;
  }

  .top-right .top-btn span {
    display: inline-block;
    width: 29%;
    border: solid 1px #ffffff;
    text-align: center;
    border-radius: 0.2rem;
    padding: 0.1rem 0;
    font-size: 1.1rem;
  }

  .top-right .top-btn span:last-of-type {
    margin-left: 1.8rem;
  }

  .top-right .integral {
    color: #ffff00;
    font-size: 1rem;
  }

  .top-right .integral span {
    margin-left: 0.5rem;
  }

  .doctor-box .doctor-tit {
    font-size: 1.5rem;
    padding: 1.2rem 1rem 1rem;
    border-bottom: solid 1px #f5f5f5;
  }

  .doctor-box .doctor-content {
    padding: 1rem;
  }

  .doctor-box .doctor-content p {
    width: 100%;
    font-size: 1.3rem;
    color: #808080;
    margin-top: 1.5rem;
    text-indent: 2em;
    line-height: 2.2rem;
  }

  .doctor-box .doctor-content p:first-of-type {
    margin-top: 0.5rem;
  }

  .ceng {
    width: 100%;
    height: 100%;
    background: rgba(105, 105, 105, 0.5);
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
  }

  .doctor .show {
    width: 60%;
    background: #ffffff;
    border-radius: 0.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .doctor .show p {
    font-size: 1.3rem;
    text-align: center;
    padding: 1.7rem 0;
  }

  .doctor .show span {
    display: inline-block;
    width: 50%;
    float: left;
    font-size: 1.3rem;
    color: #03a9f4;
    border-top: solid 1px #03a9f4;
    padding: 1.3rem 0;
    text-align: center;
  }

  .doctor .show span:first-of-type {
    border-right: 1px solid #03a9f4;
  }

  .dialog {
    width: 70%;
    margin: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2.3rem 0.7rem;
    background: #fff;
    z-index: 100;
    border-radius: 0.3rem;
  }

  .dialog p {
    font-size: 1.4rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }

  .dialog span {
    display: inline-block;
    width: 35%;
    font-size: 1.2rem;
    border: solid 1px #03a9f4;
    color: #03a9f4;
    text-align: center;
    padding: 0.7rem 0;
    margin-left: 1.8rem;
    border-radius: 0.3rem;
  }

  .dialog span:last-of-type {
    color: #fff;
    background: #03a9f4;
  }
</style>
