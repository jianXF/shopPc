<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>留言投诉</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="90px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="4">
                    <el-form-item label="是否投诉:">
                       <el-switch v-model="form.feedStatus"></el-switch>
                    </el-form-item>
                </el-col>
               <el-col :span="5">
                    <el-form-item label="用户手机号:">
                        <el-input v-model="form.tel" placeholder="请输入用户手机号" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="时间:">
                        <el-date-picker format="yyyyMMdd" clearable value-format="yyyyMMdd" type="date" placeholder="选择投诉评论日期" v-model="form.feedTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                <el-form-item label="类型:">
                        <el-select v-model="form.isReply" clearable placeholder="请选择是否回复">
                        <el-option label="未回复" value="0"></el-option>
                        <el-option label="回复" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
               
               <el-col :span="2">
                    <el-form-item>
                        <el-button type="primary" @click="findSubmit">查询</el-button>
                    </el-form-item>
               </el-col>
           </el-row>
        </el-form>
        <el-table
            :data="tableData"
            border
            :style="{width: '90%',margin:'auto'}">
            <el-table-column
                fixed
                prop="backId"
                label="编号"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
            prop="tel"
            label="手机号"
            sortable
            width="120">
            </el-table-column>
            
            <el-table-column
            label="反馈时间"
            sortable
            width="110">
                <template slot-scope="scope">
                    <span v-text="scope.row.feedTime.substr(0,8)"></span>
                </template>
            </el-table-column>
            <el-table-column
            label="类型"
            width="60"> 
                <template slot-scope="scope">
                    <span :style="{display:scope.row.feedStatus==1?'block':'none',color:'#6060bd'}">投诉 </span>
                    <span :style="{display:scope.row.feedStatus==2?'block':'none',color:''}">留言 </span>
                </template>
            </el-table-column>
            <el-table-column
            label="反馈内容"
            prop="content"
            width="500">
            </el-table-column>
            <el-table-column
            label="是否回复"
            width="90"> 
                <template slot-scope="scope">
                    <span :style="{display:scope.row.isReply?'block':'none',color:'#6060bd'}">已回复 </span>
                    <span :style="{display:!scope.row.isReply?'block':'none',color:''}">未回复 </span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">回复</el-button>
                <el-button  type="text" size="small" v-if="scope.row.feedStatus==1"
                @click="findSeller(scope.row)"
                >查看商家</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog title="评价回复" :visible.sync="dialogFormVisible" class="dialog">
            <el-form :model="deliveryForm" ref="deliveryForm"> 
                <el-form-item label="回复日期" :label-width="formLabelWidth" prop='repalyTime' :style="{display:deliveryForm.isReply?'block':'none'}">
                      <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date"
                        v-model="deliveryForm.backTime" style="width: 80%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="回复内容" :label-width="formLabelWidth" prop='backcontent'
                    :rules="[{ required: true, message: '请填写回复内容', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                    <el-input type="textarea" placeholder="请填写回复内容" v-model="deliveryForm.backcontent" :rows="4"></el-input>
                </el-form-item>
               
            </el-form>
                
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendSubmit('deliveryForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import $ from "jquery";
    export default{
        components:{
           
        },
        data(){
            return {
                formLabelWidth:'80px',
                form: {
                    tel: '',
                    isReply:'',
                    feedTime: '',
                    feedStatus: true
                },
                //回复弹出框的表单
                deliveryForm:{
                    backcontent:'',
                    backTime:'',
                    isReply:false,
                    backId:''
                },
                dialogFormVisible:false,
                tableData: []
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
				url:"http://localhost:2015/feedbackAll",
				type:"GET",
				data:{
                    feedStatus:_this.form.feedStatus?'1':'0'
				},
				success:function(data){
					_this.tableData=data;
				}
            });
        },
        methods:{
            //查询事件
            async findSubmit() {
                const _this =this;
                 await $.ajax({
				url:"http://localhost:2015/feedback/find",
				type:"GET",
				data:{
                    feedStatus:_this.form.feedStatus?'1':'0',
                    tel:_this.form.tel==""?undefined:_this.form.tel,
                    isReply:_this.form.isReply==""?undefined:_this.form.isReply,
                    feedTime:_this.form.feedTime==""?undefined:_this.form.feedTime
				},
				success:function(data){
					_this.tableData=data;
				}
            });
            },
            //点击回复事件
            handleClick(obj){
                this.dialogFormVisible=true;
                this.deliveryForm.isReply=obj.isReply;
                this.deliveryForm.backId=obj.backId;
                if(obj.isReply){
                    this.deliveryForm.backTime = obj.backTime.substr(0,8);
                    this.deliveryForm.backcontent = obj.backcontent;
                }else{
                        this.deliveryForm.backcontent="";
                        this.deliveryForm.backTime="";
                }
                
            },
            //回复
            sendSubmit(formName){
                const _this =this;
                 this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    
                    await $.ajax({
                        url:"http://localhost:2015/feedback/replay",
                        type:"POST",
                        data:{
                            backId:_this.deliveryForm.backId,
                            backcontent:_this.deliveryForm.backcontent,
                            aminId:sessionStorage.getItem("adminId")
                        },
                        success:function(data){
                            if(data=="success"){
                                _this.$message({
                                        type: 'success',
                                        message: '回复成功'
                                });
                                _this.dialogFormVisible=false;
                                
                            }
                        }
                    });
                } else {
                    
                    return false;
                }
                });
            },
            //回复内容校验
            validateTitle(rule, value, callback){
                if (value.length>250) {
                callback(new Error('快递公司名称不超过250个字'));
                } else {
                callback();
                }
            },
            findSeller(obj){
                this.$router.push({path:'/menus/findSellerInfo',query:{sellerId:obj.sellerId}});

            }
        }
    }
</script>
<style scoped>
.goodsAdminOA{
    width: 90%;
    margin:auto;
    margin-top: 20px;
}
.dialog .el-textarea{
    width: 80%;
}

.el-table .el-button{
    float: left;
}
</style>