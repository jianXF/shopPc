<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商户管理</el-breadcrumb-item>
                <el-breadcrumb-item>商户投诉管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="90px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="8">
                    <el-form-item label="商家编号:">
                        <el-input v-model="form.sellerId" placeholder="请输入商家编号" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="商家名称:">
                    <el-input v-model="form.sellerTitle" placeholder="请输入商家名称" clearable></el-input>
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
            prop="sellerId"
            label="商家编号"
            sortable
            width="200">
            </el-table-column>
            
            <el-table-column
            label="商家名称"
            
            width="200">
                <template slot-scope="scope">
                    <span class="goods" v-text="scope.row.sellerTitle" @click="findSeller(scope.row)"></span>
                </template>
            </el-table-column>
            <el-table-column
            sortable
            label="投诉次数"
            prop="count"
            width="200">
            </el-table-column>
             <el-table-column
                fixed="right"
                label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看投诉</el-button>
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
         <el-dialog title="投诉列表" :visible.sync="dialogFormVisible" class="dialog" width="65%">
              <el-table
             :data="tableData1.slice((page.currentpage-1)*page.pagesize,page.currentpage*page.pagesize)"
            border
            :style="{width: '99%',margin:'auto'}">
            <el-table-column
                fixed
                prop="backId"
                label="编号"
                sortable
                width="90">
            </el-table-column>
            <el-table-column
            label="投诉时间"
            sortable
            width="120">
                <template slot-scope="scope">
                    <span v-text="scope.row.feedTime.substr(0,8)"></span>
                </template>
            </el-table-column>
            <el-table-column
            label="反馈内容"
            prop="content"
            >
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="page1.pagesize"
            :total="tableData1.length"
            :current-page="page1.currentpage"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            >
        </el-pagination>
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
                    sellerId:'',
                    sellerTitle:''
                },
                tableData: [],
                tableData1: [],
                page:{
                    currentpage:1,
                    pagesize:10
                },
                page1:{
                    currentpage:1,
                    pagesize:5
                },
                dialogFormVisible:false
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
				url:"http://localhost:2015/feedback/seller",
				type:"GET",
				data:{
				},
				success:function(data){
                    if(data.length==1 && data[0].sellerId==null){
                        _this.tableData=[]
                    }else{
                        _this.tableData=data;
                    }
				}
            });
        },
        methods:{
            //查询事件
            async findSubmit() {
                 const _this =this;
                 await $.ajax({
                    url:"http://localhost:2015/feedback/seller",
                    type:"GET",
                    data:{
                    sellerId:_this.form.sellerId,
                    sellerTitle:_this.form.sellerTitle
                    },
                    success:function(data){
                        if(data.length==1 && data[0].sellerId==null){
                            _this.tableData=[]
                        }else{
                            _this.tableData=data;
                        }
                    }
                });
            },
            //查看投诉
            async handleClick(obj){
                 const _this =this;
                 await $.ajax({
                    url:"http://localhost:2015/feedback/find",
                    type:"GET",
                    data:{
                        sellerId:obj.sellerId,
                        feedStatus:'1'
                    },
                    success:function(data){
                        _this.tableData1=data;
                    }
                });
                this.dialogFormVisible=true;
            },
            findSeller(obj){
                this.$router.push({path:'/menus/findSellerInfo',query:{sellerId:obj.sellerId}});

            },
            handleSizeChange: function (size) {
                this.page.pagesize = size;
            },
            handleCurrentChange(currentPage){
                this.page.currentpage=currentPage;

            },
            handleSizeChange1: function (size) {
                this.page.pagesize = size;
            },
            handleCurrentChange1(currentPage){
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

.el-table .el-button{
    float: left;
}
.goods{
    color:#409EFF;
    text-decoration: underline;
}
</style>