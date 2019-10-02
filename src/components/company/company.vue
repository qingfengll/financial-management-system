<template>
    <div>
        <el-breadcrumb separator="/" class="crumbs">
            <el-breadcrumb-item>合作公司管理</el-breadcrumb-item>
        </el-breadcrumb>

        <div>
            <el-button v-on:click="addCompany()" type="primary" style="float: right;margin: 0 0 10px 0">添加公司</el-button>
            <el-input v-model="search" placeholder="请输入公司名字搜索" style="width: 200px;margin:0 0 10px 0;"></el-input>
        </div>

        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            hight="250"
            style="width: 100%">
            <el-table-column label="ID" prop="company_id" width="120px"></el-table-column>
            <el-table-column label="公司名字" prop="name" width="197px"></el-table-column>
            <el-table-column label="电话" prop="phone" width="130px"></el-table-column>
            <el-table-column label="地址" prop="address" width="300px"></el-table-column>
            <el-table-column label="备注" prop="remark" width="150px"></el-table-column>
            <el-table-column align="right" width="120px">
                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10,15,20,40,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="currentTotal" style="margin: 20px 0">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                search: '',
                currentPage: 1,
                pageSize: 10,
                currentTotal: 0,
                search:''
            }
        },
        methods: {
            getData(){
                const self = this;
                self.$http.get('/api/company/getCompany').then(function(response) {
                    self.tableData =  response.data;
                    self.currentTotal = self.tableData.length;
                });
            },
            handleEdit(index, row) {

                console.log(index, row);
            },
            handleDelete(index, row) {
                const self = this;

                self.$http.post('/api/company/getCompanyById',{id:'000000001'}).then(function(response) {
                    console.log('返回了');

                    self.tableData[0].name = '1234678';
                });
            },
            addCompany(){
                const self = this;
                self.$router.push('/addCompany');
            },
            handleSizeChange(val) {
                this.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
            },
            searchCompany(value){
                console.log(value);
            },
        },
        mounted () {
            this.getData()
        },
    }

</script>

<style scoped>

    .edit{
        width: 20%;
    }
</style>
