<template>
  <div class="wrap">
    <Top :title="title"></Top>
    <div class="content">
      <ul class="list">
        <li v-for="(i,index) in doctorList">
          <div @click="go(i.doctors_id)">
            <img :src="i.picture">

            <div class="text_con">
              <h3>{{i.name}}<span v-for=" j in i.stArr" v-text="j"></span>
              </h3>
              <p v-text="i.organ.name"></p>
            </div>

          </div>
          <button class="cancel_att" @click="btnFn(index)" v-text="attention"></button>

        </li>

        <infinite-loading :on-infinite="getDoctorList" ref="infiniteLoading">
        <span slot="no-more">
          没有更多数据
        </span>
        </infinite-loading>
      </ul>
    </div>

    <div class="ceng" v-show="popupStatus">
      <div class="dialog">
        <p>确定请取消对该医生的关注吗？</p>
        <span id="ensure" @click="ensure">确定</span>
        <span id="cancel" @click="cancel">取消</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  body {
    background: #f6f6f6;
  }

  .list {
    height: auto;
    overflow: hidden;
    background: #fff;
    margin-top: 4.7rem;
  }

  .content .list li {
    padding: 1.4rem 1.6rem 0;
    height: auto;
    overflow: hidden;
    position: relative;

  }

  .list li img {
    display: inline-block;
    width: 3.7rem;
    height: 3.7rem;
    border-radius: 50%;
  }

  .text_con {
    width: 85%;
    float: right;
    display: inline-block;
    margin-right: -1.6rem;
    height: auto;
    border-bottom: solid 1px #eeeeee;
    padding-bottom: 1.6rem;
    position: relative;
  }

  .text_con h3 {
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    margin-top: 0.4rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .text_con h3 span {
    padding: 0.1rem 0.4rem;
    background: #ff9b0d;
    color: #fff;
    font-size: 1rem;
    margin-left: 0.4rem;
    border-radius: 0.2rem;
    display: inline-block;
  }

  .content .text_con p {
    font-size: 1.2rem;
    height: 1.2rem;
    line-height: 1.2rem;
    color: #c2c2c2;
  }

  .content li .cancel_att {
    position: absolute;
    right: 1rem;
    top: 2.4rem;
    height: 1.3rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    border: solid 1px #03a9f4;
    color: #03a9f4;
    border-radius: 0.2rem;
    box-sizing: content-box;
    padding: 0.4rem 0.3rem;
    width: 5.2rem;
    text-align: center;
    background: #FFFFFF;
  }

  .content li .cancel_att.active {
    border: solid 1px #ccc !important;
    color: #ccc !important;
  }

  .ceng {
    width: 100%;
    background: rgba(105, 105, 105, 0.5);
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
  }

  .dialog {
    width: 70%;
    margin: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2.3rem 0.7rem;
    background: #fff;
    z-index: 100;
    border-radius: 0.3rem;
  }

  .dialog p {
    font-size: 1.4rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
  }

  .dialog span {
    display: inline-block;
    width: 35%;
    font-size: 1.2rem;
    border: solid 1px #03a9f4;
    color: #03a9f4;
    text-align: center;
    padding: 0.7rem 0;
    margin-left: 1.8rem;
    border-radius: 0.3rem;
  }

  .dialog span:last-of-type {
    color: #fff;
    background: #03a9f4;
  }
</style>
<script>
  import Top from '../../../../src/components/commom/top2.vue';
  import InfiniteLoading from 'vue-infinite-loading';


  export default {
    data() {
      return {
        title: "我的医师",
        attention: "取消关注",
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        showNum: 13,
        page: 1,
        doctorList: [],
        popupStatus: false,
        doctorsId: 0,
        stArr: [],
        dataLength: 0
      }
    },
    created() {
      this.getDoctorList()
    },
    methods: {
      getDoctorList() {
        this.$http.post("/healthFront/out/personalCenter/getDoctorList.do", this.Qs.stringify({
            memberId: this.user.memberId,
            currentPage: this.page,
            showCount: this.showNum
          })
        ).then((res) => {
          if (res.data.doctorList.list.length > 0) {

            this.doctorList = res.data.doctorList.list;
            /*this.dataLength = res.data.doctorList*/
            console.log(res.data.doctorList)
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');


            for (let i = 0; i < this.doctorList.length; i++) {
              var str = this.doctorList[i].filedString
              var resArr = (this.tipfun(str));
              res.data.doctorList.list[i].stArr = resArr
            }
            if (this.showNum > this.dataLength) {
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            } else {
              this.page += 1
            }
          } else {
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      btnFn($index) {
        this.popupStatus = true;
        this.doctorsId = this.doctorList[$index].doctors_id;

      },

      ensure($index) {
        this.popupStatus = false;
        this.$http.post("/healthFront/out/personalCen/toCancelAttention.do", this.Qs.stringify({
            memberId: this.user.memberId,
            doctorId: this.doctorsId,
          })
        ).then((res) => {
          this.$router.go(0)

        }).catch((err) => {
          console.log(err)
        })


      },
      cancel() {
        this.popupStatus = false
      },
      tipfun(s) {
        s = s.substr(0, s.length - 1);
        return s.split(",")
      },
      go(id) {
        this.$router.push({
          path: "/physicianDetails",
          query: {
            id: id
          }
        });
      }

    },
    components: {
      Top,
      InfiniteLoading
    }
  }
</script>
