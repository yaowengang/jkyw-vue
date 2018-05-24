<template>
  <div class="wrap">
    <Top :title="title"></Top>
    <ul>
      <li>
        <router-link to="/addressManagement">
          <i class="fa fa-truck"></i>

          管理配送地址
          <i class="fa fa-angle-right"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <i class="fa fa-users"></i>

          关于我们
          <i class="fa fa-angle-right"></i>
        </router-link>
      </li>
      <li @click="exitLogin">
        <i class="fa fa-power-off"></i>
        退出登陆
      </li>
    </ul>

  </div>
</template>
<style lang="less" scoped>
  @import '/static/css/mui.min.css';

  .wrap {
    margin-top: 4.5rem;
  }

  ul {
    width: 100%;
    margin: 6rem auto;
    background: #FFFFFF;
  }

  ul li {
    font-size: 1.5rem;
    padding: 1.5rem 3% 1rem 3%;
    color: #5F5F5F;
    border-bottom: #eeeeee solid 1px;
  }

  ul li i {
    width: 3.5rem;
    height: 2.4rem;
    margin-right: 0.5rem;
    display: inline-block;
  }

  ul li i img {
    width: 100%;
  }

  ul li a {
    display: inline-block;
    width: 100%;
    color: #5C5C5C;
  }

  ul li .menu {
    color: #5C5C5C;
    width: 84%;
    display: inline-block;
  }

  .fa-truck:before, .fa-users:before, .fa-power-off:before {
    font-size: 2rem;
    color: #2DB6F5;
  }

  .fa-angle-right {
    float: right;
    width: 1.5rem;
  }

  .fa-angle-right:before {
    font-size: 2rem;
    color: #E6E6E6;
  }

</style>
<script>
  import Top from '../../../../src/components/commom/top2.vue'

  export default {
    data() {
      return {
        title: "设置"
      }
    },
    created() {

    },
    methods: {
      exitLogin() {
        var myself = this;
        var btnArray = ['确认', '取消'];
        mui.confirm('确定要退出当前账号吗？', '', btnArray, function (e) {
          if (e.index == 0) {
            myself.delCookie('accountInfo');
            localStorage.removeItem('isLogin');
            myself.$router.push({'path': '/'});
          }
        })
      },
      delCookie(c_name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(c_name);
        if (cval != null) {
          document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
        }
      },
      getCookie: function (c_name) {
        if (document.cookie.length > 0) {
          var c_start = document.cookie.indexOf(c_name + "=");
          if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
              c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
          }
        }
        return ""
      }
    },
    components: {
      Top
      // 引入组件
    }
  }
</script>
