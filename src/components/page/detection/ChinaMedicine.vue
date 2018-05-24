<template>
  <div class="head">
    <top :title="title"></top>
    <div class="answer-container">
      <h3 class="answer-tips">
        共
        <span class="tips-number">{{length}}</span>题 &nbsp;
        <span class="tip">{{tipNum+1}}</span>/
        <span class="tips-number">{{length}}</span>
      </h3>
        <p class="list-title">
          <span class="tip">{{tipNum+1}}</span>.
          <span class="tip-title">{{questionContent}}</span>
        </p>
        <ul class="content-list" id="content-ul">
          <li v-for="(optList,index) in optionList" @click="selection(index)" :class="{ active: isActive==index }" :key="optList.id">
            <label>{{optList.optionContent}}</label>
            <input type="radio" name="answer">
            <i></i>
          </li>
        </ul>
    </div>
    <div class="btn">
      <div v-if="tipNum<length-1">
      <button type="button" class="next" @click="nextquest(selectionid,isActive)">下一题</button>
      </div>
      <div v-else>
      <button type="button" class="next" @click="subquest(selectionid,isActive)">提交</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import top from '../../commom/top2.vue'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      title: "全面检测",
      questionkList: [],
      optionList: [],
      selectionArry:[],
      selectionid:-1,
      isActive:-1,
      questionContent:'',
      tipNum: 0,
      questid:'',
      length:''
    }
  },
  props: [],
  computed: {
  ...mapGetters(['getquestionkList','stateCode'])
  },
  created() {
    this.$store.dispatch('getquestionkListApi');
  },
  mounted () {
    this.DataTransfer(this.tipNum)
  },  
  methods:{
      nextquest(selectionid,isActive){
        if(selectionid>=0 && isActive>=0){
        this.tipNum++;
        this.isActive = -1;
        this.DataTransfer(this.tipNum)
        this.selectionArry.push(selectionid);
        console.log(this.selectionArry)
        }else{
         console.log(111)
        }
      },
      add:function(params) {
        this.count+=params
      },
      subquest:function(selectionid,isActive){
        let _this =this
        let optionId;
        if(selectionid>=0 && isActive>=0){
        this.selectionArry.push(selectionid);
        optionId = JSON.stringify(this.selectionArry);
        this.$store.dispatch('optionId',optionId)
        this.$store.dispatch('getsubquestApi')
        
        setTimeout(function() {
//          console.log(_this.stateCode)
          let thstateCode = _this.stateCode
          if(thstateCode == '001'){
            _this.$router.push('/presentState') 
          }
          
        }, 1000);
        // if(true){
        //   this.$router.push('/presentState')
        // }else{

        // }
        }

      },
      selection:function(num){
      this.isActive = num ;
      let _this=this;
      let optionarry = [];
      optionarry = _this.getquestionkList[this.tipNum].optionList;
      _this.selectionid=optionarry[num].id
      },
      DataTransfer:function(num){
        let _this = this
        setTimeout(function() {
         // console.log(_this.getquestionkList)
          //console.log(typeof num)
          _this.length = _this.getquestionkList.length
          _this.questionContent = _this.getquestionkList[num].questionContent
          _this.optionList = _this.getquestionkList[num].optionList
         // console.log(_this.questionContent)          
        }, 100);

      }
  },
  components: {
    top
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '/static/css/reset.css';
body {
  background: #f6f6f6 !important;
}

.answer-container {
  width: 100%;
  background: #f6f6f6;
  margin-top: 4.5rem;
}

.answer-container .answer-tips {
  background: #ffffff;
  text-align: right;
  padding: 1rem 1rem 0;
  color: #949494;
  font-size: 1.1rem;
}

.answer-container .answer-tips .tip {
  color: #03a9f4;
}

.answer-container .list-title {
  padding: 1rem 2rem 2rem;
  font-size: 1.5rem;
  background: #ffffff;
  margin: 0 0 0.5rem 0;
  border-bottom: solid 1px #e8e7e7;
  color: #333333;
}

.answer-container .content-list {
  overflow: hidden;
  background: #ffffff;
  border-top: solid 1px #e8e7e7;
}

.answer-container .content-list li {
  border-bottom: solid 1px #efeeee;
  padding: 1.7rem 1.9rem 1.7rem 2.5rem;
  font-size: 1.3rem;
  color: #262626;
}

.answer-container .content-list li input {
  display: none;
}

.btn {
  width: 80%;
  margin-left: 10%;
}

.btn button {
  width: 100%;
  background: #03a9f4;
  color: #ffffff;
  font-size: 1.5rem;
  text-align: center;
  padding: 1.2rem 0;
  border-radius: 4%;
  margin: 5rem 0;
}

.answer-container .content-list li.active i {
  width: 1.9rem;
  height: 1.4rem;
  background: url(../../../../static/img/duigou.png) 0 0 no-repeat;
  -webkit-background-size: 100% 100%;
  background-size: 100% 100%;
  float: right;
  margin-top: 0.2rem;
}
</style>
