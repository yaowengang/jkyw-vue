<template>
  <div class="quickly-main">
    <h3 @click="areaResult">请选择地区</h3>
    <VDistpicker @selected="onselected" hide-area></VDistpicker>
    <h3 class="departments-title">请选择科室</h3>
    <div class="choose-departments select_box">
      <span>科室</span>
      <select class="field" data-first-title="请选择" name="fieldId">
        <option value="请选择">请选择</option>
        <option :value="items.field_id" v-for="items in quickInquiryArr" :key="items.id">{{items.type}}</option>
      </select>
      <i class="fa fa-chevron-right"></i>
    </div>
    <button type="submit" class="affirm-btn" @click="onSubmit()">确认</button>
  </div>
</template>
<script type="text/ecmascript-6">
//import vueArea from 'vue-area'
import VDistpicker from 'v-distpicker'
import { mapGetters } from 'vuex';

/*省市县联动插件*/
export default {
  data() {
    return {
      cityValue: [],
      quickInquiryArr: [],
      result: null,
      show: false
    }
  },
  components: {
    VDistpicker
  },
  computed: {
    ...mapGetters(['quickInquiry', 'stateCode'])
  },
  created() {
    let pp = new Promise(rs => rs(this.$store.dispatch('getQuickInquiryApi')))
    pp.then(() => {
      this.quickInquiryArr = this.quickInquiry
 //     console.log(this.quickInquiryArr)
    })
  },
  methods: {
    areaResult: function(show, result){
        this.show = show
        this.result = result
        console.log(result)
    },    
    onSubmit() {
      let AllCtiyvlue = this.cityValue;

      if (AllCtiyvlue.province == undefined || AllCtiyvlue.city == undefined) {
        alert("请将地区信息选择完成")
      } else {
        console.log(AllCtiyvlue.province.value + AllCtiyvlue.city.value)
        let fieldVlue = $('.field').val()
        if (fieldVlue != '请选择' && fieldVlue != '') {
          let shift_q = [];
          let _this = this
          shift_q.push(AllCtiyvlue.province.value);
          shift_q.push(AllCtiyvlue.city.value);
          shift_q.push(fieldVlue);
          shift_q = JSON.stringify(shift_q);
          _this.$store.dispatch('shift_q', shift_q)
          _this.$store.dispatch('expertInquiryApi')
          setTimeout(function () {
            //          console.log(_this.stateCode)
            let thstateCode = _this.stateCode
            if (thstateCode == '001') {
              _this.$router.push('/expertList')
            }

          }, 1000);
        } else {
          alert('请选择科室')
        }
      }
    },
    onselected(data) {
      console.log(data)
      this.cityValue = data
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '/static/css/reset.css';
body {
  background: #FFFFFF !important;
}

.quickly-main {
  padding: 2rem;
}

.quickly-main h3 {
  margin: 1rem 0 1rem;
  color: #4f4f4f;
  font-size: 1.4rem;
}

.select_box {
  font-size: 1.4rem;
  border-bottom: 1px solid #eeeeee;
  padding: 1rem 0;
  margin: 1.5rem 0;
}

.quickly-main #city_china_val div select {
  width: 80%;
  border: none;
  margin-left: 3%;
  overflow: hidden;
  -webkit-appearance: none;
  appearance: none;
  color: #655a5a;
}

.quickly-main #city_china_val div i {
  color: #cccccc;
  float: right;
}

.quickly-main .departments-title {
  margin: 2rem 0;
}

.quickly-main .choose-departments {
  font-size: 1.4rem;
}

.quickly-main .choose-departments select {
  width: 80%;
  border: none;
  margin-left: 3%;
  overflow: hidden;
  -webkit-appearance: none;
  appearance: none;
  color: #655a5a;
}

.choose-departments i {
  color: #cccccc;
  float: right;
}

.quickly-main .affirm-btn {
  width: 62%;
  margin: 3rem 0 3rem 19%;
  background: #1696e5;
  color: #FFFFFF;
  font-size: 1.4rem;
  padding: 1rem 0;
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  -ms-border-radius: 0.5rem;
  -o-border-radius: 0.5rem;
  border-radius: 0.5rem;
}
</style>
