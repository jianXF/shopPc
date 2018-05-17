<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>投诉</el-breadcrumb-item>
                <el-breadcrumb-item>投诉查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="90px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="10">
                    <el-form-item label="投诉商品:">
                        <el-input v-model="form.title" placeholder="请输入投诉商品名称" clearable></el-input>
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
            :style="{width: '90%',margin:'20px auto'}">
            <el-table-column
                prop="backId"
                label="投诉编号"
                sortable
                width="150">
            </el-table-column>
            <el-table-column
            label="投诉商品"
            >
             <template slot-scope="scope">
                    <a class="goods" v-text="scope.row.title" :href="'#/menus/updateGoods?goodsId='+scope.row.goodsId"></a>
                </template>
            </el-table-column>
            <el-table-column
            prop="content"
            label="投诉内容"
            >
            </el-table-column>
            
            <el-table-column
            label="投诉时间"
            sortable
            width="150">
                <template slot-scope="scope">
                    <span  v-text="scope.row.feedTime.substr(0,8)" ></span>
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
    import $ from "jquery";
    export default{
        components:{
           
        },
        data(){
            return {
               form:{title:''},
                tableData: [{
                    backId: '2003',
                    content: '悦诗风12312吟',
                    feedTime: '2014-04-21',
                    
                }],
                page:{
                    currentpage:1,
                    pagesize:10

                }
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
				url:"http://localhost:2015/feedback/sellerId",
				type:"GET",
				data:{
                    sellerId:sessionStorage.getItem("sellerId"),
                    title:undefined
				},
				success:function(data){
					_this.tableData=data;
				}
            });
        },
        methods:{
            //查询事件
            async findSubmit() {
                const _this = this;
                await $.ajax({
                    url:"http://localhost:2015/feedback/sellerId",
                    type:"GET",
                    data:{
                        sellerId:sessionStorage.getItem("sellerId"),
                        title:_this.form.title==""?undefined:_this.form.title
                    },
                    success:function(data){
                        _this.tableData=data;
                    }
                });
            },
            //点击查看事件
            handleClick(obj){

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
.goods{
    color:#409EFF;
    text-decoration: underline;
}
</style>