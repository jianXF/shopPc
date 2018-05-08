<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>评论管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="90px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="6">
                    <el-form-item label="商品编号:">
                        <el-input v-model="form.goodsId" placeholder="请输入商品编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="评论时间:">
                        <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date" placeholder="选择日期" v-model="form.evaTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                <el-form-item label="评价等级:">
                        <el-select v-model="form.evaType" placeholder="请选择评价等级">
                        <el-option label="好评" value="1"></el-option>
                        <el-option label="中评" value="2"></el-option>
                        <el-option label="差评" value="3"></el-option>
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
                prop="evaId"
                label="评价编号"
                width="120">
            </el-table-column>
            <el-table-column
            prop="goodsId"
            label="商品编号"
            width="120">
            </el-table-column>
            
            <el-table-column
            prop="evaTime"
            label="评价时间"
            width="100">
            </el-table-column>
            <el-table-column
            prop="evaType"
            label="评价等级"
            width="100"> 
                <template slot-scope="scope">
                    <span :style="{display:scope.row.evaType==1?'block':'none',color:'#6060bd'}">好评 </span>
                    <span :style="{display:scope.row.evaType==2?'block':'none',color:''}">中评 </span>
                    <span :style="{display:scope.row.evaType==3?'block':'none',color:'red'}">差评 </span>
                </template>
            </el-table-column>
            <el-table-column
            label="评价内容"
            prop="content"
            width="500">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">回复</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" class="dialog">
            <el-form :model="deliveryForm" ref="deliveryForm"> 
                <el-form-item label="快递单号" :label-width="formLabelWidth" prop='repalyTime' :style="{display:deliveryForm.isReply?'block':'none'}">
                      <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date"
                       placeholder="选择日期" v-model="deliveryForm.repalyTime" style="width: 80%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="快递公司" :label-width="formLabelWidth" prop='repalyCon'
                    :rules="[{ required: true, message: '请输入快递公司名称', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                    <el-input type="textarea" v-model="deliveryForm.repalyCon"></el-input>
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
                    goodsId: '',
                    evaType:'',
                    evaTime: '',
                    isReply: false
                },
                //发货弹出框的表单
                deliveryForm:{
                    repalyCon:'',
                    replyTime:'',
                    isReply:false
                },
                dialogFormVisible:false,
                tableData: [{
                    evaId: '1234',
                    goodsId: '1343225322',
                    evaTime: '20150302',
                    evaType:'1',
                    content: '接待来访垃圾收到了',
                    isReply:false
                },{
                    evaId: '1434',
                    goodsId: '1343225322',
                    evaTime: '20150302',
                    evaType:'1',
                    content: '接待来访垃圾收到了',
                    isReply:true
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
</style>