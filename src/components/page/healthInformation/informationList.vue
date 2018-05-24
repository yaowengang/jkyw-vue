<template>
  <div class="programme">
    <Top :title="title"></Top>
    <div class="health">
      <ul class="content">
        <li v-for="(item, index) in infoArr" @click="goDetail(item.id)">
          <h4>{{item.name}}</h4>
          <p>{{item.synopsis}}</p>
          <div class="li-bot">
            <span><i class="font iconfont" :class="item.likeStatus == 0 ? 'icon-dianzan2' : 'icon-dianzan1'"></i>{{item.likeNum }}</span>
            <span><i class="font iconfont icon-fenxiang"></i>{{item.shareNum  }}</span>
            <span><i class="font iconfont icon-pinglun1"></i>{{item.commentNum  }}</span>
          </div>
        </li>

        <infinite-loading :on-infinite="getMessageData" ref="infiniteLoading">
          <span slot="no-more">
            没有更多数据
          </span>
        </infinite-loading>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Top from '../../commom/top2.vue'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    data() {
      return {
        title:'资讯列表',
        showNum:5,
        page: 1,
        infoArr: [],
        dataLength: 0
      }
    },
    components: {
      Top,
      InfiniteLoading
    },
    created () {
     //this.getMessageData()
    },
    mounted() {

    },
    methods:{
      getMessageData(){
        this.$http.post("/healthFront/out/index/getHealthInfo.do", this.Qs.stringify({
            memberId:JSON.parse(localStorage.getItem('loginStatus')).memberId,
            currentPage: this.page,
            showCount: this.showNum
          })
        ).then((res) => {
          if(res.data.consultList.length){
            this.infoArr = res.data.consultList;
            this.dataLength = res.data.total;

            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
            if(this.showNum > this.dataLength){
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }else{
              this.showNum += this.showNum
            }
          }else{
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        })
      },
      goDetail(id){
        this.$router.push({
          path: "infoDetails",
          query: {
            id: id
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  body{
    background: #ffffff !important;
  }
  .health{
    margin-top:4.5rem;
  }
  .health .content {
    overflow: hidden;
  }
  .health .content li {
    border-bottom: solid 1px #e4e4e4;
    padding: 1.5rem 1.1rem 0 1.1rem;
  }
  .health .content li h4 {
    font-size: 1.4rem;
  }
  .health .content li p {
    font-size: 1.2rem;
    margin-top: 1.7rem;
    line-height: 2rem;
  }
  .content li .li-bot {
    padding: 1.7rem 1.4rem;
    width: 100%;
  }
  .content li .li-bot span {
    display: inline-block;
    width: 32%;
  }
  .li-bot span:nth-of-type(2) {
    text-align: center;
  }
  .li-bot span:last-of-type {
    text-align: right;
  }
  .content li .li-bot span i {
    display: inline-block;
    font-size:1.6rem;
    margin-right: 0.6rem;
    vertical-align: sub;
    color: #888;
  }
</style>
