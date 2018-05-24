<template>
    <div class="personalInfo-wrap">

      <Top :title="title"></Top>

        <ul class="personal_con">
          <li class="Head_imgCon">
            <a href="">
              <span class="label_name">头像</span>
              <img :src="user.memberImg" alt="" class="Head_img">
            </a>
            <i class="iconfont icon icon-xiayiyeqianjinchakangengduo"></i>
          </li>
          <li>
            <router-link to="/modifyName">
              <span class="label_name">昵称</span>
              <span class="lebel_right" v-text="user.memberName"></span>
            </router-link>
            <i class="iconfont icon icon-xiayiyeqianjinchakangengduo"></i>
          </li>
          <li>
            <router-link to="/modifyPhone">
              <span class="label_name" id="phoneNum">手机号</span>
              <span class="lebel_right" v-text="user.memberPhone"></span>
            </router-link>
            <i class="iconfont icon icon-xiayiyeqianjinchakangengduo"></i>
          </li>
        </ul>


              <div id="mask"></div>

              <ul class="upimgCon">
                <h3>上传头像</h3>
                <li class="for_Album">
                  <label for="file" id="xcButt">在相册中选择</label>
                  <input type="file" id="file" __plimg_img__="1495423749642" __plimg_cb__="1495423751405">

                </li>
                <li>
                  <label>拍照</label>
                </li>
                <li class="close">
                  <label>取消</label>
                </li>

              </ul>
    </div>
</template>
<style lang="less">
  .personalInfo-wrap{
    background: #ffffff;
  }
  .personal_con {
    border-top: solid 0.5rem #f5f5f5;
    padding-left: 1.4rem;
    margin-top: 4.5rem;
  }
  .personal_con li {
    height: auto;
    overflow: hidden;
    position: relative;
    background-size: 0.8rem;
    border-bottom: solid 1px #ebebeb;
  }

  .personal_con li i{
   display: inline-block;
    width: 2rem;
    height: 2rem;
    position: absolute;
    right: 1rem;
    top: 1.8rem;
    font-size: 1.8rem;
    color: #e2e2e2;
  }

  .personal_con li a {
    display: block;
    padding: 2rem 0;
    padding-right: 4rem;
    height: auto;
    overflow: hidden;
    position: relative;
  }
  .personal_con li a .label_name {
    font-size: 1.2rem;
    height: 1.3rem;
    line-height: 1.3rem;
    float: left;
  }
  .personal_con li a .lebel_right {
    float: right;
    font-size: 1.2rem;
    height: 1.3rem;
    line-height: 1.3rem;
    color: #cccccc;
  }
  .personal_con li a .Head_img {
    position: absolute;
    right: 4rem;
    top: 1.2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  #mask {
    width: 100%;
    max-width: 640px;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    display: none;
  }
  .upimgCon {
    height: auto;
    position: fixed;
    bottom: -23em;
    width: 100%;
    max-width: 640px;
    background: #fff;
  }
  .upimgCon h3 {
    font-size: 1.5rem;
    color: #0397ff;
    font-weight: 500;
    text-align: center;
    padding: 1.8rem 0;
    border-bottom: solid 0.8rem #f5f5f5;
  }
  .upimgCon li {
    text-align: center;
    border-top: solid 1px #f5f5f5;
    font-size: 1.2rem;
  }
  .upimgCon li:active {
    background: #f5f5f5;
  }
  .upimgCon label {
    padding: 1.8rem 0;
    display: block;
  }
  .show {
    animation: showUpimg 0.4s forwards;
  }
  #file {
    display: none;
  }
  @keyframes showUpimg {
    from {
      bottom: -23em;
    }
    to {
      bottom: 0;
    }
  }


</style>
<script>


  //显示遮罩
  function alertBox() {
    $("#mask").fadeIn(200);
  }

  //隐藏遮罩
  function clearBox() {
    $("#mask").fadeOut(100);
  }

  function clearAll() {
    $(".upimgCon").slideUp(300, function () {
      $(".upimgCon").removeClass('show').removeAttr('style');
      clearBox();
    })
  }

    $('.Head_imgCon').on('click', function () {
      alert(11)
      alertBox();
      $(".upimgCon").addClass('show');
    });

    $("#mask").on('click', function () {
      clearAll()
    });

    $(".close").on('click', function () {
      clearAll()
    });

    //  头像上传
/*    z.plimg(z.$('file'), z.$('img'), function (file, img, url) {
      var imgDom = "<img src='" + url + "' alt='' onclick='tu(this)'>";
      $(".Head_img").attr('src', url);
      clearAll();
    })*/


  import Top from '../../../../src/components/commom/top2.vue'

    export default {
        data() {
            return {
              title:"个人信息",
              user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
            }
        },
        created() {

        },
        methods: {},
        components: {
          Top
            // 引入组件
        }
    }
</script>
