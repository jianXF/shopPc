<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>修改店铺信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
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
             <el-form-item label="店铺名称" prop="sellerTitle" 
                :rules="[{ required: true, message: '请输入店铺名称', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                <el-input v-model="form.sellerTitle"   placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc" 
                :rules="[{ validator: validateDesc, trigger: 'change' }]">
                <el-input v-model="form.desc" type="textarea" :rows="4"  placeholder="请输入对店铺描述"></el-input>
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
            tel:'15027453455',
            sellerTitle:'贺卡收到商城',
            desc:'阿娇是快递就拉上看到就拉开卢卡斯的拉克丝了那份呢'
            
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