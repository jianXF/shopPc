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
               <el-col :span="5">
                    <el-form-item label="商品名称:">
                        <el-input v-model="form.title" placeholder="请输入商品名称" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="评论时间:">
                        <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date" placeholder="选择日期" v-model="form.evaTime" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                <el-form-item label="评价等级:">
                        <el-select v-model="form.evaType" placeholder="请选择评价等级" clearable>
                        <el-option label="好评" value="1"></el-option>
                        <el-option label="中评" value="2"></el-option>
                        <el-option label="差评" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
               <el-col :span="5">
                    <el-form-item label="回复状态:">
                        <el-select v-model="form.isReply" placeholder="请选择回复状态" clearable>
                        <el-option label="未回复" value="0"></el-option>
                        <el-option label="已回复" value="1"></el-option>
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
            :data="tableData.slice((page.currentpage-1)*page.pagesize,page.currentpage*page.pagesize)"
            border
            :style="{width: '90%',margin:'auto'}">
            <el-table-column
                fixed
                prop="evaId"
                label="评价编号"
                sortable
                width="120">
            </el-table-column>
            <el-table-column
           
            label="商品名称"
            width="120">
                <template slot-scope="scope">
                    <a class="goods"  v-text="scope.row.title" :href="'#/menus/updateGoods?goodsId='+scope.row.goodsId"></a>
                </template>
            </el-table-column>
            
            <el-table-column
            label="评价时间"
            sortable
            width="105">
                <template slot-scope="scope">
                    <span v-text="scope.row.evaTime.substr(0,8)"></span>
                </template>
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
        <el-dialog title="评价回复" :visible.sync="dialogFormVisible" class="dialog">
            <el-form :model="deliveryForm" ref="deliveryForm"> 
                <el-form-item label="回复日期" :label-width="formLabelWidth" prop='replyTime' :style="{display:deliveryForm.isReply?'block':'none'}">
                      <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date"
                        v-model="deliveryForm.replyTime" style="width: 80%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="回复内容" :label-width="formLabelWidth" prop='repalyCon'
                    :rules="[{ required: true, message: '请输入快递公司名称', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                    <el-input type="textarea" v-model="deliveryForm.repalyCon" :rows="4"></el-input>
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
                    title: '',
                    evaType:'',
                    evaTime: '',
                    isReply: ''
                },
                //发货弹出框的表单
                deliveryForm:{
                    repalyCon:'',
                    replyTime:'',
                    isReply:0,
                    evaId:''
                },
                dialogFormVisible:false,
                tableData: [],
                page:{
                    currentpage:1,
                    pagesize:10

                }
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
                    url:"http://localhost:2015/find/evaluateAll",
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
                console.log('submit!');
                const _this= this;
                await $.ajax({
                    url:"http://localhost:2015/find/evaluates",
                    type:"GET",
                    data:{
                        sellerId:sessionStorage.getItem("sellerId"),
                        title:_this.form.title?_this.form.title:undefined,
                        evaType:_this.form.evaType?_this.form.evaType:undefined,
                        evaTime: _this.form.evaTime?_this.form.evaTime:undefined,
                        isReply: _this.form.isReply?_this.form.isReply:undefined

                    },
                    success:function(data){
                        _this.tableData = data;
                    }
            })

            },
            //点击回复事件
             handleClick(obj){
                
                this.dialogFormVisible=true;
                this.deliveryForm.evaId = obj.evaId;
                if(obj.isReply){
                    this.deliveryForm.isReply=obj.isReply;
                    this.deliveryForm.repalyCon=obj.repalyCon;
                    this.deliveryForm.replyTime=obj.replyTime.substr(0,8);
                    console.log()
                }else{
                    this.deliveryForm.isReply=obj.isReply;
                    this.deliveryForm.repalyCon="";
                    this.deliveryForm.replyTime="";
                }
                
                
            },
            //回复
            sendSubmit(formName){
                 this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    const _this =this;
                    await $.ajax({
                    url:"http://localhost:2015/evaluate/repaly",
                    type:"POST",
                    data:{
                        evaId:_this.deliveryForm.evaId,
                        repalyCon:_this.deliveryForm.repalyCon
                    },
                    success:function(data){
                        if(data=="success"){
                            _this.$message({
                                        type: 'success',
                                        message: '恢复成功'
                                });
                                _this.dialogFormVisible=false;
                        }
                    }
            })
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
.dialog .el-textarea{
    width: 80%;
}
.goods{
    color:#409EFF;
    text-decoration: underline;
}
</style>