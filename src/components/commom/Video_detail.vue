<template>
    <div class="correlation-video">
        <h4>相关视频</h4>
        <ul class="video-list">
            <li class="clear">
                <div class="list-imgbg"><img src="" alt=""></div>
                <div class="list-content">
                    <a href="/healthFront2/social/findVideoById.do?Id=25">
                        <h3>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</h3>
                        <span>亲亲</span></a>
                </div>
            </li>
            <li class="clear">
                <div class="list-imgbg"><img src="" alt=""></div>
                <div class="list-content">
                    <a href="/healthFront2/social/findVideoById.do?Id=29">
                        <h3>啧啧啧啧啧</h3>
                        <span>啧啧啧</span></a>
                </div>
            </li>
            <li class="clear">
                <div class="list-imgbg"><img src="" alt=""></div>
                <div class="list-content">
                    <a href="/healthFront2/social/findVideoById.do?Id=38">
                        <h3>重新找v需第三方</h3>
                        <span>的法国</span></a>
                </div>
            </li>
            <li class="clear">
                <div class="list-imgbg"><img src="" alt=""></div>
                <div class="list-content">
                    <a href="/healthFront2/social/findVideoById.do?Id=52">
                        <h3>按时打撒</h3>
                        <span>收拾收拾</span></a>
                </div>
            </li>
            <li class="clear">
                <div class="list-imgbg"><img src="" alt=""></div>
                <div class="list-content">
                    <a href="/healthFront2/social/findVideoById.do?Id=61">
                        <h3>dsfasdf</h3>
                        <span>dsfsda</span></a>
                </div>
            </li>
            <li class="clear">
                <div class="list-imgbg"><img src="" alt=""></div>
                <div class="list-content">
                    <a href="/healthFront2/social/findVideoById.do?Id=65">
                        <h3>fegegew</h3>
                        <span>fegerge</span></a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped>
    .correlation-video {
        margin-top: 0.5rem;
        padding: 1.7rem 0;
        background: #FFFFFF;
        h4 {
            font-size: 1.3rem;
            padding: 0 1.2rem;
        }
        .video-list {
            li {
                overflow: hidden;
                padding: 1.3rem 1.2rem;
                border-bottom: solid 1px #dcdcdc;
                &:last-of-type {
                    border: none;
                }
                .list-imgbg {
                    width: 35%;
                    border: solid 1px #d2d2d2;
                    float: left;
                    height: 7.5rem;
                    img {
                        width: 100%;
                    }
                }
                .list-content {
                    float: right;
                    width: 60%;
                    h3 {
                        font-size: 1.2rem;
                        margin-top: 0.4rem;
                    }
                    span {
                        font-size: 1.1rem;
                        color: #AEAEAE;
                        margin-top: 2rem;
                        display: inline-block;
                    }
                }
            }
        }
    }
</style>
