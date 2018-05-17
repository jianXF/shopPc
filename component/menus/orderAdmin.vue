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
                        <el-input v-model="form.orderId" clearable placeholder="请输入订单编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="购买人电话:">
                        <el-input v-model="form.tel" clearable placeholder="请输入收货电话"></el-input>
                    </el-form-item>
                </el-col>
               <el-col :span="6">
                    <el-form-item label="订单状态:">
                        <el-select v-model="form.status" placeholder="请选择状态" clearable>
                        <el-option label="待付款" value="1"></el-option>
                        <el-option label="待发货" value="2"></el-option>
                        <el-option label="待收货" value="3"></el-option>
                        <el-option label="待评价" value="4"></el-option>
                        <el-option label="完成" value="5"></el-option>
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
            :data="tableData.slice((page.currentpage-1)*page.pagesize,page.currentpage*page.pagesize)"
            border
            :style="{width: '90%',margin:'auto'}">
            <el-table-column
                fixed
                prop="orderId"
                label="订单编号"
                sortable
                width="130">
            </el-table-column>
            <el-table-column
            label="商品名称"
            width="150"> 
            <template slot-scope="scope">
                <a class="goods" v-text="scope.row.title" :href="'#/menus/updateGoods?goodsId='+scope.row.goodsId"></a>
            </template>
            </el-table-column>
            
            <el-table-column
            label="购买金额"
            sortable
            prop="goodsPrice"
            width="105">
            </el-table-column>
            <el-table-column
            prop="goodsNum"
            sortable
            label="购买数量"
            width="105">
            </el-table-column>
            <el-table-column
            prop="tel"
            label="购买人电话"
            sortable
            width="130">
            
            </el-table-column>
            <el-table-column
            label="备注"
            width="150">
                <template slot-scope="scope">
                    <span v-text="scope.row.nodeinfo==''?'无':scope.row.nodeinfo"></span>
                </template>
            </el-table-column>
            <el-table-column
            label="订单状态"
            width="120">
                <template slot-scope="scope">
                    <span :style="{display:scope.row.status==1?'block':'none',color:'green'}">待付款 </span>
                    <span :style="{display:scope.row.status==2?'block':'none',color:'red'}">待发货 </span>
                    <span :style="{display:scope.row.status==3?'block':'none',color:''}">待收货 </span>
                    <span :style="{display:scope.row.status==4?'block':'none',color:''}">待评价 </span>
                    <span :style="{display:scope.row.status==5?'block':'none',color:'#6060bd'}">完成 </span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" v-if="scope.row.status==1" @click=" deleteOrder(scope.row)">取消订单</el-button>
                <el-button type="text" size="small" v-if="scope.row.status==2" @click=" dialogshow(scope.row)">发货</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="page.pagesize"
            :total="tableData.length"
            :current-page="page.currentpage"
            @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
            >
        </el-pagination>
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
  import $ from "jquery";
    export default{
        components:{
           
        },
        data(){
            return {
                formLabelWidth:'80px',
                form: {
                   orderId:'',
                   tel:'',
                   status:''
                },
                //发货弹出框的表单
                deliveryForm:{
                    deliveryName:'',
                    deliveryId:''
                },
                dialogFormVisible:false,
                tableData: [],
                selectId:'',
                page:{
                    currentpage:1,
                    pagesize:10

                }
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
                    url:"http://localhost:2015/find/orderAll",
                    type:"GET",
                    data:{
                        sellerId:sessionStorage.getItem("sellerId")
                    },
                    success:function(data){
                        _this.tableData = data;
                        console.log( _this.tableData);
                    }
            })
        },
        methods:{
            //查询事件
            async findSubmit() {
                const _this = this;
                await $.ajax({
                    url:"http://localhost:2015/find/orders",
                    type:"get",
                    data:{
                        sellerId:sessionStorage.getItem("sellerId"),
                        orderId:_this.form.orderId?_this.form.orderId:undefined,
                        tel:_this.form.tel?_this.form.tel:undefined,
                        status:_this.form.status?_this.form.status:undefined
                    },
                    success:function(data){
                        _this.tableData = data;
                    }
                })
            },
            //点击查看事件
            handleClick(obj){
                this.$router.push({path:'/menus/orderDetail',query:{orderId:obj.orderId}})
            },
            //发货
            sendGoods(obj){

            },
            //发货
            sendSubmit(formName){
                const _this = this;
                 this.$refs[formName].validate(async(valid) => {
                if (valid) {
                     await $.ajax({
                        url:"http://localhost:2015/orders/send",
                        type:"post",
                        data:{
                            orderId:_this.selectId,
                            deliveryName:_this.deliveryForm.deliveryName,
                            deliveryId:_this.deliveryForm.deliveryId
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    message: '发货成功',
                                    type: 'success'
                                });
                            }
                        }
                    })

                    this.dialogFormVisible=false;
                    await $.ajax({
                            url:"http://localhost:2015/find/orderAll",
                            type:"GET",
                            data:{
                                sellerId:sessionStorage.getItem("sellerId")
                            },
                            success:function(data){
                                _this.tableData = data;
                            }
                    })
                } else {
                    
                    return;
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
            },
            //显示发货弹框
            dialogshow(obj){
                this.deliveryForm.deliveryName='';
                this.deliveryForm.deliveryId="";
                this.dialogFormVisible=true;
                this.selectId=obj.orderId;
            },
            //取消订单
            async deleteOrder(obj){
                const _this= this;
                this.$confirm('是否取消订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                   
                    await $.ajax({
                        url:"http://localhost:2015/order/delete",
                        type:"POST",
                        data:{
                            orderId:obj.orderId,
                            goodsId:obj.goodsId,
                            goodsNum:obj.goodsNum,
                            sellerId:sessionStorage.getItem("sellerId")
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                        type: 'success',
                                        message: '订单取消成功!'
                                });
                            }
                        
                        }
                    });
                    await $.ajax({
                                url:"http://localhost:2015/find/orderAll",
                                type:"GET",
                                data:{
                                    sellerId:sessionStorage.getItem("sellerId")
                                },
                                success:function(data){
                                    _this.tableData = data;
                                }
                        })
                }).catch(() => {         
                });
			  
            },
            handleSizeChange: function (size) {
                this.page.pagesize = size;
            },
            handleCurrentChange(currentPage){
                this.page.currentpage=currentPage;

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
.goods{
    color:#409EFF;
    text-decoration: underline;
}
</style>