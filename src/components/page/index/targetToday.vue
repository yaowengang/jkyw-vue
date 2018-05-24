<template>
    <div class="target_today_box" :class="targetColor | changeBorder">
        <div class="title" :class="targetColor | changeBg">
            {{ targetTit }}
        </div>
        <div class="date">{{ targetTime }}</div>
        <div class="unit" :class="targetColor | changeColor">MIUNTES</div>

        <router-link to="/programme?id={iid}">
          <div class="done_bt" :class="targetColor | changeBg">去完成</div>
        </router-link>
    </div>
</template>

<script>

export default {
    data() {
        return {

        }
    },
    props: [
        'targetColor',
        'targetTit',
        'targetTime',
        'targetPath',
        'iid'
    ],
    filters: {
        changeBg(val) {
            return 'bg_'+val;
        },
        changeBorder(val) {
            return 'borde_'+val;
        },
        changeColor(val) {
            return 'color_'+val;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.borde_93e4e7 {
    border: 1px solid #93e4e7;
}
.borde_9ff1d3 {
    border: 1px solid #9ff1d3;
}
.borde_95d4fc {
    border: 1px solid #95d4fc;
}
.target_today_box {
    width: 9rem;
    height: auto;
    text-align: center;
}
.target_today_box .title {
    font-size: 1.3rem;
    line-height: 2.5rem;
    color: #574d46;
}
.bg_93e4e7 {
    background: #93e4e7;
}
.bg_9ff1d3 {
    background: #9ff1d3;
}
.bg_95d4fc {
    background: #95d4fc;
}
.target_today_box .date {
    font-size: 1.8rem;
    margin-top: 1.2rem;
    color: #313030;
}
.target_today_box .unit {
    font-size: 1rem;
    margin-top: .5rem;
}
.color_93e4e7 {
    color: #93e4e7;
}
.color_9ff1d3 {
    color: #9ff1d3;
}
.color_95d4fc {
    color: #95d4fc;
}
.target_today>div a {
    color: #03A9F4;
}
.target_today_box .done_bt {
    line-height: 2rem;
    width: 6.5rem;
    margin: 1.5rem auto .9rem;
    font-size: 1.1rem;
    color: #483d30;
    border-radius: 30px;
}
</style>
