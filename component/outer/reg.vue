<template>
    <div>
        <h3 class="farmOA">淘乡村后台管理系统</h3>
        <el-form ref="form" :model="form" label-width="80px" class="regOA">
            <el-form-item>
                <el-tooltip class="item" effect="dark" content="上传您的店铺Logo" placement="right-start">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                    </el-upload>
                </el-tooltip>
                
            </el-form-item>
            <el-form-item label="电话"  prop="tel"
                :rules="[{ required: true, message: '请输入您的电话', trigger: 'blur' },
                        { validator: validateTel, trigger: 'change' }]">
                <el-input v-model="form.tel" placeholder="请输入您的电话"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass"
                :rules="[{ required: true, message: '请输入您的密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'change' }]">
                <el-input v-model="form.pass" type="password"  placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="repass" 
                :rules="[{ required: true, message: '请再一次输入您的密码', trigger: 'blur' },
                        { validator: validateRepass, trigger: 'change' }]">
                <el-input v-model="form.repass" type="password"  placeholder="请再次输入密码"></el-input>
            </el-form-item>
             <el-form-item label="店铺名称" prop="sellerTitle" 
                :rules="[{ required: true, message: '请输入店铺名称', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                <el-input v-model="form.sellerTitle"   placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc" 
                :rules="[{ validator: validateDesc, trigger: 'change' }]">
                <el-input v-model="form.desc" type="textarea" :rows="4"   placeholder="请输入对店铺描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" style="width:40%" @click="regSubmit('form')">注册</el-button>
                <el-button  type="primary" style="width:40%" @click="cancleReg" >取消</el-button>
            </el-form-item>
        </el-form>
    </div>
  
</template>

<script>
import $ from "jquery";

export default {
  components: {
    //xfooter
  },
  data() {
    return {
        // 表单信息
        form:{
            tel:'',
            pass:'',
            repass:'',
            sellerTitle:'',
            desc:''
            
        },
        // 上传logo
        imageUrl: ''
    };
  },
  methods: {
      //注册事件
      regSubmit(formName){
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
      //校验密码
      validatePass(rule, value, callback){
        if (!/^\w{8,12}$/.test(value)) {
          callback(new Error('密码格式为8-12位的非特殊符号，请重新输入'));
        } else {
          callback();
        }
      },
      //校验第二次输入的密码
      validateRepass(rule, value, callback){
        if (value !== this.form.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      //校验名称
      validateTitle(rule, value, callback){
        if (value.length>=25) {
          callback(new Error('店铺名称不超过25个字'));
        } else {
          callback();
        }
      },
      //校验描述
      validateDesc(rule, value, callback){
        if (value.length>=100) {
          callback(new Error('店铺描述不超过100个字'));
        } else {
          callback();
        }
      },
      //取消注册
      cancleReg(){
        this.$router.push({path:'/login'});
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res);
       
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      showuserimg(){
        var uploaderInput = $("#uploaderInput");
        var imgFile = uploaderInput[0].files[0];
        
        var fr = new FileReader();
        fr.onload = function() {
            var pic=$("#upuserpic");
            pic[0].src = fr.result;
        };
        fr.readAsDataURL(imgFile);
    }
  }
};
</script>
<style scoped>
.farmOA {
  color: #409eff;
  font-size: 24px;
  text-align: center;
  margin: 50px 0;
}
.regOA{
    width: 400px;
    margin: auto;
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