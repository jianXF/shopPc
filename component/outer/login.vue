<template>
    <div>
        <h3 class="farmOA">淘乡村后台管理系统</h3>
        <div class="loginForm">
            <el-tabs v-model="activeName">
                <el-tab-pane label="商家" name="first">
                    <el-form ref="form" :model="form" label-width="51px">
                        <el-form-item label="账号" prop="tel"
                        :rules="[{ required: true, message: '请输入您的账号', trigger: 'blur' },
                        { validator: validateTel, trigger: 'change' }]">
                            <el-input v-model="form.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop='pass'
                        :rules="[{ required: true, message: '请输入您的密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'change' }]">
                            <el-input v-model="form.pass" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button  type="primary" style="width:40%" @click="loginSubmit('form')">登录</el-button>
                            <el-button  type="primary" style="width:40%" @click="regSubmit">注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="管理员" name="second">
                    <el-form ref="form1" :model="form1" label-width="51px">
                        <el-form-item label="账号" prop="userName"
                        :rules="[{ required: true, message: '请输入您的账号', trigger: 'blur' }]">
                            <el-input v-model="form1.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop='pass'
                        :rules="[{ required: true, message: '请输入您的密码', trigger: 'blur' }]">
                            <el-input v-model="form1.pass" type="password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width:80%" @click="loginSubmit1('form1')">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

            </el-tabs>
        </div>
    </div>
  
</template>

<script>
	import $ from "jquery";
    export default{
        components:{
            //xfooter
        },
        data(){
        	return {
                //表单信息
                form:{
                    tel:'',
                    pass:''
                },
                form1:{
                    userName:'',
                    pass:''
                },
                //标签页默认显示
                activeName:'first'
        	}
        },
        methods:{
            // 点击注册
            regSubmit(){
                this.$router.push({path:'/reg'});
            },
           //校验密码
            validatePass(rule, value, callback){
                if (!/^\w{8,12}$/.test(value)) {
                callback(new Error('密码格式为8-12位的非特殊符号，请重新输入'));
                } else {
                callback();
                }
            },
            //电话校验
            validateTel(rule, value, callback){
                if (!/^[1]\d{10}$/.test(value)) {
                callback(new Error('手机号格式不正确'));
                } else {
                callback();
                }
            },
            //电商登陆
            loginSubmit(formName){
                const _this = this;
                 this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        await $.ajax({
                            url:"http://localhost:2015/login/seller",
                            type:"POST",
                            data:{
                                tel:_this.form.tel,
                                password:_this.form.pass
                            },
                            success:function(data){
                                if(data.code==0){
                                    sessionStorage.setItem('type','1');
                                    sessionStorage.setItem('sellerId',data.data.sellerId);
                                    sessionStorage.setItem('logo',data.data.img);
                                    sessionStorage.setItem('tel',data.data.tel);
                                    _this.$router.push({path:'/menus/index'});
                                }else{
                                    _this.$message({
                                        message: data.message,
                                        type: 'warning'
                                    });
                                }
                            }
                        })
                    } else {
                        console.log('error submit!!');

                    }
                 });
            },
            //管理员登陆
            loginSubmit1(formName){
                const _this = this;
                 this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                         await $.ajax({
                            url:"http://localhost:2015/login/admin",
                            type:"POST",
                            data:{
                                userName:_this.form1.userName,
                                password:_this.form1.pass
                            },
                            success:function(data){
                                if(data.code==0){
                                    sessionStorage.setItem('type','2');
                                    sessionStorage.setItem('adminId',data.data.adminId);
                                    sessionStorage.setItem('userName',data.data.userName);
                                    _this.$router.push({path:'/menus/index'});
                                }else{
                                    _this.$message({
                                        message: data.message,
                                        type: 'warning'
                                    });
                                }
                            }
                        })
                    } else {
                        console.log('error submit!!');
                 }
                });
            }
		}
    }
</script>
<style scoped>
.farmOA{
    color: #409EFF;
    font-size: 24px;
    text-align: center;
    margin: 50px 0;
}
.loginForm{
    width: 500px;
    margin: 0 auto;
}
.loginForm .el-form-item{
    width: 60%;
    margin: auto;
    margin-top: 30px;
}
</style>