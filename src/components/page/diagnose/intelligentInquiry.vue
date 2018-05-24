<template>
    <div class="expert-content">
      <ul class="list clear">
          <li v-for="item in doctors" :key="item.id" @click="go(item.doctors_id)">
            <i><img :src="item.picture"></i>
            <div class="list-right">
              <h4>{{item.name}}
                <span v-for=" j in item.stArr" v-text="j" :key="j.id">{{item.filedString}}</span>
              </h4>
              <p>{{item.organ.name}}</p>
              <i class="icon iconfont icon-xiayiyeqianjinchakangengduo"></i>
            </div>
          </li>
      </ul>
    </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
          doctors:[]
        }
    },
    props: [
    ],
    computed: {
      ...mapGetters(['getsubquest'])
    },
    created(){
      let pp = new Promise(rs => rs(this.$store.dispatch('getsubquestApi')))
      pp.then(()=>{
      let pargetsubquest = this.getsubquest
      this.doctors = pargetsubquest.doctors
      for(let i=0;i<this.doctors.length;i++){
          var str = this.doctors[i].filedString
          var resArr = (this.tipfun(str));
          this.doctors[i].stArr = resArr          
      }
      doctors.filedString
      console.log(this.doctors)
      })
    },
  methods: {
    go(id) {
      this.$router.push({
        path: "/physicianDetails",
        query: {
          id: id
        }
      });
    },
    tipfun(s) {
      s = s.substr(0, s.length - 1);
      return s.split(",")
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  body{
    background: #ffffff !important;
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
  .expert-content .list li>i {
    height: 4rem;
    display: inline-block;
    width: 4rem;
    float: left;
    border-radius: 50%;
  }
  .expert-content .list li i img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .expert-content .list li .list-right {
    width: 86%;
    float: right;
    padding-left: 6%;
    position: relative;
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
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -0.9rem;
    font-size:1.9rem;
    color: #ccc;
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
