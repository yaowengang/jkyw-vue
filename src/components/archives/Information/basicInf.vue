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
       title:'基本信息',
       basicList:[
       {name:'姓名',text:'张鹏',mgclass:'dividing'},
       {name:'手机号',text:'18710101222'},
       {name:'性别',text:'男',mgclass:'dividing'},
       {name:'出生日期',text:'1991.10.15'},
       {name:'所患疾病',text:'急性阑尾炎'},
       {name:'紧急联系人',text:'徐红',mgclass:'dividing'},
       {name:'紧急联系电话',text:'13055556666'},
       {name:'家庭住址',text:'菲律宾'},
       ]
      }
    },
     components: {
        Top
    }
    }
</script>
