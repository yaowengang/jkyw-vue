<template>
    <div>
      <top :title="title"></top>
      <div class="testing">
        <ul>
          <li class="bg_99d87a">
            <router-link to="/helthCenter/archiveslist/basic">
              <div class="li_right">
                <span><img src="/static/img/health_files_01.png"/></span>
                <span>基本信息</span>
                <span><img src="/static/img/arrow-right.png"/></span>
              </div>
            </router-link>
          </li>
          <li class="bg_4e9bea">
            <router-link to="/helthCenter/archiveslist/physique">
              <div class="li_right">
                <span><img src="/static/img/health_files_02.png"/></span>
                <span>体格信息</span>
                <span><img src="/static/img/arrow-right.png"/></span>
              </div>
            </router-link>
          </li>
          <li class="bg_19dcbe">
            <router-link to="/helthCenter/archiveslist/habitinf">
              <div class="li_right">
                <span><img src="/static/img/health_files_03.png"/></span>
                <span>生活习惯</span>
                <span><img src="/static/img/arrow-right.png"/></span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>
<style>
  body{
  background:#f6f6f6;
  }
  .testing{
	width: 94%;
	margin: 0 auto;
	margin-top:5.5rem
}
.testing li{
	margin-top: 1rem;
	width: 100%;
	height: 6rem;
	border-radius:5px;
}
.testing .li_right{
	width: 98%;
	height:100%;
	float: right;
	background: #FFFFFF;
	border-radius: 0 4px 4px 0;
	display: flex;
}
.testing li div img{
	width:2.3rem;
	height:2.3rem;
	align-items:center;
	display: inline-flex;
}
.testing li div span{
	font-size: 1.6rem;
	display: inline-flex;
	align-items:center;

}
.li_right span:nth-child(1){
	margin-left: 5%;
	margin-right: 5%;
}
.li_right span:nth-child(2){
	margin-right: auto;
}
.li_right span:nth-child(3){
	margin-right: 5%;
}
</style>
<script>
import Top from '../../commom/top2.vue'
    export default{
    data (){
      return {
       title:'健康档案'
      }
    },
     components: {
        Top
    }
    }
</script>
