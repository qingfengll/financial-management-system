import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/analysis',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/userCenter',
                    component: resolve => require(['../components/page/UserCenter.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/modifyUser',
                    component: resolve => require(['../components/page/ModifyUser.vue'], resolve)
                },
                {
                    path: '/staffManage',
                    name:'staffManage',
                    component:resolve => require(['../components/staff/staffManage.vue'],resolve),
                },
                {
                    path: '/staffPositionManage',
                    name:'staffPositionManage',
                    component:resolve => require(['../components/staff/staffPositionManage.vue'],resolve),       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/part',
                    component:resolve => require(['../components/parts/part.vue'],resolve),

                },
                {
                    path: '/company',
                    component:resolve => require(['../components/company/company.vue'],resolve),
                },
                {
                    path: '/finance',
                    component:resolve => require(['../components/finance/finance.vue'],resolve),

                },
                {
                    path: '/addCompany',
                    name: 'addCompany',
                    component:resolve => require(['../components/company/addCompany.vue'],resolve),
                },
                {
                    path: '/analysis',
                    component:resolve => require(['../components/home/analysis.vue'],resolve),
                },
                {
                    path: '/overtimeManage',
                    component:resolve => require(['../components/home/overtimeManage.vue'],resolve),
                },
                {
                    path: '/updataPassword',
                    component:resolve => require(['../components/home/updataPassword.vue'],resolve),
                },
                {
                    path:'/material',
                    name:'material',
                    component:resolve => require(['../components/parts/material.vue'],resolve),
                },
                {
                    path:'/addMaterial',
                    name:'addMaterial',
                    component:resolve => require(['../components/parts/addMaterial.vue'],resolve),
                },
                {
                    path:'/part',
                    name:'part',
                    component:resolve => require(['../components/parts/part.vue'],resolve),
                },
                {
                    path:'/addPart',
                    name:'addPart',
                    component:resolve => require(['../components/parts/addPart.vue'],resolve),
                },
                {
                    path:'/suit',
                    name:'suit',
                    component:resolve => require(['../components/parts/suit.vue'],resolve),
                },
                {
                    path:'/addSuit',
                    name:'addSuit',
                    component:resolve => require(['../components/parts/addSuit.vue'],resolve),
                },
                {
                    path:'/quotes',
                    name:'quotes',
                    component:resolve => require(['../components/company/quotes.vue'],resolve),
                },
                {
                    path:'/addQuotes',
                    name:'addQuotes',
                    component:resolve => require(['../components/company/addQuotes.vue'],resolve),
                },
                {
                    path:'/accountStatement',
                    name:'accountStatement',
                    component:resolve => require(['../components/finance/accountStatement.vue'],resolve),
                },
                {
                    path:'/AddAccountStatement',
                    name:'AddAccountStatement',
                    component:resolve => require(['../components/finance/AddAccountStatement.vue'],resolve),
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
