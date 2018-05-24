<template>

  <div class="tabCon-second">
    <ul>
      <li class="clear" v-for="i in messageArr" :class="i.messageStatus ==1 ? 'active': ''">
        <i></i>
        <a href="">
          <div class="detail-two">
            <h3>{{i.messageTitle }}</h3>
            <p>{{i.messageContent}}</p>
            <span>{{i.messageDate | timeFn}}</span>
          </div>
        </a>
      </li>
      <infinite-loading :on-infinite="getMessageData" ref="infiniteLoading">
        <span slot="no-more">
          没有更多数据
        </span>
      </infinite-loading>
    </ul>
  </div>

</template>
<style lang="less" >
  body{
    background: #FFFFFF;
  }

  .tabCon-second {
    background: #ffffff;
  }

  .tabCon-second li {
    padding: 1.4rem 1rem 0 1.4rem;
    overflow: hidden;
  }

  .tabCon-second li i {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    background: #cccccc;
    float: left;
    margin-top: 0.7rem;
    border-radius: 2rem;
  }

  .tabCon-second li.active i {
    background: red;
  }

  .tabCon-second li .detail-two {
    float: right;
    width: 93%;
    border-bottom: solid 1px #eeeeee;
    padding-bottom: 1.1rem;
    position: relative;
  }

  .tabCon-second li .detail-two h3 {
    font-size: 1.4rem;
    width: 56%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.8rem;
  }

  .tabCon-second li .detail-two span {
    display: inline-block;
    color: #a1a1a1;
    float: right;
    font-size: 1rem;
    position: absolute;
    top: 0;
    right: 0;

  }

  .tabCon-second li .detail-two p {
    font-size: 1.2rem;
    color: #999999;
    margin-top: 0.7rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>
<script>

  import Top from '../../../../components/commom/top2.vue'
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    data() {
      return {
        messageArr: [],
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        active: "",
        showNum: 8,
        page: 1,
        dataLength: 0
      }
    },
    created() {
      this.getMessageData();
    },
    filters: {
      timeFn: function (value) {
        return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    },
    methods: {
      getMessageData() {
        setTimeout(() => {
          this.$http.post("/healthFront/out/personalCenter/getMessageList.do", this.Qs.stringify({
              memberId: this.user.memberId,
              currentPage: this.page,
              showCount: this.showNum
            })
          ).then((res) => {

            if (res.data.messageCenter.list.length) {

              this.messageArr = res.data.messageCenter.list;
              this.dataLength = res.data.messageCenter.countRecord;

              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');

              if (this.showNum > this.dataLength) {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
              }else {
                this.showNum += 4
              }

            } else {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            }
          })

        }, 1000);




      }
    },
    components: {
      Top,
      InfiniteLoading
    }
  }
</script>
