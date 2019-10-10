import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import SIdentify from './components/page/Identify';    //自定义组件
import "babel-polyfill";

Vue.component("SIdentify",SIdentify);
Vue.use(ElementUI);

/**原本的配置*/
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios

/**
 * 添加的配置
 */
// 引用API文件 将API方法绑定到全局
import api from './api/index.js'
Vue.prototype.$api = api

// Vue.use(axios);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
