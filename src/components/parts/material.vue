<template>
    <div>
        <div>
            <el-button v-on:click="addMaterial()" type="primary" style="float: right;margin: 0 0 10px 0">添加零件</el-button>
            <el-input v-model="search" placeholder="输入零件名字搜索" style="width: 200px;margin:0 0 10px 0;"></el-input>
        </div>

        <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            hight="250"
            style="width: 100%">
            <el-table-column label="零件名字" prop="name" ></el-table-column>
            <el-table-column label="长度（mm）" prop="height" ></el-table-column>
            <el-table-column label="宽度（mm）" prop="width" ></el-table-column>
            <el-table-column label="厚度（mm)" prop="thick"></el-table-column>
            <el-table-column label="数量（m）" prop="count"></el-table-column>
            <el-table-column label="单价（元/m)" prop="price"></el-table-column>
            <el-table-column align="right">
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
            }
        },
        methods: {
            getData(){
                const self = this;
                self.$http.get('/api/material/getMaterial').then(function(response) {
                    self.tableData =  response.data;
                    self.currentTotal = self.tableData.length;
                });
            },
            handleEdit(index, row) {
                this.$router.push({name:'addMaterial',params:{data:row}});
            },
            handleDelete(index, row) {
                const self = this;
                console.log(row);

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    self.$http.post('/api/material/delete',{id:row.material_id}).then(function(response) {
                        if(response.status == 200){
                            self.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            self.getData();
                        }else{
                            self.$message({
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
            addMaterial(){
                const self = this;
                self.$router.push('/addMaterial');
            },
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
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
