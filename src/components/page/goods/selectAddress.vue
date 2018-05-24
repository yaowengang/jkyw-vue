<template>
  <div class="selectWrap">
    <Top :title="title"></Top>
    <div class="no-data" v-show="!isNull">
      <img src="http://192.168.1.92:8083/healthFront/images/noData/null-dz_03.png" style="width:80%; margin:0 auto">
      <p style=" margin-top:3rem; color:#8f8f94;font-size:1.4rem">您还没有添加收货地址</p>
    </div>
    <div class="Address_con" v-show="isNull">
      <div class="address_title">
        <span class="edit_btn" @click="manageAddr">管理</span>
      </div>
      <ul>
        <li class="null has_address" v-for="(item, index) in addList" :key="index">
          <div class="address_inf">
            <h4>{{item.receiverName}}<span class="tel">{{item.receiverPhone}}</span></h4>
            <p class="address">{{item.receiverArea}}{{item.receiverAddress}}</p>
          </div>
          <label><span class="icon iconfont" :class="item.cls" @click="chanageSelect(index)"></span></label>
        </li>
      </ul>
    </div>
    <div class="new-address" @click="addAddr">新增收货地址</div>
  </div>
</template>

<script>
  import Top from '../../commom/top2.vue';
  export default {
    data() {
      return {
        title: "选择收货地址",
        addList:[],
        isNull: false
      }
    },
    created() {
      //console.log(this.$route.query.defaultId);
      var defaultid = this.$route.query.defaultId;
      this.$http.post("/healthFront/out/shop/getAddressList.do", this.Qs.stringify({
        memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId
        })
      ).then((res)=>{
        if(res.data.stateCode == "001"){
          if(res.data.addressList.length>0){
            for(var i=0; i<res.data.addressList.length;i++){
              if(res.data.addressList[i].id == defaultid){
                res.data.addressList[i].cls = "icon-xuanzhong";
              }else{
                res.data.addressList[i].cls = "icon-weixuanzhong";
              }
            }
            this.addList = res.data.addressList;
            this.isNull = true
          }


          console.log(this.addList)
        }
      });
    },
    methods: {
      //更改默认地址
      chanageSelect(n){
        for(var i=0;i<this.addList.length;i++){
          this.addList[i].cls="icon-weixuanzhong";
        }
        this.addList[n].cls="icon-xuanzhong";

        this.$http.post("/healthFront/out/shop/setDefaultAddress.do", this.Qs.stringify({
            memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId,
            addressId: this.addList[n].id
          })
        ).then((res)=>{
          if(res.data.stateCode == "001"){
            this.$router.go(-1)
          }
        });
      },
      manageAddr(){
        /*跳到管理收货地址界面*/
        this.$router.push({
          path: "/addressManagement"
        })
      },
      addAddr(){
        this.$router.push({
          path: "/AddAddress/newAddress"
        })
      }
    },
    components: {
      Top
    }
  }
</script>

<style lang="less">
  body{
    background-color: #efeff4;
  }
  .no-data {
    position: absolute;
    top: 11rem;
    text-align: center;
    font-size: 1.3rem;
  }
  .selectWrap{
    margin-top:4.5rem;
  }
  .Address_con {
    height: auto;
    .address_title {
      height: 4rem;
      width: 90%;
      margin: auto;
      line-height: 4rem;
      .edit_btn {
        font-size: 1.2rem;
        float: right;
      }
    }
    ul {
      li {
        border-top: solid 1px #f5f5f5;
        background: #fff;
        background-size: 0.8rem;
        position: relative;
         .address_inf {
          padding: 1.2rem;
          width: 29rem;
           h4 {
             font-size: 1.3rem;
             font-weight: 500;
             span {
               float: right;
               margin-right: 0.6rem;
               font-size: 1.3rem;
             }
           }
           .address {
             padding-top: 0;
             line-height: 2rem;
             font-size: 1.3rem;
             margin:1.2rem 0;
           }
        }
        label {
          padding: 0.2rem;
          position: absolute;
          display: block;
          top: 3.5rem;
          right: 1rem;
          span{
            font-size: 1.7rem;
            color: #1696e5;
          }
        }
      }
    }
  }
  .new-address {
    padding: 1.6rem 0;
    background: #1696e5;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    color: #fff;
    font-size: 1.4rem;
  }
</style>
