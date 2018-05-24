<template>
  <div>
    <header>
      <a href="javascript:history.go(-1)"><i class="iconfont icon icon-fanhui1"></i></a>
      <h1>病例详情</h1>
      <!--<router-link to="" class="save">保存</router-link>-->
    </header>
    <div class="case">
      <div class="content">
        <h4 class="name">
          名称：
        </h4>
        <p>{{ medicalRecord.name }}</p>
        <h4 class="name">症状：</h4>
        <p>{{ medicalRecord.symptom }}</p>
        <h4 class="name">病例：</h4>
        <span class="bl-tu" v-for="imglist in medicalRecord.imageList">
          <img :src="imglist.imgName"  data-preview-src="" data-preview-group="1"  alt="">
        </span>
      </div>
      <div class="btn">
        <router-link :to="'/helthCenter/casemanagement/edit/'+ medicalRecord.id ">修改</router-link>
        <span @click="del">删除</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import upimg from '@/components/commom/UploadImg.vue';
  import "@/libs/js/mui.zoom";
  import "@/libs/js/mui.previewimage"
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        medicalRecord:''
      }
    },
    mounted(){
      mui('body').on('tap','a',function(){document.location.href=this.href;});
      mui.previewImage();
    },
    created() {
      this.$http.post("/healthFront/out/healthCenter/findMedicalRecordId.do",this.Qs.stringify({
          id:this.$route.params.id
        })
      ).then((res) => {
        this.medicalRecord = res.data.medicalRecord;
        var sw = JSON.stringify(this.medicalRecord);
       // console.log(this.medicalRecord);
        console.log(sw);

      });
    },
    methods:{
      del:function () {
        this.$http.post("/healthFront/out/healthCenter/deleteMedicalRecords.do",this.Qs.stringify({
            id:this.$route.params.id
          })
        )
          .then((res) =>{
          alert('删除成功');
          this.$router.push({path:'/helthCenter/casemanagement'})
        } )
          .catch((error)=>{
            alert('删除失败')
          })
      }
    },
    components:{
      upimg
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '/static/css/mui.min.css';
  @import '/static/css/case-manage.css';
  header {
    max-width: 640px;
    min-width: 320px;
    height: 4.5rem;
    margin: auto;
    background: #FFFFFF;
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    a {
      text-decoration: none;
      color: #007aff;
      i {
        width: 2rem;
        height: 2rem;
        display: inline-block;
        margin-top: 1.5rem;
        &:nth-of-type(1) {
          margin-left: 1.4rem;
        }
      }
    }
    h1 {
      right: 4.5rem;
      left: 4.5rem;
      letter-spacing: 0.3rem;
      font-size: 1.8rem;
      font-weight: 500;
      position: absolute;
      color: #4f4f4f;
      line-height: 4.5rem;
      text-align: center;
      display: inline-block;
      overflow: hidden;
      width: auto;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .save{ float: right; margin-top: 1.5rem; margin-right: 1.5rem; font-size: 1.4rem}
  }
  .case{
    margin-top: 5rem;
    .content{
      padding: 2rem;
     .name{
        font-size: 1.4rem;
      }
      p{
        font-size: 1.2rem;
        color: #4f4f4f;
        margin-top: 0.8rem;
        word-wrap: break-word;
        background: #fff;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .bl-tu{
        width: 100%;
        height: 15rem;
        overflow: hidden;
        margin-top: 1rem;
        display: inline-block;
        background-size: 100% !important;
        img{
           width: 100%;
        }
      }
    }
    .btn{
      width: 100%;
      margin: 1rem 0 0.8rem 0;
      a, span{
        display:inline-block;
        width: 31%;
        font-size: 1.3rem;
        text-align: center;
        padding: 0.9rem 0;
        background: #1696e5;
        color: #fff;
        margin-left: 12%;
        -webkit-border-radius: 2rem;
        -moz-border-radius: 2rem;
        border-radius: 2rem;
      }
    }
  }
</style>
