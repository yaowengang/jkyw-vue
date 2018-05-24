<template>
    <div>
        <Top :title="title"></Top>
        <CommentList ></CommentList>
        <div class="send-bottom">
            <i class="iconfont icon icon-xiaolian"></i> <input value="输入评论" onfocus="javascript:this.value=''" id="ipt1" type="text" verification="" wraingpos="Alert" data-type="numb/eg" maxlength="100"> <span><button id="btn1" type="button">发送</button></span>
        </div>
    </div>
</template>

<script>
    import Top from '@/components/commom/top2.vue';
    import CommentList from '@/components/commom/CommentList.vue';
    export default {
        data() {
            return {
                title: '评论记录'
            }
        },
        components: {
            'Top':Top,
            'CommentList':CommentList
        }
    }
</script>

<style lang="less" scoped>
    .send-bottom {
        width: 100%;
        background: #ffffff;
        position: fixed;
        left: 0;
        bottom: 0;
        height: 4rem;
        padding: .5rem;
        z-index: 10;
        i {
            width: 3rem;
            height: 3rem;
            font-size: 2.5rem;
            text-align: center;
            -webkit-background-size: 100%;
            background-size: 100%;
            float: left;
            color: #e4e4e4;
        }
        input{
            margin-left: 0.5rem;
            border: none;
            height: 32px !important;
            border-bottom: solid 1px #e4e4e4;
            padding: 0;
            padding-bottom: 0.6rem;
            line-height: 1.1rem;
            width: 68% !important;
            font-size: 1.1rem;
            color: #e4e4e4;
        }
        span {
            font-size: 1.3rem;
            float: right;
            button {
                font-size: 14px;
                font-weight: 400;
                line-height: 1;
                position: relative;
                display: inline-block;
                margin-bottom: 0;
                padding: 6px 12px;
                cursor: pointer;
                -webkit-transition: all;
                transition: all;
                -webkit-transition-timing-function: linear;
                transition-timing-function: linear;
                -webkit-transition-duration: .2s;
                transition-duration: .2s;
                text-align: center;
                vertical-align: top;
                white-space: nowrap;
                color: #fff;
                border: 1px solid #e4e4e4;
                border-radius: 3px;
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
                border-bottom-left-radius: 3px;
                background-color: #03a9f4;
                background-clip: padding-box;
            }
        }
    }
</style>
