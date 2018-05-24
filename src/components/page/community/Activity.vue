<template>
  <div>
    <ul class="Catalog_list">
      <li v-for="items in activesList" :key="items.id">
        <div class="img_con">
          <img :src="items.cover" class="hidden">
          <img :src="items.cover">
        </div>
        <router-link to="/articleDetail">
          <h2>{{items.name}}</h2>
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
        activesList:[],
        sumActiveList: 0,
        showCount:5        
      }
    },
    components:{
      InfiniteLoading
    },
    methods:{
      getclanList(){
        setTimeout(() =>{
        this.$http.post("/healthFront/out/social/getHealthActivityList.do", this.Qs.stringify({
              memberId: 1,
              currentPage: 1,
              showCount: this.showCount
            })
          ).then((res) => {
            console.log(res.data.actives)
            if (res.data.actives.length) {
              this.activesList = res.data.actives;
              this.sumActiveList = res.data.sumActiveList
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              if (this.showCount > this.sumActiveList) {
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
  .Catalog_list {
    background: #f6f6f6;
    padding: 1.2rem;
    margin-bottom: 5rem;
    li {
      position: relative;
      height: 9rem;
      overflow: hidden;
      border-radius: 0.4rem;
      margin-top: 1.2rem;
      .img_con {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        margin: 0;
        padding: 0;
        img {
          position: absolute;
          top: -50%;
          left: -50%;
          display: block;
          width: 100%;
        }
        .hidden {
          visibility: hidden;
          position: static;
        }
      }
      h2 {
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 9rem;
        color: #fff;
        text-align: center;
        line-height: 9rem;
        font-weight: 500;
        letter-spacing: 1rem;
      }
    }
     :first-child {
      margin-top: 0;
    }
  }
</style>
