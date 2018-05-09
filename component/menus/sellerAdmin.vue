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
                        <el-input v-model="form.sellerTel" placeholder="请输入商家手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="商家名称:">
                        <el-input v-model="form.sellerTitle" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否审核:">
                        <el-select v-model="form.status" placeholder="请选择状态">
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
            :data="tableData"
            border
            :style="{width: '90%',margin:'auto'}">
            <el-table-column
                fixed
                prop="sellerIid"
                label="商家编号"
                width="80">
            </el-table-column>
            <el-table-column
            prop="sellerTitle"
            label="商家名称"
            width="150">
            </el-table-column>
            <el-table-column
            label="商家手机号"
            prop="tel"
            width="150">
            </el-table-column>

            <el-table-column
            prop="goodNum"
            label="商品种类数"
            width="120">
            </el-table-column>
            <el-table-column
            prop="regTime"
            label="注册时间"
            sortable
            width="120">
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
                >上架</el-button>
            </template>
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
                form: {
                    sellerTitle: '',
                    sellerTel: '',
                    status: ''
                },
                tableData: [{
                    sellerIid: '123234',
                    sellerTitle: '悦诗风吟',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150406',
                    status:1
                    
                },
                {
                    sellerIid: '1234',
                    sellerTitle: '悦诗风吟',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150406',
                    status:2
                    
                },{
                    sellerIid: '342',
                    sellerTitle: '悦诗风吟',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150406',
                    status:3
                    
                },{
                    sellerIid: '2234',
                    sellerTitle: '悦诗风吟',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150406',
                    status:4
                    
                }]
            }
        },
        methods:{
            findSubmit() {
                console.log(this.form.date1);

            },
            //审核成功
            checkSuccess(obj){
                this.$confirm('确定将该商户审核通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '该用户已通过审核'
                });
                }).catch(() => {
                             
                });
            },
            //审核失败
            checkFail(obj){
                 this.$confirm('确定将该商户审核未通过', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '该用户未通过审核'
                });
                }).catch(() => {
                             
                });
            },
            //商户注销
            cancelSeller(obj){
                 this.$confirm('确定将该商户注销', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '该商户已注消'
                });
                }).catch(() => {
                             
                });
            },
            //商户上架
            shelf(obj){
                 this.$confirm('确定该商户再次正常使用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '该商户已恢复所有功能'
                });
                }).catch(() => {
                             
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
.el-button--text{
    float: left;
}
</style>