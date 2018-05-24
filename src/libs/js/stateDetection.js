/**
 * Created by wellness on 2017/7/5.
 */
var mW = parseInt($(".present").width() * 0.95);
var mH = mW;
var mData = [
    ['营养', 50],
    ['运动', 50],
    ['热平衡', 60],
    ['热平衡', 60],
    ['心理', 55],
    ['用药', 77]
];
var mCount = mData.length; //边数
var mCenter = mW / 2; //中心点
var mRadius = mCenter - 50; //半径(减去的值用于给绘制的文本留空间)
var mAngle = (Math.PI * 2 / mCount); //角度
//console.log(Math.PI * 2);
var mCtx = null;
var mColorPolygon = 'rgba(240, 240, 240, 0.5)'; //多边形颜色
var mColorLines = 'rgba(240, 240, 240, 0.7)'; //顶点连线颜色
var mColorText = '#8bd9fd';

var cLeft = parseInt(($(".present").width() - mW) * 0.5);


//初始化
(function() {
    var canvas = document.createElement('canvas');
    document.getElementById('main2').appendChild(canvas);
    canvas.height = mH;
    canvas.width = mW;
    mCtx = canvas.getContext('2d');

    drawPolygon(mCtx);
    drawLines(mCtx);
    drawText(mCtx);
    drawRegion(mCtx);
    //drawCircle(mCtx);
    $("#main2 canvas").css("margin-left", cLeft + 'px');
})();

// 绘制多边形边
function drawPolygon(ctx) {
    ctx.save();

    ctx.strokeStyle = mColorPolygon;
    var r = mRadius / mCount; //单位半径
    //画6个圈
    for (var i = 0; i < mCount; i++) {
        ctx.beginPath();
        var currR = r * (i + 1); //当前半径

        ctx.arc(mCenter, mH / 2, currR, 0, Math.PI * 2, true);
        if (i == 1) {
            ctx.fillStyle = 'rgba(224, 238, 252, 0.9)';
        } else if (i == 2) {
            ctx.fillStyle = 'rgba(238, 246, 254, 0.7)';
        } else if (i == 3) {
            ctx.fillStyle = 'rgba(247, 251, 255, 0.5)';
        } else {
            var a = parseFloat(1 - i * 0.2).toFixed(1); //console.log(a);
            var b = "rgba(252, 254, 255," + a + ")";
            ctx.fillStyle = b;
        }

        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    ctx.restore();
}

//顶点连线
function drawLines(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = mColorLines;

    for (var i = 0; i < mCount; i++) {
        var x = mCenter + mRadius * Math.cos((mAngle * i) - 0.5 * Math.PI);
        var y = mCenter + mRadius * Math.sin((mAngle * i) - 0.5 * Math.PI);

        ctx.moveTo(mCenter, mCenter);
        ctx.lineTo(x, y);

    }

    ctx.stroke();

    ctx.restore();
}

//绘制文本
function drawText(ctx) {
    ctx.save();

    var fontSize = mCenter / 12;
    ctx.font = fontSize + 'px Microsoft Yahei';
    ctx.fillStyle = mColorText;

    for (var i = 0; i < mCount; i++) {
        var x = mCenter + mRadius * Math.cos((mAngle * i) - 0.5 * Math.PI);
        var y = mCenter + mRadius * Math.sin((mAngle * i) - 0.5 * Math.PI);

        if (mAngle * i >= 0 && mAngle * i <= Math.PI / 2) {
            if (i == 0) {
                ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width * 0.5, y - (fontSize) * 0.4);
            } else {
                ctx.fillText(mData[i][0], x, y);
            }

        } else if (mAngle * i > Math.PI / 2 && mAngle * i <= Math.PI) {
            if (i == mCount / 2) {
                ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width * 0.5, y + fontSize);
            } else {
                ctx.fillText(mData[i][0], x, y + fontSize);
            }

        } else if (mAngle * i > Math.PI && mAngle * i <= Math.PI * 3 / 2) {

            ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y + (fontSize) * 0.5);
        } else {

            ctx.fillText(mData[i][0], x - ctx.measureText(mData[i][0]).width, y);
        }

    }

    ctx.restore();
}

//绘制数据区域
function drawRegion(ctx) {
    ctx.save();

    ctx.beginPath();
    for (var i = 0; i < mCount; i++) {
        var x = mCenter + mRadius * Math.cos((mAngle * i) - 0.5 * Math.PI) * mData[i][1] / 100;
        var y = mCenter + mRadius * Math.sin((mAngle * i) - 0.5 * Math.PI) * mData[i][1] / 100;

        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = '#59bdff';
    ctx.fill();

    ctx.restore();
}

//画点
function drawCircle(ctx) {
    ctx.save();

    var r = mCenter / 18;
    for (var i = 0; i < mCount; i++) {
        var x = mCenter + mRadius * Math.cos(mAngle * i) * mData[i][1] / 100;
        var y = mCenter + mRadius * Math.sin(mAngle * i) * mData[i][1] / 100;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fill();
    }

    ctx.restore();
}