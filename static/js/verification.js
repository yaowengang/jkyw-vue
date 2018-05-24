/**
 * Created by mx on 23/8/2017.
 * v1.8;
 * 更新内容：
 * 添加了自定义错误提示
 * 修改Alert类型无意义的提示
 * 修改弹窗时输入框可操作状态
 * 取消弹窗提醒关闭按钮
 */


var WarningDom = "<span class='waring'>";
var WarningDom2 ='</span>';
var OpenCon = '<div class="VerMask" style="width: 100%; height: 100%; position: fixed; top: 0; z-index: 99999"><div class="OpenBox">';
var OpenCon2 = '</div></div>';
var CloseTime = 3000;  //弹窗关闭时间

//获取date-type类型
function Type(e){
  //获取输入框输入类型
  var objVal = e.val();
  //获取数据校验类型
  var bbjType = e.attr('data-type');
  var strs = new Array();
  strs = bbjType.split(",")
  //获取自定义失败内容提示
  var ErrorWaring = e.attr('VerErrorWarning');
  var strerr = new Array();
  //console.log(ErrorWaring)
  if(ErrorWaring != ''&& ErrorWaring != undefined){
  strerr = ErrorWaring.split("&&");
  }
  for(var i=0;i<strs.length;i++){
	  //console.log(strs[i]);
	  bbjType = strs[i];
	  ErrorWaring = strerr[i];
	  var ss = inputVal(objVal,bbjType,e,ErrorWaring);
	  if(ss == 'error'){
		  //console.log(333)
		  return;
	  }
  }

}
//提交按钮禁用切换
function YzVerBtn(){
  $("*[verification]").each(function(){
    if($(this).hasClass('error')){
      $('.VerBtn').attr("disabled",true);
    }
  });
  if($('.error').length == 0){
    $('.VerBtn').attr("disabled",false);
  }
}


$('*[verification]').bind('keydown',function(e){
  if(e.keyCode==13){
    $("*[verification]").trigger("blur")
  }
});
//类型验证正则——校验核心方法
function inputVal(thisVal,thisType,e,thisError){
	//console.log(thisType)
	//console.log(thisError)
	var lengthStr = e.attr('length');
	var min=3;
	var	max=8;
	//console.log(lengthStr)
	if(lengthStr != '' && lengthStr != undefined){
	var lengthArr = new Array();
	lengthArr = lengthStr.split(",");
	min = lengthArr[0];
	max = lengthArr[1];
	console.log(max)
	}
  var Url = /\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  var Special = /[@#\$%\^&\*]+/g;   //特殊字符验证
  var len = "^.{"+min+","+max+"}$"
//  var len1 = JSON.stringify(len);
  var lengths = new RegExp(len)

 switch(thisType){
	 case 'phone':thisType = /^1[34578]\d{9}$/;break;
	 case 'username':thisType = /^(?![0-9_])[a-zA-Z0-9_\u0391-\uFFE5]+$/;break;
	 case 'ordernumber':thisType = /^[A-Za-z0-9]+$/;break;
	 case 'tel':thisType = /^\d{3,4}-\d{7,8}$/;break;
	 case 'length':thisType = new RegExp(len);break;
	 case 'email':thisType = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;break;
	 case 'version':thisType = /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}$/;break;
	 case 'eg/ch':thisType = /^([a-zA-Z ]+|[\u4e00-\u9fa5]+)$/;break;
	 case 'numb/eg':thisType = /^[a-zA-Z0-9\u4e00-\u9fa5]*([a-zA-Z][0-9]|[0-9][a-zA-Z]|[\u4e00-\u9fa5])[a-zA-Z0-9]*$/;break;
	 case 'nonum':thisType = /^(?!_)(?!.*?_$)[a-zA-Z_\u4e00-\u9fa5]+$/;break;
	 case 'name':thisType = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;break;
	 case 'name2':thisType = /^[\u4E00-\u9FA5A-Za-z_]+$/;break;
	 case 'money':thisType = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;break;
	 case 'signnumb':thisType = /^[1-9]\d*$/;break;
	 case 'ch':thisType = /[\u4e00-\u9fa5]/;break;
	 case 'passwd':thisType = /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/;break;
	 case 'signnumb2':thisType = /^([1-9]\d*|0)(\.\d*[1-9])?$/;break;
 }

  //正则对内容进行比较
    switch (thisType){
      case 'date':
       if(thisVal==''){
         error(e,'不得为空')
       } else {
         var timestamp = Date.parse(new Date());
         var ValdateSplit = thisVal.split("-");
         var Valdate = Date.parse(ValdateSplit[0]+'/'+ValdateSplit[1]+'/'+ValdateSplit[2]);
         if(timestamp - Valdate > 0){
            ok(e)
         } else {
           if(thisError){
             error(e,thisError)
           } else {
             error(e, '日期错误，不能选择未来时间')
           }
         }
       }
        break;
      case 'textarea':
        if(e.attr("maxlength") == -1 ){
          if(thisVal == ''){
            error(e,'不得为空')
          } else {
            ok(e,'您已经输了'+ thisVal.length + '个字')
          }
        } else {
          var valnum =  e.attr('maxlength') - thisVal.length;
          if(valnum < e.attr('maxlength')){
            ok(e,'您还可以输'+ valnum + '个字')
          } else if(valnum == e.attr('maxlength')){
            error(e,'不得为空')
          }
        }
        break;
      case 'url':
        if(Url.test(thisVal)||thisVal == ''){
          ok(e)
        }else {
          if(thisError){
            error(e,thisError)
          } else {
          error(e,"url格式不正确：如' /***/***.do '")
            }
        }
        break;
      case 'prohibitNull':
        if(thisVal == ''){
          if(thisError){
            error(e,thisError)
          } else {
            error(e, "不得为空")
          }
        } else {
          ok(e)
        }
        break;
      case 'special':
        if(!Special.test(thisVal)){
          ok(e)
        } else {
          if(thisError){
            error(e,thisError)
          } else {
            error(e, "非法字符")
          }
        }
        break;
	  default:
	    if(thisType.test(thisVal)){
			console.log(thisType)
			ok(e)
		}else{
			console.log(thisType)
			if(thisError){
			error(e,thisError)
			return 'error'
			}else{
			error(e,"输入有错")
			}
		}
		break;
    }
}


//错误提醒
function error(e,warning){
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

//成功提醒
function ok(e,warning){
  var waringPos = e.attr('wraingPos');
  if(warning){
    e.parent().find('.waring').remove();
    e.parent().append(WarningDom+ warning +WarningDom);
    e.removeClass('error');
    e.siblings('.waring').addClass('okSp');
    $('.okSp').css({
      top:e.outerHeight(),
      left:parseInt(e.prev('label').width()) + parseInt(e.prev('label').css('margin-right'))+10
    })
  }else {
    e.parent().find('.waring').remove();
    e.removeClass('error');
  }
}
