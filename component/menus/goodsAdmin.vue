<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="80px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="8">
                    <el-form-item label="商品名称:">
                        <el-input v-model="form.title" placeholder="请输入商品名称" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="商品种类:">
                        <el-cascader
                        clearable
                        placeholder="请选择商品种类"
                        :options="options"
                        v-model="form.kindId"
                      >
                    </el-cascader>
                    </el-form-item>
                </el-col>
                
           </el-row>
           <el-row :gutter="10">
               <el-col :span="8">
                    <el-form-item label="是否下架:">
                        <el-select v-model="form.isSell" clearable placeholder="请选择">
                         <el-option
                         clearable
                        v-for="item in isSellGroup"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="是否促销:">
                        <el-select v-model="form.isBargain" clearable placeholder="请选择">
                         <el-option
                         clearable
                            v-for="item in isBargainGroup"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
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
                prop="goodsId"
                sortable
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
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="sellnum"
            label="销量"
            sortable
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
  import $ from "jquery";
    export default{
        components:{
           
        },
        data(){
            return {
                form: {
                    title: '',
                    kindId: [],
                    isSell: '',
                    isBargain:''
                },
                tableData: [],
                //商品种类下拉框
                options:[],
                //是否下架下拉框
                isSellGroup:[{
                    value: '1',
                    label: '上架'
                    }, {
                    value: '0',
                    label: '下架'
                    }],
                //是否销售下拉框    
                isBargainGroup:[{
                    value: '1',
                    label: '促销中'
                    }, {
                    value: '0',
                    label: '未促销'
                }]
            }
        },
        async mounted(){
            const _this = this;
            //商品种类
            await $.ajax({
                url:"http://localhost:2015/find/goods_kind",
                type:"GET",
                data:{
                },
                success:function(data){
                    _this.options = data;
                   
            
                }
            })
            //商品列表加载
            await $.ajax({
                url:"http://localhost:2015/find/goods",
                type:"get",
                data:{
                    sellerId:sessionStorage.sellerId
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
                url:"http://localhost:2015/find/goodss",
                type:"get",
                data:{
                    sellerId:sessionStorage.sellerId,
                    title:_this.form.title?_this.form.title:undefined,
                    kindId:_this.form.kindId.length==0?undefined:_this.form.kindId[1],
                    isSell: _this.form.isSell==''?undefined:_this.form.isSell,
                    isBargain:_this.form.isBargain==''?undefined:_this.form.isBargain
                },
                success:function(data){
                    _this.tableData = data;
                }
                  
            })
            },
            //编辑
            handleClick(obj){
                 this.$router.push({path:`/menus/updateGoods?goodsId=${obj.goodsId}`});
            },
            //促销商品
            bargainGoods(obj){
                const _this = this;
            this.$prompt('请输入促销的价格', '设置促销价', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /(^[1-9]([0-9]+\.[0-9]{2})?$)|(^[0-9]\.[0-9]{2}?$)/,
                inputErrorMessage: '输入格式不正确'
                }).then(async({ value }) => {
                    await $.ajax({
                        url:"http://localhost:2015/bargainGoods",
                        type:"POST",
                        data:{
                            goodsId:obj.goodsId,
                            price_n:value
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '促销设置成功'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/goods",
                        type:"get",
                        data:{
                            sellerId:sessionStorage.sellerId
                        },
                        success:function(data){
                            _this.tableData = data;
                        }
                        
                    })
                    
                }).catch(() => {
                      
                });
            },
            //取消促销操作
            cancelBargain(obj){
                const _this = this;
                this.$confirm('确定将该商品结束促销', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await $.ajax({
                        url:"http://localhost:2015/cancelBargain",
                        type:"get",
                        data:{
                            goodsId:obj.goodsId
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '该商品已结束促销'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/goods",
                        type:"get",
                        data:{
                            sellerId:sessionStorage.sellerId
                        },
                        success:function(data){
                            _this.tableData = data;
                        }
                        
                    })
                    
                }).catch(() => {
                             
                });
            },
            //上架商品
            upGoods(obj){
                 const _this = this;
                 this.$confirm('确定将该商品上架', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await $.ajax({
                        url:"http://localhost:2015/upGoods",
                        type:"get",
                        data:{
                            goodsId:obj.goodsId
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '该商品上架成功'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/goods",
                        type:"get",
                        data:{
                            sellerId:sessionStorage.sellerId
                        },
                        success:function(data){
                            _this.tableData = data;
                        }
                        
                    })
                    
                }).catch(() => {
                             
                });
            },
            //下架商品
            downGoods(obj){
                    const _this = this;
                 this.$confirm('确定将该商品下架', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await $.ajax({
                        url:"http://localhost:2015/downGoods",
                        type:"get",
                        data:{
                            goodsId:obj.goodsId
                        },
                        success:function(data){
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '该商品下架成功'
                                });
                            }   
                        }  
                    })
                    await $.ajax({
                        url:"http://localhost:2015/find/goods",
                        type:"get",
                        data:{
                            sellerId:sessionStorage.sellerId
                        },
                        success:function(data){
                            _this.tableData = data;
                        }
                        
                    })
                    
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