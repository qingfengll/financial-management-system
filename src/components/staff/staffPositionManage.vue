<template>
  <div>
    <div id="header">
      <div class="search_div">职务名称：<el-input v-model="searchCondition.position_name" style="width:200px" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
      <el-button type="primary" style="float:right" @click="addPosition()">添加职务</el-button>
    </div>

    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column prop="position_name" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="base_pay" align="center" label="基本工资" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="updatePosition(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deletePosition(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" style="margin-top:20px"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog width="30%" :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal=false>
      <el-form label-position="right" ref="form" label-width="80px" :rules="rules" :model="form" :disabled="formDisabled">
        <el-form-item label="职务名称" prop="position_name">
          <el-input v-model="form.position_name" autocomplete="off" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="基本工资" prop="base_pay">
          <el-input v-model="form.base_pay" autocomplete="off" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" autocomplete="off" class="form_input"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogTitle != '查看员工'" @click="formSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'staff-position-manage',
  data() {
    return {
      searchCondition: {
        position_name: ''
      },
      currentPage: 1,
      pageSize: 10,
      tableData:[],
      dialogTitle:"",
      dialogFormVisible:false,
      rules: {
        position_name: [{ required: true, message: '请输入职务名称', trigger: 'blur' }],
        base_pay: [{ required: true, message: '请输入基本工资', trigger: 'blur' }],
      },
      form:{
        position_name:"",
        base_pay:0,
        remark:""
      }
    };
  },
  mounted() {
      this.getData();
  },
  methods: {
    getData() {
        var params = {
        conditions: {
          position_name: this.searchCondition.position_name,
        },
        pages: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      };
      console.log(params);
      const self = this;
      self.loading = true;
      self.$http
        .get('/api/staffPosition/getStaffPosition', { params: params })
        .then(function(response) {
          console.log(response);
          self.tableData = response.data;
          self.loading = false;
        });
    },
    formatForm(){
      this.form = {
        position_name:"",
        base_pay:0,
        remark:""
      }
    },
    formSubmit(){
      this.$refs['form'].validate(valid => {
        const self = this;
        if (valid) {
          if (this.dialogTitle === '添加职务') {
            this.$http
              .post('/api/staffPosition/addPosition', this.form)
              .then(function(response) {
                if ((response.data = 'success')) {
                  self.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                  self.formatForm();
                } else {
                  self.$message.error('新增失败');
                }
                self.dialogFormVisible = false;
                self.getData();
              });
          } else {
            console.log(this.form);
            this.$http
              .post('/api/staffPosition/updatePosition', this.form)
              .then(function(response) {
                if ((response.data = 'success')) {
                  self.$message({
                    message: '编辑成功',
                    type: 'success'
                  });
                  self.formatForm();
                } else {
                  self.$message.error('编辑失败');
                }
                self.dialogFormVisible = false;
                self.getData();
              });
          }
        }
      });
    },
    addPosition(){
      this.dialogTitle = "添加职务";
      this.dialogFormVisible = true;
      this.formatForm();
    },
    updatePosition(row){
      this.dialogTitle = "编辑职务";
      this.dialogFormVisible = true;
      this.form = row;
    },
    deletePosition(row){
      console.log(row.staff_id);
      const self = this;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/api/staffPosition/deletePosition', { position_id: row.position_id })
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
