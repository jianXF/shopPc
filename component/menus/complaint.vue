<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>投诉</el-breadcrumb-item>
                <el-breadcrumb-item>投诉查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
        <el-table
            :data="tableData"
            border
            :style="{width: '90%',margin:'20px auto'}">
            <el-table-column
                prop="backId"
                label="投诉编号"
                width="150">
            </el-table-column>
            <el-table-column
            prop="content"
            label="投诉内容"
            >
            </el-table-column>
            <el-table-column
            label="投诉时间"
            prop="feedTime"
            width="150">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  
    export default{
        components:{
           
        },
        data(){
            return {
               
                tableData: [{
                    backId: '2003',
                    content: '悦诗风12312吟',
                    feedTime: '2014-04-21',
                    
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

</style>