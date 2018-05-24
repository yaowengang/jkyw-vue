<template>
    <div>
      <top :title="title"></top>
      <ul class="basicInf_list">
        <li v-for="basicInftext in basicList" :class='basicInftext.mgclass'>
          <div>{{ basicInftext.name}}</div>
          <div>{{ basicInftext.text}}</div>
        </li>
      </ul>
    </div>
</template>
<style lang="less">
  .basicInf_list{ margin-top: 5.5rem;
    li {
      display: flex;
      width: 100%;
      height: 4.7rem;
      border-bottom: 1px solid #eae9e9;
      background: #FFFFFF;
      justify-content: space-between;
      align-items: center;
      padding: 2rem;
    }
    li div:nth-of-type(1) {
      font-size: 1.4rem;
      font-weight: 500;
      color: #252525;
    }
    li div:nth-of-type(2) {
      font-size: 1.2rem;
      color: #b4b4b4;
    }
  }
  .dividing {
    border-top: 1px solid #eae9e9;
    margin-top: 1rem;
  }

</style>
<script>
import Top from '../../top2.vue'
    export default{
     data (){
      return {
      title:'体格信息',
      basicList:[
       {name:'身高',text:'175cm',mgclass:'dividing'},
       {name:'体重',text:'63kg'},
       {name:'胸围',text:'102cm',mgclass:'dividing'},
       {name:'腰围',text:'70cm'},
       {name:'臀围',text:'82cm'},
       {name:'收缩压',text:'102mmHg',mgclass:'dividing'},
       {name:'舒张压',text:'104mmHg'},
       {name:'心率',text:'95次/分'},
       ]
         }
      },
   components: {
        Top
    }
    }
</script>
