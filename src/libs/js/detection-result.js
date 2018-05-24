exports.install = function(Vue, options) {
  Vue.prototype.canvas = function (val){

    var a = $('#canvas-box').width() * 0.6;
    var b = a / 6;
    var c = a * 0.8;
    $("#canvas").attr("width", a);
    $("#canvas").attr("height", c);
    $('#canvas-box').css("height", c);


    var canvas = document.getElementById('canvas'), //获取canvas元素
      context = canvas.getContext('2d'), //获取画图环境，指明为2d
      centerX = canvas.width / 2, //Canvas中心点x轴坐标
      centerY = canvas.height / 2, //Canvas中心点y轴坐标
      rad = Math.PI * 2 / 100, //将360度分成100份，那么每一份就是rad度
      speed = 0; //加载的快慢就靠它了
    var itarget = val;


    //绘制蓝色外圈
    function blueCircle(n) {
      context.save();
      context.strokeStyle = "#03a9f4"; //设置描边样式
      context.lineWidth = a / 18; //设置线宽
      context.beginPath(); //路径开始
      context.lineCap = "round";
      context.arc(centerX, centerY, a / 3, -Math.PI / 2, -Math.PI / 2 + n * rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      context.stroke(); //绘制
      context.closePath(); //路径结束
      context.restore();
    }
    //绘制白色外圈
    function whiteCircle() {
      // context.save();
      context.lineWidth = a / 18;
      context.strokeStyle = "#88cdec";
      context.beginPath();

      context.arc(centerX, centerY, a / 3, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();
      // context.restore();
    }
    //百分比文字绘制
    function text(n) {
      context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
      context.fillStyle = "#03a9f4"; //设置描边样式
      context.font = b + 'px Arial'; //设置字体大小和字体
      //绘制字体，并且指定位置
      context.fillText(n.toFixed(0) + "分", centerX - a / 8, centerY + 10);
      context.stroke(); //执行绘制
      context.restore();
    }

    function drawFrame() {
      window.requestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (speed >= itarget) {
        speed = itarget;
        // console.log(speed);
      } else {
        speed += 3;
      }
      whiteCircle();
      text(speed);
      blueCircle(speed);

      $('.score-text').text(speed);
    }

    module.exports = drawFrame();

  }
}
