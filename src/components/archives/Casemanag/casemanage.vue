<template>
    <div>
      <top :title="title"></top>
      <div class="case-container">
         <div class="case-box" >
           <div class="box-content" v-for="describeText in CaseList">
             <h4><i class="icon iconfont icon-time1"></i>{{ describeText.time}}</h4>
             <div class="case-content">
               <div class="case-detail mui-content">
                 <div class="img-box mui-content-padded">
                   <div class="disease-img" v-for="imgSrc in describeText.img">
                     <img  :src="imgSrc.src" data-preview-src="" data-preview-group="1"  alt="">
                   </div>
                 </div>
                 <p>{{ describeText.describe}}</p>
                 <i class="spot icon iconfont icon-more"></i>
               </div>
             </div>
           </div>
         </div>
      </div>
      <div class="case-edit">
        <ul>
          <li id="editor">编辑</li>
          <li id="delete">删除</li>
        </ul>
      </div>
      <div class="hideshow"></div>
    </div>
</template>


<script>
  import Top from '../../top2.vue';
  import "../../../../static/js/mui.zoom";
  import "../../../../static/js/mui.previewimage"

 // require("/static/js/mui.previewimage.js");
    export default{
      data (){
        return {
          title:'病例管理',
          CaseList:[
            {time:'今天',img:[
              {src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501736867256&di=25b168ae55a400787b50fdccbbcf9143&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170723%2Fbfdb50fd388a4db78b9f8e79bdf5b9af_th.jpg"},
              {src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501758014601&di=e3fc256e06e2d413a82d3aa8c8747d97&imgtype=0&src=http%3A%2F%2Fpic.ffpic.com%2Ffiles%2F2012%2F1221%2Fsj11223lan04.jpg"}
            ],describe:'您可以上传病历、化验单等。方便您和医生团队进行病情的管理。'},

            {time:'昨天',img:[
              {src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501758041294&di=196e60350a888c2fc02550ec14fa08c1&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1809540784%2C1387214685%26fm%3D214%26gp%3D0.jpg"}
            ],describe:'阶梯式系统化教学内容，让知识点融会贯通。学习内容转而精，直击健康管理师技能体系。'},

            {time:'前天',img:[
              {src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501759096018&di=e9aaeeab03e2f4bbc1aa791dbe2abd58&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1208%2F10%2Fc2%2F12810494_1344571592252.jpg"},
              {src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501759096018&di=e9aaeeab03e2f4bbc1aa791dbe2abd58&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1208%2F10%2Fc2%2F12810494_1344571592252.jpg"}
            ],describe:'美女啊，哈哈哈哈哈哈或'}
          ]
        }
      },
      mounted() {
        mui.previewImage();
        var left = $('#ico').width() / 2;
        $('.case-content').css('margin-left', left);

        $('.spot').each(function(i, v) {
          $(v).click(function() {
            $('.hideshow').addClass('movein');
            $('.case-edit').addClass('moveup');
          });
          $('.hideshow').click(function() {
            $('.hideshow').removeClass('movein');
            $('.case-edit').removeClass('moveup');
          });
        });
        $("#editor").click(function(){
          window.location.href="case-details.html"
        });
        $(".go_1").click(function(){
          window.location.href="javascript:history.go(-1)"
        });
      },
      components:{
        Top
      }
    }
</script>

<style lang="less" scoped>
  @import '/static/css/case-manage.css';
  @import '/static/css/mui.min.css';
  body{
    background: #f6f6f6 !important;
  }
  .case-container{
    margin-top: 4.5rem;
    width: 100%;
    background: #f6f6f6;
    .case-box{
       padding:1.2rem 1rem 2.7rem 1.3rem;
  h4{
    font-size: 1.6rem;
    margin-bottom:0;
  i{
    display: inline-block;
    width: 2.1rem;
    height: 2.1rem;
    font-size: 1.7rem;
    color: #03affc;
    margin-right: 1.6rem;
    vertical-align: baseline;
  }
  }
  .case-content{
    width: 95%;
    border-left: solid 1px #03affc;
    padding: 1rem 0 1rem 8%;
    margin-top: -5px;
    margin-left: 0.8rem;
    .case-detail{
      background: #ffffff;
      padding: 2.6rem 5%;
      border-radius: 2%;
      .img-box{
        height: auto;
        overflow: hidden;
        .disease-img{
          width: 49%;
          float: left;
          img{
            width: 100%;
          }
        }
  .disease-img:first-child{
    margin-right: 2%;
  }
  }
  p{
    font-size: 1.2rem;
    line-height: 2.4rem;
    color: #434242;
    margin-top: 1.7rem;
  }
  .spot{
    display: inline-block;
    width: 2.3rem;
    height: 0.9rem;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    float: right;
    font-size:2.5rem;
    color: #ccc;
  }
    }
  }
    }

  }
</style>
