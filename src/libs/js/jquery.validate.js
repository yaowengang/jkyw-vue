/*
 *
 *Jquery 的验证框架
 *
 *notNull regex ajax equalTo rangeLength
 *
 */
(function($){
    $.fn.validate = function(){
        //这里的this是Jquery的代理对象
        var form = this;
        var flag = true;
        form.submit(function(e){
            flag = true;
            e.preventDefault();
            form.find("input").each(function(){
                    $(this).blur();
            });
            if(flag){
                //解绑form表单注册的submit事件
                form.unbind("submit");
                form.submit();
            }
        });
        form.find("input").each(function(){
            //这里的this是当前迭代的dom对象
            var inputObj = $(this);
            //attr 代表的是html标签具备的属性
            //prop 代表的是js对象的属性 disabled checked
            var valiStr = inputObj.attr("validate");
            if(valiStr){
                inputObj.blur(function(){
                     //将json字符串转换成json对象
                    var validates = $.parseJSON(valiStr);
                    //[{"type":"notNull","msg":"用户名不能为空！"},{"type":"regex","reg":"","msg":""}]
                    for(var i = 0 ; i < validates.length ; i++){
                        var validate = validates[i];
                        //通过eval函数将 方法名执行获得函数实体对象
                        //eval(notNull); 将字符串当作js代码执行
                        var func = eval(validate.type);
                        if(func(inputObj,validate)){
                                tip(inputObj,'校验通过','#03a9f4');

                        }else{
                                tip(inputObj,validate.msg,'#b4b4b4');
                                flag = false;
                                return;
                        }
                    }
                });

            }
        });
        function notNull(obj,validate){
            var value = $.trim(obj.val());
            if(value.length==0){
                return false;
            }
            return true;
        }
        function regex(obj,validate){
            var regMatch = /^[\u4e00-\u9fa5_a-zA-Z0-9-]{3,10}$/;
             if(regMatch==null || regMatch =="null"){
                return true;
            }
            console.log(regMatch);
            var result = $.trim(obj.val());
            if(!regMatch.exec(result)){
                return false;
            }
            return true;
        }
        function authentication(obj,validate){
        	var regAuthentication = /^(\w){6,12}$/;
             if(regAuthentication==null || regAuthentication =="null"){
                return true;
            }
        	console.log(regAuthentication);
            var result = $.trim(obj.val());
            if(!regAuthentication.exec(result)){
                return false;
            }
            return true;
        }

        function equalTo(obj,validate){
            var v1 = $.trim(obj.val());
            var v2 = $.trim($(validate.target).val());
            if(v1==v2){
                return true;
            }
            return false;
        }
        function tip(obj,msg,color){
            var parent = obj.parent().parent();
            var tips = parent.find("span");
            if(tips.length==0){
                obj.parent().parent().append("<span class='error'><i></i><font color="+color+">"+msg+"</font></span>");
            }else{
                tips.html("<font color="+color+">"+msg+"</font>");
            }
        }

    }


})(jQuery);


function getVerifyCode(options) {
  return function() {
    clearInterval(timer);
    if(!(options && Object.prototype.toString.call(options.callBack) == "[object Function]")) {
      throw new Error("必须传递参数及回调函数");
    }
    var that = $("#that");
    var send = $(this);
    if(options.isPhone){
      var phone = options.getPhone(),
        reg = options.phoneReg || /^1[3|4|5|7|8][0-9]\d{8}$/;
      if(!reg.test(phone)) {
        //如果手机号码不正确，则执行手机号码对应的回调函数
        options.phoneCallBack && options.phoneCallBack.call(that,phone);
        return;
      }
    }

    var timer = null,
      time = options.time || 60,
      unabledClass = options.unabledClass || "",
      timeIsUpText = options.timeIsUpText || "重新获取",
      timeRunnigText = options.timeRunnigText || " s后重新获取";

    send.off("click");
    send.addClass(unabledClass);
    timer = setInterval(function() {
      //避免重复发送
      if(time <= 0) {
        clearInterval(timer);
        /*time = 60;*/
        send.html(timeIsUpText).removeClass(unabledClass);
        send.on("click", getVerifyCode(options));
        that.hide();
      } else {
        time--;
        that.show();
        that.text("发送成功,"+time + timeRunnigText);
        //在外部可以获取到倒计时当前时间
        if(options.getCurrentTime && (Object.prototype.toString.call(options.getCurrentTime) == "[object Function]")){
          options.getCurrentTime.call(that,time);
        }
      }
    }, 1000);
    //执行回调函数
    options.callBack.call(that);
  }
}
