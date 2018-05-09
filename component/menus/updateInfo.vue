<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>修改店铺信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-tooltip class="item" effect="dark" content="点击修改您的店铺Logo" placement="right-start">
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
            desc:'阿娇是快递就拉上看到就拉开卢卡斯的拉克丝了那份呢',
            img:''
        },
        // 上传logo
        imageUrl: ""
    };
  },
 async mounted(){
    const _this =this;
    await $.ajax({
        url:"http://localhost:2015/find/sellerId",
        type:"GET",
        data:{
            sellerId:sessionStorage.getItem('sellerId')
        },
        success:function(data){
          _this.form.tel = data.tel;
          _this.form.sellerTitle = data.sellerTitle;
          _this.form.desc = data.desc;
          _this.form.img = data.img;
          _this.imageUrl = data.img;
          //sessionStorage.setItem('logo',data.img);
        }
    })
  },
  methods: {
      //确认修改事件
      updateSubmit(formName){
        const _this = this;
        this.upload();
          this.$refs[formName].validate(async(valid) => {
          if (valid) {
            var isReapt = true;
            if(_this.form.tel!=sessionStorage.getItem('tel')){
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
            }else{
              isReapt = false;
            }
            if(!isReapt){
              if(_this.form.img==""){
                _this.form.img = sessionStorage.getItem('logo');
              }
                await $.ajax({
                    url:"http://localhost:2015/updateInfo",
                    type:"POST",
                    data:{
                      sellerId:sessionStorage.getItem('sellerId'),
                      tel:_this.form.tel,
                      password:_this.form.sellerTitle,
                      img:_this.form.img,
                      sellerTitle:_this.form.sellerTitle,
                      desc:_this.form.desc
                    },
                    success: function(data){
                      if(data=='success'){
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                          });
                      }else{
                        _this.$message({
                            message: '修改失败',
                            type: 'warning'
                          });
                      }
                    }
              });
              await $.ajax({
                url:"http://localhost:2015/find/sellerId",
                type:"GET",
                data:{
                    sellerId:sessionStorage.getItem('sellerId')
                },
                success:function(data){
                  console.log(data);
                  _this.form.tel = data.tel;
                  _this.form.sellerTitle = data.sellerTitle;
                  _this.form.desc = data.desc;
                  _this.form.img = data.img;
                  _this.imageUrl = data.img;
                  sessionStorage.setItem('logo',data.img);
                  sessionStorage.setItem('tel',data.tel);
                }
            })
            }
            
          } else {
            console.log('error submit!!');
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
.regOA{
    width: 400px;
    margin: 10px auto;
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