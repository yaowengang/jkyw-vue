<template>
  <div class="present" id="getWidth">
    <top :title="title"></top>
    <div class="score">
      <h4>当前状态分数</h4>
      <div class="score-number">{{score}}<span>分</span></div>
      <p>亚健康 | 一项指标异常</p>
    </div>
    <div id="main2" class="chart2">

    </div>
    <ul class="supplement">
      <li>
        <h4>{{reason.reasonName}}</h4>
        <p>{{reason.reasonContent}}</p>
      </li>
      <li>
        <h4>改善意见</h4>
        <p>{{reason.advice}}</p>
      </li>
    </ul>

    <div class="list">
      <h3><span>改善方案</span></h3>
      <ul class="list-ul">
        <li v-for="items in schemeInfos">
          <div class="list-img">
            <div class="img-box"><img :src="items.picurl"></div>
          </div>
          <div class="list-right">
            <h4>{{items.name}}</h4>
            <p>积分:{{score}}</p>
            <div class="btn">加入</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="list">
      <h3><span>推荐医生</span><a href="#">更多 &gt;</a></h3>
      <ul class="list-ul">
        <li v-for="items in doctors" :key="items.id" @click="go(items.doctors_id)">
          <div class="list-img">
            <div class="img-box"><img :src="items.picture"></div>
          </div>
          <div class="list-right">
            <h4>{{items.name}}</h4>
            <p class="recommend">{{items.job}}<span>{{items.organ.name}}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../commom/top2.vue'
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        title: '当前状态',
        score:'',
        doctors:[],
        keyword:[],
        reason:[],
        schemeInfos:[],
        mW:0, // 宽
        mH:0,
        mData: [],
        mDataCoke:[],
        mCount: 0, //边数
        mCenter: 0, // 中心点
        mRadius: 0, // 半径
        mAngle: 0, // 角度
        mCtx: null,
        mColorPolygon: 'rgba(240, 240, 240, 0.5)', //多边形颜色
        mColorLines:'rgba(240, 240, 240, 0.7)', //顶点连线颜色
        mColorText: '#8bd9fd'
      }
    },
    props: [],
    computed: {
      ...mapGetters(['getsubquest'])
    },
    created () {
      let pp = new Promise(rs => rs(this.$store.dispatch('getsubquestApi')))
      pp.then(() =>{
        let pargetsubquest = this.getsubquest
        this.score = pargetsubquest.score
        this.doctors = pargetsubquest.doctors
        this.reason = pargetsubquest.reason
        this.schemeInfos = pargetsubquest.schemeInfos
        let keyword = pargetsubquest.keyword
        //console.log(pargetsubquest)
        for (var index = 0; index < keyword.length; index++) {
            let keywordName = keyword[index].keywordName;
            let percentage = keyword[index].percentage;
            var sw = [keywordName,percentage];
            this.mDataCoke.push(sw)
        }
        this.mData =  this.mDataCoke;
        this.mW = window.document.getElementById('getWidth').offsetWidth;
        this.mH = this.mW;
        this.mCount = this.mData.length;
        this.mCenter = this.mW/2;
        this.mRadius = this.mCenter - 50;
        this.mAngle = (Math.PI * 2 / this.mCount);
        this.draw();
        /*console.log(this.getsubquest)*/
      })
    },
    methods: {
      draw() {
        var canvas = document.createElement('canvas');
        document.getElementById('main2').appendChild(canvas);
        canvas.height = this.mH;
        canvas.width = this.mW;
        this.mCtx = canvas.getContext('2d');
        this.drawPolygon(this.mCtx);
        this.drawLines(this.mCtx);
        this.drawText(this.mCtx);
        this.drawRegion(this.mCtx);
      },
      // 绘制多边形边
      drawPolygon(ctx) {
        ctx.save();
        ctx.strokeStyle = this.mColorPolygon;
        var r = this.mRadius/ this.mCount; //单位半径
        //画6个圈
        for(var i = 0; i < this.mCount; i ++){
          ctx.beginPath();
          var currR = r * ( i + 1); //当前半径

          ctx.arc(this.mCenter, this.mH/2, currR, 0, Math.PI *2, true);
          if (i == 1) {
            ctx.fillStyle = 'rgba(224, 238, 252, 0.9)';
          }else if (i ==2) {
            ctx.fillStyle = 'rgba(238, 246, 254, 0.7)';
          }else if (i == 3) {
            ctx.fillStyle = 'rgba(247, 251, 255, 0.5)';
          }else{
            var a = parseFloat(1 - i*0.2).toFixed(1); //console.log(a);
            var b = "rgba(252, 254, 255," + a + ")";
            ctx.fillStyle = b;
          }

          ctx.fill();
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      },
      //顶点连线
      drawLines(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = this.mColorLines;

        for(var i = 0; i < this.mCount; i ++){
          var x = this.mCenter + this.mRadius * Math.cos((this.mAngle * i)-0.5*Math.PI);
          var y = this.mCenter + this.mRadius * Math.sin((this.mAngle * i)-0.5*Math.PI);

          ctx.moveTo(this.mCenter, this.mCenter);
          ctx.lineTo(x, y);
        }

        ctx.stroke();

        ctx.restore();
      },
      //绘制文本
      drawText(ctx) {
        ctx.save();

        var fontSize = this.mCenter / 12;
        ctx.font = fontSize + 'px Microsoft Yahei';
        ctx.fillStyle = this.mColorText;

        for(var i = 0; i < this.mCount; i ++){
          var x = this.mCenter + this.mRadius * Math.cos((this.mAngle * i)-0.5*Math.PI);
          var y = this.mCenter + this.mRadius * Math.sin((this.mAngle * i)-0.5*Math.PI);

          if( this.mAngle * i >= 0 && this.mAngle * i <= Math.PI / 2 ){
            if (i == 0) {
              ctx.fillText(this.mData[i][0], x - ctx.measureText(this.mData[i][0]).width*0.5, y - (fontSize)*0.4 );
            }else{
              ctx.fillText(this.mData[i][0], x, y );
            }

          }else if(this.mAngle * i > Math.PI / 2 && this.mAngle * i <= Math.PI){
            if (i == this.mCount/2) {
              ctx.fillText(this.mData[i][0], x - ctx.measureText(this.mData[i][0]).width*0.5, y + fontSize);
            }else{
              ctx.fillText(this.mData[i][0], x , y + fontSize);
            }

          }else if(this.mAngle * i > Math.PI && this.mAngle * i <= Math.PI * 3 / 2){

            ctx.fillText(this.mData[i][0], x - ctx.measureText(this.mData[i][0]).width, y + (fontSize)*0.5);
          }else{

            ctx.fillText(this.mData[i][0], x - ctx.measureText(this.mData[i][0]).width, y );
          }

        }

        ctx.restore();
      },
      //绘制数据区域
      drawRegion(ctx) {
        ctx.save();

        ctx.beginPath();
        for(var i = 0; i < this.mCount; i ++){
          var x = this.mCenter + this.mRadius * Math.cos((this.mAngle * i)-0.5*Math.PI) * this.mData[i][1] / 100;
          var y = this.mCenter + this.mRadius * Math.sin((this.mAngle * i)-0.5*Math.PI) * this.mData[i][1] / 100;

          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = '#59bdff';
        ctx.fill();

        ctx.restore();
      },
      go(id) {
        this.$router.push({
          path: "/physicianDetails",
          query: {
            id: id
          }
        });
      }
    },
    components: {
      top
    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../static/css/reset.css';
  body {
    background: #f6f6f6 !important;
  }
  .present .score {
    background: #fff;
    padding: 1.3rem 0 2.1rem 0;
    margin-top: 4.5rem;
  }
  .present .score h4 {
    text-align: center;
    font-size: 1.2rem;
  }
  .score .score-number {
    font-size: 5.7rem;
    font-weight: 900;
    text-align: center;
  }
  .score .score-number span {
    font-size: 1.5rem;
    font-weight: normal;
  }
  .score p {
    font-size: 1.2rem;
    color: #969595;
    text-align: center;
  }
  .chart2 {
    width: 100%;
    background: #fff;
  }
  .supplement {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
    margin-top: 0.5rem;
  }
  .supplement li {
    padding: 1rem 1.5rem;
    border-bottom: solid 1px #f5f5f5;
  }
  .supplement li h4 {
    font-size: 1.4rem;
    text-align: left;
    margin-bottom: 0.8rem;
  }
  .supplement li p {
    margin-top: 0.2rem;
    font-size: 1.1rem;
    color: #808080;
    text-align: left;
  }
  .list h3 {
    padding: 1.4rem 1rem;
  }
  .list h3 span {
    display: inline-block;
    font-size: 1.5rem;
    border-left: solid 3px #03a9f4;
    padding-left: 0.6rem;
  }
  .list .list-ul {
    width: 100%;
    background: #FFFFFF;
  }
  .list .list-ul li {
    overflow: hidden;
  }
  .list .list-ul li .list-img {
    float: left;
    width: 25%;
  }
  .list .list-ul li .list-img .img-box {
    width: 4.4rem;
    height: 4.4rem;
    margin: 2rem auto 0;
    border-radius: 50%;

  }
  .list-ul li .list-img .img-box img {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .list .list-ul li .list-right {
    position: relative;
    float: right;
    width: 75%;
    padding: 1.5rem 0;
    border-bottom: solid 1px #eaf5ff;
  }
  .list .list-ul li .list-right h4 {
    font-size: 1.4rem;
  }
  .list .list-ul li .list-right p {
    font-size: 1.1rem;
    color: #a9a9a9;
    margin-top: 1rem;
  }
  .list .list-ul li .list-right .btn {
    position: absolute;
    width: 23%;
    border: solid 1px #03a9f4;
    text-align: center;
    padding: 0.5rem 0;
    right: 1.8rem;
    top: 50%;
    -webkit-transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }
  .present .list h3 a {
    display: inline-block;
    font-size: 1.3rem;
    color: #cdcdcd;
    float: right;
  }
  .present .list .list-ul li .list-right .recommend {
    font-size: 1.2rem;
    color: #4f4f4f;
  }
  .list .list-ul li .list-right .recommend span {
    margin-left: 0.8rem;
  }
</style>
