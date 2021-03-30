import Vue from 'vue'
import App from './App'
import global from './common/global/global.js'
import http from './common/global/http.js'

Vue.config.productionTip = false
Vue.prototype.$global = global
Vue.prototype.$http = http

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
