<template>
  <div class="wrap">

    <Top :title="title"></Top>

    <ul class="address-list">
      <li>
        <span>收货人</span>
        <input type="text" maxlength="12" :value="receiverName" v-model="receiverName">
      </li>
      <li>
        <span>联系电话</span>
        <input type="text" maxlength="11" :value="receiverPhone" v-model="receiverPhone">
      </li>

      <div class="Vdistpicker">
        <span>所在地区</span>
        <Vdistpicker @selected="onselected" :province="City[0]" :city="City[1]" :area="City[2]"></Vdistpicker>
      </div>

      <li>
        <span>详细地址</span>
        <textarea placeholder="请填写详细地址..." :value="receiverAddress" v-model="receiverAddress"></textarea>
      </li>
    </ul>

    <div class="default-address"  @click="toggleAdress"  v-bind:class="{this_address:status==1}">
      设为默认地址<span id="default-ad"></span>
    </div>

    <button class="address-btn" @click="sumbit" :disabled="disabledBtn">提交</button>

  </div>
</template>

<script>
  import Top from '../../../../src/components/commom/top2.vue';
  import Vdistpicker from 'v-distpicker'
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        title: "编辑地址",
        cityValue: '',
        AddressVal:'',
        user:JSON.parse(localStorage.getItem('loginStatus')),//用户信息
        receiverName:'',
        receiverPhone:'',
        receiverAddress:'',
        disabledBtn:true,
        City:'',
        status:'2'
      }
    },
    created() {
      if(this.$route.params.id == 'newAddress'){

      } else {
        this.$http.post("healthFront/out/shop/getAddressInfo.do",this.Qs.stringify({
            addressId:this.$route.params.id
          })
        ).then((res) => {
          this.AddressVal = res.data.addressInfo;
          this.receiverName = res.data.addressInfo.receiverName;
          this.receiverPhone = res.data.addressInfo.receiverPhone;
          this.receiverAddress = res.data.addressInfo.receiverAddress;
          this.status = res.data.addressInfo.status;
          this.City = (res.data.addressInfo.receiverArea).split('-');
          // console.log(this.$route.params.id)
          console.log(this.AddressVal);
        });
      }
    },
    watch:{
  'receiverName':function(val,oldval){
        if(!oldval==''){
          this.disabledBtn = false
        }
      },
      'receiverPhone':function(val,oldval){
        if(!oldval==''){
          this.disabledBtn = false
        }
      },
      'receiverAddress':function(val,oldval){
        if(!oldval==''){
          this.disabledBtn = false
        }
      },
      'cityValue':function(val,oldval){
        if(!oldval==''){
          this.disabledBtn = false
        }
      },
    },
    methods: {
      onselected(data) {
        console.log(data);
        this.cityValue = data.province.value+'-'+data.city.value+'-'+data.area.value;
      },
      toggleAdress () {
       this.status = '1'
      },
      sumbit(){
       console.log('提交信息'+this.receiverName+this.receiverPhone+this.cityValue);
       if(this.$route.params.id == 'newAddress'){
         this.$http.post("healthFront/out/shop/saveAddressInfo.do",this.Qs.stringify({
             memberId:this.user.memberId,  //用户id
             receiverName:this.receiverName,  //收货人
             receiverPhone:this.receiverPhone, //收货人姓名
             receiverArea: this.cityValue,  //所在地区
             receiverAddress:this.receiverAddress,  //详细地址
             status:this.status //是否为默认地址
           })
         ).then((res)=>{
           if(res.data.stateCode == '001'){
             Toast({
               message: '添加成功',
               position: 'bottom',
             });
           }
         })
       } else {
         this.$http.post("healthFront/out/shop/editAddressInfo.do",this.Qs.stringify({
             memberId:this.user.memberId,  //用户id
             addressId:this.$route.params.id,  //地址id
             receiverName:this.receiverName,  //收货人
             receiverPhone:this.receiverPhone, //收货人姓名
             receiverArea: this.cityValue,  //所在地区
             receiverAddress:this.receiverAddress,  //详细地址
             status:this.status //是否为默认地址
           })
         ).then((res)=>{
           console.log(res.data)
           if(res.data.stateCode == '001'){
             Toast({
               message: '修改成功',
               position: 'bottom',
             });
           };
         })
       }
      }
    },
    mounted(){
     if(this.$route.params.id == 'newAddress' ){
      this.title = '新增地址',
      this.disabledBtn = false
     }
    },
    components: {
      Top,
      Vdistpicker

      // 引入组件
    }
  }
</script>

<style lang="less" scoped>
  .Vdistpicker span {
    display: inline-block;
    margin: 1rem 0;
    font-size: 1.3rem;
  }

  .address-list {
    background: #FFFFFF;
    padding: 0 0.8rem;
    margin-top: 5rem;
  }

  .address-list li {
    border-bottom: solid 1px #eeeeee;
    padding: 1.5rem 0 0.5rem 0;
    overflow: hidden;
  }

  .address-list li > span {
    display: inline-block;
    font-size: 1.3rem;
  }

  .address-list li input {
    font-size: 1.2rem;
    padding: 0.2rem 0.4rem;
  }

  .address-list li div {
    width: 23%;
    float: right;
    font-size: 1.3rem;
    color: #666666;
  }

  .address-list li div span {
    width: 0.8rem;
    height: 1.3rem;
    display: inline-block;
    /*    background: url("../images/arrow-right.png");*/
    -webkit-background-size: 100%;
    background-size: 100%;
    margin-left: 1rem;
    vertical-align: middle;
  }

  .address-list li.street input {
    width: 85%;
  }

  .address-list li.area input {
    width: 55%;
    border: solid 1px #cccccc;
  }

  .address-list li textarea {
    width: 100%;
    padding: 1rem 0.2rem;
    height: 8rem;
    font-size: 1.2rem;
    color: #aaaaaa;
  }

  .default-address {
    width: 100%;
    background: #FFFFFF;
    margin-top: 0.6rem;
    padding: 1.5rem 1rem;
    font-size: 1.3rem;
  }

  .default-address span {
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background: url("../../../../static/img/check-btn_05.png");
    background-size: 100%;
    float: right;
  }

  .default-address span.active {
    background: url("../../../../static/img/check-btn_03.png");
    background-size: 100%;
  }

  .this_address span{
    background-image: url("../../../../static/img/AddressIcon_08.png");
    color: #1696e5;
  }

  .address-btn {
    width: 60%;
    background: #1696e5;
    color: #FFFFFF;
    padding: 1rem 0;
    margin:5rem auto;
    display: block;
    text-align: center;
    border-radius: 3rem;
    font-size: 1.4rem;
  }
  .address-btn[disabled]{
    background: #ccc;
  }
</style>
