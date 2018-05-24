<template>

  <div class="integral-step  integral-step-jf clear">
    <div class="clear" v-for="i in getRechargeRecordData[0]">
      <i class="icon iconfont icon-goutongye_huangxinyuanquan_xiaoxilanyangshiweidu"></i>
      <p >{{i.integralDate | timeFn}}</p>
      <p v-text="i.integralDesc"></p>
    </div>

  </div>

</template>
<style lang="less" scoped>
  .integral-step {
    background: #ffffff;
    padding: 2rem 1rem;
  }

  .integral-step > div {
    border-left: 1px solid #fea412;
    margin: 0 1rem;
    position: relative;
    height: 7.8rem;
    padding-left: 1rem;
  }

  .integral-step > div i {
    display: inline-block;
    width: 1.3rem;
    height: 1.3rem;
    float: left;
    position: absolute;
    top: -0.6rem;
    left: -0.8rem;
    color: #fea412;
  }

  .integral-step > div p {
    font-size: 1.2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 0.2rem 1rem;
    position: relative;
    top: -0.7rem;
    letter-spacing: 1px;
  }

  .integral-step > div p:first-of-type {
    color: #010101;
  }

  .integral-step > div p:nth-of-type(2) {
    color: #8b8b8b;
    margin-top: 1rem;
  }

</style>
<script>


  export default {
    data() {
      return {
        getRechargeRecordData: [],
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
      }
    },
    created() {
      this.getRechargeRecord();
    },
    methods: {
      getRechargeRecord: function () {
        this.$http.post("/healthFront/out/personalCenter/getRechargeIntegralList.do", this.Qs.stringify({
            memberId: this.user.memberId,
            currentPage: 1,
            showCount: 6

          })
        ).then((res) => {

          this.getRechargeRecordData.push(res.data.rechargeList.list);

        })
      }
    },
    filters: {
      timeFn: function (value) {
        let d = new Date(value)
        return (d.getFullYear()) + '-' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
      }
    },
    components: {
      // 引入组件
    }
  }
</script>
