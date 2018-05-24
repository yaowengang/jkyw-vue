<template>
  <div>
     <textarea class="height-auto" :maxlength="maxlength" placeholder="请输入相关评价信息！" v-model="textareVal">{{ textareVal }}</textarea>
     <span class="lengthWarring">{{ maxlength }}字以内</span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        textareVal:'',
        maxlength:'500'
      }
    },
    mounted(){
    },
    watch:{
      'textareVal':{
        handler:function(val,oldVal){
          function setHeight(element) {
            $(element).css({'overflow-y': 'hidden', 'height': '2rem'}).height(element.scrollHeight);
          }
          $('.height-auto').each(function () {
            setHeight(this);
          }).on('input', function () {
            setHeight(this);
          });
          this.$emit('ChildtextareVal',val)
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  textarea{
    width: 100%;
    height: 2rem;
    max-height: 16rem;
    border: none;
    border-bottom: solid 1px #f5f5f5;
    font-size: 1.1rem;
  }
  .lengthWarring{
    display: inline-block;
    position: absolute;
    bottom: 1.8rem;
    right: 3%;
  }
</style>
