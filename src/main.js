// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import canvas from './libs/js/detection-result.js'
import Distpicker from 'v-distpicker'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


import qs from 'qs';
import store from './vuex/store'


Vue.component('v-distpicker', Distpicker)
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.Qs = qs;

Vue.use(canvas, qs);
Vue.use(MintUI);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})