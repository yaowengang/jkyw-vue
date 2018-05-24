<template>
  <div class="shouye view">
    <top :title="title"></top>
    <!-- 轮播 -->
    <div class="slider">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in bannerList" :key="index">
             <img :src="item.cover" class="banner-item" alt="" @click="infoDetail(item.consultId)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="functional_area">
      <div class="border_F6F6F6_right fun_area_left">
        <router-link to="/detectionIndex">
          <!--<Canvass :detectionScore="score"></Canvass>-->
          <div id="canvas-box">
            <canvas id="canvas"></canvas>
          </div>
        </router-link>
        <a href="#">亚健康</a>
      </div>
      <div class="fun_right">
        <div class="fun_right_top">
          <div class="fun_con_right"><img src="../../static/img/index_03-04.png"></div>
          <router-link to="/preventionIndex"><span>预防宝典</span></router-link>
        </div>
        <div class="fun_right_bottom">
          <div class="border_F6F6F6_right">
            <span><img src="../../static/img/index_03-03.png"></span>
            <router-link to="/InquiryIndex"><span>快速问诊</span></router-link>
          </div>
          <div>
            <span><img src="../../static/img/index_03-05.png"></span>
            <router-link to="/detectionIndex"><span>快速检测</span></router-link>
          </div>
        </div>
      </div>
    </div>
    <rowbar :rowTitle="rt1" :url="url1"></rowbar>
    <div class="target_today">
      <div class="target_today_boder">
        <!--用户方案-->
        <div class="target_today_box" v-for="(item, index) in userTargetList" :class="'borde_'+index">
          <div class="title" :class="'bg_'+index">
            {{ item.name | cutTxt }}
          </div>
          <div class="date">{{ item.singleTime }}</div>
          <div class="unit" :class="'color_'+index">MIUNTES</div>
          <div class="done_bt" :class="'bg_'+index" @click="userTargetDetail(item.id)">{{ item.schemeText }}</div>
        </div>
        <!--方案-->
        <div class="target_today_box" v-for="(item, index) in TargetList"
             :class="'borde_'+(index+userTargetList.length)">
          <div class="title" :class="'bg_'+(index+userTargetList.length)">
            {{ item.name | cutTxt }}
          </div>
          <div class="date">{{ item.singleTime }}</div>
          <div class="unit" :class="'color_'+(index+userTargetList.length)">MIUNTES</div>
          <div class="done_bt" :class="'bg_'+(index+userTargetList.length)" @click="targetDetail(item.id)">{{
            item.schemeText }}
          </div>
        </div>
      </div>
      <div class="addplan">
        <router-link to="/addProject">
          <img src="../../static/img/index_20.png">添加方案
        </router-link>
      </div>
    </div>
    <rowbar :rowTitle="rt2" :url="url2"></rowbar>
    <div class="health_infor">
      <div v-for="item in InfoList">
        <router-link :to="{ path:'infoDetails', query:{id:item.consultId} }">
          <div class="infor_img">
            <img :src="item.cover">
          </div>
          <div class="infor_con">
            <p class="title">{{ item.title }}</p>
            <p class="introduction" v-html="cutTxt(item.content)"></p>
          </div>
        </router-link>
      </div>
    </div>
    <Bottom></Bottom>
  </div>
</template>
<script type="text/ecmascript-6">
  import Top from './commom/top.vue'
  import Bottom from '@/components/Bottom.vue'
  import Canvass from './page/index/canvass.vue'
  import rowbar from './page/goods/rowBar.vue'
  import targetToday from './page/index/targetToday.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    data() {
      return {
        title: '首页',
        rt1: '今日目标',
        rt2: '健康资讯',
        swiperOption: {
          pagination: 'swiper-pagination',
          paginationClickable: true
        },
        InfoList: [], //健康资讯
        userTargetList: [],//用户方案
        TargetList: [],  //方案
        bannerList: [], //轮播图
        url1: '/projectManage',
        url2: '/informationList',
        score: 75 //检测分数
      }
    },
    components: {
      Top,
      /*Canvass,*/
      rowbar,
      swiper,
      swiperSlide,
      Bottom
    },
    created() {
      //console.log(JSON.parse(localStorage.getItem('loginStatus')));
      this.$http.post("/healthFront/out/index/indexShow.do", this.Qs.stringify({
          memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId
        })
      ).then((res) => {
        console.log(res.data)
        if (res.data.stateCode == "001") {
          this.score = res.data.score;
          console.log(this.score);
          /*今日目标下的用户方案*/
          if(res.data.schemeMemberVos){
            for (var i = 0; i < res.data.schemeMemberVos.length; i++) {
              if (res.data.schemeMemberVos[i].isFinshed == 0) {
                res.data.schemeMemberVos[i].schemeText = '去完成';
              } else if (res.data.schemeMemberVos[i].isFinshed == 1) {
                res.data.schemeMemberVos[i].schemeText = '已完成';
              }
              this.userTargetList.push(res.data.schemeMemberVos[i]);
            }
          }

          /*方案*/
          if (res.data.schemeInfos) {
            for (var i = 0; i < res.data.schemeInfos.length; i++) {
              res.data.schemeInfos[i].schemeText = "去加入";
              this.TargetList.push(res.data.schemeInfos[i]);
            }
          }
          /*健康咨询*/
          for (var i = 0; i < res.data.consults.length; i++) {
            this.InfoList.push(res.data.consults[i]);
          }
          /*轮播图*/
          for (var i = 0; i < res.data.stickConsults.length; i++) {
            this.bannerList.push(res.data.stickConsults[i]);
          }
        }
      });
    },
    methods: {
      userTargetDetail(id) {
        this.$router.push({
          path: '/userProgramme',
          query: {id: id}
        })
      },
      targetDetail(id) {
        this.$router.push({
          path: '/programme',
          query: {id: id}
        })
      },
      cutTxt(txt){
        if (!txt) return '';
        if (txt.length > 16) {
          return txt.substr(0, 16) + "..."
        } else {
          return txt
        }
      },
      infoDetail(id){
        this.$router.push({
          path: 'infoDetails',
          query: {
            id: id
          }
        })
      }
    },
    filters: {
      cutTxt(val) {
        if (!val) return '';
        if (val.length > 6) {
          return val.substr(0, 6) + "..."
        } else {
          return val
        }
        //return val.length
      }
    },
    mounted() {
      this.canvas(this.score);
      var _this = this;
      setTimeout(function () {
        _this.canvas(_this.score);
      }, 300)
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .view {
    padding-bottom: 4.5rem;
  }
  .slider {
    margin-top: 4.5rem;
    overflow: hidden;
  }
  .slider .banner-box{
    height:100%;
  }
  .swiper-slide {
    height: 18rem;
  }

  .swiper-slide img {
    width: 100%;
    height: 100%;
  }

  .functional_area {
    height: 15rem;
    width: 100%;
    background: #FFFFFF;
  }

  .functional_area > div {
    width: 50%;
    height: 100%;
    float: left;
  }

  .fun_area_left {
    text-align: center;
    font-size: 1.5rem;
  }

  .border_F6F6F6_right {
    border-right: 1px solid #F6F6F6;
  }

  #canvas-box {
    margin: 12% 0 0 0%;
  }

  .fun_right_top {
    height: 50%;
    width: 100%;
    padding: 2.4rem 3.1rem;
    line-height: 2.7rem;
    border-bottom: 1px solid #F6F6F6;
  }

  .fun_right_bottom {
    display: flex;
    align-items: center;
  }

  .fun_con_right {
    display: inline-block;
    height: 100%;
  }

  .fun_con_right img {
    height: 100%;
  }

  .fun_right_bottom > div {
    width: 100%;
    padding: 1rem 1rem;
    text-align: center;
  }

  .fun_right_bottom span {
    float: none;
    height: 3rem;
    display: inline-block;
  }

  .fun_right_bottom span img {
    height: 60%;
  }

  /* 今日目标下方css */
  .target_today {
    height: 20rem;
    background: #FFFFFF;
  }

  .target_today_boder {
    padding: 2rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  /* 添加方案样式 */
  .addplan {
    margin: auto;
    width: 7rem;
    height: 1.6rem;
    border-left: 1px solid #c0d5de;
    border-right: 1px solid #c0d5de;
    font-size: 1.1rem;
    color: #8b8b8b;
    margin-bottom: 8rem;
  }

  .addplan img {
    display: inline-block;
    width: 1.6rem;
    margin: auto .3rem;
  }

  /* 健康资讯下方样式 */
  .health_infor {
    width: 100%;
    background: #FFFFFF;
  }

  .health_infor > div {
    height: 10.5rem;
    padding: 1.6rem 1.8rem;
    border-bottom: 1px solid #F6F6F6;
  }

  .infor_img {
    width: 28%;
    height: 100%;
    float: left;
    overflow: hidden;
    position: relative;
  }

  .infor_con {
    width: 70%;
    height: 100%;
    float: right;
  }

  .infor_img img {
    width: 100%;
  }

  .infor_con .title {
    font-size: 1.4rem;
    font-weight: 900;
  }

  .infor_con .introduction {
    font-size: 1.1rem;
    color: #b2b2b2;
    line-height: 1.5;
    padding: 0.8rem 0 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /*今日目标样式*/
  .borde_0 {
    border: 1px solid #93e4e7;
  }

  .borde_1 {
    border: 1px solid #9ff1d3;
  }

  .borde_2 {
    border: 1px solid #95d4fc;
  }

  .target_today_box {
    width: 9rem;
    height: auto;
    text-align: center;
  }

  .target_today_box .title {
    font-size: 1.3rem;
    line-height: 2.5rem;
    color: #574d46;
  }

  .bg_0 {
    background: #93e4e7;
  }

  .bg_1 {
    background: #9ff1d3;
  }

  .bg_2 {
    background: #95d4fc;
  }

  .target_today_box .date {
    font-size: 1.8rem;
    margin-top: 1.2rem;
    color: #313030;
  }

  .target_today_box .unit {
    font-size: 1rem;
    margin-top: .5rem;
  }

  .color_0 {
    color: #93e4e7;
  }

  .color_1 {
    color: #9ff1d3;
  }

  .color_2 {
    color: #95d4fc;
  }

  .target_today > div a {
    color: #03A9F4;
  }

  .target_today_box .done_bt {
    line-height: 2rem;
    width: 6.5rem;
    margin: 1.5rem auto .9rem;
    font-size: 1.1rem;
    color: #483d30;
    border-radius: 30px;
  }
</style>
