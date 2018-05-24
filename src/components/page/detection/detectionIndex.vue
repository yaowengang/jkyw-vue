<template>
    <div class="head">
      <Top :title="title"></Top>
      <div class="testing">
        <ul>
          <li v-for="bankList in getquestionBankList" :style="{background:bankList.backgroundColor}" :key="bankList.id">

            <div class="li_right" @click="toQuestions(bankList.id)">
              <span><i class="fa" :class="'fa-'+bankList.icon" :style="{background:bankList.backgroundColor}"></i></span>
              <span>{{bankList.bankName}}</span>
              <span class="fa fa-chevron-right"></span>
            </div>

          </li>
        </ul>
      </div>

    </div>
</template>
<script type="text/ecmascript-6">
import Top from '../../commom/top2.vue'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
          title: "快速检测"
        }
    },
    props: [

    ],  
    components: {
      Top
    },
    computed: {
      ...mapGetters(['getquestionBankList']),
      count () {
        return this.$store.state.mine.questid
      }
    },
    created() {
      this.$store.dispatch('getquestionBankListApi');
    },
    methods:{
      toQuestions(num){
        console.log(num)
        this.$store.dispatch('questid',num)
        this.$router.push('/ChinaMedicine')
      }
    }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '/static/css/reset.css';
  body{
    background: #f6f6f6 !important;
  }
  .testing {
    width: 94%;
    margin: 5.5rem auto 0 auto;
  }
  .testing li {
    margin-top: 1rem;
    width: 100%;
    height: 6rem;
    border-radius: 5px;
  }
  .testing .li_right {
    width: 98%;
    height: 100%;
    float: right;
    background: #FFFFFF;
    border-radius: 0 4px 4px 0;
    display: flex;
  }
  .testing li div span {
    font-size: 1.6rem;
    display: inline-flex;
    align-items: center;
  }
  .li_right span:nth-child(1) {
    margin-left: 5%;
    margin-right: 5%;
  }
  .li_right span:nth-child(2) {
    margin-right: auto;
  }
  .li_right span:nth-child(3) {
    margin-right: 5%;
    font-size: 1.3rem;
    color: #ccc;
  }
  .li_right span i{
    color: #FFFFFF;
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    text-align: center;
    line-height: 2.5rem
  }
  .testing li div img {
    width: 2.3rem;
    height: 2.3rem;
    align-items: center;
    display: inline-flex;
  }

</style>
