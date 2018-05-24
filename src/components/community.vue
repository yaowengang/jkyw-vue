<template>
  <div class="community view">
    <div class="search"  >
    <form action="/healthFront/social/searchClanByName.do" id="pagingForm" method="post">
        <input type="text" id="search" name="name" value="" Verification  wraingPos="Alert" data-type="numb/eg" maxlength="10" placeholder="按部落名称进行搜索"  />
      <div class="serach icon iconfont icon-sousuo"></div>
    </form>
    </div>
    <div class="healthy_con">
      <ul class="dh">
        <li>
          <router-link to="/community/doctor">
            <i class="fa fa-user-md"></i>
            <p>名医面对面</p>
          </router-link>
        </li>
        <li class="active">
          <router-link to="/community/">
            <i class="fa fa-users"></i>
            <p>健康部落</p>
          </router-link>
        </li>
        <li>
          <router-link to="/community/activity">
            <i class="fa fa-futbol-o"></i>
            <p>健康活动</p>
          </router-link>
        </li>
      </ul>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
    </div>


    <Bottom></Bottom>
  </div>
</template>

 <script type="text/ecmascript-6">
import Bottom from '@/components/Bottom.vue' 
export default {
    data() {
        return {

        }
    },
    components: {
        Bottom        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .view{
    margin-bottom:4.5rem;
  }
.search {
    font-size: 1.4rem;
    line-height: 1.7rem;
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    max-width: 640px;
    padding: 1rem;
    text-align: center;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px #ccc;
    input {
    width: 100%;
    background: #ebebeb;
    background-size: 1.4rem;
    padding: 0.8rem;
    padding-right: 4rem;
    box-sizing: border-box;
    border-radius: 0.4rem;
    }
    .serach {
    width: 4rem;
    height: 3rem;
    display: inline-block;
    position: absolute;
    top: 1.25rem;
    right: 1.1rem;
    line-height: 3rem;
    font-size: 1.6rem;
    }
}
.healthy_con {
    height: auto;
    overflow: hidden;
    margin-top:6.5rem;
    .dh {
    display: flex;
      li {
      width: 100%;
      border-left: solid 1px #dcdcdc;
      :first-child {
      border-left: none;
      }
      i {
        width: 3.5rem;
        height: 3.5rem;
        font-size: 3.5rem;
        color: #999999;
        display: block;
        margin: 0 auto;
        }
      p {
          font-size: 1.2rem;
          text-align: center;
          margin-top: 0.3rem;
          color: #666666;
      }
      }
      .router-link-exact-active {
        i,p {
        color: #03a9f4;
        }
      }
    }
}
</style>
