/**
 * Created by mx on 14/4/2017.
 */
/*
 My JavasSript Tools
 Author ZongLiang
 Update Time 2014-10-29 15:23
 */
(function(window,undefined){

    var document = window.document;
    var navigator = window.navigator;
    var location = window.location;
    var undefined = undefined;

    var zl = function(id,dom,win){return zl.$(id,dom,win);};

    zl.window = window;
    zl.document = window.document;
    zl.version = '1.0.1.8';
    /*
     zl.$ get Dom Object	id:name,dom:parentNode Dom,win:window.
     */
    zl.$ = function(obj,dom,win){
        try{
            document = (win == undefined) ? window.document : win.document;
            if(typeof obj == 'string'){
                if(obj == '*'){
                    return (dom == undefined) ? document.getElementsByTagName('*') : zl.$(dom,undefined,win).getElementsByTagName('*');
                }
                var _obj = obj.split(' ');
                if(_obj.length > 1){
                    var pdom = zl.$(_obj[0], dom);
                    if(pdom != null){
                        if(zl.isset(pdom.length)){
                            var reary = [];
                            for(var i = 0; i < pdom.length; i++){
                                var _tmp = zl.$(obj.substr(_obj[0].length+1), pdom[i], win);
                                if(_tmp != null){
                                    if(zl.isset(_tmp.length)){
                                        for(var _i = 0; _i < _tmp.length; _i++){
                                            if(_tmp[_i] != null){
                                                //reary[reary.length] = _tmp[_i];
                                                var isSet = true;
                                                for(var ___i = 0; ___i < reary.length; ___i++){
                                                    if(reary[___i] === _tmp[_i]){
                                                        isSet = false;
                                                        break;
                                                    }
                                                }
                                                if(isSet){ reary[reary.length] = _tmp[_i]; }
                                            }
                                        }
                                    }else{
                                        var isSet = true;
                                        for(var ___i = 0; ___i < reary.length; ___i++){
                                            if(reary[___i] == _tmp){
                                                isSet = false;
                                            }
                                        }
                                        if(isSet){
                                            reary[reary.length] = _tmp;
                                        }
                                    }
                                }
                                //reary[reary.length] = zl.$(obj.substr(_obj[0].length+1), pdom[i], win);
                            }
                            return (reary.length != 0) ? reary : null;
                        }else{
                            return zl.$(obj.substr(_obj[0].length+1), pdom, win);
                        }
                    }else{
                        return null;
                    }
                } else if(obj.charAt(0) == '<' && obj.charAt(obj.length-1) == '>' && obj.length >= 3){
                    obj = obj.substr(1, obj.length-2);
                    return (dom == undefined) ? document.getElementsByTagName(obj) : zl.$(dom,undefined,win).getElementsByTagName(obj);
                } else if(obj.charAt(0) == '.' && obj.length >= 2){
                    obj = obj.substr(1, obj.length-1);
                    if(zl.isset(document.getElementsByClassName)){
                        return (dom == undefined) ? document.getElementsByClassName(obj) : zl.$(dom,undefined,win).getElementsByClassName(obj);
                    }else{
                        var oElm = (dom == undefined) ? document : zl.$(dom,undefined,win);
                        var arrElements = (oElm.all)? oElm.all : oElm.getElementsByTagName('*');
                        var arrReturnElements = new Array();
                        obj = obj.replace(/\-/g, "\\-");
                        var oRegExp = new RegExp('(^|\\s)' + obj + '(\\s|$)');
                        var oElement;
                        for(var i=0; i < arrElements.length; i++){
                            oElement = arrElements[i];
                            if(oRegExp.test(oElement.className)){
                                arrReturnElements.push(oElement);
                            }
                        }
                        return (arrReturnElements);
                    }
                } else if(obj.charAt(0) == '#' && obj.length >= 2){
                    obj = obj.substr(1, obj.length-1);
                    if(zl.isset(document.getElementsByName) && dom == undefined){
                        return document.getElementsByName(obj);
                    }else{
                        var oElm = (dom == undefined) ? document : zl.$(dom,undefined,win);
                        var arrElements = (oElm.all)? oElm.all : oElm.getElementsByTagName('*');
                        var arrReturnElements = new Array();
                        var oElement;
                        for(var i=0; i < arrElements.length; i++){
                            oElement = arrElements[i];
                            if(oElement.getAttribute('name') == obj){
                                arrReturnElements.push(oElement);
                            }
                        }
                        return (arrReturnElements);
                    }
                } else if(obj.charAt(0) == '[' && obj.charAt(obj.length-1) == ']' && obj.length >= 3){
                    dom = (dom == undefined) ? document : dom;
                    var _tmp = obj.substr(1, obj.length-2);
                    var __doms = [];
                    if(zl.childNodes(dom).length != 0){
                        var _tmps = zl.$('*',dom);
                        for(var i = 0; i < _tmps.length; i++){
                            var _att = _tmp.split('!=');
                            if(_att.length >= 2){
                                var ___tmp = (zl.att(_tmps[i],_att[0]) != _att[1]) ? _tmps[i] : null;
                            }else{
                                _att = _tmp.split('=');
                                if(_att.length >= 2){
                                    var ___tmp = (zl.att(_tmps[i],_att[0]) == _att[1]) ? _tmps[i] : null;
                                }else{
                                    var ___tmp = (zl.att(_tmps[i],_tmp) == null) ? null : _tmps[i];
                                }
                            }
                            if(___tmp != null){
                                //__doms.unshift(___tmp);
                                __doms[__doms.length] = ___tmp;
                            }
                        }
                    }
                    var _att = _tmp.split('!=');
                    if(_att.length >= 2){
                        var ___tmp = (zl.att(dom,_att[0]) != _att[1]) ? dom : null;
                    }else{
                        _att = _tmp.split('=');
                        if(_att.length >= 2){
                            var ___tmp = (zl.att(dom,_att[0]) == _att[1]) ? dom : null;
                        }else{
                            var ___tmp = (zl.att(dom,_tmp) == null) ? null : dom;
                        }
                    }
                    if(___tmp != null){
                        //__doms.unshift(___tmp);
                        __doms[__doms.length] = ___tmp;
                    }
                    return __doms.length == 0 ? null : __doms;
                } else {
                    //return (dom == undefined) ? document.getElementById(obj) : zl.$(dom,undefined,win).getElementById(obj);
                    return document.getElementById(obj);
                }
            } else if(typeof obj == 'function'){
                zl.readyCallBacks[zl.readyCallBacks.length] = obj;
                zl.ready();
                //window.onload = function(){zl.ready();}
            } else {
                return obj;
            }
        }catch(e){
            zl.log('[Function][$] Get $ '+obj+' Error! '+e.message);
            return null;
        }
    };
    /*
     is Internet Explorer
     */
    zl.isIE = !!window.ActiveXObject;
    // close page
    zl.close = function(){window.opener = null; window.close();};
    // get rand int
    zl.r = zl.rand = function(rmin,rmax){
        if(!zl.isset(rmin))
            rmin = 0;
        if(!zl.isset(rmax))
            rmax = 100;
        return Math.round(rmin+(Math.random()*(rmax-rmin)));
    };
    // new error
    zl.e = zl.error = function(msg){throw new Error(msg);};
    //	Check Obj Is defined
    zl.isset = zl.isdefined = function(obj){ return (typeof obj != 'undefined'); };
    // log con:content ,e:error
    zl.log = function(con,e){
        if(window.console && window.console.log){
            if(e != undefined && e.message != undefined){
                console.log(con + '\r\n\t [Error: ' + e.message + ' ]\r\n');
            } else {
                console.log(con);
            }
        }
    };
    /*
     Show Error Msg
     msg 	Error Content
     */
    zl.showError = function(msg){
        var showEr = zl.create({id:'show_Error_Msg',cssText:'border: 1px solid #CCC;background: #FFF;width:200px;min-height:50px;z-index:9999; filter:alpha(opacity=70);opacity:0.7;position:fixed;_position:absolute;right:5px;bottom:0px;_bottom:0px;'});
        zl.create({cssText:'width:100%;height:24px;background:#ccc;color:red;font-size:14px;',pdom:showEr,content:'\u9519\u8bef\u63d0\u793a<a href="javascript:zl.remove(\'show_Error_Msg\',3);" style="float:right;">Close</a>'});
        zl.create({cssText:'width:100%;background:#FFF;color:red;font-size:13px;padding:10px;overflow:hidden;display:block;',pdom:showEr,content:'<span>' + msg + '</span>'});

        setTimeout(function(){zl._fade(showEr,0,3,function(){zl.remove(this);});},3000);

    };
    /*
     remove object dom
     */
    zl.remove = zl.del = function(name,time){
        var obj = zl.$(name);
        if(time){
            zl._fade(obj,0,time,function(){zl.remove(this);});
        } else {
            if(obj != null){
                try{
                    obj.parentNode.removeChild(obj);
                    zl.log('Remove Object ' + obj + ' Success');
                }catch(e){
                    zl.log('Remove Object ' + obj + ' Failure! ', e);
                    return e.message;
                }
            }else{
                zl.log('[Function][remove]Remove Object ' + obj + ' Failure! [Error: Is Null! ]');
            }
        }
    };
    /*
     Verify CSS Style Att

     */
    zl.isCss = function(elem,css,val){
        try{
            elem = zl.$(elem);
            if(css in elem.style){
                if(zl.isset(val)){
                    elem.style[css] = val;
                    return elem.style[css] === val;
                }
                return true;
            }
            return false;
        }catch(e){
            zl.log('[Function][isCss] Get Elem ['+elem+'] CSS ['+css+'] Style Failure! ', e);
            return false;
        }
    };
    /*
     Set Dom CSS Style

     */
    zl.css = {
        add : function(elem,css){
            try{
                elem = zl.$(elem);
                if(css.charAt(0) == '.'){
                    css = zl.att(elem, 'class') + ' ' + css.substr(1);
                    zl.att(elem, 'class', css);
                }else{
                    css = zl.att(elem, 'style') + '; ' + css;
                    zl.att(elem, 'style', css);
                }
            }catch(e){
                zl.log('[Function][css] Set Elem ['+elem+'] CSS ['+css+'] Style Failure! ', e);
                return false;
            }
        },
        remove : function(elem,css){
            try{
                elem = zl.$(elem);
                if(css.charAt(0) == '.'){
                    if(zl.att(elem, 'class').split(' ').indexOf(css.substr(1)) != -1){
                        var _css = zl.att(elem, 'class').split(' ');
                        _css[_css.indexOf(css.substr(1))] = '';
                        zl.att(elem, 'class', _css.join(' '));
                    }
                }else{
                    var styles = zl.att(elem, 'style').split(';');
                    var _css = '';
                    for(var i in styles){
                        if(styles[i].split(':')[0].toLowerCase() != css.toLowerCase()) _css += styles[i];
                    }
                    zl.att(elem, 'style', _css);
                }
            }catch(e){
                zl.log('[Function][css] Set Elem ['+elem+'] CSS ['+css+'] Style Failure! ', e);
                return false;
            }
        }
    };
    /*
     Load JavaScript
     */
    zl.loadjs = zl.loadScript = function(src,charset,callback,kill){
        try{
            var h = zl.$('<head>')[0];
            var ss = zl.$('<script>', h);
            if (ss && ss.length > 0) {
                for(var i = 0; i < ss.length; i ++) {
                    if (zl.att(ss[i],'src') == src && !zl.isset(kill)) {
                        zl.log('Load JavaScript '+src+' Error.!  JS Already exists');
                        zl.run(callback);
                        return;
                    }
                }
            }
            var js = zl.create({tagName:'script',type:'text/javascript',_src:src,src:src,append:false});
            if(charset){js.charset = charset;}
            if (callback){
                if(zl.isIE){
                    js.onreadystatechange = function(){
                        if ('complete' == js.readyState || js.readyState == 'loaded'){
                            zl.run(callback);
                        }
                    };
                }else{
                    js.onload = function(){
                        zl.run(callback);
                    };
                }
            }
            zl.insert.child(h,js);
            return js;
        }catch(e){
            zl.log('[Function][loadjs] Load JavaScript '+src+' Failure! ', e);
        }
    };
    /*
     Run Function
     */
    zl.run = zl.callback = function(callback,elem){
        try{
            elem = (zl.isset(elem) && elem != null) ? zl.$(elem) : document;
            var _arguments = [];
            if(arguments.length > 2){
                for(var i = 2; i < arguments.length; i++){
                    _arguments[i-2] = arguments[i];
                }
            }
            if(typeof callback == 'string'){
                //eval(callback+'.apply('+elem+','+_arguments+');');
                eval(callback+'.apply(elem,_arguments);');
            }else{
                //callback.call(elem);
                callback.apply(elem,_arguments);
            }
        }catch(e){
            zl.log('[Function][run] Run JavaScript Function '+callback+' Failure! ', e);
        }
    };
    /*
     Get js parameter
     */
    zl.p = zl.parameter = function(name,def,url){
        try{
            if(!zl.isset(url)){
                var scripts = zl.$('<script>');
                var js = scripts[scripts.length-1];
                if(name == undefined) return js;
                url = js.src;
            }
            var qs = url.split('?');
            if (name == null || name == ''){return (qs.length > 1) ? qs[qs.length-1] : ''; }
            var str = qs[qs.length-1].split("&");
            var i = 0;
            while(str[i] != null) {
                var keys = str[i].split("=");
                var j = 0,value = "";
                while(keys[j] != null) {
                    if(j != 0) value = value + keys[j];
                    j++;
                }
                if(keys[0] == name) return value;
                i++;
            }
            return (!zl.isset(def)) ? '' : def;
        }catch(e){
            zl.log('[Function][p] Get Parameter Failure! ', e);
            return '';
        }
    };
    /*
     Get All Child Nodes
     */
    zl.childNodes = function(elem,tag){
        try{
            var childs = new Array();
            var nodes = elem.childNodes;
            for(var i = 0; i < nodes.length; i++){
                if(zl.isset(nodes[i].tagName)){
                    if(typeof tag != 'string' || nodes[i].tagName.toLowerCase() == tag.toLowerCase()){
                        childs[childs.length] = nodes[i];
                    }
                }
            }
            return childs;
        }catch(e){
            zl.log('[Function][childNodes] Get Object Dom ' + elem + ' All ChildNodes Tag ' + tag + ' Failure! ', e);
            return zl.$('<' + tab + '>', elem);
        }
    };
    /*
     Get Or Set Attrib
     */
    zl.att = zl.attribute = function(elem,key,val){
        try{
            if(zl.isset(val)){
                if(typeof val == 'function'){
                    try{eval('elem.'+key+' = '+val+';');}catch(e){elem.setAttribute(key, val);}
                }else if(val == null){
                    elem.removeAttribute(key);
                }else{
                    try{elem.setAttribute(key, val);}catch(e){eval('elem.'+key+' = '+val+';');}
                }
            } else {
                return elem.getAttribute(key);
            }
        }catch(e){
            zl.log('[Function][att] Get Or Set Attribute In '+elem+' Failure! ', e);
            return null;
        }
    };
    /*
     Get Dom Location x,y,h,w
     return obj
     */
    zl.loc = zl.dom_location = function(elem){
        try{
            if(arguments.length != 1 || elem == null ){
                return null;
            }
            var offsetTop = elem.offsetTop;
            var offsetLeft = elem.offsetLeft;
            var offsetWidth = elem.offsetWidth;
            var offsetHeight = elem.offsetHeight;
            while( elem = elem.offsetParent){
                if(elem.style.position == 'absolute' || elem.style.position == 'relative' || ( elem.style.overflow != 'visible' && elem.style.overflow != '' )){
                    break;
                }
                offsetTop += elem.offsetTop;
                offsetLeft += elem.offsetLeft;
            }
            return {top:offsetTop,left:offsetLeft,width:offsetWidth,height:offsetHeight};
        }catch(e){
            zl.log('[Function][loc] Get Location '+elem+' Failure! ', e);
            return null;
        }
    };
    /*
     load dom time
     */
    zl.loadTime = 0;
    /*
     rand callbacks
     */
    zl.readyCallBacks = [];
    /*
     ready window.onload ,,,
     */
    zl.ready = function(obj){
        try{
            if(zl.isset(obj) ){
                zl.readyCallBacks[zl.readyCallBacks.length] = obj;
            }
            zl.loadTime = zl.loadTime + 1;
            if(document.readyState == 'complete' && zl.readyCallBacks != []){
                for(var i = 0,ic = zl.readyCallBacks.length; i < ic; i++ ){
                    try{
                        zl.run(zl.readyCallBacks[i]);
                        /*
                         if(typeof zl.readyCallBacks[i] == 'string'){
                         eval(zl.readyCallBacks[i]);
                         }else{
                         zl.readyCallBacks[i].call(document);
                         }
                         */
                        //delete zl.readyCallBacks[i];
                    }catch(e){
                        zl.log('[Function][ready] Ready CallBack Failure! ', e);
                    }
                }
                zl.readyCallBacks = [];
            }else{
                setTimeout(function(){zl.ready();},1);
            }
        }catch(e){
            zl.log('[Function][ready] Ready Function Failure!',e);
        }
    };
    /*
     Check Default Option
     */
    zl.cd = zl.checkDefaultOpt = function(def_opt,opt){
        try{
            if(!opt) {
                opt = def_opt;
            }else{
                for(var dfo in def_opt){
                    if(opt[dfo] == undefined)
                        opt[dfo] = def_opt[dfo];
                }
            }
            return opt;
        }catch(e){
            zl.log('[Function][checkDefaultOpt] Check Default Option Failure! ', e);
            return null;
        }
    };
    /*
     Get XmlHttp Object Ajax
     return Object or null;
     */
    zl.getXmlHttpObject = function(){
        try{
            var xmlHttp = null;
            try{
                xmlHttp = new XMLHttpRequest();
            }catch(e){
                try{
                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                }catch(e){
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            return xmlHttp;
        }catch(e){
            zl.log('[Function][getXmlHttpObject] get XML In Ajax Object Demo Failure!',e);
        }
    };
    /*
     My Ajax obj
     opt option
     */
    zl.ajax = function(opt){
        var df_opt = {type:'post', url:'', query:'', dataType:'', async:true, success:function(o){}, contentType:'application/x-www-form-urlencoded', error:function(o,e){}};
        opt = zl.cd(df_opt,opt);
        var xmlAjax = zl.getXmlHttpObject();
        if(xmlAjax == null){
            alert('\u60a8\u7684\u6d4f\u89c8\u5668\u53ef\u80fd\u4e0d\u652f\u6301Ajax.\u8bf7\u68c0\u67e5!');
        }else{
            try{
                if(opt.type == 'get') opt.url = opt.url + ((opt.query == '') ? '' : '?' + opt.query);
                xmlAjax.onreadystatechange = function(){
                    if(xmlAjax.readyState == 4 || xmlAjax.readyState == "complete"){
                        try{
                            if(opt.success){
                                var reData = xmlAjax.responseText;
                                if(opt.dataType == 'json'){
                                    try{reData = zl.json(reData);}catch(e){zl.log('Content ReData Type Failure! ', e);}
                                } else if (opt.dataType == 'xml'){
                                    try{reData = zl.xml(reData);}catch(e){zl.log('Content ReData Type Failure! ', e);}
                                }
                                zl.run(opt.success,this,reData);
                                /*
                                 if(typeof opt.success != 'string'){
                                 opt.success.call(this,reData);
                                 }else{
                                 eval(opt.success + '(reData);');
                                 }
                                 */
                            }
                        }catch(e){
                            zl.log('Get Ajax Data Failure! ', e);
                            if(opt.error){
                                zl.run(opt.error,this,xmlAjax,e);
                                /*
                                 if(typeof opt.error != 'string'){
                                 opt.error.call(this,xmlAjax,e);
                                 }else{
                                 eval(opt.error + '(xmlAjax,e);');
                                 }
                                 */
                            }
                        }
                    }
                    if(xmlAjax.readyState == 4 && xmlAjax.status != 200){
                        zl.log('Get Ajax Failure! ');
                        if(opt.error){
                            zl.run(opt.error,this,xmlAjax,null);
                            /*
                             if(typeof opt.error != 'string'){
                             opt.error.call(this,xmlAjax,'');
                             }else{
                             eval(opt.error + '(xmlAjax,"");');
                             }
                             */
                        }
                    }
                }
                xmlAjax.open(opt.type, opt.url, opt.async);
                xmlAjax.setRequestHeader('Content-Type', opt.contentType);
                //xmlAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xmlAjax.send(opt.query);
            }catch(e){
                zl.log('[Function][ajax] Send Ajax Failure! ', e);
                if(opt.error){
                    zl.run(opt.error,this,xmlAjax,null);
                    /*
                     if(typeof opt.error != 'string'){
                     opt.error.call(this,xmlAjax,e);
                     }else{
                     eval(opt.error + '(xmlAjax,e);');
                     }
                     */
                }
            }
        }
    };
    /*
     open new window run code
     code Code
     */
    zl.runCode = function(code){
        try{
            if(code != ''){
                var newwin = window.open('','','');
                newwin.opener = null;
                newwin.document.write(code);
                newwin.document.close();
                return newwin;
            }
        }catch(e){
            zl.log('[Function][runCode] Run Code Failure!',e);
        }
    };
    /*
     Copy Elem Style
     New Elem In Elem
     */
    zl.cpem = zl.copyElem = function(elem,opt){
        try{
            elem = zl.$(elem);
            if(elem == null) return null;
            if(typeof opt == 'undefined') opt = {append:false};
            //var cssText = (typeof opt['cssText'] == 'undefined') ? '' : opt['cssText'];
            var cssText = '';
            var locElem = zl.loc(elem);
            cssText = cssText + 'width:' + locElem.width + 'px;';	//elem.offsetWidth
            cssText = cssText + 'height:' + locElem.height + 'px;';	//elem.offsetHeight
            cssText = cssText + 'left:' + locElem.left + 'px;';		//elem.offsetLeft
            cssText = cssText + 'top:' + locElem.top + 'px;';		//elem.offsetTop
            cssText = cssText + 'position:absolute;z-index:99999;';

            opt['cssText'] = (typeof opt['cssText'] == 'undefined') ? cssText : cssText + opt['cssText'];

            return zl.create(opt);
        }catch(e){
            zl.log('[Function][copyElem] Copy Element Failure!',e);
            return null;
        }
    };
    /*
     Create Object Dom
     opt option
     */
    zl.create = zl.newDom = function(opt){
        try{
            if(typeof opt == 'string'){
                var obj = document.createElement('div');
                obj.innerHTML = opt;
                return obj.childNodes;
            }else{
                var df_opt = {tagName:'div',content:'',append:true,pdom:'',bdom:'',adom:''};
                opt = zl.cd(df_opt,opt);
                var obj = document.createElement(opt.tagName);
                try{
                    //obj.id = opt.id;
                    //obj.name = opt.name;
                    if(opt.css != '') obj.className = opt.css;
                    if(opt.cssText != '') obj.style.cssText = opt.cssText;
                    try{obj.innerHTML = opt.content;}catch(ex){}
                    var _otherAry = new Array('tagName','css','cssText','content','append','pdom','bdom','adom');
                    //var _otherAry = ['tagName','css','cssText','content','append','pdom','bdom','adom'];
                    for(var i in opt){
                        if(_otherAry.indexOf(i) == -1){
                            zl.att(obj,i,opt[i]);
                        }
                    }
                }catch(exs){}
                if(opt.append){
                    if(opt.pdom != ''){
                        zl.insert.child(opt.pdom, obj);
                    }else if(opt.bdom != ''){
                        zl.insert.before(opt.bdom, obj);
                    }else if(opt.adom != ''){
                        zl.insert.after(opt.adom, obj);
                    }else{
                        zl.insert.child(document.body, obj);
                    }
                }
                return obj;
            }
        }catch(e){
            zl.log('[Function][create] CreateElement Object Failure! ', e);
            //alert(e.message);
            return null;
        }
    };
    /*
     Insert Dom
     */
    zl.insert = {
        before : function(elem,newElem){
            try{
                return zl.$(elem).parentNode.insertBefore(newElem, zl.$(elem));
            }catch(e){
                zl.log('[Function][insert.before] Insert Object Dom '+newElem+' In '+elem+' Before Failure! ', e);
                return false;
            }
        },
        after : function(elem,newElem){
            try{
                if(elem.parentNode.lastChild == elem){
                    return elem.parentNode.appendChild(newElem);
                }else{
                    return elem.parentNode.insertBefore(newElem,elem.nextSibling);
                }
            }catch(e){
                zl.log('[Function][insert.after] Insert Object Dom '+newElem+' In '+elem+' After Failure! ', e);
                return false;
            }
        },
        child : function(elem,newElem){
            try{
                return zl.$(elem).appendChild(newElem);
            }catch(e){
                zl.log('[Function][insert.child] Insert Object Dom '+newElem+' In '+elem+' Failure! ', e);
                return false;
            }
        }
    };
    /*
     My Form Option
     Form
     */
    zl.fm = zl.Form = {
        Init : function(){
            /*	Unfinished...	*/
        }
    };
    /*
     ImageErr check images onerror
     img		image object
     url		default image url
     */
    zl.imageErr = function(img,url){
        try{
            img = zl.$(img);
            //img.onerror = function(){img.src = url;}
            var _img = new Image();
            _img.src = img.src;
            _img.onerror = function(){
                zl.att(img,'source-src',img.src);
                img.src = url;
            }
            /*
             if(!img.complete){
             var itp = obj.src.substr(-3);
             if(itp == 'jpg' || itp == 'peg' || itp == 'png' || itp == 'gif' || itp == 'bmp'){
             obj.setAttribute('source-src', obj.src);
             obj.src = url;
             }
             }
             */
        }catch(e){
            zl.log('[Function][imageErr] Load Image Error Failure! ', e);
            return '';
        }
    };
    /*
     Default Image
     */
    zl.imageDefault = function(url){
        try{
            var _img = new Image();
            _img.src = url;
            _img.onload = function(){
                var imgs = zl.$('<img>');
                for(var i in imgs){
                    zl.imageErr(imgs[i],url);
                }
            }
        }catch(e){
            zl.log('[function][imageDefault] Setting Images Default Url Failure! ', e);
            return '';
        }
    };
    /*
     Get  Path
     src		path
     return (error)?'':the Path;
     */
    zl.getPath = function(src){
        try{
            if(!zl.isset(src)) src = zl.parameter().src;
            var path = src.substring(0,(src.length - zl.parameter('').length));
            return path.substring(0,path.lastIndexOf('/')+1);
        }catch(e){
            zl.log('[Function][getPath] Get Path Failure! ', e);
            return '';
        }
    };
    /*
     Get User Browser Info
     r	retype
     return (r != null)?Browser Version:Object info;
     */
    zl.bs = zl.browser = function(r){
        try{
            var bsary = [
                ['MSIE ', 'Internet Explorer', 'Microsoft', ''],
                ['Chrome\\/', 'Chrome', 'Google', ''],
                ['Firefox\\/', 'Firefox', 'Mozilla', ''],
                ['Opera\\/', 'Opera', 'Opera Software', 'Version\\/[\\d+.\\d+]+'],
                ['Safari\\/', 'Safari', 'Apple', 'Version\\/[\\d+.\\d+]+']
            ];
            /*
             var bsary = new Array();
             bsary[0] = new Array('MSIE ', 'Internet Explorer', 'Microsoft', '');
             bsary[1] = new Array('Chrome\\/', 'Chrome', 'Google', '');
             bsary[2] = new Array('Firefox\\/', 'Firefox', 'Mozilla', '');
             bsary[3] = new Array('Opera\\/', 'Opera', 'Opera Software', 'Version\\/[\\d+.\\d+]+');
             bsary[4] = new Array('Safari\\/', 'Safari', 'Apple', 'Version\\/[\\d+.\\d+]+');
             */

            for(var i = 0; i < bsary.length; i++){
                var ocode = '_reg = /'+bsary[i][0]+'[\\d+.\\d+]+/;';
                ocode = ocode + 'var _bv = _reg.exec(navigator.userAgent);';
                eval(ocode);
                if(_bv){
                    if(bsary[i][3] != ''){
                        var ocode = '_reg = /'+bsary[i][3]+'/;';
                        ocode = ocode + 'var _bv = _reg.exec(navigator.userAgent);';
                        eval(ocode);
                    }
                    _reg = /[\d+.\d+]+/;
                    var _v = _reg.exec(_bv)[0];
                    var _obj = bsary[i][2]+' '+bsary[i][1]+' '+_v;
                    return (r != undefined) ? _obj : {obj:_obj,company:bsary[i][2],name:bsary[i][1],version:_v};
                }
            }
            return 'Unknown';
        }catch(e){
            zl.log('[Function][browser] Get Browser Info Failure! ', e);
            return e.message;
        }
    };
    /*
     Get User System Info
     r	retype
     return (r != null)?System Version:Object info;
     */
    zl.os = zl.system = function(r){
        try{
            var osary = [
                ['/windows nt 95/', 'Windows 95', 'Microsoft'],
                ['/windows nt 4.90/', 'Windows ME', 'Microsoft'],
                ['/windows nt 98/', 'Windows 98', 'Microsoft'],
                ['/windows nt 5.0/', 'Windows 2000', 'Microsoft'],
                ['/windows nt 5.1/', 'Windows XP', 'Microsoft'],
                ['/windows nt 6.0/', 'Windows Vista', 'Microsoft'],
                ['/windows nt 6.1/', 'Windows 7', 'Microsoft'],
                ['/windows nt 6.2/', 'Windows 8', 'Microsoft'],
                ['/windows nt 32/', 'Windows 32', 'Microsoft'],
                ['/windows nt nt/', 'Windows NT', 'Microsoft'],
                ['/mac os/', 'Mac OS', 'Apple'],
                ['/linux/', 'Linux', 'Unknown'],
                ['/unix/', 'Unix', 'Unknown'],
                ['/sun os/', 'SunOS', 'SUN'],
                ['/ibm os/', 'IBM OS/2', 'IBM'],
                ['/mac pc/', 'Macintosh', 'Unknown'],
                ['/powerpc/', 'PowerPC', 'Unknown'],
                ['/aix/', 'AIX', 'Unknown'],
                ['/hpux/', 'HPUX', 'Unknown'],
                ['/netbsd/', 'NetBSD', 'Unknown'],
                ['/bsd/', 'BSD', 'Unknown'],
                ['/osfl/', 'OSF1', 'Unknown'],
                ['/irix/', 'IRIX', 'Unknown'],
                ['/freebsd/', 'FreeBSD', 'Unknown']
            ];
            /*
             var osary = new Array();
             osary[0] = new Array('/windows nt 95/', 'Windows 95', 'Microsoft');
             osary[1] = new Array('/windows nt 4.90/', 'Windows ME', 'Microsoft');
             osary[2] = new Array('/windows nt 98/', 'Windows 98', 'Microsoft');
             osary[3] = new Array('/windows nt 5.0/', 'Windows 2000', 'Microsoft');
             osary[4] = new Array('/windows nt 5.1/', 'Windows XP', 'Microsoft');
             osary[5] = new Array('/windows nt 6.0/', 'Windows Vista', 'Microsoft');
             osary[6] = new Array('/windows nt 6.1/', 'Windows 7', 'Microsoft');
             osary[7] = new Array('/windows nt 6.2/', 'Windows 8', 'Microsoft');
             osary[8] = new Array('/windows nt 32/', 'Windows 32', 'Microsoft');
             osary[9] = new Array('/windows nt nt/', 'Windows NT', 'Microsoft');
             osary[10] = new Array('/mac os/', 'Mac OS', 'Apple');
             osary[11] = new Array('/linux/', 'Linux', 'Unknown');
             osary[12] = new Array('/unix/', 'Unix', 'Unknown');
             osary[13] = new Array('/sun os/', 'SunOS', 'SUN');
             osary[14] = new Array('/ibm os/', 'IBM OS/2', 'IBM');
             osary[15] = new Array('/mac pc/', 'Macintosh', 'Unknown');
             osary[16] = new Array('/powerpc/', 'PowerPC', 'Unknown');
             osary[17] = new Array('/aix/', 'AIX', 'Unknown');
             osary[18] = new Array('/hpux/', 'HPUX', 'Unknown');
             osary[19] = new Array('/netbsd/', 'NetBSD', 'Unknown');
             osary[20] = new Array('/bsd/', 'BSD', 'Unknown');
             osary[21] = new Array('/osfl/', 'OSF1', 'Unknown');
             osary[22] = new Array('/irix/', 'IRIX', 'Unknown');
             osary[23] = new Array('/freebsd/', 'FreeBSD', 'Unknown');
             */

            for(var i = 0; i < osary.length; i++){
                var ocode = '_reg = '+osary[i][0]+';';
                ocode = ocode + 'var _bv = _reg.exec(navigator.userAgent.toLowerCase());';
                eval(ocode);
                if(_bv){
                    var _obj = osary[i][2]+' '+osary[i][1];
                    return (r != undefined) ? _obj : {obj:_obj,company:osary[i][2],name:osary[i][1]};
                }
            }
            return 'Unknown';
        }catch(e){
            zl.log('[Function][system] Get System Info Failure! ', e);
            return e.message;
        }
    };
    /*
     Change object Transparency
     element			Object Dom
     Transparency 	Transparency value
     speed			Change Speed
     callback		CallBack
     */
    zl._fade = zl.fade = zl.transparency = function(element, transparency, speed, callback){
        try{
            element = zl.$(element);
            if(!element.effect){
                element.effect = {};
                element.effect._fade=0;
            }
            clearInterval(element.effect._fade);
            var speed=speed||1;
            var start=(function(elem){
                var alpha;
                if(navigator.userAgent.toLowerCase().indexOf('msie') != -1){
                    alpha=elem.currentStyle.filter.indexOf("opacity=") >= 0?(parseFloat( elem.currentStyle.filter.match(/opacity=([^)]*)/)[1] )) + '':
                        '100';
                }else{
                    alpha=100*elem.ownerDocument.defaultView.getComputedStyle(elem,null)['opacity'];
                }
                return alpha;
            })(element);
            //zl.log('start: '+start+" end: "+transparency);
            element.effect._fade = setInterval(function(){
                start = start < transparency ? Math.min(start + speed, transparency) : Math.max(start - speed, transparency);
                element.style.opacity =  start / 100;
                element.style.filter = 'alpha(opacity=' + start + ')';
                if(Math.round(start) == transparency){
                    element.style.opacity =  transparency / 100;
                    element.style.filter = 'alpha(opacity=' + transparency + ')';
                    clearInterval(element.effect._fade);
                    if(callback)callback.call(element);
                }
            }, 20);
        }catch(e){
            zl.log('[Function][_fade] Change object Transparency Failure![ ' + element + '] ', e);
            return e.message;
        }
    };
    /*
     Change object Location
     element			Object Dom
     position		Change Option
     speed			Change Speed
     callback		CallBack
     */
    zl._move = zl.move = function(element, position, speed, callback){
        try{
            element = zl.$(element);
            if(!element.effect){
                element.effect = {};
                element.effect._move=0;
            }
            clearInterval(element.effect._move);
            var speed=speed||10;
            var start=(function(elem){
                var	posi = {left:elem.offsetLeft, top:elem.offsetTop};
                while(elem = elem.offsetParent){
                    posi.left += elem.offsetLeft;
                    posi.top += elem.offsetTop;
                };
                return posi;
            })(element);
            element.style.position = 'absolute';
            var	style = element.style;
            var styleArr=[];
            if(typeof(position.left)=='number')styleArr.push('left');
            if(typeof(position.top)=='number')styleArr.push('top');
            element.effect._move = setInterval(function(){
                for(var i=0;i<styleArr.length;i++){
                    start[styleArr[i]] += (position[styleArr[i]] - start[styleArr[i]]) * speed/100;
                    style[styleArr[i]] = start[styleArr[i]] + 'px';
                }
                for(var i=0;i<styleArr.length;i++){
                    if(Math.round(start[styleArr[i]]) == position[styleArr[i]]){
                        if(i!=styleArr.length-1)continue;
                    }else{
                        break;
                    }
                    for(var i=0;i<styleArr.length;i++)style[styleArr[i]] = position[styleArr[i]] + 'px';
                    clearInterval(element.effect._move);
                    if(callback)callback.call(element);
                }
            }, 20);
        }catch(e){
            zl.log('[Function][_move] Change object Location Failure! [' + element + '] ', e);
            return e.message;
        }
    };
    /*
     Change object Size
     element			Object Dom
     size			Object New Size Option
     speed			Change Speed
     callback		CallBack
     */
    zl._reSize = zl.reSize = zl.size = function(element, size, speed, callback){
        try{
            element = zl.$(element);
            if(!element.effect){
                element.effect = {};
                element.effect._resize=0;
            }
            clearInterval(element.effect._resize);
            var speed=speed||10;
            var	start = {width:element.offsetWidth, height:element.offsetHeight};
            var styleArr=[];
            if(!(navigator.userAgent.toLowerCase().indexOf('msie') != -1&&document.compatMode == 'BackCompat')){
                var CStyle=document.defaultView?document.defaultView.getComputedStyle(element,null):element.currentStyle;
                if(typeof(size.width)=='number'){
                    styleArr.push('width');
                    size.width=size.width-CStyle.paddingLeft.replace(/\D/g,'')-CStyle.paddingRight.replace(/\D/g,'');
                }
                if(typeof(size.height)=='number'){
                    styleArr.push('height');
                    size.height=size.height-CStyle.paddingTop.replace(/\D/g,'')-CStyle.paddingBottom.replace(/\D/g,'');
                }
            }
            element.style.overflow = 'hidden';
            var	style = element.style;
            element.effect._resize = setInterval(function(){
                for(var i=0;i<styleArr.length;i++){
                    start[styleArr[i]] += (size[styleArr[i]] - start[styleArr[i]]) * speed/100;
                    style[styleArr[i]] = start[styleArr[i]] + 'px';
                }
                for(var i=0;i<styleArr.length;i++){
                    if(Math.round(start[styleArr[i]]) == size[styleArr[i]]){
                        if(i!=styleArr.length-1)continue;
                    }else{
                        break;
                    }
                    for(var i=0;i<styleArr.length;i++)style[styleArr[i]] = size[styleArr[i]] + 'px';
                    clearInterval(element.effect._resize);
                    if(callback)callback.call(element);
                }
            }, 20);
        }catch(e){
            zl.log('[Function][_reSize] Change object Size Failure! [' + element + '] ', e);
            return e.message;
        }
    };
    /*
     Hide Elem Dom
     time: hide time
     val: transparency
     */
    zl.hide = function(elem,time,val){
        try{
            if(!zl.isset(val)) val = 0;
            if(!zl.isset(time)) time = 1;
            zl.fade(elem,val,time);
        }catch(e){
            zl.log('[Function][hide] hide object Elem Failure![ ' + elem + '] ', e);
            return e.message;
        }
    };
    /*
     Show Elem Dom
     time: show time
     val: transparency
     */
    zl.show = function(elem,time,val){
        try{
            if(!zl.isset(val)) val = 100;
            if(!zl.isset(time)) time = 1;
            zl.fade(elem,val,time);
        }catch(e){
            zl.log('[Function][show] show object Elem Failure![ ' + elem + '] ', e);
            return e.message;
        }
    };
    /*
     Drag Object Dom
     weburl: http://www.cnblogs.com/cloudgamer/archive/2008/11/17/drag.html
     */
    zl.Drag = zl.drag = function(elem,opt){
        var zDrag = {
            BindAsEventListener : function(object, fun){
                return function(event) {
                    return fun.call(object, (event || window.event));
                }
            },
            Bind : function(object, fun) {
                return function() {
                    return fun.apply(object, arguments);
                }
            },
            CurrentStyle : function(elem){
                return elem.currentStyle || document.defaultView.getComputedStyle(elem, null);
            },
            addEventHandler : function(oTarget, sEventType, fnHandler) {
                if (oTarget.addEventListener) {
                    oTarget.addEventListener(sEventType, fnHandler, false);
                } else if (oTarget.attachEvent) {
                    oTarget.attachEvent("on" + sEventType, fnHandler);
                } else {
                    oTarget["on" + sEventType] = fnHandler;
                }
            },
            removeEventHandler : function(oTarget, sEventType, fnHandler) {
                if (oTarget.removeEventListener) {
                    oTarget.removeEventListener(sEventType, fnHandler, false);
                } else if (oTarget.detachEvent) {
                    oTarget.detachEvent("on" + sEventType, fnHandler);
                } else {
                    oTarget["on" + sEventType] = null;
                }
            },
            initialize : function(elem, opt){
                this.elem = zl.$(elem);
                this._x = this._y = 0;
                this._marginLeft = this._marginTop = 0;
                this._fM = this.BindAsEventListener(this, this.Move);
                this._fS = this.Bind(this, this.Stop);

                this.SetOptions(opt);

                this.Limit = !!this.options.Limit;
                this.mxLeft = parseInt(this.options.mxLeft);
                this.mxRight = parseInt(this.options.mxRight);
                this.mxTop = parseInt(this.options.mxTop);
                this.mxBottom = parseInt(this.options.mxBottom);

                this.LockX = !!this.options.LockX;
                this.LockY = !!this.options.LockY;
                this.Lock = !!this.options.Lock;

                this.onStart = this.options.onStart;
                this.onMove = this.options.onMove;
                this.onStop = this.options.onStop;

                this._Handle = zl.$(this.options.Handle) || this.elem;
                this._mxContainer = zl.$(this.options.mxContainer) || null;

                this.elem.style.position = "absolute";
                this._Handle.style.cursor = "move";
                if(zl.isIE && !!this.options.Transparent){
                    with(this._Handle.appendChild(document.createElement("div")).style){
                        width = height = "100%"; backgroundColor = "#fff"; filter = "alpha(opacity:0)"; fontSize = 0;
                    }
                }
                this.Repair();
                this.addEventHandler(this._Handle, "mousedown", this.BindAsEventListener(this, this.Start));
            },
            SetOptions: function(options) {
                this.options = {
                    Handle:			"",
                    Limit:			false,
                    mxLeft:			0,
                    mxRight:		9999,
                    mxTop:			0,
                    mxBottom:		9999,
                    mxContainer:	"",
                    LockX:			false,
                    LockY:			false,
                    Lock:			false,
                    Transparent:	false,
                    onStart:		function(){},
                    onMove:			function(){},
                    onStop:			function(){}
                };
                this.options = zl.cd(this.options,options);
            },
            Start: function(oEvent) {
                if(this.Lock){ return; }
                this.Repair();
                this._x = oEvent.clientX - this.elem.offsetLeft;
                this._y = oEvent.clientY - this.elem.offsetTop;
                this._marginLeft = parseInt(this.CurrentStyle(this.elem).marginLeft) || 0;
                this._marginTop = parseInt(this.CurrentStyle(this.elem).marginTop) || 0;
                this.addEventHandler(document, "mousemove", this._fM);
                this.addEventHandler(document, "mouseup", this._fS);
                if(zl.isIE){
                    this.addEventHandler(this._Handle, "losecapture", this._fS);
                    this._Handle.setCapture();
                }else{
                    this.addEventHandler(window, "blur", this._fS);
                    oEvent.preventDefault();
                };
                this.onStart();
            },
            Repair: function() {
                if(this.Limit){
                    this.mxRight = Math.max(this.mxRight, this.mxLeft + this.elem.offsetWidth);
                    this.mxBottom = Math.max(this.mxBottom, this.mxTop + this.elem.offsetHeight);
                    !this._mxContainer || this.CurrentStyle(this._mxContainer).position == "relative" || this.CurrentStyle(this._mxContainer).position == "absolute" || (this._mxContainer.style.position = "relative");
                }
            },
            Move: function(oEvent) {
                if(this.Lock){ this.Stop(); return; };
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                var iLeft = oEvent.clientX - this._x, iTop = oEvent.clientY - this._y;
                if(this.Limit){
                    var mxLeft = this.mxLeft, mxRight = this.mxRight, mxTop = this.mxTop, mxBottom = this.mxBottom;
                    if(!!this._mxContainer){
                        mxLeft = Math.max(mxLeft, 0);
                        mxTop = Math.max(mxTop, 0);
                        mxRight = Math.min(mxRight, this._mxContainer.clientWidth);
                        mxBottom = Math.min(mxBottom, this._mxContainer.clientHeight);
                    };
                    iLeft = Math.max(Math.min(iLeft, mxRight - this.elem.offsetWidth), mxLeft);
                    iTop = Math.max(Math.min(iTop, mxBottom - this.elem.offsetHeight), mxTop);
                }
                if(!this.LockX){ this.elem.style.left = iLeft - this._marginLeft + "px"; }
                if(!this.LockY){ this.elem.style.top = iTop - this._marginTop + "px"; }
                this.onMove();
            },
            Stop: function() {
                this.removeEventHandler(document, "mousemove", this._fM);
                this.removeEventHandler(document, "mouseup", this._fS);
                if(zl.isIE){
                    this.removeEventHandler(this._Handle, "losecapture", this._fS);
                    this._Handle.releaseCapture();
                }else{
                    this.removeEventHandler(window, "blur", this._fS);
                };
                this.onStop();
            }
        };
        zDrag.initialize(elem,opt);
        return zDrag;
    };
    /*
     Dom Keys Reg or Remove
     add Registration Key in Dom . shortcut:Key,callback:Trigger The Key CallBack,opt:Key Option
     remove() Remove Key In Dom. shortcut:key.
     weburl: http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
     */
    zl.key = zl._key = zl.shortcuts = {
        all_shortcuts : [],
        add : function(shortcut_combination,callback,opt){
            try{
                var default_options = {'type':'keydown','propagate':false,'disable_in_input':false,'target':document,'keycode':false}
                opt = zl.cd(default_options, opt);
                var ele = zl.$(opt.target);
                var ths = this;
                shortcut_combination = shortcut_combination.toLowerCase();
                var func = function(e){
                    e = e || window.event;
                    if(opt['disable_in_input']){
                        var element;
                        if(e.target) element=e.target;
                        else if(e.srcElement) element=e.srcElement;
                        if(element.nodeType==3) element=element.parentNode;
                        if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
                    }
                    if (e.keyCode) code = e.keyCode;
                    else if (e.which) code = e.which;
                    var character = String.fromCharCode(code).toLowerCase();
                    if(code == 188) character=",";
                    if(code == 190) character=".";
                    var keys = shortcut_combination.split("+");
                    var kp = 0;
                    var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"};
                    var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123};
                    var modifiers = {
                        shift: { wanted:false, pressed:false},
                        ctrl : { wanted:false, pressed:false},
                        alt  : { wanted:false, pressed:false},
                        meta : { wanted:false, pressed:false}
                    };
                    if(e.ctrlKey)	modifiers.ctrl.pressed = true;
                    if(e.shiftKey)	modifiers.shift.pressed = true;
                    if(e.altKey)	modifiers.alt.pressed = true;
                    if(e.metaKey)   modifiers.meta.pressed = true;
                    for(var i=0; k=keys[i],i<keys.length; i++){
                        if(k == 'ctrl' || k == 'control') {
                            kp++;
                            modifiers.ctrl.wanted = true;
                        } else if(k == 'shift') {
                            kp++;
                            modifiers.shift.wanted = true;
                        } else if(k == 'alt') {
                            kp++;
                            modifiers.alt.wanted = true;
                        } else if(k == 'meta') {
                            kp++;
                            modifiers.meta.wanted = true;
                        } else if(k.length > 1) {
                            if(special_keys[k] == code) kp++;
                        } else if(opt['keycode']) {
                            if(opt['keycode'] == code) kp++;
                        } else {
                            if(character == k) kp++;
                            else {
                                if(shift_nums[character] && e.shiftKey) {
                                    character = shift_nums[character];
                                    if(character == k) kp++;
                                }
                            }
                        }
                    }
                    if(kp == keys.length && modifiers.ctrl.pressed == modifiers.ctrl.wanted && modifiers.shift.pressed == modifiers.shift.wanted && modifiers.alt.pressed == modifiers.alt.wanted && modifiers.meta.pressed == modifiers.meta.wanted){
                        var re = callback(e);
                        if((re != undefined && !re) || (re == undefined && !opt['propagate'])){
                            e.cancelBubble = true;
                            e.returnValue = false;
                            if (e.stopPropagation) {
                                e.stopPropagation();
                                e.preventDefault();
                            }
                            return false;
                        }else{
                            e.cancelBubble = false;
                            e.returnValue = true;
                            return true;
                        }
                    }
                }
                this.all_shortcuts[shortcut_combination] = {
                    'callback':func,
                    'target':ele,
                    'event': opt['type']
                };
                if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
                else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
                else ele['on'+opt['type']] = func;
                zl.log('Registration Key '+shortcut_combination+' In '+opt['target']+' on'+opt['type']+' Success!');
            }catch(e){
                zl.log('[Function][key.add] Registration Key '+shortcut_combination+' Failure! ', e);
                return e.message;
            }
        },
        remove : function(shortcut_combination) {
            try{
                shortcut_combination = shortcut_combination.toLowerCase();
                var binding = this.all_shortcuts[shortcut_combination];
                delete(this.all_shortcuts[shortcut_combination])
                if(!binding) return;
                var type = binding['event'];
                var ele = binding['target'];
                var callback = binding['callback'];
                if(ele.detachEvent) ele.detachEvent('on'+type, callback);
                else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
                else ele['on'+type] = false;
                zl.log('Remove Key '+shortcut_combination+' In '+ele+' on'+type+' Success!');
            }catch(e){
                zl.log('[Function][key.remove] Remove Key '+shortcut_combination+' Failure! ',e);
                return e.message;
            }
        },
        source : 'http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js'
    };
    /*
     Cookie Class
     add	Add New Cookie Afferent NewCookie Option
     get	Get Cookie Value Afferent Cookie Name
     del	Delete Cookie Afferent Cookie Name
     */
    zl.cookie = zl._cookie = {
        add : function(opt){
            try{
                if(!opt.name || !opt.value){throw new Error("Error: Cookie [name] And [value] Cant Null.");}
                var str = opt.name + "=" + escape(opt.value);
                if(opt.hours){
                    var exdate = new Date();
                    if(opt.hourstype=='d'){
                        exdate.setDate(exdate.getDay()+opt.hours);
                    }else if(opt.hourstype=='m'){
                        exdate.setDate(exdate.getMinutes()+opt.hours);
                    }else{
                        exdate.setDate(exdate.getHours()+opt.hours);
                    }
                    str += ";expires=" + exdate.toGMTString();
                }
                str += (opt.path) ? ";path=" + opt.path : "";
                str += (opt.domain) ? ";domain=" + opt.domain : "";
                str += (opt.secure) ? ";secure=" + opt.secure : "";
                document.cookie = str;
                zl.log('Add Cookie [' + opt.name + ']:[' + opt.value + '] Success.');
            }catch(e){
                zl.log('[Function][cookie.add] Add Cookie [' + opt.name + ']:[' + opt.value + '] Failure! ', e);
            }
        },
        get : function(ckName){
            try{
                if(document.cookie.length>0){
                    if(typeof ckName == 'undefined' || ckName == '') return document.cookie.toString();
                    var c_start = document.cookie.indexOf(ckName + "=");
                    if(c_start != -1){
                        c_start = c_start+ckName.length+1;
                        var c_end = document.cookie.indexOf(";",c_start)
                        if(c_end == -1) c_end = document.cookie.length;
                        return unescape(document.cookie.substring(c_start,c_end));
                    }
                }
                return null;
            }catch(e){
                zl.log('[Function][cookie.get] Get Cookie [' + ckName + '] Failure! ', e);
                return null;
            }
        },
        del : function(ckName){
            try{
                var date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = ckName + "=; expires=" + date.toGMTString();
                zl.log('Delete Cookie [' + ckName + '] Success.');
            }catch(e){
                zl.log('[Function][cookie.del] Delete Cookie [' + ckName + '] Failure.');
            }
        }
    };
    /*
     My Check Class
     checkIsNull Check Afferent Object Dom Value Is Null or ''.o:object dom; return (is Null)?true:false;
     checkIsSame Check Afferent Object Dom Value Is Same .o:object dom,r:object dom; return true or false
     checkValLength Check Afferent Object Dom Value Length Is ok.o:object dom,n:min length,x:max length. return true or false
     checkObject Check Afferent Object Dom RegExp Verify.o:object dom,r:RegExp;return true or false;
     */
    zl.check = zl.myCheck = {
        checkIsNull : function(o){
            try{
                if(zl.$(o) == null){
                    if(typeof o == 'string') return (o == '' || o.replace(/(^\s+)|(\s+$i)/g,'') == '');
                    else return false;
                }else{
                    return (zl.$(o).value == '' || zl.$(o).value.replace(/(^\s+)|(\s+$i)/g,'') == '');
                }
            }catch(e){
                return false;
            }
        },
        checkIsSame : function(o,r){
            try{
                if(zl.$(o) == null || zl.$(r) == null){
                    if(typeof o == 'string' && typeof r == 'string') return (o == r);
                    else return false;
                }else{
                    return (zl.$(o).value == zl.$(r).value);
                }
            }catch(e){
                return false;
            }
        },
        checkIsInt : function(o){
            try{
                if(zl.$(o) == null){
                    if(typeof o == 'string' || typeof o == 'number') return !isNaN(o);
                    else return false;
                }else{
                    return !isNaN(zl.$(o).value);
                }
            }catch(e){
                return false;
            }
        },
        checkValLength : function(o,n,x){
            try{
                if(zl.$(o) == null){
                    if(typeof o == 'string') return (n <= o.length && o.length <= x);
                    else return false;
                }else{
                    return (n <= zl.$(o).value.length && zl.$(o).value.length <= x);
                }
            }catch(e){
                return false;
            }
        },
        checkObject : function(o,r){
            try{
                if(zl.$(o) == null){
                    if(typeof o == 'string' && r != undefined) return (o.replace(new RegExp(r,'g'),'') == '');
                    else return false;
                }else{
                    return (zl.$(o).value.replace(new RegExp(r,'g'),'') == '');
                }
            }catch(e){
                return false;
            }
        }
    };
    /*
     Check Object All ChildNodes Images size
     obj		Object
     w		Max Width
     h		Max Height
     */
    zl.checkImage = function(obj,w,h){
        try{
            var ImgCell = zl.$('<img>', zl.$(obj));
            for(var i=0; i<ImgCell.length; i++){
                var ImgWidth = ImgCell(i).width;
                var ImgHeight = ImgCell(i).height;
                if(ImgWidth > w){
                    var newHeight = w*ImgHeight/ImgWidth;
                    if(newHeight <= h){
                        ImgCell(i).width = w;
                        ImgCell(i).height = newHeight;
                    }else{
                        ImgCell(i).height = h;
                        ImgCell(i).width = h*ImgWidth/ImgHeight;
                    }
                }else{
                    if(ImgHeight > h){
                        ImgCell(i).height = h;
                        ImgCell(i).width = h*ImgWidth/ImgHeight;
                    }else{
                        ImgCell(i).width = ImgWidth;
                        ImgCell(i).height = ImgHeight;
                    }
                }
            }
        }catch(e){
            zl.log('[Function][runCode] Check Images Size Max or Min Failure!',e);
        }
    };
    /*
     Check Object Html Dom is Pobj childNodes
     obj		Object
     parent	The ParentNode Object
     return (obj is Pobj ChildNodes)?true:false;
     */
    zl.checkHtml = function(obj,parent){
        try{
            parent = zl.$(parent);
            for(obj = zl.$(obj); obj != document.body; obj = obj.parentNode){
                if(!zl.isset(obj) || obj == null)
                    return false;
                if(obj == parent)
                    return true;
            }
            return false;
        }catch(e){
            zl.log('[Function][checkHtml] Check Object Dom Failure! ', e);
            return false;
        }
    };
    /*
     Get Object Parent Dom
     elem	object
     parent	parent type
     */
    zl.getParent = function(elem,parent){
        try{
            elem = zl.$(elem);
            for(; elem != document.body; elem = elem.parentNode){
                if(elem == undefined || elem == null) return null;
                if(elem.tagName.toLowerCase() == parent.toLowerCase()) return elem;
            }
            return null;
        }catch(e){
            zl.log('[Function][getParent] Get Object Parent Dom Failure! ', e);
            return null;
        }
    };
    /*
     Show Object show or hide
     o 	object
     t	Change Time
     opt	opt obj
     cb	callback
     */
    zl._stips = zl.flash = function(obj,time,opt,callback){
        try{
            var obj = zl.$(obj);
            opt = zl.cd({i:0,x:100,v:5},opt);
            zl._fade(obj, opt.i, opt.v, function(){
                if(callback) callback.call(obj);
                zl._fade(obj, opt.x, opt.v, function(){
                    setTimeout(function(){zl._stips(obj, time, opt, callback); }, time);
                });
            });
        }catch(e){
            zl.log('[Function][flash] Show Object Dom Failure! ', e);
        }
    };
    /*
     change Class Name
     obj 		object
     newclass	New ClassName
     oldclass	Old ClassName
     other		OtherObject
     */
    zl.cc = zl.changDomClass = function(obj,newclass,oldclass,other){
        try{
            obj = zl.$(obj);
            var op = zl.childNodes(obj.parentNode,obj.tagName);
            for(var i=0; i<op.length; i++){
                if(op[i] != obj && op[i] != other && typeof oldclass != 'undefined'){
                    op[i].className = oldclass;
                }else if(op[i] != other && typeof newclass != 'undefined'){
                    op[i].className = newclass;
                }
            }
        }catch(e){
            zl.log('[Function][changeDomClass] Change Dom Class Failure! ', e);
        }
    };
    /*
     Tab
     Tab Object Show or Hide
     */
    zl.tab = zl._tab = function(elem,obj,nclass,oclass){
        try{
            zl.changDomClass(elem,nclass,oclass);
            obj = zl.$(obj);
            var op = zl.childNodes(obj.parentNode,obj.TagName);
            for(var i=0,c=op.length; i<c; i++){
                if(op[i].tagName != 'undefined' && op[i].tagName == obj.tagName){
                    if(op[i] != obj){
                        op[i].style.display = 'none';
                    }else{
                        op[i].style.display = '';
                    }
                }
            }
        }catch(e){
            zl.log('[Function][tag] Tab Object Dom Failure!',e);
        }
    };
    /*
     URL
     Url Option
     */
    zl.url = {
        location : location,
        href : location.href,
        source : document.referrer,
        enurl : function(url,type){
            if(zl.isset(type)){
                return encodeURI(url);
            }else{
                return encodeURIComponent(url);
            }
        },
        deurl : function(url,type){
            if(zl.isset(type)){
                return decodeURI(url);
            }else{
                return decodeURIComponent(url);
            }
        },
        escape : function(url){
            return escape(url);
        },
        unescape : function(url){
            return unescape(url);
        },
        get : function(name,def){
            try{
                if(zl.isset(name)){
                    if(location.search == '') return (zl.isset(def)) ? def : '';
                    var str = location.search.substr(1).split("&");
                    var i = 0;
                    while(str[i] != null) {
                        var keys = str[i].split("=");
                        var j = 0,value = "";
                        while(keys[j] != null) {
                            if(j != 0) value = value + keys[j];
                            j++;
                        }
                        if(keys[0] == name) return value;
                        i++;
                    }
                    return (!zl.isset(def)) ? '' : def;
                }else{
                    return location.search;
                }
            }catch(e){
                zl.log('[function][url][get]['+name+'] Failure! ',e);
            }
        },
        go : function(url,back){
            if(zl.isset(back)){
                window.location.assign(url);	//Back
            }else{
                window.location.replace(url);	//NoBack
            }
        },
        reload : function(op){
            if(zl.isset(op)){
                window.location.reload(true);
            }else {
                window.location.reload();
            }
        }
    };
    /*
     conver Html Label
     con		HTMl Conetnt
     */
    zl.cv = zl.converHtmlLabel = function(con){
        //return document.createElement('div').appendChild(document.createTextNode(con)).parentNode.innerHTML;
        return con.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    };
    /*
     Native Convert Ascii
     */
    zl.ascii = zl.nativeConvertAscii = function(str){
        try{
            var nativecode = str.split('');
            var ascii = '';
            for(var i = 0; i < nativecode.length; i++) {
                var code = Number(nativecode[i].charCodeAt(0));
                if (code > 127){
                    var charAscii = code.toString(16);
                    charAscii = new String('0000').substring(charAscii.length, 4) + charAscii;
                    ascii += '\\u' + charAscii;
                } else {
                    ascii += nativecode[i];
                }
            }
            return ascii;
        }catch(e){
            zl.log('[Function][ascii] Native Convert Ascii Failure!', e);
            return '';
        }
    };
    /*
     Ascii Convert Natvie
     */
    zl.natvie = zl.asciiConvertNative = function(str){
        try{
            var asciicode = str.split('\\u');
            var nativeValue = asciicode[0];
            for (var i = 1; i < asciicode.length; i++) {
                var code = asciicode[i];
                nativeValue += String.fromCharCode(parseInt('0x' + code.substring(0, 4)));
                if(code.length > 4) {
                    nativeValue += code.substring(4, code.length);
                }
            }
            return nativeValue;
        }catch(e){
            zl.log('[Function][natvie] Ascii Convert Native Failure!', e);
            return '';
        }
    }
    /*
     conver Data JSON
     data	Conetnt
     source	JQuery http://code.jquery.com/jquery-1.7.2.js
     */
    zl.json = zl.parseJSON = function(data){
        try{
            if(typeof data !== 'string' || !data){
                return null;
            }
            if(window.JSON && window.JSON.parse){
                return window.JSON.parse(data);
            }
            rvalidchars = /^[\],:{}\s]*$/,
                rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
            if(rvalidchars.test(data.replace(rvalidescape,'@').replace(rvalidtokens,']').replace(rvalidbraces,''))){
                return (new Function('return ' + data))();
            }
            zl.log('Invalid JSON Failure!  ' + data );
        }catch(e){
            zl.log('[Function][json] Invalid Json Data Failure!',e);
            return null;
        }
    };
    /*
     Json Decode
     source https://raw.github.com/kvz/phpjs/master/functions/json/json_decode.js
     */
    zl.json_decode = function(str_json){
        var json = this.window.JSON;
        if (typeof json === 'object' && typeof json.parse === 'function') {
            try {
                return json.parse(str_json);
            } catch (err) {
                if (!(err instanceof SyntaxError)) {
                    throw new Error('Unexpected error type in json_decode()');
                }
                this.php_js = this.php_js || {};
                this.php_js.last_error_json = 4;
                return null;
            }
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var j;
        var text = str_json;

        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a) {
                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }
        if ((/^[\],:{}\s]*$/).
            test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            j = eval('(' + text + ')');
            return j;
        }

        this.php_js = this.php_js || {};
        this.php_js.last_error_json = 4; // usable by json_last_error()
        return null;
    };
    /*
     Json Encode
     source https://raw.github.com/kvz/phpjs/master/functions/json/json_encode.js
     */
    zl.json_encode = function(mixed_val) {
        var retVal, json = this.window.JSON;
        try {
            if (typeof json === 'object' && typeof json.stringify === 'function') {
                retVal = json.stringify(mixed_val);
                if (retVal === undefined) {
                    throw new SyntaxError('json_encode');
                }
                return retVal;
            }
            var value = mixed_val;
            var quote = function (string) {
                var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
                var meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };
                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + string + '"';
            };

            var str = function (key, holder) {
                var gap = '';
                var indent = '    ';
                var i = 0;
                var k = '';
                var v = '';
                var length = 0;
                var mind = gap;
                var partial = [];
                var value = holder[key];

                if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }

                switch (typeof value) {
                    case 'string':
                        return quote(value);
                    case 'number':
                        return isFinite(value) ? String(value) : 'null';
                    case 'boolean':
                    case 'null':
                        return String(value);
                    case 'object':
                        if (!value) {
                            return 'null';
                        }
                        if ((this.PHPJS_Resource && value instanceof this.PHPJS_Resource) || (window.PHPJS_Resource && value instanceof window.PHPJS_Resource)) {
                            throw new SyntaxError('json_encode');
                        }
                        gap += indent;
                        partial = [];
                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || 'null';
                            }
                            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                            gap = mind;
                            return v;
                        }
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                        gap = mind;
                        return v;
                    case 'undefined':
                    case 'function':
                    default:
                        throw new SyntaxError('json_encode');
                }
            };
            return str('', { '': value });
        } catch (err) {
            if (!(err instanceof SyntaxError)) {
                throw new Error('Unexpected error type in json_encode()');
            }
            this.php_js = this.php_js || {};
            this.php_js.last_error_json = 4;
            return null;
        }
    };
    /*
     conver Data XML
     data	Conetnt
     source	JQuery http://code.jquery.com/jquery-1.7.2.js
     */
    zl.xml = zl.parseXML = function(data){
        try{
            if(typeof data !== 'string' || !data){
                return null;
            }
            var xml,tmp;
            try{
                if(window.DOMParser){
                    tmp = new DOMParser();
                    xml = tmp.parseFromString(data,'text/xml');
                }else{
                    xml = new ActiveXObject('Microsoft.XMLDOM');
                    xml.async = 'false';
                    xml.loadXML(data);
                }
            }catch(e){
                xml = undefined;
            }
            if(!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length){
                zl.log('Invalid XML Failure:' + data);
            }
            return xml;
        }catch(e){
            zl.log('[Function][tag] Invalid XML Data Failure!',e);
            return null;
        }
    };
    /*
     MD5
     source: http://pajhome.org.uk/crypt/md5/2.2/md5-min.js
     */
    zl.md5 = {
        hexcase : 0,
        init : function(s){
            return zl.md5.hex_md5(s);
        },
        hex_md5 : function(a){
            return zl.md5.rstr2hex(zl.md5.rstr_md5(zl.md5.str2rstr_utf8(a)));
        },
        hex_hmac_md5 : function(a,b){
            return zl.md5.rstr2hex(zl.md5.rstr_hmac_md5(zl.md5.str2rstr_utf8(a),zl.md5.str2rstr_utf8(b)));
        },
        md5_vm_test : function(){
            return zl.md5.hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";
        },
        rstr_md5 : function(a){
            return zl.md5.binl2rstr(zl.md5.binl_md5(zl.md5.rstr2binl(a),a.length*8));
        },
        rstr_hmac_md5 : function(c,f){
            var e=zl.md5.rstr2binl(c);
            if(e.length>16){
                e=zl.md5.binl_md5(e,c.length*8)
            }
            var a=Array(16),d=Array(16);
            for(var b=0;b<16;b++){
                a[b]=e[b]^909522486;
                d[b]=e[b]^1549556828
            }
            var g=zl.md5.binl_md5(a.concat(zl.md5.rstr2binl(f)),512+f.length*8);
            return zl.md5.binl2rstr(zl.md5.binl_md5(d.concat(g),512+128));
        },
        rstr2hex : function(c){
            try{
                zl.md5.hexcase
            }
            catch(g){
                zl.md5.hexcase = 0;
            }
            var f=zl.md5.hexcase?"0123456789ABCDEF":"0123456789abcdef";
            var b="";
            var a;
            for(var d=0;d<c.length;d++){
                a=c.charCodeAt(d);
                b+=f.charAt((a>>>4)&15)+f.charAt(a&15)
            }
            return b;
        },
        str2rstr_utf8 : function(c){
            var b="";
            var d=-1;
            var a,e;
            while(++d<c.length){
                a=c.charCodeAt(d);
                e=d+1<c.length?c.charCodeAt(d+1):0;
                if(55296<=a&&a<=56319&&56320<=e&&e<=57343){
                    a=65536+((a&1023)<<10)+(e&1023);
                    d++
                }
                if(a<=127){
                    b+=String.fromCharCode(a)
                }else{
                    if(a<=2047){
                        b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))
                    }else{
                        if(a<=65535){
                            b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))
                        }else{
                            if(a<=2097151){
                                b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))
                            }
                        }
                    }
                }
            }
            return b
        },
        rstr2binl : function(b){
            var a=Array(b.length>>2);
            for(var c=0;c<a.length;c++){
                a[c]=0
            }
            for(var c=0;c<b.length*8;c+=8){
                a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)
            }
            return a
        },
        binl2rstr : function(b){
            var a="";
            for(var c=0;c<b.length*32;c+=8){
                a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)
            }
            return a
        },
        binl_md5 : function(p,k){
            p[k>>5]|=128<<((k)%32);
            p[(((k+64)>>>9)<<4)+14]=k;
            var o=1732584193;
            var n=-271733879;
            var m=-1732584194;
            var l=271733878;
            for(var g=0;g<p.length;g+=16){
                var j=o;
                var h=n;
                var f=m;
                var e=l;
                o=zl.md5.md5_ff(o,n,m,l,p[g+0],7,-680876936);
                l=zl.md5.md5_ff(l,o,n,m,p[g+1],12,-389564586);
                m=zl.md5.md5_ff(m,l,o,n,p[g+2],17,606105819);
                n=zl.md5.md5_ff(n,m,l,o,p[g+3],22,-1044525330);
                o=zl.md5.md5_ff(o,n,m,l,p[g+4],7,-176418897);
                l=zl.md5.md5_ff(l,o,n,m,p[g+5],12,1200080426);
                m=zl.md5.md5_ff(m,l,o,n,p[g+6],17,-1473231341);
                n=zl.md5.md5_ff(n,m,l,o,p[g+7],22,-45705983);
                o=zl.md5.md5_ff(o,n,m,l,p[g+8],7,1770035416);
                l=zl.md5.md5_ff(l,o,n,m,p[g+9],12,-1958414417);
                m=zl.md5.md5_ff(m,l,o,n,p[g+10],17,-42063);
                n=zl.md5.md5_ff(n,m,l,o,p[g+11],22,-1990404162);
                o=zl.md5.md5_ff(o,n,m,l,p[g+12],7,1804603682);
                l=zl.md5.md5_ff(l,o,n,m,p[g+13],12,-40341101);
                m=zl.md5.md5_ff(m,l,o,n,p[g+14],17,-1502002290);
                n=zl.md5.md5_ff(n,m,l,o,p[g+15],22,1236535329);
                o=zl.md5.md5_gg(o,n,m,l,p[g+1],5,-165796510);
                l=zl.md5.md5_gg(l,o,n,m,p[g+6],9,-1069501632);
                m=zl.md5.md5_gg(m,l,o,n,p[g+11],14,643717713);
                n=zl.md5.md5_gg(n,m,l,o,p[g+0],20,-373897302);
                o=zl.md5.md5_gg(o,n,m,l,p[g+5],5,-701558691);
                l=zl.md5.md5_gg(l,o,n,m,p[g+10],9,38016083);
                m=zl.md5.md5_gg(m,l,o,n,p[g+15],14,-660478335);
                n=zl.md5.md5_gg(n,m,l,o,p[g+4],20,-405537848);
                o=zl.md5.md5_gg(o,n,m,l,p[g+9],5,568446438);
                l=zl.md5.md5_gg(l,o,n,m,p[g+14],9,-1019803690);
                m=zl.md5.md5_gg(m,l,o,n,p[g+3],14,-187363961);
                n=zl.md5.md5_gg(n,m,l,o,p[g+8],20,1163531501);
                o=zl.md5.md5_gg(o,n,m,l,p[g+13],5,-1444681467);
                l=zl.md5.md5_gg(l,o,n,m,p[g+2],9,-51403784);
                m=zl.md5.md5_gg(m,l,o,n,p[g+7],14,1735328473);
                n=zl.md5.md5_gg(n,m,l,o,p[g+12],20,-1926607734);
                o=zl.md5.md5_hh(o,n,m,l,p[g+5],4,-378558);
                l=zl.md5.md5_hh(l,o,n,m,p[g+8],11,-2022574463);
                m=zl.md5.md5_hh(m,l,o,n,p[g+11],16,1839030562);
                n=zl.md5.md5_hh(n,m,l,o,p[g+14],23,-35309556);
                o=zl.md5.md5_hh(o,n,m,l,p[g+1],4,-1530992060);
                l=zl.md5.md5_hh(l,o,n,m,p[g+4],11,1272893353);
                m=zl.md5.md5_hh(m,l,o,n,p[g+7],16,-155497632);
                n=zl.md5.md5_hh(n,m,l,o,p[g+10],23,-1094730640);
                o=zl.md5.md5_hh(o,n,m,l,p[g+13],4,681279174);
                l=zl.md5.md5_hh(l,o,n,m,p[g+0],11,-358537222);
                m=zl.md5.md5_hh(m,l,o,n,p[g+3],16,-722521979);
                n=zl.md5.md5_hh(n,m,l,o,p[g+6],23,76029189);
                o=zl.md5.md5_hh(o,n,m,l,p[g+9],4,-640364487);
                l=zl.md5.md5_hh(l,o,n,m,p[g+12],11,-421815835);
                m=zl.md5.md5_hh(m,l,o,n,p[g+15],16,530742520);
                n=zl.md5.md5_hh(n,m,l,o,p[g+2],23,-995338651);
                o=zl.md5.md5_ii(o,n,m,l,p[g+0],6,-198630844);
                l=zl.md5.md5_ii(l,o,n,m,p[g+7],10,1126891415);
                m=zl.md5.md5_ii(m,l,o,n,p[g+14],15,-1416354905);
                n=zl.md5.md5_ii(n,m,l,o,p[g+5],21,-57434055);
                o=zl.md5.md5_ii(o,n,m,l,p[g+12],6,1700485571);
                l=zl.md5.md5_ii(l,o,n,m,p[g+3],10,-1894986606);
                m=zl.md5.md5_ii(m,l,o,n,p[g+10],15,-1051523);
                n=zl.md5.md5_ii(n,m,l,o,p[g+1],21,-2054922799);
                o=zl.md5.md5_ii(o,n,m,l,p[g+8],6,1873313359);
                l=zl.md5.md5_ii(l,o,n,m,p[g+15],10,-30611744);
                m=zl.md5.md5_ii(m,l,o,n,p[g+6],15,-1560198380);
                n=zl.md5.md5_ii(n,m,l,o,p[g+13],21,1309151649);
                o=zl.md5.md5_ii(o,n,m,l,p[g+4],6,-145523070);
                l=zl.md5.md5_ii(l,o,n,m,p[g+11],10,-1120210379);
                m=zl.md5.md5_ii(m,l,o,n,p[g+2],15,718787259);
                n=zl.md5.md5_ii(n,m,l,o,p[g+9],21,-343485551);
                o=zl.md5.safe_add(o,j);
                n=zl.md5.safe_add(n,h);
                m=zl.md5.safe_add(m,f);
                l=zl.md5.safe_add(l,e)
            }
            return Array(o,n,m,l)
        },
        md5_cmn : function(h,e,d,c,g,f){
            return zl.md5.safe_add(zl.md5.bit_rol(zl.md5.safe_add(zl.md5.safe_add(e,h),zl.md5.safe_add(c,f)),g),d)
        },
        md5_ff : function(g,f,k,j,e,i,h){
            return zl.md5.md5_cmn((f&k)|((~f)&j),g,f,e,i,h)
        },
        md5_gg : function(g,f,k,j,e,i,h){
            return zl.md5.md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)
        },
        md5_hh : function(g,f,k,j,e,i,h){
            return zl.md5.md5_cmn(f^k^j,g,f,e,i,h)
        },
        md5_ii : function(g,f,k,j,e,i,h){
            return zl.md5.md5_cmn(k^(f|(~j)),g,f,e,i,h)
        },
        safe_add : function(a,d){
            var c=(a&65535)+(d&65535);
            var b=(a>>16)+(d>>16)+(c>>16);
            return(b<<16)|(c&65535)
        },
        bit_rol : function(a,b){
            return(a<<b)|(a>>>(32-b))
        },
        source : 'http://pajhome.org.uk/crypt/md5/2.2/md5-min.js'
    };
    /*
     SHA1
     source: http://pajhome.org.uk/crypt/md5/2.2/sha1-min.js
     */
    zl.sha1 = {
        hexcase : 0,
        b64pad : "",
        init : function(s){
            return zl.sha1.hex_sha1(s);
        },
        hex_sha1 : function(a){
            return zl.sha1.rstr2hex(zl.sha1.rstr_sha1(zl.sha1.str2rstr_utf8(a)))
        },
        hex_hmac_sha1 : function(a,b){
            return zl.sha1.rstr2hex(zl.sha1.rstr_hmac_sha1(zl.sha1.str2rstr_utf8(a),zl.sha1.str2rstr_utf8(b)))
        },
        sha1_vm_test : function(){
            return zl.sha1.hex_sha1("abc").toLowerCase()=="a9993e364706816aba3e25717850c26c9cd0d89d"
        },
        rstr_sha1 : function(a){
            return zl.sha1.binb2rstr(zl.sha1.binb_sha1(zl.sha1.rstr2binb(a),a.length*8))
        },
        rstr_hmac_sha1 : function(c,f){
            var e=zl.sha1.rstr2binb(c);
            if(e.length>16){
                e=zl.sha1.binb_sha1(e,c.length*8)
            }
            var a=Array(16),d=Array(16);
            for(var b=0;b<16;b++){
                a[b]=e[b]^909522486;
                d[b]=e[b]^1549556828
            }
            var g=zl.sha1.binb_sha1(a.concat(zl.sha1.rstr2binb(f)),512+f.length*8);
            return zl.sha1.binb2rstr(zl.sha1.binb_sha1(d.concat(g),512+160))
        },
        rstr2hex : function(c){
            try{
                zl.sha1.hexcase
            }catch(g){
                zl.sha1.hexcase=0
            }
            var f=zl.sha1.hexcase?"0123456789ABCDEF":"0123456789abcdef";
            var b="";
            var a;
            for(var d=0;d<c.length;d++){
                a=c.charCodeAt(d);
                b+=f.charAt((a>>>4)&15)+f.charAt(a&15)
            }
            return b
        },
        str2rstr_utf8 : function(c){
            var b="";
            var d=-1;
            var a,e;
            while(++d<c.length){
                a=c.charCodeAt(d);
                e=d+1<c.length?c.charCodeAt(d+1):0;
                if(55296<=a&&a<=56319&&56320<=e&&e<=57343){
                    a=65536+((a&1023)<<10)+(e&1023);
                    d++
                }
                if(a<=127){
                    b+=String.fromCharCode(a)
                }else{
                    if(a<=2047){
                        b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))
                    }else{
                        if(a<=65535){
                            b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))
                        }else{
                            if(a<=2097151){
                                b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))
                            }
                        }
                    }
                }
            }
            return b
        },
        rstr2binb : function(b){
            var a=Array(b.length>>2);
            for(var c=0;c<a.length;c++){
                a[c]=0
            }
            for(var c=0;c<b.length*8;c+=8){
                a[c>>5]|=(b.charCodeAt(c/8)&255)<<(24-c%32)
            }
            return a
        },
        binb2rstr : function(b){
            var a="";
            for(var c=0;c<b.length*32;c+=8){
                a+=String.fromCharCode((b[c>>5]>>>(24-c%32))&255)
            }
            return a
        },
        binb_sha1 : function(v,o){
            v[o>>5]|=128<<(24-o%32);
            v[((o+64>>9)<<4)+15]=o;
            var y=Array(80);
            var u=1732584193;
            var s=-271733879;
            var r=-1732584194;
            var q=271733878;
            var p=-1009589776;
            for(var l=0;l<v.length;l+=16){
                var n=u;
                var m=s;
                var k=r;
                var h=q;
                var f=p;
                for(var g=0;g<80;g++){
                    if(g<16){
                        y[g]=v[l+g]
                    }
                    else{
                        y[g]=zl.sha1.bit_rol(y[g-3]^y[g-8]^y[g-14]^y[g-16],1)
                    }
                    var z=zl.sha1.safe_add(zl.sha1.safe_add(zl.sha1.bit_rol(u,5),zl.sha1.sha1_ft(g,s,r,q)),zl.sha1.safe_add(zl.sha1.safe_add(p,y[g]),zl.sha1.sha1_kt(g)));
                    p=q;
                    q=r;
                    r=zl.sha1.bit_rol(s,30);
                    s=u;
                    u=z
                }
                u=zl.sha1.safe_add(u,n);
                s=zl.sha1.safe_add(s,m);
                r=zl.sha1.safe_add(r,k);
                q=zl.sha1.safe_add(q,h);
                p=zl.sha1.safe_add(p,f)
            }
            return Array(u,s,r,q,p)
        },
        sha1_ft : function(e,a,g,f){
            if(e<20){
                return(a&g)|((~a)&f)
            }
            if(e<40){
                return a^g^f
            }
            if(e<60){
                return(a&g)|(a&f)|(g&f)
            }
            return a^g^f
        },
        sha1_kt : function(a){
            return(a<20)?1518500249:(a<40)?1859775393:(a<60)?-1894007588:-899497514
        },
        safe_add : function(a,d){
            var c=(a&65535)+(d&65535);
            var b=(a>>16)+(d>>16)+(c>>16);
            return(b<<16)|(c&65535)
        },
        bit_rol : function(a,b){
            return(a<<b)|(a>>>(32-b))
        },
        source : 'http://pajhome.org.uk/crypt/md5/2.2/sha1-min.js'
    };
    /*
     base64_encode
     source: https://raw.github.com/kvz/phpjs/master/functions/url/base64_encode.js
     */
    zl.base64_encode = function(data){
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];
        if (!data) {
            return data;
        }
        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        enc = tmp_arr.join('');
        var r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    };
    /*
     base64_decode
     source: https://raw.github.com/kvz/phpjs/master/functions/url/base64_decode.js
     */
    zl.base64_decode = function(data){
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
        if (!data) {
            return data;
        }
        data += '';
        do { // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;

            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);

        dec = tmp_arr.join('');
        return dec;
    };
    /*
     Disable Select Content
     */
    zl.noselect = zl.DisableSelect = function(elem,isdis){
        try{
            elem = zl.isset(elem) ? zl.$(elem) : document;
            isdis = zl.isset(isdis) ? isdis : false;
            elem.onselectstart = function(){return isdis;}
        }catch(e){
            zl.log('[function][noselect] Failure! ',e);
        }
    };
    /*
     Disable Menu
     */
    zl.nomenu = zl.DisableMenu = function(elem,isdis){
        try{
            elem = zl.isset(elem) ? zl.$(elem) : document;
            isdis = zl.isset(isdis) ? isdis : false;
            elem.oncontextmenu = function(){return isdis;}
        }catch(e){
            zl.log('[function][nomenu] Failure! ',e);
        }
    };
    /*
     Select Elem Callback
     */
    zl.selcall = zl.SelectCallback = function(elem,callback){
        try{
            elem = zl.isset(elem) ? zl.$(elem) : document;
            elem.onmouseup = function(){
                var selDom = window.getSelection().focusNode;
                if(!zl.isset(selDom.tagName)) selDom = selDom.innerText;
                else selDom = selDom.nodeValue;
                if(selDom.length > 0){
                    if(!zl.isset(callback)){
                        //var selcon = (zl.isIE) ? this.ownerDocument.selection.createRange().text : this.ownerDocument.getSelection();
                        //var selcon = (zl.isIE) ? this.ownerDocument.selection.createRange().text : window.getSelection().toString();
                        alert(selDom);
                    }else{
                        zl.run(callback,this);
                    }
                }
            };
        }catch(e){
            zl.log('[function][nomenu] Failure! ',e);
        }
    };
    /*
     Copy Html Or Text
     */
    zl.copy = zl._copy = function(elem,callback){
        try{
            elem = zl.isset(elem) ? zl.$(elem) : document;
            elem.oncopy = function(){
                if(zl.isset(callback) && callback){
                    if(callback != true){
                        zl.run(callback,this);
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            };
        }catch(e){
            zl.log('[function][copy] Failure! ',e);
        }
    };
    /*
     Mouse Roller Option.
     */
    zl.mr = zl.mouseroller = function(elem,callback){
        try{
            elem = zl.isset(elem) ? zl.$(elem) : document;
            elem.onmousewheel = function(){
                if(zl.isset(callback)){
                    zl.run(callback,this);
                }else{
                    var zoom = parseInt(this.style.zoom, 10)||100;
                    zoom += event.wheelDelta/12;
                    if (zoom>0) this.style.zoom = zoom + '%';
                    return false;
                }
            };
        }catch(e){
            zl.log('[function][mouseroller] Failure! ',e);
        }
    };
    /*
     String To HexChar 16x
     */
    zl.sTHex = zl.strToHexCharCode = function(str,s){
        if(str === '') return "";
        if(!zl.isset(s)) s = '';
        var hexCharCode = [];
        hexCharCode.push("0x");
        for(var i = 0; i < str.length; i++){
            hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join(s);
    };
    /*
     HexChar To String 16x
     */
    zl.hexToStr = zl.hexCharCodeToStr = function(hexCharCodeStr,s){
        var trimedStr = hexCharCodeStr.trim();
        var rawStr = trimedStr.substr(0,2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
        var len = rawStr.length;
        if(len % 2 !== 0 && !zl.isset(s)) {
            zl.log('hexCharCodeToStr Error. Illegal Format ASCII Code!');
            return '';
        }
        var curCharCode;
        var resultStr = [];
        if(!zl.isset(s)){
            for(var i = 0; i < len;i = i + 2) {
                curCharCode = parseInt(rawStr.substr(i, 2), 16);   // ASCII Code Value
                resultStr.push(String.fromCharCode(curCharCode));
            }
        }else{
            var arr = rawStr.split(s);
            for(var i = 0; i < arr.length; i++){
                curCharCode = parseInt(arr[i], 16);   // ASCII Code Value
                resultStr.push(String.fromCharCode(curCharCode));
            }
        }
        return resultStr.join("");
    };

    /*
     Base64 encode / decode
     http://www.webtoolkit.info/
     */
    zl.base64 = zl.Base64 = {
        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = zl.Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        // public method for decoding
        decode : function (input) {
            var output = [];
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            var l = input.length;
            while (i < l) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output.push(String.fromCharCode(chr1));
                if (enc3 != 64) {
                    output.push(String.fromCharCode(chr2));
                }
                if (enc4 != 64) {
                    output.push(String.fromCharCode(chr3));
                }
            }
            return this._utf8_decode(output.join(''));

        },
        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = [];
            var i = 0, l = utftext.length;
            var c = 0, c1 = 0, c2 = 0, c3 = 0;
            while(i < l) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string.push(String.fromCharCode(c));
                    i++;
                }else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string.push(String.fromCharCode(((c & 31) << 6) | (c2 & 63)));
                    i += 2;
                }else{
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string.push(String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)));
                    i += 3;
                }
            }
            return string.join('');
        }
    };

    /*
     Dialog
     */
    zl.dialog = zl.alert = function(opt){
        var df_opt = {title:'Title', titlecss:'width:100%;text-align:right;height:30px;line-height:30px;background:#09baea;', width:'500', height:'400', content:'', lock:false, cother:true, drag:true, close:true, esc:true};
        if(typeof opt == 'string') opt = {content:opt};
        opt = zl.cd(df_opt,opt);
        if(opt.cother){
            zl.zcloseDialog();
        }
        if(opt.lock){
            window._zLockBG = zl.create({id:'zlockbg',cssText:'width:100%;height:100%;background:#000;z-index:9999; filter:alpha(opacity=60);opacity:0.6;position:fixed;_position:absolute;top:0px;left:0px;right:0px;bottom:0px;_bottom:0px;color:red;_width:'+document.documentElement.offsetWidth+'px;_height:'+document.body.offsetHeight+'px;'});
        }
        var content = '<div style="'+opt.titlecss+'"><div style="float:left;padding-left:5px;"><strong style="color:#fff;">'+opt.title+'</strong></div>';
        if(opt.close) content += '<a href="javascript:;" onclick="zl.zcloseDialog()" style="color:#fff;font-size:14px;margin-right:8px;">\u5173\u95ed</a>';
        content += '</div><div style="text-align:left;overflow:auto;width:'+(opt.width-20)+'px;height:'+(opt.height == 'auto' ? '100%' : (opt.height-50)+'px')+';padding:10px;">'+opt.content+'</div>';
        /*
         var loc = zl.loc(window._zLockBG);
         if(loc == null){
         var loc = {width:window.innerWidth,height:window.innerHeight};
         }
         */
        window._zShowDialog = zl.create({cssText:'width:'+opt.width+'px;height:'+(opt.height == 'auto' ? 'auto' : opt.height+'px')+';left:50%;top:50%;background:#FFF;z-index:99999; position:fixed;_position:absolute;margin-top:-'+(opt.height == 'auto' ? '0' : (opt.height/2))+'px;margin-left:-'+(opt.width/2)+'px;text-align:center;overflow:auto;border-radius:5px; box-shadow:0 5px 15px rgba(2, 37, 69, .4); -moz-transition:-moz-box-shadow linear .2s; -webkit-transition: -webkit-box-shadow linear .2s; transition: -webkit-box-shadow linear .2s;',content:content});
        if(opt.height == 'auto'){
            var loc = zl.loc(window._zShowDialog);
            window._zShowDialog.style.cssText = window._zShowDialog.style.cssText + ';margin-top:-' + (loc.height/2) + 'px;';
        }
        if(opt.drag){
            zl.drag(window._zShowDialog,{Handle:zl.$('<div>',window._zShowDialog)[0]});
        }
        if(opt.esc) zl.key.add('esc',function(){ zl.zcloseDialog(); });
        return window._zShowDialog;
    };

    /*
     close dialog
     */
    zl.zcloseDialog = function(){
        if(window._zShowDialog != null){
            zl.remove(window._zShowDialog);
        }
        if(window._zLockBG != null){
            zl.remove(window._zLockBG);
        }
        zl.key.remove('esc');
    };
    /*
     Init Object Elem
     */
    zl.oninit = zl.obj_elem_oninit = function(elems,str,callback){
        var elems = zl.$(elems);
        if(elems != null){
            if(typeof elems.length != 'undefined'){
                if(elems.length > 0){
                    for(var i = 0; i < elems.length; i++){
                        eval('var __onval = elems[i].'+str+';');
                        if(zl.att(elems[i],'zatt_'+str) != 'true' || __onval == null){
                            zl.att(elems[i], str, callback);
                            zl.att(elems[i],'zatt_'+str,'true');
                            zl.log('Init Event, ('+zl.att(elems[i],'type')+') '+zl.att(elems[i],'name')+'  -> '+str);
                        }
                    }
                }
            }else{
                eval('var __onval = elems[i].'+str+';');
                if(zl.att(elems,'zatt_'+str) != 'true' || __onval == null){
                    zl.att(elems, str, callback);
                    zl.att(elems,'zatt_'+str,'true');
                    zl.log('Init Event, ('+zl.att(elems[i],'type')+') '+zl.att(elems[i],'name')+'  -> '+str);
                }
            }
        }
    };
    /*
     foreach
     */
    zl.each = zl.foreach = function(elems,callback){
        var elems = zl.$(elems);
        if(elems != null){
            if(typeof elems.length != 'undefined'){
                if(elems.length > 0){
                    for(var i = 0; i < elems.length; i++){
                        zl.run(callback,null,i,elems[i]);
                    }
                }
            }else{
                //zl.run(callback,null,0,elems);
                for(var i in elems){
                    zl.run(callback,null,i,elems[i]);
                }
            }
        }
    };
    /*
     Preview Local Image
     */
    zl.plimg = zl.previewLocalImage = function(elem,img,callback){
        if(!zl.isset(window.__PreviewLocalImages)) window.__PreviewLocalImages = new Array();
        if(zl.isset(img)){
            var _key_img = new Date().getTime() + zl.r(1000,9999);
            window.__PreviewLocalImages[_key_img] = img;
            zl.att(elem,'__plimg_img__',_key_img);
        }
        if(zl.isset(callback)){
            var _key_cb = new Date().getTime() + zl.r(1000,9999);
            window.__PreviewLocalImages[_key_cb] = callback;
            zl.att(elem,'__plimg_cb__',_key_cb);
        }
        zl.att(elem,'onchange',function(){
            var url = null;
            var file = null;
            if(zl.isset(this.files)){
                file = this.files[0];
            }
            if(zl.isset(window.createObjectURL)){
                url = window.createObjectURL(file);
            }else if(zl.isset(window.URL)){
                url = window.URL.createObjectURL(file);
            }else if(zl.isset(window.webkitURL)){
                url = window.webkitURL.createObjectURL(file);
            }else{
                url = 'file:///' + this.value;
            }
            var img = zl.att(this,'__plimg_img__');
            if(img != null && window.__PreviewLocalImages[img] != null) window.__PreviewLocalImages[img].src = url;
            var cb = zl.att(this,'__plimg_cb__');
            if(cb != null && window.__PreviewLocalImages[cb] != null) zl.run(window.__PreviewLocalImages[cb],null,this,window.__PreviewLocalImages[img],url);
        });
    };
    /*
     Check PassWord Level
     */
    zl.checkPasswordLevel = zl.cpwdlevel = function(){
        this.CharMode = function(iN){
            if(iN>=48 && iN <=57) return 1;
            if(iN>=65 && iN <=90) return 2;
            if(iN>=97 && iN <=122) return 4;
            else return 8;
        };
        this.bitTotal = function(num){
            var modes = 0;
            for(var i = 0; i < 4; i++){
                if (num & 1) modes++;
                num>>>=1;
            }
            return modes;
        };
        this.init = function(elem){
            elem = zl.$(elem);
            return this.initStr(elem.value);
        };
        this.initStr = function(str){
            var sPwd = str;
            if(sPwd.length <= 4){
                return 0;
            }else{
                var Modes = 0;
                for(var i = 0; i < sPwd.length; i++){
                    Modes|=this.CharMode(sPwd.charCodeAt(i));
                }
                return this.bitTotal(Modes);
            }
        };
    };
    /*
     Event Bind and UnBind
     */
    zl.event = {
        handleHash : {},
        bind : function(elem, type, callback, only){
            elem = zl.$(elem);
            /* var _callback = function(){
             zl.run(callback,elem);
             }; */
            if(zl.isset(only)){
                zl.event.unbind(elem, type);
            }
            if (window.addEventListener) {
                elem.addEventListener(type, callback);
            }else if(window.attachEvent) {
                elem.attachEvent('on' + type, callback);
            }
            this.handleHash[type] = this.handleHash[type] || [];
            //this.handleHash[type].push(arguments.callee);
            this.handleHash[type].push(callback);
        },
        unbind : function(elem, type, callback) {
            elem = zl.$(elem);
            if(this.handleHash[type]){
                zl.each(this.handleHash[type],function(i,hash){
                    if(zl.isset(callback) && hash != callback) return;
                    if (window.addEventListener) {
                        elem.removeEventListener(type, hash, false);
                    }else if (window.attachEvent) {
                        elem.removeEventListener('on'.type, hash, false);
                    }
                });
            }
        }
    };
    /*
     Get Next Element
     */
    zl.elem = {
        next : function(elem,tag){
            if(zl.isset(tag)){
                var _elem = zl.elem.next(elem);
                if(_elem != null){
                    while(_elem != null && typeof _elem != 'string' && _elem.tagName.toLowerCase() != tag.toLowerCase() ){
                        _elem = zl.elem.next(_elem);
                    }
                }
                return _elem;
            }else{
                return zl.$(elem).nextElementSibling;
            }
        },
        nextAll : function(elem,tag){
            var allElem = new Array();
            var _elem = zl.elem.next(elem);
            while(_elem != null){
                if(zl.isset(tag)){
                    if(typeof _elem != 'string' && _elem.tagName.toLowerCase() == tag.toLowerCase()) allElem.push(_elem);
                }else{
                    allElem.push(_elem);
                }
                _elem = zl.elem.next(_elem);
            }
            return allElem;
        },
        prev : function(elem,tag){
            if(zl.isset(tag)){
                var _elem = zl.elem.prev(elem);
                while(_elem != null && typeof _elem != 'string' && _elem.tagName.toLowerCase() != tag.toLowerCase() ){
                    _elem = zl.elem.prev(_elem);
                }
                return _elem;
            }else{
                return zl.$(elem).previousElementSibling;
            }
        },
        prevAll : function(elem,tag){
            var allElem = new Array();
            var _elem = zl.elem.prev(elem);
            while(_elem != null){
                if(zl.isset(tag)){
                    if(typeof _elem != 'string' && _elem.tagName.toLowerCase() == tag.toLowerCase()) allElem.push(_elem);
                }else{
                    allElem.push(_elem);
                }
                _elem = zl.elem.prev(_elem);
            }
            return allElem;
        },
        parent : function(elem,tag){
            if(zl.isset(tag)){
                var _elem = zl.elem.parent(elem);
                while(_elem != null && typeof _elem != 'string' && _elem.tagName.toLowerCase() != tag.toLowerCase() ){
                    _elem = zl.elem.parent(_elem);
                }
                return _elem;
            }else{
                return zl.$(elem).parentNode;
            }
        },
        parentAll : function(elem,tag){
            var allElem = new Array();
            var _elem = zl.elem.parent(elem);
            while(_elem != null){
                if(zl.isset(tag)){
                    if(typeof _elem != 'string' && _elem.tagName.toLowerCase() == tag.toLowerCase()) allElem.push(_elem);
                }else{
                    allElem.push(_elem);
                }
                _elem = zl.elem.parent(_elem);
            }
            return allElem;
        }
    };

    zl.ready();

    window.zl = window.z = window._zl = window._z = zl;

})(window);