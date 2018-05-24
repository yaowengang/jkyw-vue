<template>
  <div>
    <top :title="title"></top>
    <ul class="set_contant">
      <li class="form_li">
        <label>收缩压：</label>
        <input type="text" name="stepDay" yanzheng  val-type="Step" wraingpos="Alert" maxlength="8" onkeyup="this.value=this.value.replace(/\D/g,'')"  id="" value="" placeholder="请输入血压">
      </li>
      <li class="form_li">
        <label>舒张压：</label>
        <input type="text" name="stepDay" yanzheng  val-type="Step" wraingpos="Alert" maxlength="8" onkeyup="this.value=this.value.replace(/\D/g,'')"  id="" value="" placeholder="请输入血压">
      </li>
      <li class="form_li">
        <label>时&nbsp;&nbsp;&nbsp;&nbsp;间：</label>
        <input type="date">
      </li>
    </ul>
    <button class="VerBtn" type="button" @click="sub">保存</button>
  </div>
</template>
<style lang="less">
  @import '/static/css/verification.css';
  body{
    background:#fff;
    .set_contant{
    margin-top:5rem;
      padding-top: 5rem;
      .form_li{
        padding-left: 3rem;
        input{
           border-bottom:solid 1px #bfbfbf
        }
      }
  }
    .VerBtn{
      width: 75%;
      text-align: center;
      display: inline-block;
      background: #05add1;
      color: #ffffff;
      border-radius: 2rem;
      padding: 0.9rem 0;
      background: #1696e5;
      margin: 5rem auto 0 auto;
      margin-left: 14%;
      margin-top: 100px;
      font-size: 1.3rem;
    }
  }
</style>
<script>
  import top from '../../commom/top2.vue'
  import "@/libs/js/verification";
  export default{
    data (){
      return {
        title:'输入血压',
        stepNum:'',
        distance:'',
        energy:'',
        user:JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        consume:{name:'消耗能量约等于一杯咖啡',time:'用时1小时40分'}
      }
    },
    created() {
      this.$http.post("/healthFront/out/personalCenter/indexShow.do",this.Qs.stringify({
          memberId: '1'
        })

      ).then((res) => {
        this.messageArr = res.data;
        console.log(res.data)
      })
    },
    components: {
      top
    },
    mounted(){
      var WarningDom = "<span class='waring'>";
      var WarningDom2 ='</span>';
      var OpenCon = '<div class="VerMask" style="width: 100%; height: 100%; position: fixed; top: 0; z-index: 99999"><div class="OpenBox">';
      var OpenCon2 = '</div></div>';
      var CloseTime = 3000;  //弹窗关闭时间


      function YzSumbit(){

      }

      $('input[yanzheng]').blur(function(){
        var valType = $(this).attr('val-type');
        switch (valType) {
          case 'Step':
            if ($(this).val() >= 1000000 || $(this).val() == '') {
              error('步数有误0~1000000', $(this))
            } else {
              ok($(this));
            }
            break;
          case 'date':
            var timestamp = Date.parse(new Date());
            var ValdateSplit = $(this).val().split("-");
            var Valdate = Date.parse(ValdateSplit[0]+'/'+ValdateSplit[1]+'/'+ValdateSplit[2]);
            console.log(Valdate)
            if(timestamp - Valdate > 0){
              ok($(this));
            } else {
              error('不能选择未来时间', $(this))
            }
            break;
        };
        YzSumbit()
      });


      function error(warning,e){
        e.parent().find('span').remove();
        var waringPos = e.attr('wraingPos');
        e.removeClass('ok').addClass('error')
        if(waringPos == 'Alert'){
          if($('.OpenBox').length==0){
            $('body').append(OpenCon+e.siblings('label').text()+warning +OpenCon2);
            setTimeout(function(){
              $('.OpenBox').addClass('remove');
              setTimeout(function(){
                $(".remove").remove();
                $(".VerMask").remove();
              },600)
            },CloseTime)
          }else{
            return false
          }
          //弹窗位置
          $('.OpenBox').css({
            'top': ($(window).height() - $('.OpenBox').outerHeight())/2 + 'px',
            'left':($(window).width() - $('.OpenBox').width())/2 + 'px'
          });

        } else if(waringPos == 'bottom'){

          e.parent().append(WarningDom +'失败：'+warning +WarningDom2);
          e.siblings('.waring').addClass(e.attr('wraingPos'));
          e.siblings('.bottom').css({
            'top':e.outerHeight(),
            'left': parseInt(e.prev('label').width()) + parseInt(e.prev('label').css('margin-right'))
          });
          e.siblings('.waring').addClass('errorSp');

        } else {
          e.parent().append(WarningDom +'失败：'+warning +WarningDom2);
          e.siblings('.waring').addClass('right');
          e.siblings('.right').css({
            'top':e.outerHeight()/3,
            'left': parseInt(e.prev('label').width()) + parseInt(e.outerWidth()) + parseInt(e.prev('label').css('margin-right'))+10
          });
          e.siblings('.waring').addClass('errorSp');
        }
      }

      function ok(e){
        e.removeClass('error')
      }

    },
    methods :{
      sub:function(){
        this.YzSumbit();
          $('*[yanzheng]').trigger("blur");
          if($('.error').length == 0) {
//            Adopt('ok', '修改成功', function () {
//              $("#record").submit();
//            });
              this.$http.post("/healthFront/out/healthCenter/inputStepNumber.do",this.Qs.stringify({
                  memberId:this.user.memberId,
                stepNum:'555',
                time:'2017-8-1'
                })
              )
          }
      },
      YzSumbit:function(){
        $("*[yanzheng]").each(function(){
          if($(this).hasClass('error')){
            $('.VerBtn').attr("disabled",true);
          }
        });
        if($('.error').length == 0){
          $('.VerBtn').attr("disabled",false);
        }
      }
    }

  }
</script>
