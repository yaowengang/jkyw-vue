<template>
  <div class="health">
    <ul class="content">
      <li v-for="items in reads" :key="items.id">
        <router-link to="/articleDetail">
          <h4>{{items.name}}</h4>
          <p>{{items.synopsis}}</p>
        </router-link>
        <div class="li-bot">
          <span><i class="iconfont icon icon-dianzan"></i>{{items.like_num}}</span>
          <span><i class="iconfont icon icon-fenxiang"></i>{{items.share_num}}</span>
          <span><i class="iconfont icon icon-pinglun1"></i>{{items.comment_num}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  .health {
    .content {
      li {
        border-bottom: solid 1px #e4e4e4;
        padding: 1.5rem 1.1rem 0 1.1rem;
        h4 {
          font-size: 1.4rem;
        }
        p {
          font-size: 1.2rem;
          margin-top: 1.7rem;
          line-height: 2rem;
        }
        .li-bot {
          padding: 1.7rem 1.4rem;
          width: 100%;
          span {
            display: inline-block;
            width: 32%;
            line-height: 1.6rem;
            font-size: 1rem;
            i {
              display: inline-block;
              width: 1.5rem;
              height: 1.6rem;
              margin-right: 0.7rem;
              color: #9a9a9a;
            }
          }
        }
      }
    }
  }


</style>
<script>
export default {
  props:['reads']
}
</script>

