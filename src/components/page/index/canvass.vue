<template>
  <div id="canvas-box">
    <canvas id="canvas">{{detectionScore}}</canvas>
  </div>
</template>


<script>
/*import s from '../libs/js/detection-result.js'*/
/*var drawFrame = require('../libs/js/detection-result.js')*/
export default {
    data() {
        return {

        }
    },
    props:[
      'detectionScore'
    ],
    methods: {

    },
    mounted() {
        this.canvas(this.detectionScore)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
