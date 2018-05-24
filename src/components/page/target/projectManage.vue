<template>
  <div class="projectManage">
    <top :title="title"></top>
    <div class="contain">
      <div class="UnFinished" v-if="unManage.length>0">
        <h2>待完成方案</h2>
        <div class="Finished_con  page-cell">
            <mt-cell-swipe title="" v-for="(item, index) in unManage" :key="index" :right="[
              {
                content: '删除',style: { background: 'red', color: '#fff' },handler: () => mananeDel(index,0)
              }
              ]"><img :src="item.picurl">
              <div class="Finished_con_text" @click="goManage(item.id)">
                <h4>{{ item.name }}计划</h4>
                <p>{{item.schemeContent | cutTxt}}</p>
              </div>
            </mt-cell-swipe>
        </div>
      </div>
      <div class="TheFinished" v-if="theManage.length>0">
        <h2>已完成方案</h2>
        <div class="Finished_con">
          <mt-cell-swipe title="" v-for="(item, index) in theManage" :key="index" :right="[
              {
                content: '删除',style: { background: 'red', color: '#fff' },handler: () => mananeDel(index,1)
              }
              ]"><img :src="item.picurl">
            <div class="Finished_con_text" @click="goManage(item.id)">
              <h4>{{ item.name }}计划</h4>
              <p>{{item.schemeContent | cutTxt}}</p>
            </div>
          </mt-cell-swipe>
        </div>
      </div>
      <div class="TheFinished" v-if="recommendManage.length>0">
        <h2>推荐方案</h2>
        <div class="Finished_con">
          <mt-cell-swipe title="" v-for="(item, index) in recommendManage" :key="index" :right="[
              {
                content: '删除',style: { background: 'red', color: '#fff' },handler: () => mananeDel(index,2)
              }
              ]"><img :src="item.picurl">
            <div class="Finished_con_text" @click="gorecommendManage(item.id)">
              <h4>{{ item.name }}计划</h4>
              <p>{{item.schemeContent | cutTxt}}</p>
            </div>
          </mt-cell-swipe>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import top from '../../commom/top2.vue'
  import MtCellSwipe from "../../../../node_modules/mint-ui/packages/cell-swipe/src/cell-swipe.vue";
  export default {
    data() {
      return {
        title:'方案管理',
        unManage: [], //待完成
        theManage: [], //已完成
        recommendManage: [] //推荐方案
      }
    },
    components: {
      top,
      MtCellSwipe
    },
    created() {
      this.$http.post("/healthFront/out/index/schemeManage.do", this.Qs.stringify({
          memberId:JSON.parse(localStorage.getItem('loginStatus')).memberId
        })
      ).then((res) => {
        if (res.data.stateCode == "001"){
          if(res.data.schemeMembersTodayFinished){
            for(var i=0;i<res.data.schemeMembersTodayFinished.length;i++){
              this.theManage.push(res.data.schemeMembersTodayFinished[i]);
            }
          }
          if(res.data.schemeMembersTodayUnfinished){
            for(var i=0;i<res.data.schemeMembersTodayUnfinished.length;i++){
              this.unManage.push(res.data.schemeMembersTodayUnfinished[i]);
            }
          }
          if(res.data.schemeInfos){
            for(var i=0;i<res.data.schemeInfos.length;i++){
              this.recommendManage.push(res.data.schemeInfos[i]);
            }
          }
        }
      });
    },
    methods: {
      goManage(n){
        //console.log(id)
        this.$router.push({
          path: '/userProgramme',
          query: {id: n}
        })
      },
      gorecommendManage(n){
        this.$router.push({
          path: '/programme',
          query: {id: n}
        })
      },
      mananeDel(n,flag){
        this.$messagebox.confirm('确认删除该条记录?').then(action=>{
          if(flag ==0){
            this.$http.post("/healthFront/out/index/deleteScheme.do", this.Qs.stringify({
                schemeMemberId: this.unManage[n].id
              })
            ).then((res) => {
              if(res.data.stateCode == "001"){
                this.unManage.splice(n,1)
              }
            });
          }else if(flag ==1){
            this.$http.post("/healthFront/out/index/deleteScheme.do", this.Qs.stringify({
                schemeMemberId: this.theManage[n].id
              })
            ).then((res) => {
              if(res.data.stateCode == "001"){
                this.theManage.splice(n,1)
              }
            });
          }else{
            this.$http.post("/healthFront/out/index/deleteScheme.do", this.Qs.stringify({
                schemeMemberId: this.recommendManage[n].id
              })
            ).then((res) => {
              if(res.data.stateCode == "001"){
                this.recommendManage.splice(n,1)
              }
            });
          }

        }).catch(err => {
          if (err == 'cancel'){
           // alert(1)
          }
        })
      }
    },
    filters: {
      cutTxt(val) {
        if (!val) return '';
        if (val.length > 16) {
          return val.substr(0, 16) + "..."
        } else {
          return val
        }
        //return val.length
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../static/css/reset.css';
 /* .mint-cell-title {
    -webkit-box-flex: 0;
    -ms-flex: 1;
    flex: 0;
  }*/
  .mint-cell-swipe-button {
    align-items: center;
    display: flex;
  }
  .Finished_con .mint-cell{
    padding:1.4rem 0;
  }
  img{
  width: 4.4rem;
  height: 4.4rem;
  float: left;
}

  .projectManage .contain{
    margin-top:4.5rem;
  }
  .UnFinished, .TheFinished {
    height: auto;
  }
  .projectManage h2 {
    font-size: 1.4rem;
    color: #4f4f4f;
    background: #f5f5f5;
    font-weight: 500;
    padding: 1.4rem;
  }
  .Finished_con {
    padding-left: 1.6rem;
    background: #FFFFFF;
  }
  .Finished_con li:first-child {
    border: none;
  }
  .Finished_con li {
    height: auto;
    overflow: hidden;
    padding: 1.4rem 0 1.4rem 0;
    border-top: solid 1px #eeeeee;
  }
  .Finished_con li img {
    width: 4.4rem;
    height: 4.4rem;
    float: left;
  }
  .Finished_con_text {
    width: 24.5rem;
    float: right;
    height: 4.4rem;
  }
  .Finished_con_text h4 {
    font-size: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    font-weight: 500;
    margin-top: 0.4rem;
    margin-bottom: 1rem;
    color: #4f4f4f;
  }
  .Finished_con_text p {
    font-size: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-weight: 100;
    color: #bbbbbb;
  }

</style>
