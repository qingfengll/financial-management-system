<template>
    <div class="header">
        <div class="logo">
            <img src="../../assets/loge.png" height="32" width="32"/>
            <span>五金厂管理系统</span>
        </div>
        <div class="user-info">
            <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '小仙女'
            }
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 65px;
        font-size: 18px;
        line-height: 65px;
        background-color: #ffffff;
    }
    .header .logo{
        background-color: #002140;
        color: white;
        float: left;
        width:250px;
        text-align: center;
    }
    .logo img{
        vertical-align: middle;
    }
    .user-info {
        color: #333333;
        float: right;
        padding-right: 50px;
        font-size: 16px;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
</style>
