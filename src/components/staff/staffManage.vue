<template>
  <div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="job"
      label="职务"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="job"
      label="职务"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="生日"
      show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.birthday }}</template>
    </el-table-column>
    <el-table-column
      prop="idCard"
      label="身份证"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      show-overflow-tooltip>
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
    name:"staffManage",
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage:1,
        pageSize:10,
        total:0
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
          self.$http.get('/api/staff/getStaff',{params:params}).then(function(response) {
                    console.log(response);
                    self.tableData = response.data;
          });
      },
      getCount(){
        const self = this;
          self.$http.get('/api/staff/getStaffCount',{}).then(function(response) {
                    console.log(response.data[0].count);
                    self.total = response.data[0].count;
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
      }
    }
  }
</script>