<template>
  <div>
    <header>
      <a href="javascript:history.go(-1)"><i class="iconfont icon icon-fanhui1"></i></a>
      <h1>病例详情</h1>
      <!--<router-link to="" class="save">保存</router-link>-->
    </header>
    <div class="details-container">
             <div class="box-title">
               <input type="text" placeholder="输入病例名称" v-model="medicalRecord.name" :value="medicalRecord.name"/>
             </div>
             <div class="details-content">
                <div class="details-text">
                  <h4>症状描述</h4>
                  <textarea type="text" placeholder="输入症状描述" v-model="medicalRecord.symptom" :value="medicalRecord.symptom"></textarea>
                </div>
             </div>

      <div class="details-content">
        <div class="details-text">
          <h4>病例</h4>
          <upimg class="upimg" :imgUrls="imgUrls"></upimg>
        </div>
      </div>
      <button class="VerBtn" @click="sub">完成</button>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import upimg from '@/components/commom/UploadImg.vue';
  export default {
    data() {
      return {
        imgUrls: [],
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        medicalRecord:[],
        subtype:'',
        xss:['aaa111.jpg','aaa222.jpg','aaa333.jpg'],
      }
    },
    mounted(){
      mui('body').on('tap','a',function(){document.location.href=this.href;});
    },
    created() {
      if(this.$route.params.id != 0){
        this.subtype = 1,
        this.$http.post("/healthFront/out/healthCenter/findMedicalRecordId.do",this.Qs.stringify({
            id:this.$route.params.id
          })
        ).then((res) => {
          this.medicalRecord = res.data.medicalRecord;
          for(var i = 0; i<=this.imgUrls.length; i++ ){
            this.imgUrls.push(res.data.medicalRecord.imageList[i].imgName)
          }
          //var sw = JSON.stringify(this.imgUrls);
        });
      } else {
        this.subtype = 0
      }

    },
    components:{
      upimg
    },
    methods:{
      sub:function () {
        /*console.log(this.medicalRecord.name)
        console.log(this.medicalRecord.symptom)
        console.log(this.imgUrls)*/
        for(var i = 0 ; i < this.imgUrls.length; i++){
          this.imgUrls[i]= this.imgUrls[i].replace('data:image/jpeg;base64,','')
        }
        let imgUrlString = JSON.stringify(this.imgUrls);
        console.log(imgUrlString)
        console.log('提交类型'+this.subtype)
       this.$http.post("/healthFront/out/healthCenter/setMedicalRecords.do",this.Qs.stringify({
            id:this.$route.params.id,
            memberId:this.user.memberId,
            type:this.subtype,
            name:this.medicalRecord.name,
            symptom:this.medicalRecord.symptom,
         imageList:imgUrlString
          })
        )
          .then((res) =>{
              alert('修改成功');
              if(this.subtype == 0){
                this.$router.push({path:'/helthCenter/casemanagement'})
              } else {
                this.$router.push({path:'/helthCenter/casemanagement/open/'+ this.$route.params.id})
              }
          } )
          .catch((error)=>{
            alert('修改失败')
          })

      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  body{ background-color: #fff}
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
  .details-container{
    margin-top: 4.5rem;
    padding-top: 1.2rem;
    input{ margin-bottom: 0; border-radius:0; border: none; border-bottom: solid 1px rgba(0,0,0,.2); font-size: 1.2rem}
    .box-title{
      width: 95%;
      margin: 1.5rem auto 0 auto;
      margin-top: 0;
      font-size: 1.4rem;
      padding: 1.2rem;
      background: #fff;
      border-radius: 2%;

      span{
        font-size: 1.3rem;
        float: right;
      }
    }
    .details-content{
      width: 95%;
      height: auto;
      border-radius: 2%;
      margin: 1.5rem auto 0 auto;
      padding: 1.2rem;
      overflow: hidden;
      background: #FFFFFF;
      display: flex;
      justify-content: space-between;
      i{
        padding: 0.2rem;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        text-align: center;
        background: #03a9f4;
        font-size: 1rem;
        margin-right: 1.2rem;
        border-radius:1rem;
        color: #fff;
      }
      .details-text{
        width: 100%;
        margin-top: 0.1rem;
        h4{
          font-size: 1.4rem;
          margin-bottom: 1.6rem;
        }
        p{
          font-size: 1.2rem;
          color: #464646;
          line-height: 1.9rem;
        }
      }
    }
    .upimg{ height:auto; overflow: hidden; padding-left: 2.5rem}
    .VerBtn{
      width: 60%;
      background: #1696e5;
      color: #FFFFFF;
      padding: 1rem 0;
      margin: 5.5rem auto;
      display: block;
      text-align: center;
      border-radius: 3rem;
      font-size: 1.4rem;
    }
  }
</style>
