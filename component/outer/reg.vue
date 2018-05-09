<template>
    <div>
        <h3 class="farmOA">淘乡村后台管理系统</h3>
        <el-tooltip class="item" effect="dark" content="上传您的店铺Logo" placement="right-start">
          <form action="" id="file">
            <input type="file" id="fileInput"  name="sellerlogo" nultiple @change="showuserimg">
            <i  class="el-icon-plus avatar-uploader-icon" ></i>
            <img :src="imageUrl" alt="">
          </form>
        </el-tooltip>
        <el-form ref="form" :model="form" label-width="80px" class="regOA">
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
            desc:'',
            img:''
        },
        // 上传logo
        imageUrl: ''
    };
  },
  methods: {
      //注册事件
      async regSubmit(formName){
       const _this = this;
          this.$refs[formName].validate(async(valid) => {
          if (valid) {
            this.upload();
            let isReapt = true;
            await $.ajax({
                url:"http://localhost:2015/reg/checkTel",
                type:"POST",
                data:{
                    tel:_this.form.tel
                },
                success:function(data){
                  if(data=='success'){
                      isReapt = false;
                  }else{
                    _this.$message({
                      message: data,
                      type: 'warning'
                    });
                  }
                }
            })
            if(!isReapt){
                await $.ajax({
                url:"http://localhost:2015/reg",
                type:"POST",
                data:{
                  tel:_this.form.tel,
                  password:_this.form.pass,
                  img:_this.form.img,
                  sellerTitle:_this.form.sellerTitle,
                  desc:_this.form.desc
                },
                success: function(data){
                  if(data=='success'){
                    _this.$message({
                        message: '注册成功，等待管理员审核',
                        type: 'success'
                      });
                    _this.$router.push({path:'/login'});
                  }else{
                    _this.$message({
                        message: '注册失败',
                        type: 'warning'
                      });
                  }
                }
            })
            }
            
          }else{

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
      //页面显示
      showuserimg() {
        const _this = this;
				var uploaderInput = $("#fileInput");
				var imgFile = uploaderInput[0].files[0];
				var fr = new FileReader();
				fr.onload = function() {
          _this.imageUrl=fr.result;
				};
				fr.readAsDataURL(imgFile);
			},
    //将图片存数据库，得到存数据库的路径
      upload(){
        const _this = this;
         $.ajax({
          url:"http://localhost:2015/uploadLogo",
          type:"POST",
          async:false,
          processData:false,
              contentType:false,
              cache:false,
              data:new FormData($("#file")[0]),
              success:function(data){
                _this.form.img = data;
              }
        });
      }

  }
};
</script>
<style scoped>
.farmOA {
  color: #409eff;
  font-size: 24px;
  text-align: center;
  margin: auto;
  margin-top: 30px;
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
#file{
    width:60px;
    height: 60px;
    border-radius: 50%;
    border:1px dashed darkgray;
    margin: auto;
    position: relative;
    margin: 20px auto;
}
#file input{
  position: absolute;
  top:0;
  left:0px;
  z-index: 20;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0;
}
#file img{
  position: absolute;
  top:0;
  left:0px;
  z-index: 19;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>