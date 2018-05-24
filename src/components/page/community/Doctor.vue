<template>
  <div>
    <ul class="community-wrap">
      <li class="community-main clear" v-for="items in VideosList" :key="items.id">
        <img :src="items.thumbnail">
        <router-link to="/FindVideo">
          <dl>
            <dt>{{items.name}}</dt>
            <dd>主讲医师：{{items.author}}</dd>
            <dd>{{items.doctors.job}}</dd>
          </dl>
        </router-link>
      </li>
      <infinite-loading :on-infinite="getclanList" ref="infiniteLoading">
        <span slot="no-more">
          没有更多数据
        </span>
      </infinite-loading>      
    </ul>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    data() {
      return {
        VideosList:[],
        videoListSum: 0,
        showCount:5  
      }
    },
    components:{
      InfiniteLoading
    },
    methods:{
      getclanList(){
        setTimeout(() =>{
        this.$http.post("/healthFront/out/social/getShowVideoList.do", this.Qs.stringify({
              memberId: 1,
              currentPage: 1,
              showCount: this.showCount
            })
          ).then((res) => {
            console.log(res.data)

            localStorage.setItem('videoJson',res.data)
            if (res.data.Videos.length) {
              this.VideosList = res.data.Videos;
              this.videoListSum = res.data.videoListSum
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              if (this.showCount > this.videoListSum) {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              }else {
                this.showCount += 5
              }
            } else {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          })          
        }, 1000);

      }
    }            
  }
</script>

<style lang="less" scoped>
  .community-wrap {
    .community-main {
      padding: 1.7rem 1.2rem;
      border-bottom: 1px solid #e3e3e3;
      overflow: hidden;
      img {
        width: 13rem;
        height: 10rem;
        float: left;
        border: 1px solid #dcdcdc;
      }
      dl {
        float: left;
        margin-left: 1.8rem;
        dt {
          font-size: 1.3rem;
          color: #000000;
          margin: 1.2rem 0 1.5rem;
        }
        dd {
          color: #737373;
          font-size: 1.1rem;
          margin: 1rem 0;
        }
      }
    }
    :last-of-type {
      border-bottom: none;
    }
  }
</style>
