<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
        <el-form ref="form" :model="form" label-width="80px" class="regOA">
            <el-form-item label="电话"  prop="tel"
                :rules="[{ required: true, message: '请输入您的电话', trigger: 'blur' },
                        { validator: validateTel, trigger: 'change' }]">
                <el-input v-model="form.tel" placeholder="请输入您的电话"></el-input>
            </el-form-item>
             <el-form-item label="原密码" prop="oldpass"
                :rules="[{ required: true, message: '请输入您以前的密码', trigger: 'blur' }]">
                <el-input v-model="form.oldpass" type="password"  placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass"
                :rules="[{ required: true, message: '请输入您的新密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'change' }]">
                <el-input v-model="form.newpass" type="password"  placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repass" 
                :rules="[{ required: true, message: '请再一次输入您的密码', trigger: 'blur' },
                        { validator: validateRepass, trigger: 'change' }]">
                <el-input v-model="form.repass" type="password"  placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" :style="{width:'60%',marginLeft:'20%'}" @click="updateSubmit('form')">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
  
</template>

<script>
import $ from "jquery";
import src from "../../img/user.jpg"
export default {
  components: {
    //xfooter
  },
  data() {
    return {
        // 表单信息
        form:{
            tel:'',
            oldpass:'',
            newpass:'',
            repass:''
        },
        // 上传logo
        imageUrl: src
    };
  },
  methods: {
      //确认修改事件
      updateSubmit(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //电话校验
      validateTel(rule, value, callback){
        if (!/^[1]\d{10}$/.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          callback();
        }
      },
       //校验密码（新旧密码是否一样）
      validatePass(rule, value, callback){
         if (!/^\w{8,12}$/.test(value)) {
          callback(new Error('密码格式为8-12位的非特殊符号，请重新输入'));
        }else if(value == this.form.oldpass) {
          callback(new Error('新密码不能与旧密码一样'));
        } else {
          callback();
        }
      },
      //校验第二次输入的密码
      validateRepass(rule, value, callback){
        if (value !== this.form.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      
     
  }
};
</script>
<style scoped>
.regOA{
    width: 400px;
    margin: 50px auto;
}

.avatar-uploader{
    width:60px;
    height: 60px;
    border-radius: 50%;
    border:1px dashed darkgray;
    margin: auto;
}
.el-icon-plus{
    font-size: 50px;
    width: 60px;
    text-align: center;
    line-height: 60px;
    margin: auto;
    color: darkgrey;
}
.avatar{
    width:60px;
    height: 60px;
    border-radius: 50%;
    /* border:1px dashed darkgray; */
    margin: auto;
}
</style>