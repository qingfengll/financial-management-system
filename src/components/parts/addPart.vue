<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="部件名称" prop="name">
                <el-input :disabled="disabled" v-model="ruleForm.name" placeholder="请输入部件名称"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="specifications">
                <el-input :disabled="disabled" v-model="ruleForm.specifications" placeholder="请输入部件规格（如：120*120*120 单位：mm*mm*mm）"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-select :disabled="disabled" v-model="ruleForm.unit" placeholder="请选择部件单位">
                    <el-option label="套" value="套"></el-option>
                    <el-option label="件" value="件"></el-option>
                    <el-option label="片" value="片"></el-option>
                    <el-option label="条" value="条"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input :disabled="disabled" type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label=零件 prop="materialForm">
                <el-button :disabled="disabled" type="text" @click="dialogTableVisible = true">添加零件</el-button>
                <br>
                <el-table :data="ruleForm.addMaterialData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="零件名字" prop="name" ></el-table-column>
                    <el-table-column label="长度(mm)" prop="height"></el-table-column>
                    <el-table-column label="宽度(mm)" prop="width" ></el-table-column>
                    <el-table-column label="厚度(mm)" prop="thick"></el-table-column>
                    <el-table-column label="部件长度(m)" prop="length"></el-table-column>
                    <el-table-column label="数量(个/件)" prop="number"></el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-button :disabled="disabled" size="mini" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item><br>
            <el-form-item>
                <el-button :disabled="disabled" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button :disabled="disabled" @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="back()">返回</el-button>
            </el-form-item>
        </el-form>


        <el-dialog title="零件信息" :visible.sync="dialogTableVisible">
            <el-table :data="materialData.filter(data => !searchMaterial ||
                    data.name.toLowerCase().includes(searchMaterial.toLowerCase())).slice((currentPageMarerial-1)*5,currentPageMarerial*5)">
                <el-table-column label="零件名字" prop="name" ></el-table-column>
                <el-table-column label="长度（mm）" prop="height" ></el-table-column>
                <el-table-column label="宽度（mm）" prop="width" ></el-table-column>
                <el-table-column label="厚度（mm)" prop="thick"></el-table-column>
                <el-table-column label="单价（元/m)" prop="price"></el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="openForm(scope.$index, scope.row)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    :current-page.sync="currentPageMarerial"
                    :page-size="5"
                    layout="total, prev, pager, next"
                    :total="currentTotalMaterial">
                </el-pagination>
            </div>
        </el-dialog>
        <el-dialog title="添加零件规格" :visible.sync="dialogFormVisible">
            <el-form :model="addMaterialPartForm">
                <el-form-item label="长度">
                    <el-input v-model="addMaterialPartForm.length"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="addMaterialPartForm.number"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="addMaterialPartForm.price"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMaterialPartInfo">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm:{
                    parts_id:'',
                    name:'',
                    specifications:'',
                    unit:'',
                    remark:'',
                    addMaterialData:[],
                },
                addMaterialPartForm:{
                    material:{},
                    number:'',
                    price:'',
                    length:'',
                },
                materialData:[],
                currentPageMarerial:1,
                currentTotalMaterial:0,
                searchMaterial:'',
                disabled:true,

                dialogTableVisible:false,
                dialogFormVisible:false,
                rules:{

                }
            };
        },
        methods: {
            setData(){
                if(this.$route.params.data){
                    var data = this.$route.params.data;
                    this.ruleForm.parts_id = data.parts_id;
                    this.ruleForm.name = data.name;
                    this.ruleForm.specifications = data.specifications;
                    this.remark = data.remark;
                    this.ruleForm.unit = data.unit;
                    this.disabled = this.$route.params.boo;
                    var params = {
                        id: this.ruleForm.parts_id
                    };
                    var self = this;
                    self.$http.get('/api/parts/getMaterialParts',{params:params}).then(function(response) {
                        self.ruleForm.addMaterialData = response.data;
                    });
                }else{
                    this.disabled = false;
                }
                this.getMaterialData();
            },
            getMaterialData(){
                const self = this;
                self.$http.get('/api/material/getMaterial').then(function(response) {
                    self.materialData =  response.data;
                    self.currentTotalMaterial = self.materialData.length;
                });
            },
            openForm(index,row){
                this.dialogFormVisible = true;
                this.addMaterialPartForm.material = row;
            },
            addMaterialPartInfo(){
                this.dialogFormVisible = false;
                let data = {
                    material_id:this.addMaterialPartForm.material.material_id,
                    name:this.addMaterialPartForm.material.name,
                    height:this.addMaterialPartForm.material.height,
                    width: this.addMaterialPartForm.material.width,
                    thick: this.addMaterialPartForm.material.thick,
                    length: this.addMaterialPartForm.length,
                    number: this.addMaterialPartForm.number,
                    price: this.addMaterialPartForm.price,
                };
                this.ruleForm.addMaterialData.push(data);
                this.addMaterialPartForm = {};
            },
            submitForm(formName) {
                const self = this;
                let formData = this.ruleForm;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(formData.parts_id == undefined || formData.parts_id == null || formData.parts_id == '' ){
                            self.$http.post('/api/parts/add',formData).then(function(response) {
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
                            formData.parts_id = self.ruleForm.parts_id;
                            self.$http.post('/api/parts/update',formData).then(function(response) {
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
            back(){
                this.$router.push('/part');
            }
        },
        mounted () {
            this.setData();
        },
    }
</script>

<style scoped>

</style>
