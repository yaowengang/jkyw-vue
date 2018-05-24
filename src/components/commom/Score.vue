<template>
  <div>
    <div class="star-appraise">
      <span id="star" data-number="5">
        <img src="/static/image/star-off.png" alt="1" title="bad">&nbsp;
        <img src="/static/image/star-off.png" alt="2" title="poor">&nbsp;
        <img src="/static/image/star-off.png" alt="3" title="regular">&nbsp;
        <img src="/static/image/star-off.png" alt="4" title="good">&nbsp;
        <img src="/static/image/star-off.png" alt="5" title="gorgeous">
        <input type="hidden" name="score">
      </span>
      <div class="pingjia clear" id="appraise">
        <span id="pingjia">{{ scorenum }}</span>星评价
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        scorenum:'',
        selectType:0,
      }
    },
    mounted(){
      //星级评价
    let _this = this;
      $("#star").find('img').on('click',function(){
        $("#appraise").show();
        let num = parseInt($(this).attr('alt'));
        _this.scorenum = num;
        $("#star").find('img').attr('src','/static/image/star-off.png')
        $("#star").find('img:lt('+num+')').attr('src','/static/image/star-on.png')
        //this.$dispatch('aa')
       // $("#pingjia").text(a);
       // console.log(_this.scorenum)
      });
    },
      watch:{
        'scorenum':function (val) {
          this.$emit('Childscorenum',val)
        }
      }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.star-appraise{
  padding: 1.2rem 1rem;
  background: #ffffff;
  overflow: hidden;
  .pingjia{
    float: right;
    font-size: 1.3rem;
    color: #03a9f4;
    display: none;
  }
}
</style>
