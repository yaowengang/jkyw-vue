<template>
  <div>
    <ul class="Catalog_list">
        <!-- 上拉加载更多 -->
        <load-more
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :bottomPullText='bottomText'
        :auto-fill="false"
        @bottom-status-change="handleBottomChange"
        ref="loadmore">
            <div>
        这里写你需要的另外的模块
            </div>
            <div v-show="loading" slot="bottom" class="loading"> 这个div是为让上拉加载的时候显示一张加载的gif图
              <img :src="uploadingurl">
            </div>
        </load-more>
    </ul>
  </div>
</template>

<script>
  import LoadMore from '@/components/commom/loadmore.vue'
  //import { mapGetters } from 'vuex';
    export default {
        name: 'FinancialGroup',
        props:{
		
        },
        data () {
            return {
                //  上拉加载数据
                scrollHeight: 0,
                scrollTop: 0,
                containerHeight: 0,
                loading: false,
                allLoaded: false,
                bottomText: '上拉加载更多...',
                bottomStatus: '',
                pageNo: 1,
                totalCount: '',
                uploadingurl:'/static/img/uploading.gif'
            }
        },
        methods: {
        /* 下拉加载 */
        _scroll: function(ev) {
            ev = ev || event;
            this.scrollHeight = this.$refs.innerScroll.scrollHeight;
            this.scrollTop = this.$refs.innerScroll.scrollTop;
            this.containerHeight = this.$refs.innerScroll.offsetHeight;
        },
        loadBottom: function() {
            this.loading = true;
            this.pageNo += 1;   // 每次更迭加载的页数
            if (this.pageNo == this.totalGetCount) {
                // 当allLoaded = true时上拉加载停止
                this.loading = false;
                this.allLoaded = true;
            }
                this.$http.post("/healthFront/out/social/getHealthTribeList.do", this.Qs.stringify({
                  memberId: 1,
                  currentPage: 1,
                  showCount: this.showCount
                }))
                .then(res => {
                setTimeout(() => {
                  this.$nextTick(() => {
                    this.loading = false;
            	  })
            }, 1000)
         });
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
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
