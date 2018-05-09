<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="80px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="8">
                    <el-form-item label="商品名称:">
                        <el-input v-model="form.sellerTitle" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="商品种类:">
                        <el-select v-model="form.kindId" placeholder="请选择商品种类">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否下架:">
                        <el-switch v-model="form.isSell"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否促销:">
                        <el-switch v-model="form.isBargain"></el-switch>
                    </el-form-item>
                </el-col>
           </el-row>
           <el-row :gutter="10" type="flex" class="row-bg" justify="space-between">
               <el-col :span="15">
                <el-form-item label="上架时间:">
                    <el-col :span="11">
                        <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">——</el-col>
                    <el-col :span="11">
                        <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
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
                prop="goodsId"
                label="商品编号"
                width="80">
            </el-table-column>
            <el-table-column
            prop="title"
            label="商品名称"
            width="150">
            </el-table-column>
            <el-table-column
            label="价格"
            width="150">
                <template slot-scope="scope">
                    <span v-text="scope.row.isBargain?scope.row.price_n+'(促销价)':scope.row.price_o"> </span>
                </template>
            </el-table-column>

            <el-table-column
            prop="stock"
            label="库存"
            width="120">
            </el-table-column>
            <el-table-column
            prop="sellnum"
            label="销量"
            width="120">
            </el-table-column>
            <el-table-column
            label="促销状态"
            width="150">
             <template slot-scope="scope">
                <span v-text="scope.row.isBargain?'促销中':'未促销'"
                    :style="{color:scope.row.isBargain?'#f33b3b':'#606266'}"> </span>
             </template>
            </el-table-column>
            <el-table-column
            prop="isSell"
            label="状态"
            width="120">
                <template slot-scope="scope">
                <span v-text="scope.row.isSell?'销售中':'已下架'"
                    :style="{color:scope.row.isSell?'#606266':'#9e9e9e'}"> </span>
             </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="upGoods(scope.row)"
                    :style="{display:scope.row.isSell?'none':'block'}"
                >上架</el-button>
                
                <el-button type="text" size="small" @click="bargainGoods(scope.row)"
                    :style="{display:scope.row.isSell && !scope.row.isBargain?'block':'none'}"
                >促销</el-button>
                <el-button type="text" size="small" @click="cancelBargain(scope.row)"
                    :style="{display:scope.row.isSell && scope.row.isBargain?'block':'none'}"
                >结束促销</el-button>
                <el-button type="text" size="small" @click="downGoods(scope.row)"
                    :style="{display:scope.row.isSell && !scope.row.isBargain?'block':'none'}"
                >下架</el-button>
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
                    kindId: '',
                    date1: '',
                    date2: '',
                    isSell: false,
                    isBargain:false
                },
                tableData: [{
                    goodsId: '1234',
                    title: '悦诗风吟',
                    price_o: '213',
                    price_n:'211',
                    stock: '233',
                    sellnum: '11',
                    heavy: '23.5',
                    isBargain:true,
                    isSell:true
                    
                },
                {
                    goodsId: '1334',
                    title: '悦诗风吟',
                    price_o: '213',
                    price_n:'211',
                    stock: '233',
                    sellnum: '11',
                    heavy: '23.5',
                    isBargain:false,
                    isSell:false
                    
                },
                {
                    goodsId: '12334',
                    title: '悦诗风吟',
                    price_o: '213',
                    price_n:'211',
                    stock: '233',
                    sellnum: '11',
                    heavy: '23.5',
                    isBargain:false,
                    isSell:true
                    
                }]
            }
        },
        methods:{
            findSubmit() {
                console.log(this.form.date1);

            },
            //编辑
            handleClick(obj){
                
            },
            //促销商品
            bargainGoods(obj){
            this.$prompt('请输入促销的价格', '设置促销价', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^\d{1,}$/,
                inputErrorMessage: '输入格式不正确'
                }).then(({ value }) => {

                    this.$message({
                        type: 'success',
                        message: '促销设置成功'
                    });
                }).catch(() => {
                      
                });
            },
            //取消促销操作
            cancelBargain(obj){
                this.$confirm('确定将该商品结束促销', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '该商品已结束促销'
                });
                }).catch(() => {
                             
                });
            },
            //上架商品
            upGoods(obj){
                 this.$confirm('确定将该商品上架', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '该商品上架成功'
                });
                }).catch(() => {
                             
                });
            },
            //下架商品
            downGoods(obj){
                 this.$confirm('确定将该商品下架', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '该商品下架成功'
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