<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="90px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="6">
                    <el-form-item label="订单编号:">
                        <el-input v-model="form.sellerTitle" placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="购买人电话:">
                        <el-input v-model="form.sellerTitle" placeholder="请输入收货电话"></el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="6">
                    <el-form-item label="订单状态:">
                        <el-select v-model="form.kindId" placeholder="请选择状态" clearable>
                        <el-option label="待付款" value="1"></el-option>
                        <el-option label="待发货" value="2"></el-option>
                        <el-option label="待评价" value="3"></el-option>
                        <el-option label="完成" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
               <el-col :span="4">
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
                prop="orderId"
                label="订单编号"
                width="130">
            </el-table-column>
            <el-table-column
            prop="title"
            label="商品名称"
            width="150">
            </el-table-column>
            <el-table-column
            label="购买金额"
            prop="goodsPrice"
            width="150">
            </el-table-column>
            <el-table-column
            prop="goodsNum"
            label="购买数量"
            width="150">
            </el-table-column>
            <el-table-column
            prop="tel"
            label="购买人电话"
            width="150">
            </el-table-column>
            <el-table-column
            label="订单状态"
            width="150">
                <template slot-scope="scope">
                    <span :style="{display:scope.row.status==1?'block':'none',color:'green'}">待付款 </span>
                    <span :style="{display:scope.row.status==2?'block':'none',color:'red'}">待发货 </span>
                    <span :style="{display:scope.row.status==3?'block':'none',color:''}">待评价 </span>
                    <span :style="{display:scope.row.status==4?'block':'none',color:'#6060bd'}">完成 </span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="dialogFormVisible = true">发货</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" class="dialog">
            <el-form :model="deliveryForm" ref="deliveryForm">
                <el-form-item label="快递公司" :label-width="formLabelWidth" prop='deliveryName'
                    :rules="[{ required: true, message: '请输入快递公司名称', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                    <el-input v-model="deliveryForm.deliveryName"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" :label-width="formLabelWidth" prop='deliveryId'
                :rules="[{ required: true, message: '请输入快递单号', trigger: 'blur' }]">
                    <el-input v-model="deliveryForm.deliveryId"></el-input>
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
                    sellerTitle: '',
                    kindId: '',
                    date1: '',
                    date2: '',
                    isSell: false,
                    isBargain:false
                },
                //发货弹出框的表单
                deliveryForm:{
                    deliveryName:'',
                    deliveryId:''
                },
                dialogFormVisible:false,
                tableData: [{
                    orderId: '1234',
                    title: '悦诗风吟',
                    goodsPrice: '1423',
                    price_n:'211',
                    goodsNum: '233',
                    tel: '1948934534',
                    status:'1'
                    
                },{
                    orderId: '12334',
                    title: '悦诗风吟',
                    goodsPrice: '1423',
                    price_n:'211',
                    goodsNum: '233',
                    tel: '1948934534',
                    status:'2'
                    
                },{
                    orderId: '12234',
                    title: '悦诗风吟',
                    goodsPrice: '1423',
                    price_n:'211',
                    goodsNum: '233',
                    tel: '1948934534',
                    status:'3'
                    
                },{
                    orderId: '12434',
                    title: '悦诗风吟',
                    goodsPrice: '1423',
                    price_n:'211',
                    goodsNum: '233',
                    tel: '1948934534',
                    status:'4'
                    
                }]
            }
        },
        methods:{
            //查询事件
            findSubmit() {
                console.log('submit!');
            },
            //点击查看事件
            handleClick(obj){

            },
            //发货
            sendGoods(obj){

            },
            sendSubmit(formName){
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible=false;
                } else {
                    
                    return false;
                }
                });
            },
            //快递公司名称校验
            validateTitle(rule, value, callback){
                if (value.length>16) {
                callback(new Error('快递公司名称不超过16个字'));
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
.dialog .el-input{
    width: 80%;
}
</style>