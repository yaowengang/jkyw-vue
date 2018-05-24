import api from './../../fetch/api';
import * as types from './../types.js';

const state = {
    findReadByClan: {
        findReadClan: JSON.parse(localStorage.getItem('findReadClan'))
    },
    clanId: localStorage.getItem('clanId')
}
const actions = {
    getfindReadByClanApi({ commit }) {
        alert('进入action');
        api.findReadByClanApi()
            .then(res => {
                alert('action中调用封装后的axios成功');
                //console.log(res)
                commit(types.GET_FINDREADBYCLAN_API, res)
            })
    },
    clanId: ({ commit }, param) => commit('CLANID', { items: param }),
}

const getters = {
    getfindReadByClan: state => state.findReadByClan
}

const mutations = {

    [types.GET_FINDREADBYCLAN_API](state, res) {
        console.log(res.reads)
        alert("mut")
        state.findReadByClan = {...state.findReadByClan, findReadClan: res.reads }
        let jsonres = JSON.stringify(res.reads)
        localStorage.setItem('findReadClan', jsonres)
    },
    [types.CLANID](state, res) {
        // console.log(res)
        let thisidnum = res.items
        state.clanId = thisidnum
        localStorage.setItem('clanId', thisidnum)
    }

}

export default {
    state,
    actions,
    getters,
    mutations
}