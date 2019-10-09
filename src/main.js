import Vue from 'vue'
import App from './App'

// import myrequest from './utils/myrequest'
// Vue.prototype.$http = myrequest
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
