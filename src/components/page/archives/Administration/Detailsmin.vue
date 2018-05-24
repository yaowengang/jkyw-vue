<template>
  <div>
    <top :title="title"></top>
    <div class="details-wrap">
      <h3 class="dedails-title">
        665656
        <span>90天</span>
      </h3>
      <div class="details-main clear">

        M1血糖监测的意义：胰岛素抵抗与高血压互为因果，是高血压的独立危险因素， 反之高血压也可以影响胰岛素的代谢，造成胰岛素抵抗。而胰岛素抵抗又是糖尿病的发病基础。 据研究表明，多年血压不稳定或高血压患者发生糖尿病的概率已达到40%左右。 血糖的监测可以及时发现高血压患者的血糖变化，及时治疗干预，降低并控制血糖受损和糖尿病的发生。 M1血糖监测的意义：胰岛素抵抗与高血压互为因果，是高血压的独立危险因素， 反之高血压也可以影响胰岛素的代谢，造成胰岛素抵抗。而胰岛素抵抗又是糖尿病的发病基础。 据研究表明，多年血压不稳定或高血压患者发生糖尿病的概率已达到40%左右。 血糖的监测可以及时发现高血压患者的血糖变化，及时治疗干预，降低并控制血糖受损和糖尿病的发生。

      </div>
    </div>
  </div>
</template>
<style lang="less">
  .details-wrap{
    margin-top: 5.5rem;
    .dedails-title{
      width: 94%;
      margin-left: 3%;
      margin-top: 1rem;
      padding: 1.6rem 0.5rem;
      font-size: 1.6rem;
      color: #4f4f4f;
      span{
        float: right;
        background: #03a9f4;
        color: #ffffff;
        -webkit-border-radius: 3rem;
        -moz-border-radius: 3rem;
        -ms-border-radius: 3rem;
        -o-border-radius: 3rem;
        border-radius: 3rem;
        padding: 0.3em 1.2rem;
        font-size: 1.1rem;
      }
    }
    .details-main{
      width: 94%;
      margin: 0 3% 3rem 3%;
      background: #ffffff;
      padding: 2.5rem 2rem;
      font-size: 1.3rem;
      line-height: 2.6rem;
      color: #464646;
      letter-spacing: 0.25rem;
    }
  }
</style>
<script>
  import Top from '../../../commom/top2.vue'
  export default{
    data (){
      return {
        title:'计划详情'
      }
    },
    mounted(){
      console.log(this.adminList.length)
    },
    components: {
      Top
    }
  }
</script>
