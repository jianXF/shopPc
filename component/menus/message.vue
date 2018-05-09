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
               <el-col :span="6">
                    <el-form-item label="用户手机号:">
                        <el-input v-model="form.name" placeholder="请输入用户手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="时间:">
                        <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date" placeholder="选择投诉评论日期" v-model="form.feedTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                <el-form-item label="类型:">
                        <el-select v-model="form.status" placeholder="请选择查看类型">
                        <el-option label="投诉" value="1"></el-option>
                        <el-option label="留言" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
               <el-col :span="2">
                    <el-form-item label="是否回复:">
                       <el-switch v-model="form.isReply"></el-switch>
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
                width="100">
            </el-table-column>
            <el-table-column
            prop="tel"
            label="手机号"
            width="110">
            </el-table-column>
            
            <el-table-column
            prop="feedTime"
            label="反馈时间"
            width="90">
            </el-table-column>
            <el-table-column
            label="类型"
            width="60"> 
                <template slot-scope="scope">
                    <span :style="{display:scope.row.status==1?'block':'none',color:'#6060bd'}">投诉 </span>
                    <span :style="{display:scope.row.status==2?'block':'none',color:''}">留言 </span>
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
                <el-button  type="text" size="small" :style="{display:scope.row.status==1?'block':'none'}"
                @click="findSeller(scope.row)"
                >投诉商家</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog title="评价回复" :visible.sync="dialogFormVisible" class="dialog">
            <el-form :model="deliveryForm" ref="deliveryForm"> 
                <el-form-item label="回复日期" :label-width="formLabelWidth" prop='repalyTime' :style="{display:deliveryForm.isReply?'block':'none'}">
                      <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date"
                        v-model="deliveryForm.repalyTime" style="width: 80%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="回复内容" :label-width="formLabelWidth" prop='repalyCon'
                    :rules="[{ required: true, message: '请填写回复内容', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                    <el-input type="textarea" placeholder="请填写回复内容" v-model="deliveryForm.repalyCon" :rows="4"></el-input>
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
  
    export default{
        components:{
           
        },
        data(){
            return {
                formLabelWidth:'80px',
                form: {
                    tel: '',
                    status:'',
                    feedTime: '',
                    isReply: false
                },
                //回复弹出框的表单
                deliveryForm:{
                    repalyCon:'',
                    replyTime:'',
                    isReply:false
                },
                dialogFormVisible:false,
                tableData: [{
                    backId: '1234',
                    tel: '1343225322',
                    feedTime: '20150302',
                    status:'1',
                    content: '接待来访垃圾收到了',
                    sellerId:'1',
                    isReply:false
                },{
                    backId: '1234',
                    tel: '1343225322',
                    feedTime: '20150302',
                    sellerId:'2',
                    status:'1',
                    content: '接待来访垃圾收到了',
                    isReply:true
                },
                {
                    backId: '1234',
                    tel: '1343225322',
                    feedTime: '20150302',
                    sellerId:'',
                    status:'2',
                    content: '接待来访垃圾收到了',
                    isReply:false
                }]
            }
        },
        methods:{
            //查询事件
            findSubmit() {
                console.log('submit!');
            },
            //点击回复事件
            handleClick(obj){
                this.dialogFormVisible=true;
                this.deliveryForm.isReply=obj.isReply;
            },
            //回复
            sendSubmit(formName){
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible=false;
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
                this.$alert('这是一段内容', '投诉商家', {
                confirmButtonText: '确定',
                callback: action => {
                  
          }
        });
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