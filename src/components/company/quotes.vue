<template>
    <div>
        <div id="header">
            <div class="search_div">公司名字：<el-input v-model="searchCondition.companyName" style="width:200px" placeholder="请输入内容"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
            <el-button type="primary" style="float:right" @click="formSubmit(null,false)">添加订单</el-button>
        </div>

        <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="30">
            </el-table-column>
            <el-table-column prop="company_name" label="公司名字" align="center">
            </el-table-column>
            <el-table-column prop="time" align="center" label="订单时间" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.time }}</template>
            </el-table-column>
            <el-table-column prop="receiving_name" label="接收人姓名" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="receiving_address" label="接收地址" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="end_time" label="收货时间" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.end_time }}</template>
            </el-table-column>
            <el-table-column prop="freight_company" label="货运公司" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="accounts_payable" label="应付账款" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" @click="formSubmit(scope.row,true)">查看</el-button>
                    <el-button size="mini" type="primary" @click="formSubmit(scope.row,false)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteQuotes(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" style="margin-top:20px"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'quotes',
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                searchCondition: {
                    companyName: '',
                },

                loading: false,
                dialogTitle: '',
                dialogFormVisible: false,
                formLabelWidth: 50,
            };
        },
        mounted() {
            this.getData();
            this.getCount();
        },
        methods: {
            getData() {
                var params = {
                    conditions: {
                        name: this.searchCondition.companyName,
                    },
                    pages: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    }
                };
                const self = this;
                self.loading = true;
                self.$http
                    .get('/api/quotes/getQuotes', { params: params})
                    .then(function(response) {
                        console.log(response);
                        self.tableData = response.data;
                        self.loading = false;
                    });
            },
            getCount() {
                const self = this;
                self.$http.get('/api/quotes/getQuotesCount', {}).then(function(response) {
                    console.log(response.data[0].count);
                    self.total = response.data[0].count;
                });
            },
            deleteQuotes(row) {
                const self = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$http
                            .post('/api/quotes/deleteSuitQuotes', { quotes_id: row.quotes_id })
                            .then(function(response) {
                                if (response.data == 'success') {
                                    self.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }else{
                                    self.$message.error('删除失败');
                                }
                                self.getData();
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },
            formSubmit(row,boo) {
                this.$router.push({name:'addQuotes',params:{data:row,boo:boo}});
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            }
        }
    };
</script>
<style scoped>
    .search_div {
        display: inline-block;
        margin-bottom: 20px;
    }
    .search_phone_box {
        margin-left: 20px;
    }
    .form_input {
        width: 80%;
    }
</style>
