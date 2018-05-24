/**
 * Created by wellness on 2017/7/5.
 */
var m = 0;
var $el = $('.Percentage_num');
var $per = $('.Percentage');
var PercentageNum = $el.text();
$el.css('width',0);

var timer = setInterval(function ss(){
  if(m > PercentageNum){
    clearInterval(timer);
  } else {
    $el.css('width',PercentageNum+'%');
    $el.text(m++ +'%' );
    var runText = $el.text();
    if(parseInt(runText)<20){
      $per.addClass('red')
    } else if(parseInt(runText)<60 ){
      $per.addClass('yellow').removeClass('red')
    } else {
      $per.addClass('green').removeClass('yellow')
    }
  }
},20);




