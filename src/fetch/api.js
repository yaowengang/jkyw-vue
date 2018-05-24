import axios from 'axios'
import qs from 'qs';
import mine from '../vuex/modules/mine'
import community from '../vuex/modules/community'
export function fetch(url, params) {
    //console.log(params)
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                //alert('Api--ok');
                resolve(response.data);
                //console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}

export default {
    // 获取我的页面的后台数据
    questionBankListApi() {
        //alert('进入api.js') 
        return fetch('/healthFront/out/index/quickTest.do', qs.stringify({ memberId: mine.state.memberId }));
    },
    questionkListApi() {
        return fetch('/healthFront/out/index/quickTestAnswer.do', qs.stringify({ memberId: mine.state.memberId, questionBankId: mine.state.questid }));
    },
    subquestApi() {
        return fetch('/healthFront/out/index/submitTheAnswers.do', qs.stringify({ memberId: mine.state.memberId, optionIds: mine.state.optionId }));
    },
    personalInfoApi() {
        return fetch('/healthFront/out/personalCenter/indexShow.do', qs.stringify({ memberId: JSON.parse(localStorage.getItem('loginStatus')).memberId }));
    },
    quickInquiry() {
        return fetch('/healthFront/out/index/quickInquiry.do');
    },
    expertInquiry() {
        return fetch('/healthFront/out/index/expertInquiry.do', qs.stringify({ memberId: mine.state.memberId, province: mine.state.shift_q.province, city: mine.state.shift_q.city, fieldId: mine.state.shift_q.fieldId }))
    },
    findReadByClanApi() {
        return fetch('/healthFront/out/social/healthTribeDetail.do', qs.stringify({
            memberId: mine.state.memberId,
            clanId: community.state.clanId
        }));
    }
}