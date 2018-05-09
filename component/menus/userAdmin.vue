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
               <el-col :span="6">
                    <el-form-item label="用户手机号:">
                        <el-input v-model="form.tel" placeholder="请输入用户手机号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
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
                    <el-input v-model="userForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="重复密码"  prop='repass'
                :rules="[{ required: true, message: '请再一次输入密码', trigger: 'blur' },
                        { validator: validateRepass, trigger: 'change' }]">
                    <el-input v-model="userForm.repass"></el-input>
                </el-form-item>
            </el-form>
                
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateSubmit('userForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
  
</template>

<script>
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
                    regTime: '',
                },
                tableData: [{
                    userId: '123234',
                    img: 'data:image/jpeg;base64,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',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150306'
                    
                },
                {
                    userId: '123234',
                    img: '悦诗风吟',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150406'
                    
                },{
                     userId: '123234',
                    img: '悦诗风吟',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150421'
                    
                },{
                     userId: '123234',
                    img: '悦诗风吟',
                    tel: '149370984750',
                    goodNum:'211',
                    regTime: '20150409'
                    
                }]
            }
        },
        methods:{
            findSubmit() {
                console.log(this.form.date1);

            },
            //表格的修改密码
            checkSuccess(obj){
                 this.dialogFormVisible=true;
                this.userForm.userId = obj.userId;
            },
           // 修改密码
            updateSubmit(formName){
               this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible=false;
                } else {
                    
                    return false;
                }
                });
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