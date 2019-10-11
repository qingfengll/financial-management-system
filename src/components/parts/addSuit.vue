<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="套装名称" prop="name">
                <el-input :disabled="disabled" v-model="ruleForm.name" placeholder="请输入部件名称"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="specifications">
                <el-input :disabled="disabled" v-model="ruleForm.specifications" placeholder="请输入部件规格（如：120*120*120 单位：mm*mm*mm）"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input :disabled="disabled" type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label='部件' prop="addPartsData">
                <el-button :disabled="disabled" type="text" @click="dialogTableVisible = true">添加零件</el-button>
                <br>
                <el-table :data="ruleForm.addPartsData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="部件名字" prop="parts.name" ></el-table-column>
                    <el-table-column label="部件规格" prop="parts.specifications"></el-table-column>
                    <el-table-column label="单位" prop="parts.unit" ></el-table-column>
                    <el-table-column label="数量(个/件)" prop="number"></el-table-column>
                    <el-table-column label="利润" prop="profit"></el-table-column>
                    <el-table-column label="出售价格(元)" prop="price"></el-table-column>
                    <el-table-column label="备注" prop="remark"></el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <el-button :disabled="disabled" size="mini" type="danger"
                                       @click="handleRemove(scope.$index, scope.row)">移除</el-button>
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


        <el-dialog title="部件信息" :visible.sync="dialogTableVisible">
            <el-input v-model="searchParts" placeholder="输入部件名字搜索" style="width: 200px;margin:0 0 10px 0;"></el-input>
            <el-table :data="partsData.filter(data => !searchParts ||
                    data.name.toLowerCase().includes(searchParts.toLowerCase())).slice((currentPageMarerial-1)*5,currentPageMarerial*5)">
                <el-table-column prop="name" label="部件名称"></el-table-column>
                <el-table-column prop="specifications" label="规格" show-overflow-tooltip></el-table-column>
                <el-table-column prop="unit" label="单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
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
        <el-dialog title="添加部件规格" :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="addPartSuitForm":rules="rules" label-width="100px">
                <el-row>
                    <el-col :span="12"><div class="grid-content">
                        <el-form-item label="数量" prop="number">
                            <el-input v-model="addPartSuitForm.number"></el-input>
                        </el-form-item>
                        <el-form-item label="切割价格" prop="pipe_cutting" aria-required="true">
                            <el-input v-model="addPartSuitForm.pipe_cutting"></el-input>
                        </el-form-item>
                        <el-form-item label="焊接价格" prop="weld" aria-required="true">
                            <el-input v-model="addPartSuitForm.weld"></el-input>
                        </el-form-item>
                        <el-form-item label="打磨价格" prop="polish" aria-required="true">
                            <el-input v-model="addPartSuitForm.polish"></el-input>
                        </el-form-item>
                        <el-form-item label="钻孔价格" prop="drill" aria-required="true">
                            <el-input v-model="addPartSuitForm.drill"></el-input>
                        </el-form-item>
                        <el-form-item label="深拉攻牙价格" prop="deep_tapping" aria-required="true">
                            <el-input v-model="addPartSuitForm.deep_tapping"></el-input>
                        </el-form-item>
                        <el-form-item label="剪板价格" prop="clipped_board" aria-required="true">
                            <el-input v-model="addPartSuitForm.clipped_board"></el-input>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content">
                        <el-form-item label="冲压价格" prop="punching" aria-required="true">
                            <el-input v-model="addPartSuitForm.punching"></el-input>
                        </el-form-item>
                        <el-form-item label="折弯价格" prop="bend" aria-required="true">
                            <el-input v-model="addPartSuitForm.bend"></el-input>
                        </el-form-item>
                        <el-form-item label="A柱价格" prop="A_pillar" aria-required="true">
                            <el-input v-model="addPartSuitForm.A_pillar"></el-input>
                        </el-form-item>
                        <el-form-item label="加工总费用" prop="wage_cost" aria-required="true">
                            <el-input v-model="addPartSuitForm.wage_cost"></el-input>
                        </el-form-item>
                        <el-form-item label="材料损耗" prop="material_loss" :aria-required="true">
                            <el-input v-model="addPartSuitForm.material_loss"></el-input>
                        </el-form-item>
                        <el-form-item label="利润" prop="profit">
                            <el-input v-model="addPartSuitForm.profit"></el-input>
                        </el-form-item>
                        <el-form-item label="其他花费" prop="other_cost">
                            <el-input v-model="addPartSuitForm.other_cost"></el-input>
                        </el-form-item>
                    </div></el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addPartSuitInfo">确 定</el-button>
            </div>
        </el-dialog>

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
                ruleForm:{
                    suit_id:'',
                    name:'',
                    specifications:'',
                    remark:'',
                    addPartsData:[],
                },
                addPartSuitForm:{
                    parts:{},
                    number:'',
                    price:0,
                    pipe_cutting:'',
                    weld:'',
                    polish:'',
                    drill:'',
                    deep_tapping:'',
                    clipped_board:'',
                    punching:'',
                    bend:'',
                    A_pillar:'',
                    wage_cost:'',
                    material_loss:'',
                    profit:'',
                    other_cost:'',
                },
                partsData:[],
                currentPageMarerial:1,
                currentTotalMaterial:0,
                searchParts:'',
                disabled:true,

                dialogTableVisible:false,
                dialogFormVisible:false,
                rules:{
                    name: [
                        { required: true, message: '请输入零件名称', trigger: 'blur' },
                    ],
                    specifications:[
                        { required: true, message: '请输入规格', trigger: 'blur' },
                    ],
                    addPartsData:[
                        { required: true, message: '请选择零件', trigger: 'blur' },
                    ],
                    number:[
                        { required: true,validator: checkNum, message: '请输入数量', trigger: 'blur' },
                    ],
                    wage_cost:[
                        { required: true,validator: checkNum,message: '请输入加工费用', trigger: 'blur' },
                    ],
                    material_loss:[
                        { required: true,message: '请输入材料损耗',validator: checkNum,  trigger: 'blur' },
                    ],
                    profit:[
                        { required: true,validator: checkNum, message: '请输入利润', trigger: 'blur' },
                    ],
                    other_cost:[
                        { required: true, validator: checkNum,message: '请输入其他花费', trigger: 'blur' },
                    ],
                    pipe_cutting:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    weld:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    polish:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    drill:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    deep_tapping:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    clipped_board:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    punching:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    bend:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                    A_pillar:[
                        { validator: checkNum,message:'请输入正确的数字',trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            setData(){
                if(this.$route.params.data){
                    var data = this.$route.params.data;
                    this.ruleForm.suit_id = data.suit_id;
                    this.ruleForm.name = data.name;
                    this.ruleForm.specifications = data.specifications;
                    this.remark = data.remark;
                    this.disabled = this.$route.params.boo;
                    var params = {
                        id: this.ruleForm.suit_id
                    };
                    var self = this;
                    self.$http.get('/api/suit/getPartsSuit',{params:params}).then(function(response) {
                        if(response.data != -1){
                            self.ruleForm.addPartsData = response.data;
                        }
                    });
                }else{
                    this.disabled = false;
                }
                this.getPartData();
            },
            getPartData(){
                const self = this;
                self.$http.get('/api/parts/getAllPart').then(function(response) {
                    self.partsData =  response.data;
                    self.currentTotalMaterial = self.partsData.length;
                });
            },
            openForm(index,row){
                this.dialogFormVisible = true;
                this.addPartSuitForm.parts = row;
            },
            addPartSuitInfo(){
                this.dialogFormVisible = false;
                let data = {
                    parts:this.addPartSuitForm.parts,
                    number:this.addPartSuitForm.number == ''? 0:parseInt(this.addPartSuitForm.number),
                    pipe_cutting:this.addPartSuitForm.pipe_cutting == ''? 0:parseFloat(this.addPartSuitForm.pipe_cutting),
                    weld:this.addPartSuitForm.weld == ''? 0:parseFloat(this.addPartSuitForm.weld),
                    polish:this.addPartSuitForm.polish == ''? 0:parseFloat(this.addPartSuitForm.polish),
                    drill:this.addPartSuitForm.drill == ''? 0:parseFloat(this.addPartSuitForm.drill),
                    deep_tapping:this.addPartSuitForm.deep_tapping == ''? 0:parseFloat(this.addPartSuitForm.deep_tapping),
                    clipped_board:this.addPartSuitForm.clipped_board == ''? 0:parseFloat(this.addPartSuitForm.clipped_board),
                    punching:this.addPartSuitForm.punching == ''? 0:parseFloat(this.addPartSuitForm.punching),
                    bend:this.addPartSuitForm.bend == ''? 0:parseFloat(this.addPartSuitForm.bend),
                    A_pillar:this.addPartSuitForm.A_pillar == ''? 0:parseFloat(this.addPartSuitForm.A_pillar),
                    wage_cost:this.addPartSuitForm.wage_cost == ''? 0:parseFloat(this.addPartSuitForm.wage_cost),
                    material_loss:this.addPartSuitForm.material_loss == ''? 0:parseFloat(this.addPartSuitForm.material_loss),
                    profit:this.addPartSuitForm.profit == ''? 0:parseFloat(this.addPartSuitForm.profit),
                    other_cost:this.addPartSuitForm.other_cost == ''? 0:parseFloat(this.addPartSuitForm.other_cost),
                };
                data.price = data.number*(data.pipe_cutting+data.weld+data.polish+data.drill
                    +data.deep_tapping+data.clipped_board+data.punching+data.bend
                    +data.A_pillar+data.wage_cost+data.material_loss+data.profit+data.other_cost);
                this.ruleForm.addPartsData.push(data);
                this.addPartSuitForm = {
                    parts:{},
                    number:'',
                        price:0,
                        pipe_cutting:'',
                        weld:'',
                        polish:'',
                        drill:'',
                        deep_tapping:'',
                        clipped_board:'',
                        punching:'',
                        bend:'',
                        A_pillar:'',
                        wage_cost:'',
                        material_loss:'',
                        profit:'',
                        other_cost:'',
                };
            },
            submitForm(formName) {
                const self = this;
                let formData = this.ruleForm;

                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(formData.suit_id == undefined || formData.suit_id == null || formData.suit_id == '' ){
                            self.$http.post('/api/suit/add',formData).then(function(response) {
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
                            formData.suit_id = self.ruleForm.suit_id;
                            self.$http.post('/api/suit/update',formData).then(function(response) {
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
            handleRemove(index,row){
                this.ruleForm.addPartsData.splice(index,1);
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            back(){
                this.$router.push('/suit');
            }
        },
        mounted () {
            this.setData();
        },
    }
</script>

<style scoped>
    .el-row {
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
