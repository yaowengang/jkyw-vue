<template>
    <div class="programme">
      <Top :title="title"></Top>
      <div class="box" v-if="proList.length<=0">
        <div class="scheme_null">
          <img src="/static/img/scheme_null.png">
        </div>
        <p class="scheme_null_text">没有更多推荐方案了</p>
      </div>
      <div class="box" v-if="proList.length>0">
        <div class="Finished_con">
          <ul class="Finished_con_ul">
            <li class="Finished_con_li" v-for="(item,index) in proList">
              <img :src="item.picurl" alt="">
              <div class="Finished_con_text">
                <a href="">
                  <h4>{{item.name}}</h4>
                  <p>{{item.content}}</p>
                </a>
                <div class="add-btn" @click="addScheme(item.id)">加入</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Top from '../../commom/top2.vue'
export default {
    data() {
        return {
          title:'方案列表',
          proList:[]
        }
    },
    components: {
      Top
    },
    created () {
      this.$http.post("/healthFront/out/index/schemeList.do", this.Qs.stringify({
          memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId
      })
      ).then((res) => {
        if(res.data.stateCode == "001"){
          for(var i=0;i<res.data.schemeInfos.length;i++){
            this.proList.push(res.data.schemeInfos[i])
          }
        }
      })
    },

    mounted() {

    },
    methods:{
      addScheme(id){
        var btnArray = ['取消', '确认'];
        mui.confirm('提示',"确定添加该方案",btnArray,function (e) {
          if(e.index == 1){

          }
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  body{
    background: #ffffff !important;
  }
  .box{
    margin-top: 4.5rem;
  }
  .scheme_null{
    width: 90%;
    margin-left:5%;
  }
  .scheme_null img {
    width: 100%;
    margin:0 auto;
  }
  .scheme_null_text {
    text-align: center;
    font-size: 1.4rem;
    color: #8f8f94;
  }
  .Finished_con {
    padding-left: 1.6rem;
  }
  .Finished_con ul {
    position: relative;
    top: 0;
  }
  .Finished_con_li {
    height: auto;
    overflow: hidden;
    padding: 1.4rem 0 1.4rem 0;
    border-top: solid 1px #eeeeee;
    position: relative;
  }
  .Finished_con_li img {
    width: 4.4rem;
    height: 4.4rem;
    float: left;
  }
  .Finished_con_text {
    width: 17.5rem;
    float: left;
    height: 4.4rem;
    margin-left: 1rem;
  }
  .Finished_con a {
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .Finished_con_text h4 {
    font-size: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    font-weight: 500;
    margin-top: 0.4rem;
    margin-bottom: 1rem;
    color: #4f4f4f;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .Finished_con_text p {
    font-size: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-weight: 100;
    color: #bbbbbb;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .add-btn {
    position: absolute;
    width: 16%;
    border: solid 1px #03a9f4;
    text-align: center;
    padding: 0.3rem 0;
    right: 1.8rem;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    transform: translate(0, -50%);
    font-size: 1.2rem;
  }
</style>
