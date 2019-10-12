import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui';

NProgress.configure({ showSpinner: false }) // NProgress Configuration

/** 路由控制 */
router.beforeEach((to, from, next) => {
    /** 判断用户是否已经登录 */
    const isLogin = !isEmaty(sessionStorage.getItem('ms_username'))
    console.log(sessionStorage.getItem('ms_username'))
    NProgress.start()
    if(isLogin){
        next();
    }else {
        if(to.path == "/login"){
            next();
        }else{
            next({path:'/login'});
            NProgress.done();
            Message.error('检测到您当前未登录，请先登录');
        }  
    }
})

router.afterEach(() => {
    NProgress.done()
})

function isEmaty(str) {
    if (str == '' || str == null || str == undefined) {
        return true
    } else {
        return false
    }
}
