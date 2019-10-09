<template>
  <div>
  <div id="header">
    <div class="search_div">员工姓名：<el-input v-model="searchCondition.name" style="width:200px" placeholder="请输入内容"></el-input></div>
    <div class="search_div search_phone_box">电话：<el-input v-model="searchCondition.phone" style="width:200px" placeholder="请输入内容"></el-input></div>
    <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
    <el-button type="primary" style="float:right" @click="addStaff()">添加员工</el-button>
  </div>
  
  <el-table
    :data="tableData"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    tooltip-effect="dark"
    style="width: 100%"
   >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      align = "center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="phone"
      align = "center"
      label="电话"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      align = "center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="job_name"
      label="职务"
      align = "center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="base_pay"
      label="基本工资"
      align = "center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="生日"
      align = "center"
      show-overflow-tooltip>
      <template slot-scope="scope">{{ scope.row.birthday }}</template>
    </el-table-column>
    <el-table-column
      prop="id_card"
      label="身份证"
      align = "center"
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
      style="margin-top:20px"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
           <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
           <el-input v-model="form.sex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职务" :label-width="formLabelWidth">
           <el-input v-model="form.job" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
           <el-input v-model="form.birthday" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth">
           <el-input v-model="form.id_card" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
           <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
        total:0,
        searchCondition:{
          name:"",
          phone:""
        },
        loading:false,
        dialogTitle:"",
        dialogFormVisible:false,
        formLabelWidth:40,
        form:{
          name:"",
          phone:"",
          sex:0,
          job:"",
          birthday:"",
          id_card:"",
          remark:""
        }
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
                  name:this.searchCondition.name,
                  phone:this.searchCondition.phone
              },
              pages:{
                  currentPage:this.currentPage,
                  pageSize:this.pageSize
              }
          }
          const self = this;
          self.loading = true;
          self.$http.get('/api/staff/getStaff',{params:params}).then(function(response) {
                    console.log(response);
                    self.tableData = response.data;
                    if(self.tableData.length != 0){
                      for(let i = 0; i < self.tableData.length; i++){
                        if(self.tableData[i].sex === 0){
                          self.tableData[i].sex = "男";
                        }else{
                          self.tableData[i].sex = "女";
                      }
                      }
                    }
                    self.loading = false;
          });
      },
      getCount(){
        const self = this;
          self.$http.get('/api/staff/getStaffCount',{}).then(function(response) {
                    console.log(response.data[0].count);
                    self.total = response.data[0].count;
          });
      },
      addStaff(){
        this.dialogTitle = "添加员工";
        this.dialogFormVisible = true;
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
<style scoped>
.search_div{
  display:inline-block;
  margin-bottom:20px;
}
.search_phone_box{
  margin-left:20px;
}
</style>