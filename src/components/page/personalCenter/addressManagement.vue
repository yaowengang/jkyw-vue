<template>
  <div class="wrap">
    <Top :title="title"></Top>

    <div class="Address_con">
      <ul>
        <li class="null has_address" v-for="(adress,index) in addressList" >
          <div class="address_inf" >
            <h4>{{ adress.receiverName }} <span class="tel">{{ adress.receiverPhone }}</span></h4>
            <p class="address" >收货地址：{{ adress.receiverAddress }}</p>
          </div>
          <div class="operation">
                <span class="Radio"  @click="toggleAdress(adress,index)" >
                    <label :for="'radio'+index" v-bind:class="{this_address:adress.status==1}" >使用当前地址</label>
                    <input name="" type="radio" value="" :id="'radio'+index" :checked="adress.status==1" >
                </span>
                <span class="Delete">
                  <router-link :to="'/AddAddress'+ adress.id"> <span class="Edit_btn">编辑</span></router-link>
                    <span class="Del_btn" @click="adressDel(adress,adress.id,index)">删除</span>
                </span>
          </div>
        </li>

      </ul>
    </div>

    <router-link :to="'/AddAddress'+ 'newAddress'"><div class="new-address">添加新地址</div></router-link>
  </div>
</template>
<style lang="less" scoped>
  body {
    background: #f5f5f5;
  }
  .Address_con {
    height: auto;
  }
  .Address_con ul {
    margin-top: 5rem;
    padding-bottom: 5rem;
  }
  .Address_con ul li {
    border-top: solid 1px #f5f5f5;
    background: #fff;
    background-size: 0.8rem;
    margin-bottom: 0.6rem;
  }
  .Address_con ul .has_address .address_inf {
    padding: 1.2rem;
  }
  .Address_con ul .has_address .address_inf h4 {
    padding-bottom: 1.2rem;
    font-size: 1.3rem;
    font-weight: 500;
  }
  .Address_con ul .has_address .address_inf h4 span {
    float: right;
    margin-right: 0.6rem;
    font-size: 1.3rem;
  }
  .Address_con ul .has_address .address_inf .address {
    padding-top: 0;
    line-height: 2rem;
    font-size: 1.3rem;
  }
  .Address_con ul .has_address .operation {
    padding: 1.4rem 1.2rem;
    height: auto;
    overflow: hidden;
    border-top: solid 1px #eeeeee;
  }
  .Address_con ul .has_address .operation .Radio {
    float: left;
  }
  .Address_con ul .has_address .operation .Radio label {
    padding: 0.2rem;
    font-size: 1.2rem;
    padding-left: 2.6rem;
     background-size: 3rem;
     background-image: url("../../../../static/img/AddressIcon_14.png");
    background-repeat: no-repeat;
    background-position: 0.2rem center;
    background-size: 1.6rem;
  }
  .Address_con ul .has_address .operation .Radio .this_address {
    background-image: url("../../../../static/img/AddressIcon_08.png");
    color: #1696e5;
  }
  .Address_con ul .has_address .operation .Radio input {
    display: none;
  }
  .Address_con ul .has_address .operation .Delete {
    float: right;
  }
  .Address_con ul .has_address .operation .Delete span {
    padding: 0.2rem;
    font-size: 1.2rem;
    padding-left: 2.4rem;
  }
  .Address_con ul .has_address .operation .Delete .Edit_btn {
    background: url("../../../../static/img/AddressIcon_03.png") no-repeat 0 center;
    background-size: 1.7rem;
    margin-right: 1rem;
  }
  .Address_con ul .has_address .operation .Delete .Del_btn {
    background: url("../../../../static/img/AddressIcon_05.png") no-repeat 0 center;
    background-size: 1.7rem;
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
<script>
  import Top from '../../../../src/components/commom/top2.vue';
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        title: "管理收货地址",
        user:JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        addressList:'',
        checked:'',
      }
    },
    created() {
      this.$http.post("healthFront/out/shop/getAddressList.do",this.Qs.stringify({
          memberId:this.user.memberId
        })
      ).then((res) => {
        this.addressList = res.data.addressList;
        console.log(this.addressList);
      });
    },
    methods: {
      toggleAdress (el,index) {
        console.log(1111);
        this.$http.post("healthFront/out/shop/setDefaultAddress.do",this.Qs.stringify({
          addressId:el.id,
          memberId:this.user.memberId
          })
        ).then((res) => {
          console.log(res.data)
        if(res.data.stateCode == '001'){
          for(var i=0;i<this.addressList.length;i++){
            this.addressList[i].status = 2
          }
          this.addressList[index].status = 1;
          Toast({
            message: '设置默认地址成功',
            position: 'bottom',
          });
        };
        });
      },
      adressDel:function(el,adressId,ind){
        var _this = this;
        MessageBox.confirm('删除此数据？').then(action => {
          this.$http.post("healthFront/out/shop/removeAddress.do",this.Qs.stringify({
                    addressId:adressId
                  })
                ).then((res)=>{
                  if(res.data.stateCode == '001'){
                    _this.addressList.splice(ind,1);
                    Toast({
                      message: '删除成功',
                      position: 'bottom',
                    });
                  };
                })
        });

    }
    },
    components: {
      Top
      // 引入组件
    },
    mounted(){
     // alert(1)
    }
  }
</script>
