<template>
  <div>
    <ul class="Catalog_list">
      <li v-for="items in clanList" :key="items.id">
        <div class="img_con">
          <img :src="items.cover" class="hidden">
          <img :src="items.cover">
        </div>
          <router-link :to="{ path:'/community/tribe/findReadByClan',query:{id:items.clanId}}">
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
  //import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        clanList:[],
        sumClanList: 0,
        showCount:5
      }
    },
    components:{
      InfiniteLoading
    },
    computed: {
 //     ...mapGetters(['getclan'])
    },
    methods:{
      getclanList(){
        setTimeout(() =>{
        this.$http.post("/healthFront/out/social/getHealthTribeList.do", this.Qs.stringify({
              memberId: 1,
              currentPage: 1,
              showCount: this.showCount
            })
          ).then((res) => {
            //console.log(res)
            if (res.data.clans.length) {
              this.clanList = res.data.clans;
              this.sumClanList = res.data.sumClanList
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              if (this.showCount > this.sumClanList) {
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
