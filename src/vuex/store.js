import Vue from 'vue'
import Vuex from 'vuex'

import mine from './modules/mine';
import community from './modules/community';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mine,
        community
    }
});