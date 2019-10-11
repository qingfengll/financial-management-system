<template>
    <div>
        <div>
            <el-button v-on:click="addSuit()" type="primary" style="float: right;margin: 0 0 10px 0">添加套装</el-button>
            <el-input v-model="search" placeholder="输入套装名字搜索" style="width: 200px;margin:0 0 10px 0;"></el-input>
        </div>

        <el-table
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="套装名称"></el-table-column>
            <el-table-column prop="specifications" label="规格" show-overflow-tooltip></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column>
                <template slot="header" slot-scope="scope">操作</template>
                <template slot-scope="scope">
                    <el-link
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row,true)">查看详细&nbsp;&nbsp;&nbsp;</el-link>
                    <el-link
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row,false)">修改&nbsp;&nbsp;&nbsp;</el-link>
                    <el-link
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name:"part",
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                currentPage:1,
                pageSize:10,
                total:0,
                search:''
            }
        },
        mounted(){
            this.getData();
            this.getCount();
        },
        methods: {
            getData(){
                var params = {
                    conditions:{

                    },
                    pages:{
                        currentPage:this.currentPage,
                        pageSize:this.pageSize
                    }
                }
                const self = this;
                self.$http.get('/api/suit/getAll',{params:params}).then(function(response) {
                    self.tableData = response.data;
                }).then(function (error) {
                    console.log(error)
                });
            },
            getCount(){
                const self = this;
                self.$http.get('/api/suit/getSuitCount',{}).then(function(response) {
                    self.total = response.data[0].count;
                }).then(function (error) {
                    console.log(error)
                });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            addSuit(){
                this.$router.push('/addSuit').then(function (error) {
                    console.log(error)
                });
            },
            handleEdit(index, row, boo) {
                this.$router.push({name:'addSuit',params:{data:row,boo:boo}}).then(function (error) {
                    console.log(error)
                });
            },
            handleDelete(index, row){
                const self = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    self.$http.post('/api/suit/delete', {id: row.suit_id}).then(function (response) {
                        if (response.status == 200) {
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.getData();
                        } else {
                            self.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        }
                    }).then(function (error) {
                        console.log(error)
                    });
                });
            }
        }
    }
</script>
