<template>
  <div>
    <header>
      <a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui1"></i></a>
      <h1>计步</h1>
      <router-link to="/helthCenter/stepcounter/historystep"><i class="icon iconfont icon-time"></i></router-link>
    </header>
    <div class="gauge-wrap">
       <div class="gauge-header">
         <div class="step-number-wrap">
            <div class="step-number">
              <span>{{ stepNum  }}</span> 步
              <p>{{ distance }} | {{ energy }}</p>
            </div>
         </div>
       </div>
       <div class="gauge-main-wrap">
         <div class="gauge-main clear">
           <i class="icon iconfont icon-kafei"></i>
           <dl>
             <dt>{{ consume.name }}</dt>
             <dd>{{ consume.time }}</dd>
           </dl>
         </div>
       </div>
      <div class="gauge-main-wrap">
        <div class="gauge-main clear">
          <i class="icon iconfont icon-iconfontrongyu"></i>
          <dl>
            <dt>{{ consume.name }}</dt>
            <dd>{{ consume.time }}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  body{
    background:#f6f6f6;
    header{
      background: #4e9bea;
      height: 4.5rem;
      position: fixed;
      z-index: 999;
      width: 100%;
      top: 0;
      h1{
        right: 4.5rem;
        left: 4.5rem;
        letter-spacing: 0.3rem;
        font-size: 1.8rem;
        font-weight: 500;
        position: absolute;
        color: #fff;
        line-height: 4.5rem;
        text-align: center;
        display: inline-block;
        overflow: hidden;
        width: auto;
        margin: 0;
        text-overflow: ellipsis;
      }
      .icon{
        font-size: 16px;
        width: 2rem;
        height: 2rem;
        display: inline-block;
        margin-top: 1.5rem;
      }
      .icon-fanhui1{
        margin-left: 1.4rem;
        color: rgba(255,255,255,0.5);
      }
      .icon-time{
        margin-right: 1.4rem;
        float: right;
        color: rgba(255,255,255,0.5);
      }
    }
    .gauge-wrap{
      margin-top: 4.5rem;
    }
    .gauge-header{
      overflow: hidden;
      background: #4e9bea;
      padding: 0rem 0 1rem;
      border-bottom: 1px solid #e0dfde;
      .step-number-wrap{
        margin: 2rem auto;
        width: 24rem;
        height: 24rem;
        border: 0.1rem solid #ffffff;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        -o-border-radius: 50%;
        border-radius: 50%;
        .step-number{
          color: #ffffff;
          font-size: 1.1rem;
          text-align: center;
          width: 22rem;
          height: 22rem;
          margin: 1rem auto;
          padding-top: 6rem;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          -ms-border-radius: 50%;
          -o-border-radius: 50%;
          border-radius: 50%;
          border: 1rem solid #ffffff;
          span{
            font-size: 4.5rem;
            display: inline-block;
            transform: rotateY(-50deg);
            margin-right: -0.9rem;
          }
        }
      }
    }
    .gauge-main-wrap{
      .gauge-main{
        border: 1px solid #e8e8e8;
        color: #676767;
        padding: 2rem;
        i{
          display: inline-block;
          width: 2.2rem;
          height: 2.2rem;
          float: left;
          font-size: 2.2rem;
        }
        .icon-kafei{
          color:#4e9bea;
        }
        .icon-iconfontrongyu{
          color: #ffa439;
        }
        dl{
          float: left;
          text-align: left;
          margin-left: 1.5rem;
          dt{
            font-size: 1.5rem;
            color: #676767;
          }
          dd{
            margin-top: 1rem;
            font-size: 1.2rem;
            color: #cfcfcf;
          }
        }
      }
    }

  }
</style>
<script>
  export default{
    data (){
      return {
        stepNum:'8000',
        distance:'6000米',
        energy:'400千卡',
        consume:{name:'消耗能量约等于一杯咖啡',time:'用时1小时40分'}
      }
    },
    created() {
      this.$http.post("/healthFront/out/personalCenter/indexShow.do",this.Qs.stringify({
        memberId: '1'
        })

      ).then((res) => {
        this.messageArr = res.data;
        console.log(res.data)
      })
    }

  }
</script>
