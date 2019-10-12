<template>
    <div>
        <div>
            <el-input v-model="search" placeholder="请输入公司名字搜索" style="width: 200px;margin:0 0 10px 0;"></el-input>
        </div>

        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            hight="250"
            style="width: 100%">
            <el-table-column label="ID" prop="company_id"></el-table-column>
            <el-table-column label="公司名字" prop="name" ></el-table-column>
            <el-table-column label="电话" prop="phone" ></el-table-column>
            <el-table-column label="座机" prop="landline" ></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="备注" prop="remark" ></el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">操作</template>
                <template slot-scope="scope">
                    <el-link
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">还款&nbsp;&nbsp;&nbsp;</el-link>
                    <el-link
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-link>
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
                this.$router.push({name:'AddAccountStatement',params:{data:row}});
            },
            handleDelete(index, row) {
                const self = this;

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    var that = this;
                    self.$http.post('/api/company/delete',{id:row.company_id}).then(function(response) {
                        if(response.status == 200){
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            getData();
                        }else{
                            that.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addCompany(){
                const self = this;
                self.$router.push('/addCompany');
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            searchCompany(value){
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
