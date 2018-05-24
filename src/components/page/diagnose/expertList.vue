<template>
  <div class="">
    <top :title="title"></top>
    <div class="expert-list">
      <div class="expert-content">
        <ul class="list clear">
          <li v-for="item in doctorList" :key="item.id">
            <i><img :src="item.picture"></i>
            <div class="list-right">
              <h4>{{ item.name }}<span>{{ item.filedString}}</span></h4>
              <p>{{ item.organ.name }}</p>
              <i class="fa fa-chevron-right"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../commom/top2.vue'
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        title: "推荐医生",
        doctorList: []
      }
    },
    computed: {
      ...mapGetters(['expertInquiry'])
    },
    created () {
       let pp = new Promise(rs => rs(this.$store.dispatch('expertInquiryApi')))
       pp.then(() =>{

         this.doctorList = this.expertInquiry
          console.log(this.doctorList)
       }
      )
    },
    components: {
      top
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../../../static/css/reset.css';
  body{
    background: #f6f6f6;
  }
  .expert-list {
    margin-bottom: 4rem;
    margin-top: 5.5rem;
  }
  .expert-content {
    background: #ffffff;
  }
  .expert-content .list {
    overflow: hidden;
    padding: 0 1.2rem;
    margin-top: 1rem;
  }
  .expert-content .list li {
    width: 100%;
    padding: 2.4rem 0.5rem;
    border-bottom: solid 1px #e8e7e7;
    overflow: hidden;
  }
  .expert-content .list li i {
    height: 4rem;
    width: 4rem;
    float: left;
  }
  .expert-content .list li .list-right {
    width: 86%;
    float: right;
    padding-left: 6%;
    position: relative;
  }
  .expert-content .list li i img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .expert-content .list li .list-right h4 {
    font-size: 1.4rem;
  }
  .expert-content .list li .list-right p {
    font-size: 1rem;
    color: #525252;
    margin-top: 0.8rem;
  }
  .expert-content .list li .list-right i {
    width: 1.7rem;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -0.9rem;
    font-size:1.3rem;
    color: #cccccc;
  }
  .expert-content .list li .list-right h4 span {
    display: inline-block;
    font-size: 1rem;
    color: #ffffff;
    background: #ff9b0d;
    padding: 0.1rem 0.7rem;
    border-radius: 0.2rem;
    margin-left: 0.5rem;
  }
</style>
