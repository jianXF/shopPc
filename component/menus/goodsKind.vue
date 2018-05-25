<template>
    <div class="kindAdminOA">
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>种类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            prop="kind_f"
            label="商品总类型"
            :rules="[
            { required: true, message: '请选择需要增加的子类型', trigger: 'blur' }
            ]"
        >
            <el-select style="width:60%" v-model="dynamicValidateForm.kind_f" placeholder="请选择状态" @change="changeChild">
                <el-option  v-for="i in kinddata" :label="i.name" :value="i.kindId"></el-option>
            </el-select>

        </el-form-item>
        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'子类型' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
            }"
        >
            <el-input v-model="domain.value"  :style="{width:'60%',float:'left'}"></el-input>
            <el-button @click.prevent="updateDomain(domain)"
             :style="{display:domain.isOld?'block':'none',float:'left',marginLeft:'10px'}">修改</el-button>
            <el-button @click.prevent="removeDomain(domain)" 
            :style="{display:domain.isOld?'block':'none',float:'left'}">删除</el-button>
            <el-button @click.prevent="insertDomain(domain)" 
            :style="{display:domain.isOld?'none':'block',float:'left'}">新增</el-button>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addDomain">新增子类型</el-button>
        </el-form-item>
        </el-form>
    </div>
  
</template>

<script>
  import $ from "jquery";
    export default{
        components:{
           
        },
        data(){
            return {
                kinddata:[{
                    kindId:1,
                    name:'衣服'
                },{
                    kindId:2,
                    name:'食物'
                },{
                    kindId:3,
                    name:'生活用品'
                }],
                dynamicValidateForm: {
                    domains: [{
                        value: '324'
                    }],
                    kind_f: ''
            }
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
                url:"http://localhost:2015/findAll/goods_kind",
                type:"GET",
                data:{
                },
                success:function(data){
                    _this.kinddata=data;
                    _this.dynamicValidateForm.kind_f=data[0].kindId;
                }
            });
            await $.ajax({
                url:"http://localhost:2015/findChild/goods_kind",
                type:"GET",
                data:{
                    kindId:_this.dynamicValidateForm.kind_f
                },
                success:function(data){ 
                    _this.dynamicValidateForm.domains=[];
                    for(var i of data){
                        _this.dynamicValidateForm.domains.push({value:i.name,kindId:i.kindId,isOld:true});
                    }
                    
                }
            })
        },
         methods: {
             //选单选框，改变所选子类
             async changeChild(){
                 const _this = this;
                 await $.ajax({
                url:"http://localhost:2015/findChild/goods_kind",
                type:"GET",
                data:{
                    kindId:_this.dynamicValidateForm.kind_f
                },
                success:function(data){ 
                    _this.dynamicValidateForm.domains=[];
                    for(var i of data){
                        _this.dynamicValidateForm.domains.push({value:i.name,kindId:i.kindId,isOld:true});
                    }
                    
                }
            })
             },
            removeDomain(item) {
                 const _this =this;
                var index = this.dynamicValidateForm.domains.indexOf(item)
                this.$confirm('确定删除该种类，删除后可能造成已有商品的种类混乱，请慎重', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                   await $.ajax({
                        url:"http://localhost:2015/goods_kind/delete",
                        type:"POST",
                        data:{
                            kindId:item.kindId
                        },
                        success:function(data){ 
                            if(data=='success'){
                                _this.$message({
                                    type: 'success',
                                    message: '删除子类成功'
                                });
                            }
                        }
                    })
                    await $.ajax({
                        url:"http://localhost:2015/findChild/goods_kind",
                        type:"GET",
                        data:{
                            kindId:_this.dynamicValidateForm.kind_f
                        },
                        success:function(data){ 
                            _this.dynamicValidateForm.domains=[];
                            for(var i of data){
                                _this.dynamicValidateForm.domains.push({value:i.name,kindId:i.kindId,isOld:true});
                            }
                            
                        }
                    })
                    
                }).catch(() => {
                             
                });
                
            },
            async updateDomain(item) {
                const _this =this;
                var index = this.dynamicValidateForm.domains.indexOf(item)
                await $.ajax({
                url:"http://localhost:2015/goods_kind/update",
                type:"POST",
                data:{
                    kindId:item.kindId,
                    name:item.value
                },
                success:function(data){ 
                    if(data=='success'){
                        _this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }
                }
            })
            },
            async insertDomain(item) {
                const _this =this;
                var index = this.dynamicValidateForm.domains.indexOf(item)
                await $.ajax({
                url:"http://localhost:2015/goods_kind/insert",
                type:"POST",
                data:{
                    oId:_this.dynamicValidateForm.kind_f,
                    name:item.value
                },
                success:function(data){ 
                    if(data=='success'){
                        _this.$message({
                            type: 'success',
                            message: '新增子类成功'
                        });
                    }
                }
            })
            await $.ajax({
                url:"http://localhost:2015/findChild/goods_kind",
                type:"GET",
                data:{
                    kindId:_this.dynamicValidateForm.kind_f
                },
                success:function(data){ 
                    _this.dynamicValidateForm.domains=[];
                    for(var i of data){
                        _this.dynamicValidateForm.domains.push({value:i.name,kindId:i.kindId,isOld:true});
                    }
                    
                }
            })
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
                });
            }
         }
    }
</script>
<style scoped>
.kindAdminOA{
    
}
.demo-dynamic{
    width: 60%;
    margin:auto;
    margin-top: 100px;
}
.demo-dynamic .el-input,.demo-dynamic .el-select{
    width: 80%;
}

</style>