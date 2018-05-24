<template>
    <div>
        <ul class="comment-list">
            <li>
                <i>
                    <img src="/static/image/c-l_03.jpg">
                </i>
                <div class="li-right">
                    <h4>浅浅湾
                        <span>2017-04-25</span>
                    </h4>
                    <p>宝贝收到了，比想象中的还要好些😇</p>
                </div>
                <div class="full-right">
                    <span class="like_num">
                        <i class="iconfont icon icon-dianzan"></i>
                        <span>0</span>
                    </span>
                </div>
            </li>
            <li>
                <i>
                    <img src="/static/image/c-l_03.jpg">
                </i>
                <div class="li-right">
                    <h4>董妮妮
                        <span>2017-04-25</span>
                    </h4>
                    <p>还行，一分价钱一分货</p>
                    <div class="list-img">
                        <i>
                            <img src="/static/image/c-l_07.jpg">
                        </i>
                        <i>
                            <img src="/static/image/c-l_09.jpg">
                        </i>
                        <i>
                            <img src="/static/image/c-l_11.jpg">
                        </i>
                    </div>
                </div>
                <div class="full-right">
                    <span class="like_num">
                        <i class="iconfont icon icon-dianzan"></i>
                        <span>0</span>
                    </span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
created() {
      this.$http.post("/healthFront/out/index/quickTest.do ",this.Qs.stringify({
        memberId: '1'
        })

      ).then((res) => {
        this.messageArr = res.data;
        console.log(res.data)
      })
    }

}
</script>

<style lang="less" scoped>
.comment-list {
    margin-top: 5rem;
    li {
        overflow: hidden;
        background: #FFFFFF;
        padding: 1.7rem 1rem;
        margin-top: 0.5rem;
        position: relative;
        &:first-of-type {
            margin: 0;
        }
        i {
            width: 10%;
            display: inline-block;
            img {
                width: 100%;
            }
        }
        .li-right {
            float: right;
            width: 86%;
            h4 {
                font-size: 1.3rem;
                margin-top: 0.5rem;
                span {
                    font-size: 1rem;
                    color: #7f7f7f;
                    margin-top: 0.4rem;
                    float: right;
                }
            }
            p {
                font-size: 1.2rem;
                margin: 1.4rem 0;
            }
            .list-img {
                i {
                    width: 5.4rem;
                    display: inline-block;
                    margin-right: 0.6rem;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .full-right {
            position: absolute;
            width: 3.6rem;
            height: 2.1rem;
            bottom: 0;
            right: 2rem;
            span {
                display: inline-block;
                font-size: 1rem;
                color: #7f7f7f;
                line-height: 1;
                i {
                    width: 1.6rem;
                    height: 1.6rem;
                    display: inline-block;
                    margin-right: 0.6rem;
                    vertical-align: bottom;
                    font-size: 1.6rem;
                }
                span {
                    line-height: 1.6rem;
                    font-size: 1.2rem;
                }
            }
        }
    }
}
</style>
