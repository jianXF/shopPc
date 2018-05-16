<template>
    <div>
        <div class="breadcrumb" @click="goBack">
            <i class="el-icon-arrow-left"></i><span>电商详情</span>
        </div>
       <el-tooltip class="item" effect="dark" content="商户头像" placement="right-start">
          <form action="" id="file">
            <img :src="form.img" alt="">
          </form>
        </el-tooltip>
        <el-form ref="form" :model="form" label-width="80px" class="regOA">
            <el-form-item label="电话"  prop="tel">
                <el-input v-model="form.tel" placeholder="请输入您的电话"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称" prop="sellerTitle" >
                <el-input v-model="form.sellerTitle"   placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass" >
                <el-input v-model="form.pass"   ></el-input>
            </el-form-item>
            <el-form-item label="商品数量"  prop="tel">
                <el-input v-model="form.goodNum" ></el-input>
            </el-form-item>
            <el-form-item label="销售量"  prop="goodsell">
                <el-input v-model="form.goodsell" ></el-input>
            </el-form-item>
             <el-form-item label="注册时间"  prop="regTime">
                <el-date-picker format="yyyyMMdd" value-format="yyyyMMdd" type="date" placeholder="选择日期" v-model="form.regTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            
             
            <el-form-item label="描述" prop="desc">
                <el-input v-model="form.desc" type="textarea" :rows="4"  placeholder="请输入对店铺描述"></el-input>
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
            img:'',
            goodNum:'',
            goodsell:'',
            regTime:'',
            pass:''
        }
    };
  },
 async mounted(){
    const _this =this;
    await $.ajax({
        url:"http://localhost:2015/find/sellerId",
        type:"GET",
        data:{
            sellerId:location.href.split("?")[1].split("=")[1]
        },
        success:function(data){
          _this.form.tel = data.tel;
          _this.form.sellerTitle = data.sellerTitle;
          _this.form.desc = data.desc;
          _this.form.img = data.img;
          _this.form.goodNum = data.goodNum;
          _this.form.goodsell = data.goodsell;
          _this.form.regTime = data.regTime.substr(0,8);
          _this.form.pass = data.password;
          //sessionStorage.setItem('logo',data.img);
        }
    })
  },
  methods: {
      goBack(){
          this.$router.go(-1);
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
.el-icon-arrow-left{
    font-size:20px;
    font-weight:bold;
    padding-right:5px;
    line-height:20px;
}
.breadcrumb span{
    font-size:16px;
    line-height:20px;
}
</style>