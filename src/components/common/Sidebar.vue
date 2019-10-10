<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" background-color="#304156" text-color="#bfcbd9"
        active-text-color="#409EFF" :collapse-transition="collapseTransition" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'home',
                        title: '首页',
                        subs: [
                            {
                                index: 'analysis',
                                title: '数据分析'
                            },
                            {
                                index: 'overtimeManage',
                                title: '员工加班管理'
                            },
                            {
                                index: 'updataPassword',
                                title: '修改密码'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index:'staffManage',
                        title: '员工管理',
                        subs: [
                            {
                              index: 'staffManage',
                                title: '员工管理'
                            },
                            {
                                index: 'viewvStarff',
                                title: '查看员工'
                            },
                            {
                                index: 'overtimeManage',
                                title: '员工加班管理'
                            },
                            {
                                index: 'staffPositionManage',
                                title: '员工职位管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index:'part',
                        title: '零件管理',
                        subs: [
                            {
                                index: 'material',
                                title: '零件管理'
                            },
                            {
                                index: 'part',
                                title: '部件管理'
                            },
                            {
                                index: 'suit',
                                title: '套装管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index:'company',
                        title: '合作公司管理',
                        subs: [
                            {
                                index: 'company',
                                title: '公司管理'
                            },
                            {
                                index: 'quotes',
                                title: '订单管理'
                            },
                            {
                                index: 'accountStatement',
                                title: '对账信息'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index:'finance',
                        title: '财务管理',
                        subs: [
                            {
                                index: 'company',
                                title: '公司管理'
                            },
                            {
                                index: 'quotes',
                                title: '订单管理'
                            },
                            {
                                index: 'accountStatement',
                                title: '对账信息'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'userCenter',
                        title: '设置',
                        subs: [
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    }
                ],
                collapseTransition:true
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 65px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
