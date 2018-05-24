<template>
    <div class="head">
      <top :title="title"></top>

      <div class="slider">
        <swiper :options="swiperOption">
          <swiper-slide  v-for="(list, index) in bannerTop" :key="index">
            <router-link :to="'/perventDetails'+list.prebookId">
              <img :src="list.cover" class="banner-item" alt="">
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="community">
        <ul class="box-list">
          <li v-for="list in classlist">
           <router-link to="/PreventionList">
             {{ list.name}}
            </router-link>
          </li>

        </ul>
        <ul class="community-box">
          <li v-for="Article in stickConsultList">
            <div class="btname">
              <h5>{{ Article.title }}</h5>
              <p>来自：{{ Article.bookType.name }}</p>
            </div>
            <router-link :to="'/perventDetails'+Article.prebookId">
              <div class="list-content" v-html="Article.content"></div>
            </router-link>
            <div class="list-side">
              <span><i class="icon iconfont icon-fenxiang"></i> {{ Article.shareNum }}</span>
              <span><i class="icon iconfont icon-dianzan"></i> {{ Article.likeNum }}</span>
              <span><i class="icon iconfont icon-pinglun1"></i>{{ Article.commentNum }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../commom/top2.vue'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
      data() {
          return {
            title: "预防宝典",
            user:JSON.parse(localStorage.getItem('loginStatus')),
            stickConsultList:'',
            bannerTop:'',
            classlist:'',
            swiperOption: {
              pagination: 'swiper-pagination',
              paginationClickable: true
            },
          }
      },
      props: [

      ],
      components: {
        top,
        swiper,
        swiperSlide
      },
      mounted(){
        mui("#slider").slider({
          interval: 3000
        })
      },
    created() {
      this.$http.post("/healthFront/out/prevention/preventionIndex.do",this.Qs.stringify({
          memberId: this.user.memberId,
        currentPage:'1',
        showCount:'5'
        })
      ).then((res) => {
        this.bannerTop = res.data.prebookroots;
        this.stickConsultList = res.data.prebooks;
        this.classlist = res.data.BookTypes;
        this.containTitle =  res.data.prebooks.title;
         var sw = JSON.stringify(this.stickConsultList);
        //this.stickConsultList= this.stickConsultList[0].cover;
        console.log(this.stickConsultList)
      });
    },

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '/static/css/mui.min.css';
  @import '../../../../static/css/reset.css';
  .slider{
    margin-top:4.5rem;
  }
  .community {
    width: 100%;
    height: auto;
    margin-top:1rem;
  }

  .community .box-list {
    padding: 0 0.8rem;
    display: -webkit-flex;
    display: flex;
    margin-top: 1.3rem;
    a{
      display: block;
      padding: 1rem 0;
    }
  }
  .community .box-list li {
    flex: 1;
    color: #4f4f4f;
    font-size: 1.2rem;
    font-weight: 700;
    margin-left: 1.2rem;
    background: #ffffff;
    text-align: center;

    border-radius: 0.6rem;
  }
  .community .box-list li:first-child{
    margin: 0;
  }
  .community-box {
    padding: 0 0.8rem;
    .btname{
      height: auto; overflow: hidden;
      h5{ font-size: 1.2rem; color: #000; float: left; line-height: 1.6rem}
      p{
        float: right;
      }
    }
    li{
      margin-top: 1.3rem;
      background: #ffffff;
      width: 100%;
      height: auto;
      padding: 1.5rem;
      border-radius: 0.4rem;
      overflow: hidden;
      p{
        color: rgba(40, 40, 40, 0.5);
        font-size: 1rem;
        margin-top: 0.2rem;
      }
      .list-content{
        color: rgba(40, 40, 40, 0.8);
        width: 98%;
        margin-left: 0.3rem;
        line-height: 1.5rem;
        margin-top: 1rem;
        p{ height:auto; overflow: hidden;
         img{ margin: 1rem 0;max-width: 100%; display: block;
         }
        }
      }
      .list-side{
        width: 100%;
        margin-top: 1rem;
        float: right;
        display: flex;
        span{
          color: rgba(40, 40, 40, 0.5);
          font-size: 1rem;
          vertical-align: top;
          width: 100%;
          display: inline-block;
          i{
          }
        }
        span:nth-child(2){
          text-align: center;
        }
        span:nth-child(3){
          text-align: right;
        }
      }
    }
  }
.swiper-container-horizontal{ height:auto}
.swiper-slide img{ width: 100%}
</style>
