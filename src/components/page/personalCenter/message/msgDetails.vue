<template>
  <div class="tabCon-second">
    <Top :title="title"></Top>
    <ul>
      <li class="clear">
        <div class="detail-two">
          <h3>{{messageArr.messageTitle }}</h3>
          <div>{{messageArr.messageContent}}</div>
          <span>{{messageArr.messageDate | timeFn}}</span>
        </div>
      </li>

    </ul>
  </div>
</template>
<style lang="less">
  body{
    background: #FFFFFF;
  }
  .tabCon-second {
    background: #ffffff;
    margin-top: 4.5rem;
  }

  .tabCon-second li {
    padding: 1.4rem 1rem 0 1.4rem;
    overflow: hidden;
  }

  .tabCon-second li .detail-two {
    float: right;
    width: 93%;
    border-bottom: solid 1px #eeeeee;
    padding-bottom: 1.1rem;
    position: relative;
  }

  .tabCon-second li .detail-two h3 {
    font-size: 1.4rem;
    width: 56%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.8rem;
  }

  .tabCon-second li .detail-two span {
    display: inline-block;
    color: #a1a1a1;
    float: right;
    font-size: 1rem;
    position: absolute;
    top: 0;
    right: 0;

  }

  .tabCon-second li .detail-two div{
    font-size: 1.2rem;
    color: #999999;
    margin-top: 0.7rem;
  }
</style>
<script>
  import Top from '../../../../components/commom/top2.vue'

  export default {
    data() {
      return {
        title: "系统消息",
        msgid: this.$route.query.id,
        messageArr: []
      }
    },
    created() {
      this.$http.post("/healthFront/out/personalCenter/getMessageInfo.do", this.Qs.stringify({
          messageId: this.msgid
        })
      ).then((res) => {
        this.messageArr = res.data.messageInfo;
      })

    },
    methods: {},
    components: {
      Top
      // 引入组件
    },
    filters: {
      timeFn: function (value) {
        return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    }
  }
</script>
