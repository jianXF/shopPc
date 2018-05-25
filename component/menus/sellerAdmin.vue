<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商户管理</el-breadcrumb-item>
                <el-breadcrumb-item>商家注册审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="90px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="6">
                    <el-form-item label="商家手机号:">
                        <el-input v-model="form.sellerTel" clearable placeholder="请输入商家手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商家名称:">
                        <el-input v-model="form.sellerTitle" clearable placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否审核:">
                        <el-select v-model="form.status" placeholder="请选择状态" clearable >
                        <el-option label="待审核" value="1"></el-option>
                        <el-option label="审核成功" value="2"></el-option>
                        <el-option label="审核失败" value="3"></el-option>
                        <el-option label="已注销" value="4"></el-option>
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
                prop="sellerId"
                label="商家编号"
                sortable
                width="120">
            </el-table-column>
            <el-table-column
            prop="sellerTitle"
            label="商家名称"
            width="150">
                <template slot-scope="scope">
                    <a class="goods" :href="'#/menus/findSellerInfo?sellerId='+scope.row.sellerId" v-text="scope.row.sellerTitle">待审核 </a>
                </template>
            </el-table-column>
            <el-table-column
            label="商家手机号"
            prop="tel"
            sortable
            width="150">
            </el-table-column>

            <el-table-column
            prop="goodNum"
            label="商品种类数"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="regTime"
            label="注册时间"
            sortable
            width="120">
            <template slot-scope="scope">
                <span v-text="scope.row.regTime.substr(0,8)"></span>
            </template>
            </el-table-column>
            <el-table-column
            label="状态"
            width="150">
             <template slot-scope="scope">
                    <span :style="{display:scope.row.status==1?'block':'none',color:'red'}">待审核 </span>
                    <span :style="{display:scope.row.status==2?'block':'none',color:'#6060bd'}">审核通过 </span>
                    <span :style="{display:scope.row.status==3?'block':'none',color:''}">审核失败 </span>
                    <span :style="{display:scope.row.status==4?'block':'none',color:'green'}">注销 </span>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            
            >
            <template slot-scope="scope">
                <el-button @click="checkSuccess(scope.row)" type="text" size="small"
                    :style="{display:scope.row.status==1 || scope.row.status==3?'block':'none'}"
                >审核通过</el-button>
                <el-button type="text" size="small" @click="checkFail(scope.row)"
                    :style="{display:scope.row.status==1?'block':'none'}"
                >审核失败</el-button>
                <el-button type="text" size="small" @click="cancelSeller(scope.row)"
                    :style="{display:scope.row.status==2?'block':'none'}"
                >注销</el-button>
                <el-button type="text" size="small" @click="shelf(scope.row)"
                    :style="{display:scope.row.status==4?'block':'none'}"
                >重新通过</el-button>
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
    </div>
  
</template>

<script>
  import $ from 'jquery';
    export default{
        components:{
           
        },
        data(){
            return {
                form: {
                    sellerTitle: '',
                    sellerTel: '',
                    status: ''
                },
                tableData: [],
                page:{
                    currentpage:1,
                    pagesize:10

                }
            }
        },
        async mounted(){
            //商品列表加载
            const _this = this;
            await $.ajax({
                url:"http://localhost:2015/find/seller",
                type:"get",
                data:{
                },
                success:function(data){
                    _this.tableData = data;
                }
                  
            })
        },
        methods:{
            async findSubmit() {
                const _this = this;
                console.log(this.form);
                await $.ajax({
                url:"http://localhost:2015/find/sellers",
                type:"get",
                data:{
                    sellerTitle:_this.form.sellerTitle?_this.form.sellerTitle:undefined,
                    tel:_this.form.sellerTel?_this.form.sellerTel:undefined,
                    status: _this.form.status==''?undefined:_this.form.status,
                },
                success:function(data){
                    _this.tableData = data;
                }
                })

            },
            //审核成功
            checkSuccess(obj){
                const _this= this;
                console.log(obj);
                this.$confirm('确定将该商户审核通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await $.ajax({
                        url:"http://localhost:2015/seller/check",
                        type:"get",
                        data:{
                            sellerId:obj.sellerId,
                            type:2
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '该用户已通过审核'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/seller",
                        type:"get",
                        data:{
                        },
                        success:function(data){
                            _this.tableData = data;
                        }
                        
                    })
                    
                }).catch(() => {
                             
                });
            },
            //审核失败
            checkFail(obj){
                const _this= this;
                 this.$confirm('确定将该商户审核未通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await $.ajax({
                        url:"http://localhost:2015/seller/check",
                        type:"get",
                        data:{
                            sellerId:obj.sellerId,
                            type:3
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '该用户未通过审核'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/seller",
                        type:"get",
                        data:{
                        },
                        success:function(data){
                            _this.tableData = data;
                        }
                        
                    })
                }).catch(() => {
                             
                });
            },
            //商户注销
            cancelSeller(obj){
                const _this= this;
                 this.$confirm('确定将该商户注销', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await $.ajax({
                        url:"http://localhost:2015/seller/check",
                        type:"get",
                        data:{
                            sellerId:obj.sellerId,
                            type:4
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '该商户已被成功注消'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/seller",
                        type:"get",
                        data:{
                        },
                        success:function(data){
                            _this.tableData = data;
                        }
                        
                    })
                }).catch(() => {
                             
                });
            },
            //商户上架
            shelf(obj){
                const _this= this;
                 this.$confirm('确定该商户再次正常使用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await $.ajax({
                        url:"http://localhost:2015/seller/check",
                        type:"get",
                        data:{
                            sellerId:obj.sellerId,
                            type:2
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '该商户已恢复所有功能'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/seller",
                        type:"get",
                        data:{
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
.el-button--text{
    float: left;
}
.goods{
    color:#409EFF;
    text-decoration: underline;
}
</style>