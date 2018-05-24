<template>
    <div>
        <Top :title="title"></Top>
        <div class="video-content">
            <video controls="controls" name="media" src="D:\Apache24\htdocs\trace\upload\video\20170629\688B\688B8D84436246D7BDFF3CEDE2198217.flv" type="video/mp4"></video>
            <div class="detail">
                <h4>请问请问</h4>
                <p>主讲医师：擦粉
                    <span>西京医院</span>
                    <span>打撒</span>
                </p>
            </div>
        </div>
        <VideoDetail></VideoDetail>
    </div>
</template>

<script>
import Top from '@/components/commom/top2.vue'
import VideoDetail from '@/components/commom/Video_detail.vue'
export default {
    data() {
        return {
            title: '视频详情'
        }
    },
    components: {
        Top,
        VideoDetail
    }
}
</script>

<style lang="less" scoped>
.video-content {
    background: #FFFFFF;
    padding: 1.2rem;
    margin-top: 5rem;
    video {
        width: 100%;
        height: 15rem;
        background: #000;
        background-size: 100%;
    }
    .detail {
        padding: 1.4rem 0;
        h4 {
            font-size: 1.3rem;
        }
        p {
            margin-top: 1.3rem;
            font-size: 1.1rem;
            color: #929292;
            span {
                margin-left: 2.3rem;
            }
        }
    }
}
</style>
