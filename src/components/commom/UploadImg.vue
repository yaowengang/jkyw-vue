<template>
  <div>
    <div class="image-list">
      <ul class="list-ul">
        <li class="list-li" v-for="(iu, index) in imgUrls">
          <span class="list-link">
            <img :src="iu" data-preview-src="" data-preview-group="1">
          </span>
          <span class="list-img-close icon iconfont icon-cuowuguanbiquxiao-xianxingyuankuang" @click='delImage(index)'></span>
        </li>
        <div class="list-default-img" v-show="isPhoto" @click.stop="addPic">
          <img src="" />
          <span class="icon iconfont icon-tianjia1"></span>
          <input type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange"  style="display: none;">
        </div>
        <li class="list-li-add">
          <span class="add-img" @click.stop="addPic"></span>
        </li>
      </ul>


    </div>


  </div>
</template>
<script>
  import "@/libs/js/mui.zoom";
  import "@/libs/js/mui.previewimage"
    import lrz from  'lrz'
  export default {
    data: function () {
      return {
//        imgUrls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502252667834&di=a62899b241b49aadec9a57f0cf65e695&imgtype=0&src=http%3A%2F%2Fimg1.3lian.com%2F2015%2Fgif%2Fw2%2F29%2F41.jpg'],
        urlArr: [],
        isPhoto: true,
        btnTitle: '',
        isModify: false,
        isPreview: false
      }
    },
    props: [
     'imgUrls'
    ],
    mounted(){
      mui.previewImage();
    },
    watch: {
      imgUrls: 'toggleAddPic'
    },
    methods: {
      toggleAddPic: function() {
        let vm = this;
        if(vm.imgUrls.length == 4) {
          vm.isPhoto = false;
        } else {
          vm.isPhoto = true;
        }
        console.log(vm.imgUrls)
        console.log(vm.isPhoto)
      },
      addPic: function(e) {
        let vm = this;
        $('input[type=file]').trigger('click');
        return false;
      },
      onFileChange: function(e) {
        var files = e.target.files || e.dataTransfer.files;
        if(!files.length) return;
        this.createImage(files, e);
      },
      createImage: function(file, e) {
        let vm = this;
        lrz(file[0], { width: 480 }).then(function(rst) {
          vm.imgUrls.push(rst.base64);
          return rst;
        }).always(function() {
          // 清空文件上传控件的值
          e.target.value = null;
        });
      },
      delImage: function(index) {
        let vm = this;
        let btnArray = ['取消', '确定'];
        mui.confirm('确定删除该图片?','提示', btnArray, function(e) {
          if (e.index == 1) {
           vm.imgUrls.splice(index,1);
            vm.isPhoto = true;
            console.log(vm.isPhoto) //
          }
        })

      },
      saveImage: function(){
        let vm = this;
        let urlArr = [],
          imgUrls = this.imgUrls;
        for(let i = 0; i < imgUrls.length; i++) {
          if(imgUrls[i].indexOf('file') == -1) {
            urlArr.push(imgUrls[i].split(',')[1]);
          } else {
            urlArr.push(imgUrls[i]);
          }
        }

        //数据传输操作
      }
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '/static/css/mui.min.css';
  @import '/static/css/case-manage.css';
  .list-ul{
    width: auto;
    float: left;
    .list-li{
      width: 10rem;
      height: 10rem;
      overflow: hidden;
      position: relative;
      text-align: center;
      border: solid 1px #f6f6f6;
      float: left;
      margin-right: 3rem;
      margin-bottom: 2rem;
      img{
        height: 100%;
      }
    }
    .list-li:nth-child(2n){ margin-right: 0}
    .list-img-close{ width: 2rem; height: 2rem; display: block; position: absolute; right: 1rem; top: 1rem; font-size: 2rem; color: #03a9f4}
  }
  .list-default-img{
    width: 10rem;
    position: relative;
    text-align: center;
    border: solid 1px #f6f6f6;
    float: left;
    margin-bottom: 2rem;
    .icon-tianjia1{ font-size: 10rem; width: 10rem; height: 10rem; line-height: 11rem;  display: inline-block; color: #ccc}
  }

</style>
