<template>
    <div class="programme">
      <top :title="title"></top>
      <div class="Programme_con">
        <div class="list">
          <h2><i class="icon iconfont icon-layers"></i>{{ presentProgramme.name }} <span>积分：{{ presentProgramme.score }}</span> </h2>
          <p>{{ presentProgramme.schemeContent }}</p>
        </div>

        <div class="list">
          <h2><i class="icon iconfont icon-shezhiicon-"></i>执行周期 </h2>
          <p>{{ presentProgramme.cycle }}天为一个周期</p>
        </div>

        <div class="start_btn">
          <button class="Go_finish" @click="addScheme">加入该方案</button>
        </div>
      </div>

    </div>
</template>
<script type="text/ecmascript-6">
import top from '../../commom/top2.vue'
export default {
    data() {
        return {
          title:'方案详情',
          presentProgramme:{}
        }
    },
    components: {
        top
    },
    created () {
      console.log(this.$route.query.id);
     this.$http.post("/healthFront/out/index/schemeMemberInfo.do", this.Qs.stringify({
         schemeMemberId:this.$route.query.id
     })
     ).then((res) => {
       console.log(res.data);
        if (res.data.stateCode == "001"){
          this.presentProgramme=res.data.schemeMember;
          console.log(this.presentProgramme);
        }else{
          alert(res.data.message);
        }
     })
    },
    mounted() {
      //require("../../../libs/js/programme.js");
    },
    methods:{
      addScheme () {
        this.$http.post("/healthFront/out/index/addScheme.do", this.Qs.stringify({
          schemeId: this.$route.query.id,
          memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId
        }));
        this.$router.push({
          path:'/projectManage'
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .icon-layers{
    font-size:1.9rem !important;
  }
  .run_time {
    display: block;
    width: 20rem;
    height: 3.5rem;
    line-height: 3.5rem;
    text-align: center;
    color: #1696e5;
    margin: 0 auto;
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }
  body{
    background: #ffffff !important;
    padding-bottom: 4.9rem;
    margin: 0;
  }
  .Programme_con {
    height: auto;
    padding: 2rem;
    border-top: solid 1rem #f5f5f5;
    margin-top: 4.5rem;
  }
  .Programme_con .list {
    height: auto;
    margin-bottom: 2rem;
  }
  .Programme_con h2 {
    height: 1.4rem;
    line-height: 1.4rem;
    font-weight: 500;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  .Programme_con h2 i{
    display: inline-block;
    font-size: 1.6rem;
    vertical-align: middle;
    color: #1696e5;
    margin-right: 0.8rem;
  }
  /*.Programme_con h2 img {
    width: 1.4rem;
    margin-right: 1rem;
    float: left;
  }*/
  .Programme_con h2 span {
    float: right;
    font-size: 1.2rem;
    color: #ff9b0d;
  }
  .Programme_con p {
    line-height: 2.4rem;
    font-size: 1.2rem;
    color: #4f4f4f;
    padding-left: 2.4rem;
  }
  .Percentage {
    margin-left: 2.6rem;
    width: 91%;
    height: 1.5rem;
    border: solid 1px red;
    margin-top: 1.6rem;
    border-radius: 1.5rem;
    overflow: hidden;
    transition: all 1.6s;
  }
  .green {
    border: solid 1px #3ad70f;
  }
  .green .Percentage_num {
    background: #3ad70f;
  }
  .Percentage_num {
    height: 1.5rem;
    border-radius: 1.5rem;
    color: #fff;
    text-align: center;
    font-size: 1rem;
    font-weight: 100;
    line-height: 1.5rem;
    transition: all 1.6s;
  }
  .start_btn {
    width: 100%;
    height: auto;
  }
  .start_btn button {
    display: block;
    width: 20rem;
    height: 3.5rem;
    margin: 0 auto;
    background: #1696e5;
    border: solid 1px #1696e5;
    font-size: 1.3rem;
    color: #fff;
    margin-bottom: 2rem;
    border-radius: 3.5rem;
  }

</style>
