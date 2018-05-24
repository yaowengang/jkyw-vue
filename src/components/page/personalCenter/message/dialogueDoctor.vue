<template>
  <div class="wrap tabCon-first">
    <ul>

      <li class="clear active" v-for="i in consultsArr" @click="go(i.consultID)">

        <span><img :src="i.doctors.picture"><!--<a>12</a>--></span>

          <div class="detail-one">
            <h4>{{i.doctors.name}}<span v-text="i.score ==0 ? '等待医师回复' : '' || i.score ==2 ? '会诊关闭待评' : ''
 || i.score ==3 ? '待评价' : '' || i.score ==4 ? '已评价' : '' || i.score ==5 ? '新开启' : '' "></span>
              <a>将于{{i.shutTime | timeFn}}关闭</a></h4>
            <p>点击查看...</p>
          </div>

      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        consultsArr: [],
        user: JSON.parse(localStorage.getItem('loginStatus')),//用户信息

      }
    },
    created() {
      this.$http.post("/healthFront/out/doctors/memberConsults.do", this.Qs.stringify({
          memberId: this.user.memberId
        })
      ).then((res) => {
        this.consultsArr = res.data.consultList;
        console.log(this.consultsArr)
      })
    },
    methods: {
      go(id) {
        this.$router.push({
          path: "/message",
          query: {
            consultID: id
          }
        });
      }
    },
    filters: {
      timeFn: function (value) {
        return new Date(parseInt(value)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    },
    components: {

      // 引入组件
    }
  }
</script>


<style lang="less" scoped>


  .tabCon-first li {
    padding: 1.2rem 1rem 0 1rem;
    overflow: hidden;
  }

  .tabCon-first li > span {
    display: inline-block;
    position: relative;
    width: 3.7rem;
    height: 3.7rem;
    float: left;
  }

  .tabCon-first li span img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .tabCon-first li > span > a {
    display: inline-block;
    position: absolute;
    padding: 0 0.3rem;
    top: 0;
    right: 0;
    font-size: 0.9rem;
    color: #fff;
    background: red;
    border-radius: 2rem;
  }

  li .detail-one {
    width: 83%;
    float: right;
    border-bottom: solid 1px #eeeeee;
    padding-bottom: 1.1rem;
  }

  li .detail-one h4 {
    font-size: 1.3rem;
    width: 100%;
  }

  li .detail-one h4 span {
    font-size: 0.9rem;
    color: #fff;
    background: #cccccc;
    padding: 0.2rem 0.6rem;
    border-radius: 0.2rem;
    margin-left: 1.2rem;
  }

  li.active .detail-one h4 span {
    background: #03a9f4;
  }

  li .detail-one h4 a {
    font-size: 0.8rem;
    color: #aeaeae;
    float: right;
    margin-top: 0.6rem;
  }

  li .detail-one p {
    font-size: 1.2rem;
    color: #999999;
    margin-top: 0.6rem;
  }
</style>


