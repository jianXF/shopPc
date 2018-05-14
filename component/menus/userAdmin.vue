<template>
    <div >
         <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="form" :model="form" label-width="90px" class="goodsAdminOA">
           <el-row :gutter="10">
               <el-col :span="8">
                    <el-form-item label="用户手机号:">
                        <el-input v-model="form.tel" placeholder="请输入用户手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="注册日期:">
                        <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date" placeholder="选择日期" v-model="form.regTime" style="width: 100%;"></el-date-picker>
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
                prop="userId"
                label="用户编号"
                width="200">
            </el-table-column>
            <el-table-column
            label="用户Logo"
            width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" style="width:60px">
                </template>
            </el-table-column>
            <el-table-column
            label="用户手机号"
            prop="tel"
            width="200">
            </el-table-column>
            <el-table-column
            prop="regTime"
            label="注册时间"
            sortable
            width="200">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="checkSuccess(scope.row)" type="text" size="small"
                >修改密码</el-button>
            </template>
            </el-table-column>
        </el-table>
        

        <el-dialog title="修改用户密码" :visible.sync="dialogFormVisible" class="dialog">
            <el-form :model="userForm" ref="userForm" label-width="80px">
                <el-form-item label="密码"  prop='pass'
                    :rules="[{ required: true, message: '请输入新密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'change' }]">
                    <el-input type="password" v-model="userForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="重复密码"  prop='repass'
                :rules="[{ required: true, message: '请再一次输入密码', trigger: 'blur' },
                        { validator: validateRepass, trigger: 'change' }]">
                    <el-input type="password" v-model="userForm.repass"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cacelUpdate('userForm')">取 消</el-button>
                <el-button type="primary" @click="updateSubmit('userForm')">确 定</el-button>
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
                dialogFormVisible:false,
                userForm:{
                    pass:'',
                    repass:'',
                    userId:''
                },
                form: {
                    tel: '',
                    regTime: ''
                },
                tableData: []
            }
        },
        async mounted(){
            const _this = this;
            await $.ajax({
                url:"http://localhost:2015/find/user",
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
                const _this =this;
                await $.ajax({
                    url:"http://localhost:2015/find/users",
                    type:"get",
                    data:{
                        tel: _this.form.tel,        
                        regTime: _this.form.regTime
                    },
                    success:function(data){
                        _this.tableData = data;
                    }
                  
                })

            },
            //表格的修改密码
            checkSuccess(obj){
                 this.dialogFormVisible=true;
                this.userForm.userId = obj.userId;
            },
           // 修改密码
            updateSubmit(formName){
                const _this = this;
               this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    await $.ajax({
                        url:"http://localhost:2015/update/userPass",
                        type:"POST",
                        data:{
                            password:_this.userForm.pass,
                            userId:_this.userForm.userId
                        },
                        success:function(data){
                             _this.$message({
                                    type: 'success',
                                    message: data
                                });
                        }
                        
                    })
                    this.dialogFormVisible=false;
                } else {
                    
                    return false;
                }
                });
            },
            //取消修改密码
            cacelUpdate(formName){
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
             
             //校验密码（新旧密码是否一样）
            validatePass(rule, value, callback){
                if (!/^\w{8,12}$/.test(value)) {
                callback(new Error('密码格式为8-12位的非特殊符号，请重新输入'));
                }else {
                callback();
                }
            },
            //校验第二次输入的密码
            validateRepass(rule, value, callback){
                if (value !== this.userForm.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            },
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
.dialog .el-input{
    width: 80%;
}
</style>