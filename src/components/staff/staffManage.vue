<template>
  <div>
    <div id="header">
      <div class="search_div">员工姓名：<el-input v-model="searchCondition.name" style="width:200px" placeholder="请输入内容"></el-input>
      </div>
      <div class="search_div search_phone_box">电话：<el-input v-model="searchCondition.phone" style="width:200px" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="getData()">搜索</el-button>
      <el-button type="primary" style="float:right" @click="addStaff()">添加员工</el-button>
    </div>

    <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="电话" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="job_name" label="职务" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="base_pay" label="基本工资" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="生日" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
      </el-table-column>
      <el-table-column prop="id_card" label="身份证" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="seeStaff(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="updateStaff(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteStaff(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40,50]" :page-size="pageSize" style="margin-top:20px"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog width="30%" :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal=false>
      <el-form label-position="right" ref="form" label-width="80px" :rules="rules" :model="form" :disabled="formDisabled">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" class="form_input"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职务" prop="position_id">
          <el-select v-model="form.position_id" placeholder="请选择活动区域">
            <el-option v-for="option in options" :key="option.name" :label="option.position_name" :value="option.position_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="form.birthday" class="form_input"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证" prop="id_card">
          <el-input v-model="form.id_card" autocomplete="off" class="form_input"></el-input>
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
  name: 'staffManage',
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchCondition: {
        name: '',
        phone: ''
      },
      loading: false,
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: 50,
      form: {
        staff_id: '',
        name: '',
        phone: '',
        sex: '0',
        position_id: '',
        birthday: '',
        id_card: '',
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'change' }
        ],
        position_id: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        birthday: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        id_card: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ]
      },
      options: [],
      formDisabled: false
    };
  },
  mounted() {
    this.getData();
    this.getCount();
    this.getJobPosition();
  },
  methods: {
    getData() {
      var params = {
        conditions: {
          name: this.searchCondition.name,
          phone: this.searchCondition.phone
        },
        pages: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      };
      const self = this;
      self.loading = true;
      self.$http
        .get('/api/staff/getStaff', { params: params })
        .then(function(response) {
          console.log(response);
          self.tableData = response.data;
          if (self.tableData.length != 0) {
            for (let i = 0; i < self.tableData.length; i++) {
              if (self.tableData[i].sex === 0) {
                self.tableData[i].sex = '男';
              } else {
                self.tableData[i].sex = '女';
              }
            }
          }
          self.loading = false;
        });
    },
    getCount() {
      const self = this;
      self.$http.get('/api/staff/getStaffCount', {}).then(function(response) {
        console.log(response.data[0].count);
        self.total = response.data[0].count;
      });
    },
    getJobPosition() {
      const self = this;
      self.$http
        .get('/api/staffPosition/getAllStaffPosition', {})
        .then(function(response) {
          console.log(response);
          self.options = response.data;
        });
    },
    addStaff() {
      this.dialogTitle = '添加员工';
      this.dialogFormVisible = true;
      this.formDisabled = false;
      this.formatForm();
    },
    seeStaff(row) {
      this.formDisabled = true;
      this.dialogTitle = '查看员工';
      this.dialogFormVisible = true;
      this.form = row;
      if (row.sex === '男') {
        this.form.sex = '0';
      } else {
        this.form.sex = '1';
      }
      // let params = {
      //   staff_id: row.staff_id
      // };
      // const self = this;
      // self.$http
      //   .get('/api/staff/getStaffById', { params: params })
      //   .then(function(response) {
      //     self.form = response.data[0];
      //     self.form.sex = self.form.sex + '';
      //     self.form.birthday = new Date(self.form.birthday);
      //   });
    },
    updateStaff(row) {
      console.log(row);
      this.dialogTitle = '编辑员工';
      this.dialogFormVisible = true;
      this.formDisabled = false;
      this.form = row;
      if (row.sex === '男') {
        this.form.sex = '0';
      } else {
        this.form.sex = '1';
      }
      this.form.birthday = new Date(this.form.birthday);
    },
    deleteStaff(row) {
      console.log(row.staff_id);
      const self = this;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http
            .post('/api/staff/deleteStaff', { staff_id: row.staff_id })
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
    formatForm() {
      this.form = {
        staff_id: '',
        name: '',
        phone: '',
        sex: '0',
        position_id: '',
        birthday: '',
        id_card: '',
        remark: ''
      };
    },
    formSubmit() {
      this.$refs['form'].validate(valid => {
        const self = this;
        if (valid) {
          if (this.dialogTitle === '添加员工') {
            this.$http
              .post('/api/staff/addStaff', this.form)
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
            this.$http
              .post('/api/staff/updateStaff', this.form)
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