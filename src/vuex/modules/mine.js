import api from './../../fetch/api';
import * as types from './../types.js';

const state = {
    memberId: '1',
    tipNum: 0,
    questid: localStorage.getItem('questid'),
    getquestionBankList: {
        questionBankList: {},
    },
    questionContent: '',
    getquestionkList: {},
    optionId: localStorage.getItem('optionId'),
    detectionResult: {
        detectionRes: JSON.parse(localStorage.getItem('detectionRes'))
    },
    stateCode: '',
    rememberPassword: false,
    personalInfo: {},
    quickInquiry: JSON.parse(localStorage.getItem('quickInquiry')),
    shift_q: {
        province: localStorage.getItem('province'),
        city: localStorage.getItem('city'),
        fieldId: localStorage.getItem('fieldId')
    },
    expertInquiry: JSON.parse(localStorage.getItem('doctorsList'))
}

const actions = {
    getquestionBankListApi({ commit }) {
        //alert('进入action');
        api.questionBankListApi()
            .then(res => {
                //alert('action中调用封装后的axios成功');
                console.log('action中调用封装后的axios成功')
                commit(types.GET_QUESTIONBANKLIST_API, res)
            })
    },
    getquestionkListApi({ commit }) {
        api.questionkListApi()
            .then(res => {
                commit(types.GET_QUESTIONKLOST_API, res);
            })
    },
    getsubquestApi({ commit }) {
        api.subquestApi()
            .then(res => {
                commit(types.SUB_QUEST_API, res)
            })
    },
    personalInfoApi({ commit }) {
        //个人信息
        api.personalInfoApi()
            .then(res => {
                commit(types.PERSONALINFO_API, res)
            })
    },
    getQuickInquiryApi({ commit }) {
        api.quickInquiry()
            .then(res => {
                commit(types.GET_QUICKINQUIRY_API, res)
            })
    },
    expertInquiryApi({ commit }) {
        api.expertInquiry()
            .then(res => {
                commit(types.EXPERTINQUIRY_API, res)
            })
    },
    questid: ({ commit }, param) => commit('QUESTID', { items: param }),
    optionId: ({ commit }, param) => commit('OPTIONID', { items: param }),
    shift_q: ({ commit }, param) => commit('SHIFT_Q', { items: param }),

}

const getters = {
    getquestionBankList: state => state.getquestionBankList.questionBankList,
    getquestionkList: state => state.getquestionkList.questionkList,
    //questionContent: state => state.getquestionkList.questionkList[state.tipNum].questionContent,
    getsubquest: state => state.detectionResult.detectionRes,
    stateCode: state => state.stateCode.stateCode,
    rememberPassword: state => state.rememberPassword,
    personalInfo: state => state.personalInfo,
    quickInquiry: state => state.quickInquiry,
    expertInquiry: state => state.expertInquiry
}

const mutations = {

    [types.GET_QUESTIONBANKLIST_API](state, res) {
        // alert('进入mutation');
        state.getquestionBankList = {...state.getquestionBankList, questionBankList: res.questionBankList }
            //console.log(res.questionBankList)
            // alert('进入mutations修改state成功');
    },
    [types.GET_QUESTIONKLOST_API](state, res) {
        console.log(res.questionList)
        state.getquestionkList = {...state.getquestionkList, questionkList: res.questionList }
    },
    [types.QUESTID](state, res) {
        //console.log(res)
        let thisidnum = res.items
        state.questid = thisidnum
        localStorage.setItem('questid', thisidnum)
    },
    [types.OPTIONID](state, res) {
        console.log(res.items)
        let optionId = res.items
        state.optionId = optionId
        localStorage.setItem('optionId', optionId)
    },
    [types.SUB_QUEST_API](state, res) {
        //console.log(res)
        state.detectionResult = {...state.detectionResult, detectionRes: res }
        let jsonres = JSON.stringify(res)
        localStorage.setItem('detectionRes', jsonres)
            //console.log(res.stateCode)
        state.stateCode = {...state.stateCode, stateCode: res.stateCode }
    },
    [types.PERSONALINFO_API](state, res) {
        state.personalInfo = res
    },
    [types.GET_QUICKINQUIRY_API](state, res) {
        //  console.log(res)
        state.quickInquiry = {...state.quickInquiry, quickInquiry: res.fieldList }
        let jsonres = JSON.stringify(res.fieldList)
        localStorage.setItem('quickInquiry', jsonres)
    },
    [types.SHIFT_Q](state, res) {
        let shift = JSON.parse(res.items)
            //    console.log(shift)
        state.shift_q = {
            ...state.shift_q,
            province: shift[0],
            fieldId: shift[2],
            city: shift[1]
        }
        localStorage.setItem('province', shift[0])
        localStorage.setItem('city', shift[1])
        localStorage.setItem('fieldId', shift[2])
    },
    [types.EXPERTINQUIRY_API](state, res) {
        console.log(res)
        state.expertInquiry = {...state.expertInquiry, expertInquiry: res }
        let jsonres = JSON.stringify(res.doctorsList)
        localStorage.setItem('doctorsList', jsonres)
            //console.log(res.stateCode)
        state.stateCode = {...state.stateCode, stateCode: res.stateCode }
    },
    // questid(state, res) {
    //     console.log(res)
    //     state.questid = res.thisid
    //     localStorage.setItem('questid', res.thisid)
    // },
    remember_me(state) {
        state.rememberPassword = !state.rememberPassword;
        //localStorage.setItem('isLogin', state.rememberPassword);
        console.log(state.rememberPassword)
    },

}

export default {
    state,
    actions,
    getters,
    mutations
}