<template>
<div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="座机号" prop="landline">
            <el-input v-model="ruleForm.landline"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="back()">返回</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    export default {
        data() {
            var checkPhone = (rule, value, callback) => {
                if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
                    callback(new Error('手机号码不符合规范'))
                } else {
                    callback()
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                ruleForm: {
                    company_id:'',
                    name: '',
                    landline:'',
                    phone: '',
                    address: '',
                    remark: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    address: [
                        {required: true, message: '请输入公司地址', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true,validator: checkPhone, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            setData(){
                if(this.$route.params.data){
                    var data = this.$route.params.data;
                    this.ruleForm.company_id = data.company_id;
                    this.ruleForm.name = data.name;
                    this.ruleForm.landline = data.landline;
                    this.ruleForm.phone = data.phone;
                    this.ruleForm.address = data.address;
                    this.ruleForm.remark = data.remark;
                }
            },
            submitForm(formName) {
                const self = this;
                let formData = {
                    name: self.ruleForm.name,
                    phone: self.ruleForm.phone,
                    landline: self.ruleForm.landline,
                    address: self.ruleForm.address,
                    remark: self.ruleForm.remark
                };
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(self.ruleForm.company_id == undefined && self.ruleForm.company_id == null){
                            self.$http.post('/api/company/addCompany',formData).then(function(response) {
                                if(response.status == 200){
                                    alert("提交成功");
                                    self.back();
                                }else{
                                    alert("提交失败");
                                }
                            }).then(function(error) {
                                console.log(error);
                            })
                        }else{
                            formData.company_id = self.ruleForm.company_id;
                            self.$http.post('/api/company/update',formData).then(function(response) {
                                if(response.status == 200){
                                    alert("修改成功");
                                    self.back();
                                }else{
                                    alert("修改失败");
                                }
                            }).then(function(error) {
                                console.log(error);
                            })
                        }
                    }else {
                        console.log('失败');
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            back() {
                const self = this;
                self.$router.push('/company');
            },
        },
        mounted () {
            this.setData();
        },
    }
</script>

<style scoped>

</style>
