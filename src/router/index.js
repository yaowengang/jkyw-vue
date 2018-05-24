import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import shouYe from '@/components/shouYe'
import shop from '@/components/shop'
import helthCenter from '@/components/helthCenter'
import community from '@/components/community'
import personalCenter from '@/components/personalCenter'
import Login from '@/components/login'
import Register from '@/components/register'
import forgetPwd from '@/components/forgetPwd'
import Active from '@/components/commom/Article_detail.vue'

/*
 * diagnose
 * */
import InquiryIndex from '@/components/page/diagnose/InquiryIndex.vue'
import expertInquiry from '@/components/page/diagnose/expertInquiry.vue'
import intelligentInquiry from '@/components/page/diagnose/intelligentInquiry.vue'
import expertList from '@/components/page/diagnose/expertList.vue'

/*
 * detection
 * */
import preventionIndex from '@/components/page/detection/preventionIndex.vue'
import preventionList from '@/components/page/detection/preventionList.vue'
import detectionIndex from '@/components/page/detection/detectionIndex.vue'
import ChinaMedicine from '@/components/page/detection/ChinaMedicine.vue'
import presentState from '@/components/page/detection/presentState.vue'
/*
 * target
 * */
import programme from '@/components/page/target/programme.vue'
import userProgramme from '@/components/page/target/userProgramme.vue'
import projectManage from '@/components/page/target/projectManage.vue'
/*
 * goods
 * */
import goodsClassify from '@/components/page/goods/goodsClassify.vue'
import todayPurchase from '@/components/page/goods/todayPurchase.vue'
import myOrder from '@/components/page/goods/myOrder.vue'
import allOrder from '@/components/page/goods/allOrder.vue'
import paymentOrder from '@/components/page/goods/paymentOrder.vue'
import unDeliveryOrder from '@/components/page/goods/unDeliveryOrder.vue'
import finishOrder from '@/components/page/goods/finishOrder.vue'
import shopCart from '@/components/page/goods/shopCart.vue'
import payment from '@/components/page/goods/payment.vue'
import logistics from '@/components/page/goods/logistics.vue'
import returnGoods from '@/components/page/goods/returnGoods.vue'
import evaluate from '@/components/page/goods/evaluate.vue'
import orderDetail from '@/components/page/goods/orderDetail.vue'
import DiscountCoupon from '@/components/page/goods/discountCoupon.vue'
import GoodsList from '@/components/page/goods/goodsList.vue'
import AddAddress from '@/components/page/goods/AddAddress.vue'
import YouLike from '@/components/page/goods/YouLike.vue'
import backFeeTimeList from '@/components/page/goods/backFeeTimeList.vue'
import GoodsDetail from '@/components/page/goods/GoodsDetail.vue'
import goodsSearch from '@/components/page/goods/goodsSearch.vue'
import searchDetail from '@/components/page/goods/searchDetail.vue'
import selectAddress from '@/components/page/goods/selectAddress.vue'



/*
 * archives
 * */
import archivesList from '@/components/page/archives/archivesList.vue'
import basicInf from '@/components/page/archives/Information/basicInf.vue'
import habitInf from '@/components/page/archives/Information/HabitInf.vue'
import physiqueInf from '@/components/page/archives/Information/physiqueInf.vue'
import casemanage from '@/components/page/archives/Casemanag/casemanage.vue'
import casemanageOpen from '@/components/page/archives/Casemanag/CasemanageOpen.vue'
import casemanageEdit from '@/components/page/archives/Casemanag/CasemanagEdit.vue'
import administration from '@/components/page/archives/Administration/administration.vue'
import joinadmin from '@/components/page/archives/Administration/joinadmin.vue'
import detailsmin from '@/components/page/archives/Administration/Detailsmin.vue'
import stepcounter from '@/components/page/archives/stepcounter.vue'
import historystep from '@/components/page/archives/HistoryStepc.vue'
import setsteps from '@/components/page/archives/SetSteps.vue'

/*
 *personalCenter
 * */
import information from '@/components/page/personalCenter/information.vue'
import dialogueDoctor from '@/components/page/personalCenter/message/dialogueDoctor.vue'
import systemMessages from '@/components/page/personalCenter/message/sysMess.vue'
import systemMsg from '@/components/page/personalCenter/message/systemMsg.vue'
import msgDetails from '@/components/page/personalCenter/message/msgDetails.vue'
import serviceMessage from '@/components/page/personalCenter/message/serviceMessage.vue'
import personalInfo from '@/components/page/personalCenter/personalInfo.vue'
import MyPhysician from '@/components/page/personalCenter/MyPhysician.vue'
import physicianDetails from '@/components/page/personalCenter/physicianDetails/physicianDetails.vue'
import modifyName from '@/components/page/personalCenter/personalInfos/modifyName.vue'
import modifyPhone from '@/components/page/personalCenter/personalInfos/modifyPhone.vue'
import myDiscountCoupon from '@/components/page/personalCenter/discountCoupon.vue'
import myCollect from '@/components/page/personalCenter/myCollect.vue'
import setting from '@/components/page/personalCenter/setting.vue'
import unused from '@/components/page/personalCenter/discountCoupon/unused.vue'
import CouponUsed from '@/components/page/personalCenter/discountCoupon/used.vue'
import outOfDate from '@/components/page/personalCenter/discountCoupon/outOfDate.vue'
import integral from '@/components/page/personalCenter/integral.vue'
import rechargeIntegral from '@/components/page/personalCenter/integral/rechargeIntegral.vue'
import integralLog from '@/components/page/personalCenter/integral/integralLog.vue'
import rechargeRecord from '@/components/page/personalCenter/integral/rechargeRecord.vue'
import Message from '@/components/commom/Message.vue'
import doctorAppraise from '@/components/page/personalCenter/DoctorAppraise.vue'
import about from '@/components/page/personalCenter/about.vue'
import addressManagement from '@/components/page/personalCenter/addressManagement.vue'
/*
 * community
 * */
import Tribe from '@/components/page/community/Tribe.vue'
import Activity from '@/components/page/community/Activity.vue'
import Doctor from '@/components/page/community/Doctor.vue'
import FindReadByClan from '@/components/page/community/FindReadByClan.vue'
import FindVideo from '@/components/page/community/FindVideo.vue'

/*
 * commom
 * */
import articleDetail from '@/components/commom/Article_detail.vue'
import CommentList from '@/components/commom/Comment.vue'

/*
 * healthInfo
 * */
import AddProject from '@/components/page/target/projectList.vue'
import InformationList from '@/components/page/healthInformation/informationList.vue'
import InfoDetails from '@/components/page/healthInformation/infoDetails.vue'
import healthComment from '@/components/page/healthInformation/healthComment.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Login
  },
    {
      path: '/index',
      component: shouYe,
    },
    {
      path: '/shop',
      component: shop
    },
    {
      path: '/helthCenter',
      component: helthCenter
    },
    {
      path: '/community',
      component: community,
      children: [{
        path: '/community/',
        component: Tribe
      },
        {
          path: '/community/activity',
          component: Activity
        },
        {
          path: '/community/doctor',
          component: Doctor
        },
      ]
    },
    {
      path: '/personalCenter',
      component: personalCenter
    },
    {
      path: '/InquiryIndex',
      component: InquiryIndex,
      children: [{
        path: '/InquiryIndex/',
        component: expertInquiry
      },
        {
          path: '/InquiryIndex/intelligentInquiry',
          component: intelligentInquiry
        }
      ]
    },
    {
      path: '/expertList',
      component: expertList
    },
    {
      path: '/preventionIndex',
      component: preventionIndex
    },
    {
      path: '/PreventionList',
      component: preventionList
    },
    {
      path: '/perventDetails:id',
      component: Active
    },
    {
      /*预防宝典*/
      path: '/detectionIndex',
      component: detectionIndex
    },
    {
      /*购物券*/
      path: '/discountCoupon',
      component: DiscountCoupon
    },
    {
      /*商品列表*/
      path: '/goodsList',
      component: GoodsList
    },
    {
      /*中医传统检测*/
      path: '/ChinaMedicine',
      component: ChinaMedicine
    },
    {
      /*当前状态检测页面*/
      path: '/presentState',
      component: presentState
    },
    {
      path: '/programme',
      component: programme
    },
    {
      path: '/userProgramme',
      component: userProgramme
    },
    {
      path: '/projectManage',
      component: projectManage
    },
    {
      /*商品分类查询*/
      path: '/goodsClassify',
      component: goodsClassify
    },
    {
      /*今日必抢*/
      path: '/todayPurchase',
      component: todayPurchase
    },
    {
        /*商品详情*/
        path: '/GoodsDetail',
        component: GoodsDetail
      },
    {
      /*我的订单*/
      path: '/myOrder',
      component: myOrder,
      children: [{
        path: '/myOrder',
        component: allOrder
      },
        {
          path: '/paymentOrder',
          component: paymentOrder
        },
        {
          path: '/unDeliveryOrder',
          component: unDeliveryOrder
        },
        {
          path: '/finishOrder',
          component: finishOrder
        }
      ]
    },
    {
      /*购物车*/
      path: '/shopCart',
      component: shopCart
    },
    {
      path: '/payment',
      component: payment
    },
    {
      path: '/logistics',
      component: logistics
    },
    {
      path: '/returnGoods',
      component: returnGoods
    },
    {
      path: '/evaluate',
      component: evaluate
    },
    {
      path: '/orderDetail',
      component: orderDetail
    },
    {
      /*添加收货地址*/
      path: '/AddAddress/:id',
      component: AddAddress
    },
    {
      /*添加收货地址*/
      path: '/YouLike',
      component: YouLike
    },
    {
      /*商品搜索*/
      path: '/goodsSearch',
      component: goodsSearch
    },
    {
      /*商品搜索结果*/
      path: '/searchDetail',
      component: searchDetail
    },
    {
      /*退款进度*/
      path: '/backFeeTimeList',
      component: backFeeTimeList
    },
    /*管理模块*/
    {
      path: '/helthCenter/archiveslist',
      component: archivesList
    },
    {
      path: '/helthCenter/archiveslist/basic/',
      component: basicInf
    },
    {
      path: '/helthCenter/archiveslist/physique/',
      component: physiqueInf
    },
    {
      path: '/helthCenter/archiveslist/habitinf',
      component: habitInf
    },
    {
      path: '/helthCenter/casemanagement',
      component: casemanage
    },
    {
      path: '/helthCenter/casemanagement/open/:id',
      component: casemanageOpen
    },
    {
      path: '/helthCenter/casemanagement/edit/:id',
      component: casemanageEdit
    },
    {
      path: '/helthCenter/administration',
      component: administration
    },
    {
      path: '/helthCenter/administration/join/:id',
      component: joinadmin
    },
    {
      path: '/helthCenter/administration/join/:id/ss',
      component: detailsmin
    },
    //步数
    {
      path: '/helthCenter/stepcounter',
      component: stepcounter
    },
    {
      path: '/helthCenter/stepcounter/historystep',
      component: historystep
    },
    {
      path: '/helthCenter/setsteps',
      component: setsteps
    },
    /*社区模块*/
    {
      path: '/community/tribe/findReadByClan',
      component: FindReadByClan
    },
    {
      path: '/articleDetail',
      component: articleDetail
    },
    {
      path: '/FindVideo',
      component: FindVideo
    },
    {
      path: '/CommentList',
      component: CommentList
    },
    {
      /*健康中心评论*/
      path: '/healthComment',
      component: healthComment
    },
    {
      /*sch 我的模块*/
      path: '/information',
      component: information,
      children: [{
        /*我的问诊*/
        path: '/information/',
        component: dialogueDoctor
      },
        {
          path: '/information/systemMessages',
          component: systemMessages
        },
        {
          path: '/information/serviceMessage',
          component: serviceMessage
        }
      ]
    },
    {
      /*系统消息*/
      path: '/systemMsg',
      component: systemMsg
    },
    {
      /*系统消息*/
      path: '/msgDetails',
      component: msgDetails
    },
    {
      /*个人信息*/
      path: '/personalInfo',
      component: personalInfo
    },
    {
      path: '/addProject',
      component: AddProject
    },
    {
      path: '/informationList',
      component: InformationList
    },
    {
      path: '/infoDetails',
      component: InfoDetails
    },
    {
      /*我的医师*/
      path: '/MyPhysician',
      component: MyPhysician
    },
    {
      /*我的医师内页*/
      path: '/physicianDetails',
      component: physicianDetails
    },
    {
      /*积分页*/
      path: '/integral',
      component: integral,
      children: [{
        path: '/integral/',
        component: integralLog
      },
        {
          path: '/integral/rechargeRecord',
          component: rechargeRecord
        }
      ]

    },
    {
      /*积分充值*/
      path: '/rechargeIntegral',
      component: rechargeIntegral
    },
    {
      /*我的优惠券*/
      path: '/myDiscountCoupon',
      component: myDiscountCoupon,
      children: [{
        path: '/myDiscountCoupon/',
        component: unused
      },
        {
          path: '/myDiscountCoupon/CouponUsed',
          component: CouponUsed
        },
        {
          path: '/myDiscountCoupon/outOfDate',
          component: outOfDate
        }
      ]

    },
    {
      /*我的收藏*/
      path: '/myCollect',
      component: myCollect
    },
    {
      /*客服沟通*/
      path: '/message',
      component: Message
    },
    {
      /*客服评价*/
      path: '/message/appraise',
      component: doctorAppraise
    },
    {
      /*设置*/
      path: '/setting',
      component: setting
    },
    {
      /*修改姓名*/
      path: '/modifyName',
      component: modifyName
    },
    {
      /*修改手机号*/
      path: '/modifyPhone',
      component: modifyPhone
    },
    {
      /*登录*/
      path: '/login',
      component: Login
    },
    {
      /*注册*/
      path: '/register',
      component: Register
    },
    {
      /*忘记密码*/
      path: '/forgetPwd',
      component: forgetPwd
    },
    {
      /*关于我们*/
      path: '/about',
      component: about
    },
    {
      /*关于我们*/
      path: '/addressManagement',
      component: addressManagement
    },{
      /*选择收货地址*/
      path: '/selectAddress',
      component: selectAddress
    }

  ]
})
