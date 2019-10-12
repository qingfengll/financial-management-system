<template>
    <div>
        <div id="header">
            <div class="search_div">订单号：<el-input v-model="searchCondition.quotes_id" style="width:200px" placeholder="请输入内容"></el-input>
            </div>
            <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
            <el-button @click="back()">返回</el-button>
        </div>

        <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="30">
            </el-table-column>
            <el-table-column prop="quotes_id" label="订单号" align="center">
            </el-table-column>
            <el-table-column prop="time" align="center" label="订单时间" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.time }}</template>
            </el-table-column>
            <el-table-column prop="end_time" label="收货时间" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.end_time }}</template>
            </el-table-column>
            <el-table-column prop="accounts_payable" label="应付账款" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="now_payable" label="实付账款" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" @click="formSubmit(scope.row)">还款</el-button>
                    <el-button size="mini" @click="getAccountStatements(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" style="margin-top:20px"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>



        <el-dialog title="" :visible.sync="dialogFormVisible">
            <el-form :model="accountStatement">
                <el-form-item label="金额" prop="paid" :aria-required="true">
                    <el-input v-model="accountStatement.paid"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addInfo">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="账单信息" :visible.sync="dialogTableVisible">
            <el-table :data="accountStatements">
                <el-table-column prop="company_id" label="company_id"></el-table-column>
                <el-table-column prop="quotes_id" label="订单ID" show-overflow-tooltip></el-table-column>
                <el-table-column prop="paid" label="支付金额" show-overflow-tooltip></el-table-column>
                <el-table-column prop="time" label="时间" show-overflow-tooltip></el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="delete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'quotes',
        data() {
            return {
                tableData: [],
                company_id:'',
                multipleSelection: [],
                currentPage: 1,
                pageSize: 10,
                total: 0,
                accountStatements:[],
                accountStatement:{
                    account_statement_id:'',
                    company_id:'',
                    quotes_id:'',
                    paid:"",
                    time:''
                },
                searchCondition: {
                    quotes_id: '',
                },

                loading: false,
                dialogTitle: '',
                dialogFormVisible: false,
                dialogTableVisible:false,
                formLabelWidth: 50,
            };
        },
        mounted() {
            this.getData();
            this.getCount();
        },
        methods: {
            getAccountStatements(row){
                this.dialogTableVisible = true;
                console.log(row);
                var self = this;
                var params = {
                   row:row
                };
                self.$http.get('/api/quotes/getAccountStatements', {params: row}).then(function(response) {
                    self.accountStatements = response.data;
                });
            },
            getData() {
                var value = this.$route.params.data;
                this.company_id = value.company_id;
                var params = {
                    conditions: {
                        name: this.searchCondition.quotes_id,
                    },
                    pages: {
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    },
                    company_id:value.company_id,
                };
                const self = this;
                self.loading = true;
                self.$http
                    .get('/api/quotes/getQuotesAndPAY', {params: params})
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
            formSubmit(row,boo) {
                this.accountStatement.company_id = this.company_id;
                this.accountStatement.quotes_id = row.quotes_id;
                this.dialogFormVisible = true;
                console.log(this.accountStatement);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            back(){
                this.$router.push({name:'accountStatement'});
            },
            addInfo(){
                this.accountStatement.time = new Date();
                const self = this;
                self.$http.post('/api/quotes/getQuotesAndAcc', this.accountStatement ).then(function(response) {
                });

                this.dialogFormVisible = false;
                this.getData();
            },
            delete(index,rew){
                const self = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$http
                            .post('/api/quotes/deleteACC',row)
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
