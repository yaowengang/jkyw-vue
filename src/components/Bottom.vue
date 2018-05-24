<template>
    <footer>
      <router-link to="/index">
        <span class="ative"></span>
      </router-link>
      <router-link to="/shop">
        <span class="ative"></span>
      </router-link>
      <router-link to="/helthCenter">
        <span class="ative"></span>
      </router-link>
      <router-link to="/community">
        <span class="ative"></span>
      </router-link>
      <router-link to="/personalCenter">
        <span class="ative"></span>
      </router-link>
    </footer>
</template>
<style lang="less" scoped>
  @import '/static/css/reset.css';
  footer {
    display: table;
    max-width: 64rem;
    min-width: 32rem;
    border: none;
    height: 4.9rem;
    background: #efefef;
    position: fixed;
    bottom: 0;
    z-index: 9;
    box-shadow: 0 0 0px rgba(0, 0, 0, .85);
  }

  footer a {
    display: table-cell;
    overflow: hidden;
    width: 20%;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
    height: 4.9rem;
  }

  footer a span {
    background-size: 40% !important;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  footer a:nth-of-type(1).router-link-exact-active span {
    background: url(/static/img/icon_blue_11.png) no-repeat center;
  }

  footer a:nth-of-type(1) span {
    background: url(/static/img/icon_11.png) no-repeat center;
  }

  footer a:nth-of-type(2).router-link-active span {
    background: url(/static/img/icon_blue_13.png) no-repeat center;
  }

  footer a:nth-of-type(2) span {
    background: url(/static/img/icon_13.png) no-repeat center;
  }

  footer a:nth-of-type(3).router-link-active span {
    background: url(/static/img/icon_blue_06.png) no-repeat center;
  }

  footer a:nth-of-type(3) span {
    background: url(/static/img/icon_06.png) no-repeat center;
  }

  footer a:nth-of-type(4).router-link-active span {
    background: url(/static/img/icon_blue_08.png) no-repeat center;
  }

  footer a:nth-of-type(4) span {
    background: url(/static/img/icon_08.png) no-repeat center;
  }

  footer a:nth-of-type(5).router-link-active span {
    background: url(/static/img/icon_blue_03.png) no-repeat center;
  }

  footer a:nth-of-type(5) span {
    background: url(/static/img/icon_03.png) no-repeat center;
  }
</style>

