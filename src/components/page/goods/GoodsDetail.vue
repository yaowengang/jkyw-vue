<template>
    <div>
        <Top :title="title"></Top>
        <div class="goods-details-wrap">
            <div class="goods-icon">
                <img :src="goods.imageName">
            </div>
            <ul class="goods-info">
                <input type="hidden" class="goodsId" value="11">
                <li>
                    <span class="goods-name">{{goods.goodsName}}</span>
                </li>
                <li>
                    <span class="goods-price">{{goods.price}}元/</span>
                    <del>￥{{goods.originalPrice}}</del>
                    <i>|</i> 7天内可退货</li>
                <li class="li_col">
                    <span>快递0.00</span>
                    <span>月销{{goods.sales}}</span>
                    <span id="rema">库存{{commodityRemain.remain}}</span>
                    <input type="hidden" id="commodity_remain" :value="commodityRemain.remain"></li>
            </ul>
            <div class="buy_purchase">
                购买可获
                <span>{{goods.socre}}</span>积分
            </div>
            <mt-navbar v-model="selected" class="goods-nav clear">
                <mt-tab-item id="1">详情</mt-tab-item>
                <mt-tab-item id="2">评价</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" class="goods-main">
                <mt-tab-container-item id="1">
                    <div class="goods-light">
                        <h3>亮点</h3>
                        <div v-html="goods.content"></div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <ul class="comment-list">
                        <li v-if="commentList.length==0">
                            <div class="li-right">
                                <h4></h4>
                                <p>没有神马评论啊 ~*_*~!!!</p>
                                <div class="list-img"></div>
                            </div>
                        </li>
                        <li v-else v-for="item in commentList" :key="item.id">
                            <i><img :src="item.memberImg"></i>
                            <div class="li-right">
                                <h4>{{item.memberName}}
                                    <span>2017/09/12</span>
                                </h4>
                                <p>{{item.commPicList}}</p>
                                <div class="list-img"></div>
                            </div>
                        </li>
                    </ul>
                </mt-tab-container-item>
            </mt-tab-container>

            <div class="li_bottom bottom_fixed">
                <span @click="setcollection(0)" v-if="collection">已收藏</span>
                <span v-else @click="setcollection(1)">收藏</span>
                <span id="add_cart" @click="add_cart">加入购物车
                    <a class="num2"></a>
                </span>
                <span id="buy" @click="buy">立即购买
                    <a class="num3" v-if="num>1">[{{num}}]</a>
                </span>
            </div>
            <ul class="details_bottom" id="addcartUl">
                <li class="clear">
                    <div class="li_first">购买数量</div>
                    <div class="li_second">
                        <i id="dec" @click="reduce"></i>
                        <span id="num">{{num}}</span>
                        <i id="inc" @click="add"></i>
                    </div>
                </li>
                <li class="sure_bottom" @click="cartAdd(num)">确认</li>
            </ul>
            <ul class="details_bottom" id="buyUl">
                <li class="clear">
                    <div class="li_first">购买数量</div>
                    <div class="li_second">
                        <i id="buydec" @click="reduce"></i>
                        <span id="buynum">{{num}}</span>
                        <i id="buyinc" @click="add"></i>
                    </div>
                </li>
                <li class="sure_bottom" @click="Buy_now(num)">确认</li>
            </ul>
            <div class="ceng" @click="ceng"></div>
        </div>
    </div>
</template>

<script>
import Top from '../../commom/top2.vue'
import { Navbar, TabItem } from 'mint-ui';
import { TabContainer, TabContainerItem } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            title: "商品详情",
            goods: [],
            commentList: [],
            commodityRemain: [],
            selected: '1',
            collection: false,
            num: 1
        }
    },
    components: {
        Top,
        Navbar,
        TabItem,
        TabContainer,
        TabContainerItem,
        Toast
    },
    created() {
        this.$http.post("/healthFront/out/shop/getGoodsDeatil.do", this.Qs.stringify({
            memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
            goodsId: this.$route.query.id
        }))
            .then((res) => {
                console.log(res.data)
                this.goods = res.data.goods
                this.commentList = res.data.commentList
                this.commodityRemain = res.data.goods.commodityRemain
                this.collection = res.data.collection
            })
    },
    methods: {
        add: function() {
            this.num++
        },
        reduce: function() {
            if (this.num > 1) { this.num-- }
            else {
                Toast("数量不能小于1个")
            }
        },
        add_cart: function() {
            $(".bottom_fixed").fadeOut();
            $("#addcartUl").fadeIn();
            $(".ceng").height($(document).height());
            $(".ceng").fadeIn();
        },
        buy: function() {
            $(".bottom_fixed").fadeOut();
            $("#buyUl").fadeIn();
            $(".ceng").height($(document).height());
            $(".ceng").fadeIn();
        },
        ceng: function() {
            $(".bottom_fixed").fadeIn();
            $("#addcartUl").fadeOut();
            $("#buyUl").fadeOut();
            $(".ceng").fadeOut();
        },
        setcollection: function(i) {
            this.$http.post("/healthFront/out/shop/toAddOrCancelCollect.do", this.Qs.stringify({
                memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
                goodsId: this.$route.query.id,
                state: i
            }))
                .then((res) => {
                    console.log(res)
                    if (res.data.stateCode == '001') {
                        this.collection = !this.collection
                        if (this.collection) {
                            Toast({
                                message: '收藏成功',
                                iconClass: 'icon iconfont icon-zhengquewancheng',
                                duration: 1000
                            })
                        } else {
                            Toast({
                                message: '取消收藏',
                                iconClass: 'icon iconfont icon-cuowuguanbiquxiao',
                                duration: 1000
                            })
                        }
                    }
                })
        },
        cartAdd: function(i) {
            this.$http.post("/healthFront/out/shopcart/addCartItems.do", this.Qs.stringify({
                memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
                goodsId: this.$route.query.id,
                amount: i
            }))
                .then((res) => {
                    console.log(res.data)
                    if (res.data.stateCode == '001') {
                        $(".bottom_fixed").fadeIn();
                        $("#addcartUl").fadeOut();
                        $("#buyUl").fadeOut();
                        $(".ceng").fadeOut();
                        Toast({
                            message: '添加成功',
                            iconClass: 'icon iconfont icon-zhengquewancheng',
                            duration: 1000
                        })
                    } else {
                        Toast({
                            message: '添加失败',
                            iconClass: 'icon iconfont icon-cuowuguanbiquxiao',
                            duration: 1000
                        })
                    }
                })

        },
        Buy_now: function(i) {
            this.$http.post("/healthFront/out/shopcart/buy.do", this.Qs.stringify({
                memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
                goodsId: this.$route.query.id,
                amount: i
            }))
                .then((res) => {
                    console.log(res.data)
                    if (res.data.stateCode) {
                        this.$router.push({
                            path: '/payment',
                            query: {
                                id: res.data.cartItemId
                            }
                        })
                    }
                })
        }
    }
}
</script>

<style lang="less" scoped>
.mint-tab-item-label{
    font-size: 30px;
    color: #000;
}
.goods-details-wrap {
    margin-top: 4.5rem;
    margin-bottom: 4.9rem;
    .goods-icon {
        text-align: center;
        padding: 0.8rem 0;
        background: #ffffff;
        img {
            height: 380px;
            width: 98%;
            margin: auto;
        }
    }
    .goods-info {
        margin-top: 0.5rem;
        padding: 1rem;
        background: #ffffff;
        li {
            color: #989898;
            font-size: 1.2rem;
            margin-bottom: 1rem;
            .goods-name {
                font-size: 1.5rem;
                color: #2d2d2d;
                margin-right: 0.3rem;
            }
            .goods-price {
                font-size: 1.5rem;
                color: #f64913;
            }
            del {
                margin-left: 0.5rem;
            }
            i {
                font-style: normal;
                margin: 0 0.5rem;
            }
        }
        .li_col {
            margin-bottom: 0.1rem;
            span {
                display: inline-block;
                width: 32%;
                font-size: 1.2rem;
                color: #666666;
                text-align: center;
                &:first-of-type {
                    text-align: left;
                }
                &:last-of-type {
                    text-align: right;
                }
            }
        }
    }
    .buy_purchase {
        border-top: solid 1px #dcdcdc;
        background: #fff;
        padding: 0.9rem 1rem;
        color: #a1a1a1;
        font-size: 1.3rem;
        span {
            font-size: 1.3rem;
            color: red;
        }
    }
    .goods-nav {
        margin-top: 0.5rem;
        background: #fff;
        border-bottom: 1px solid #d9d9d9;
        li {
            float: left;
            width: 50%;
            text-align: center;
            font-size: 1.3rem;
            padding: 1rem 0;
        }
        .active {
            span {
                padding-bottom: 0.9rem;
                border-bottom: 2px solid #222222;
            }
        }
    }
    .goods-main {
        div {
            &:first-child {
                display: block;
            }
            .goods-light {
                background: #fff;
                font-size: 1.3rem;
                color: #2e2e2e;
                padding: 0.5rem 0 4rem 0;
                h3 {
                    text-align: center;
                    padding: 1rem 0;
                }
            }
            .comment-list {
                li {
                    overflow: hidden;
                    background: #FFFFFF;
                    padding: 1.7rem 1rem;
                    margin-top: 0.5rem;
                    &:first-of-type {
                        margin: 0;
                    }
                    i {
                        width: 10%;
                        display: inline-block;
                        position: relative;
                        img {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                        }
                        &::before {
                            content: "";
                            display: block;
                            padding-top: 100%;
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
                        .list-img {}
                    }
                }
            }
        }
    }
    .li_bottom {
        span {
            display: block;
            width: calc(100%/3);
            font-size: 1.3rem;
            text-align: center;
            float: left;
            padding: 1.8rem 0;
            &:first-of-type {
                color: #03a9f4;
            }
            &:nth-of-type(2) {
                background: #f48706;
                color: #fff;
            }
            &:last-of-type {
                color: #fff;
                background: #f43806;
            }
            a {
                color: #fff;
            }
        }
    }
    .bottom_fixed {
        width: 100%;
        overflow: hidden;
        background: #FFFFFF;
        margin-top: 1.3rem;
        position: fixed;
        z-index: 10;
        left: 0;
        bottom: 0;
    }
    .details_bottom {
        background: #ffffff;
        display: none;
        position: fixed;
        z-index: 10;
        left: 0;
        bottom: 0;
        width: 100%;
        li {
            border-top: solid 1px #f3f3f3;
            width: 100%;
            overflow: hidden;
            &:first-child {
                padding: 1.8rem 1.5rem;
            }
            .sure_bottom {
                height: 5rem;
                line-height: 5rem;
                text-align: center;
                font-size: 1.6rem;
                color: #fff;
                background: rgb(244, 135, 6);
            }
            .li_first {
                float: left;
                font-size: 1.5rem;
                margin-left: 0.6rem;
            }
            .li_second {
                float: left;
                margin-left: 10%;
                i {
                    display: inline-block;
                    width: 1.7rem;
                    height: 1.7rem;
                    vertical-align: sub;
                    &:first-of-type {
                        background: url(/static/image/bt_03.jpg);
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                    &:last-of-type {
                        background: url(/static/image/bt_05.jpg);
                        -webkit-background-size: 100% 100%;
                        background-size: 100% 100%;
                    }
                }
                span {
                    display: inline-block;
                    font-size: 1.7rem;
                    width: 2rem;
                    text-align: center;
                }
            }
        }
        .sure_bottom {
            height: 5rem;
            line-height: 5rem;
            text-align: center;
            font-size: 1.6rem;
            color: #fff;
            background: rgb(244, 135, 6);
        }
    }
    .ceng {
        display: none;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0, 1, 1, 0.3);
    }
}
</style>

