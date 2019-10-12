<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="公司名称" prop="company_id">
                <el-select v-model="ruleForm.company_id" placeholder="请选择活动区域">
                    <el-option :disabled="disabled" v-for="option in company" :key="option.company_id" :label="option.name" :value="option.company_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收货时间" prop="end_time">
                <el-date-picker :disabled="disabled" type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.end_time" class="form_input"></el-date-picker>
            </el-form-item>
            <el-form-item label="接受地址" prop="receiving_address">
                <el-input :disabled="disabled" v-model="ruleForm.receiving_address" placeholder="请输入部件规格（如：120*120*120 单位：mm*mm*mm）"></el-input>
            </el-form-item>
            <el-form-item label="接收人姓名" prop="receiving_name">
                <el-input :disabled="disabled" v-model="ruleForm.receiving_name" placeholder="请输入部件规格（如：120*120*120 单位：mm*mm*mm）"></el-input>
            </el-form-item>
            <el-form-item label="货运公司" prop="freight_company">
                <el-input :disabled="disabled" v-model="ruleForm.freight_company" placeholder="请输入部件规格（如：120*120*120 单位：mm*mm*mm）"></el-input>
            </el-form-item>
            <el-form-item label="应付账款" prop="accounts_payable">
                <el-input :disabled="disabled" v-model="ruleForm.accounts_payable" placeholder="请输入部件规格（如：120*120*120 单位：mm*mm*mm）"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input :disabled="disabled" type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="套装" prop="addSuitQuotes">
                <el-button :disabled="disabled" type="text" @click="dialogTableVisible = true">添加套装</el-button>
                <br>
                <el-table :data="ruleForm.addSuitQuotes" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="套装名" prop="suit.name" ></el-table-column>
                    <el-table-column label="套装规格" prop="suit.specifications"></el-table-column>
                    <el-table-column label="数量" prop="number" ></el-table-column>
                    <el-table-column label="价格" prop="price"></el-table-column>
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
            <el-input v-model="searchSuit" placeholder="输入零件名字搜索" style="width: 200px;margin:0 0 10px 0;"></el-input>
            <el-table :data="suitData.filter(data => !searchSuit ||
                    data.name.toLowerCase().includes(searchSuit.toLowerCase())).slice((currentPageMarerial-1)*5,currentPageMarerial*5)">
                <el-table-column prop="name" label="套装名称"></el-table-column>
                <el-table-column prop="specifications" label="规格" show-overflow-tooltip></el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
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


        <el-dialog title="添加部件规格" :visible.sync="dialogFormVisible">
            <el-form :model="addSuitQuotesForm">
                <el-form-item label="数量" prop="number" :aria-required="true">
                    <el-input v-model="addSuitQuotesForm.number"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="addSuitQuotesForm.price"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSuitQuotesInfo">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm:{
                    quotes_id:'',
                    company_id:'',
                    company:[],
                    company_name:'',
                    remark:'',
                    end_time:'',
                    time:'',
                    receiving_address:'',
                    receiving_name:'',
                    freight_company:'',
                    accounts_payable:'',
                    addSuitQuotes:[],
                },
                addSuitQuotesForm:{
                    suit:{},
                    number:'',
                    price:''
                },
                company:[],
                suitData:[],
                currentPageMarerial:1,
                currentTotalMaterial:0,
                searchSuit:'',
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
                    unit:[
                        { required: true, message: '请选择单位', trigger: 'blur' },
                    ],
                    addMaterialData:[
                        { required: true, message: '请选择零件', trigger: 'blur' },
                    ],
                    length:[
                        { required: true, message: '请选择零件', trigger: 'blur' },
                    ],
                    number:[
                        { required: true, message: '请选择零件', trigger: 'blur' },
                    ],
                    price:[
                        { required: true, message: '请选择零件', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            setData(){
                if(this.$route.params.data){
                    var data = this.$route.params.data;
                    this.ruleForm.suit_id = data.suit_id;
                    this.ruleForm.quotes_id = data.quotes_id;
                    this.ruleForm.company_id = data.company_id;
                    this.ruleForm.company_name = data.company_name;
                    this.ruleForm.remark = data.remark;
                    this.ruleForm.end_time = data.end_time;
                    this.ruleForm.time = data.time;
                    this.ruleForm.receiving_address = data.receiving_address;
                    this.ruleForm.receiving_name = data.receiving_name;
                    this.ruleForm.freight_company = data.freight_company;
                    this.ruleForm.accounts_payable = data.accounts_payable;

                    this.disabled = this.$route.params.boo;
                    var params = {
                        id: this.ruleForm.quotes_id
                    };
                    var self = this;
                    self.$http.get('/api/quotes/getSuitQuotesByID',{params:params}).then(function(response) {
                        self.ruleForm.addSuitQuotes = response.data;
                    });
                }else{
                    this.disabled = false;
                }
                this.getSuitData();
            },
            getCompany(){
                const self = this;
                self.$http.get('/api/company/getCompany').then(function(response) {
                    self.company =  response.data;
                });
            },
            getSuitData(){
                const self = this;
                self.$http.get('/api/suit/getAllSuit').then(function(response) {
                    self.suitData =  response.data;
                    self.currentTotalMaterial = self.suitData.length;
                });
            },
            openForm(index,row){
                this.dialogFormVisible = true;
                this.addSuitQuotesForm.suit = row;
            },
            addSuitQuotesInfo(){
                this.dialogFormVisible = false;
                let data = {
                    suit:this.addSuitQuotesForm.suit,
                    number:this.addSuitQuotesForm.number,
                    price:this.addSuitQuotesForm.price,
                };
                this.ruleForm.addSuitQuotes.push(data);
                this.addMaterialPartForm = {};
            },
            submitForm(formName) {
                const self = this;
                let formData = this.ruleForm;
                formData.time = new Date();

                console.log(formData.time);
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(formData.quotes_id == undefined || formData.quotes_id == null || formData.quotes_id == '' ){
                            self.$http.post('/api/quotes/addQuotes',formData).then(function(response) {
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
                            self.$http.post('/api/quotes/update',formData).then(function(response) {
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
                this.ruleForm.addSuitQuotes.splice(index,1);
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            back(){
                this.$router.push('/quotes');
            }
        },
        mounted () {
            this.setData();
            this.getCompany();
        },
    }
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
