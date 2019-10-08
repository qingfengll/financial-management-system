<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="零件名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="长度(mm)" prop="height">
                <el-input v-model="ruleForm.height"></el-input>
            </el-form-item>
            <el-form-item label="宽度(mm)" prop="width">
                <el-input v-model="ruleForm.width"></el-input>
            </el-form-item>
            <el-form-item label="厚度(mm)" prop="thick">
                <el-input v-model="ruleForm.thick"></el-input>
            </el-form-item>
            <el-form-item label="数量(m)" prop="count">
                <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
            <el-form-item label="单价(元/m)" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
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
            var checkNum = (rule, value, callback) => {
                if (value && (!(/^[0-9]+.?[0-9]*$/).test(value))){
                    callback(new Error('请输入数字'))
                } else {
                    callback()
                }
            };
            return {
                ruleForm: {
                    material_id:'',
                    name: '',
                    width:'',
                    height: '',
                    thick: '',
                    price: '',
                    count:'',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入零件名称', trigger: 'blur' },
                    ],
                    price: [
                        {required: true,validator: checkNum,  message: '请输入价格',trigger: 'blur' }
                    ],
                    count: [
                        { required: true,validator: checkNum, message: '请输入数量', trigger: 'blur' }
                    ],
                    height: [
                        {validator: checkNum, message: '请输入长度', trigger: 'blur' }
                    ],
                    thick:[
                        {validator: checkNum, message: '请输入厚度', trigger: 'blur' }
                    ],
                    width:[
                        { validator: checkNum, message: '请输入宽度', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            setData(){
                if(this.$route.params.data){
                    var data = this.$route.params.data;
                    this.ruleForm.material_id = data.material_id;
                    this.ruleForm.name = data.name;
                    this.ruleForm.height = data.height;
                    this.ruleForm.width = data.width;
                    this.ruleForm.thick = data.thick;
                    this.ruleForm.price = data.price;
                    this.ruleForm.count = data.count;
                }
            },
            submitForm(formName) {
                const self = this;
                let formData = {
                    name:this.ruleForm.name,
                    material_id:this.ruleForm.material_id ,
                    height:this.ruleForm.height ,
                    width:this.ruleForm.width ,
                    thick: this.ruleForm.thick ,
                    price:this.ruleForm.price ,
                    count:this.ruleForm.count
                };
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(formData.material_id == undefined || formData.material_id == null || formData.material_id == '' ){
                            self.$http.post('/api/material/add',formData).then(function(response) {
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
                            formData.material_id = self.ruleForm.material_id;
                            self.$http.post('/api/material/update',formData).then(function(response) {
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
                this.$router.push('/material');
            },
        },
        mounted () {
            this.setData();
        },
    }
</script>

<style scoped>

</style>
