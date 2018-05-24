<template>
  <div>
    <Top :title="title"></Top>
    <div class="name">
      <form action="" method="get">
        <div class="nameText">
          <input type="text" maxlength="11" class="nameTextInp" :placeholder="user.memberName">
        </div>
        <div type="sumbit" value="保存" class="Preservation">保存</div>
      </form>
    </div>
  </div>
</template>
<style lang="less">
  body {
    background: #FFFFFF;
  }

  .name {
    border-top: solid 1px #e7e7e7;
    padding: 1rem 1.4rem 0;
    margin-top: 4.5rem;
  }

  .name .nameText {
    position: relative;
  }

  .name .nameText input {
    font-size: 1.2rem;
    padding: 1.2rem 0;
    padding-left: 1rem;
    width: 29rem;
    border-bottom: solid 1px #dfdfdf;
  }

  .name .nameText span {
    display: block;
    pointer-events: none;
    background: #fff;
    padding: 0.5rem 1.2rem;
    font-size: 1rem;
    border: solid 1px #03a9f4;
    float: right;
    margin-top: 0.6rem;
    color: #03a9f4;
    border-radius: 0.5rem;
    opacity: 0.3;
  }

  .name .nameText .Allow {
    opacity: 1;
    pointer-events: auto;
  }

  .name .nameText .warning {
    font-size: 1rem;
    position: absolute;
    right: 0rem;
    bottom: -2.5rem;
  }

  .name .Preservation {
    display: block;
    padding: 1rem;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    max-width: 640px;
    box-sizing: border-box;
    background: #03a9f4;
    color: #fff;
    border-radius: 0.4rem;
    margin-top: 8rem;
    opacity: 0.4;
    pointer-events: none;
  }

  .name .Allow {
    opacity: 1;
    pointer-events: auto;
  }

</style>
<script>
  import Top from '../../../../../src/components/commom/top2.vue'

  $(function () {
    var thisVal = $('.nameTextInp');
    $('.nameTextInp').keyup(function () {

      if (thisVal.val() == "" || thisVal.val() == thisVal.attr('placeholder')) {
        $('.Preservation').removeClass('Allow');
      } else {
        $('.Preservation').addClass('Allow');
      }
    })
  })

  export default {
    data() {
      return {
        title: "修改姓名",
        personalInfosArr:[],
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息

      }
    },
    created() {
      /*this.getpersonalInfosData()*/
    },
    methods: {
  /*    getpersonalInfosData: function () {
        this.$http.post("/healthFront/out/personalCenter/getMessageInfo.do", this.Qs.stringify({
            messageId: '1',
          })
        ).then((res) => {
          this.personalInfosArr.push(res.data.messageInfo);

        })
      }*/
    },
    components: {
      Top

    }
  }
</script>
