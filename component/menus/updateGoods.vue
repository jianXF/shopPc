<template>
    <div>
        <div class="breadcrumb" @click="goBack">
            <i class="el-icon-arrow-left"></i><span>商品详情</span>
        </div>
       <form action="" id="file">
              <img v-for="i in form.imgLogo" :src="i" alt="" @click="deleImg(i)"/>
              <el-tooltip class="item" effect="dark" content="上传您的商品封面图片列表" placement="right-start">
              <div class="fileName">
                    <input type="file" class="fileInput" multiple  name="sellerlogo"  @change="upload">
                    <i  class="el-icon-plus avatar-uploader-icon" ></i>
              </div></el-tooltip>
          </form>
          <form action="" id="file1">
              <img v-for="i in form.imgs" :src="i" alt="" @click="deleImg1(i)"/>
              <el-tooltip class="item" effect="dark" content="上传您商品详情图片" placement="right-start">
              <div class="fileName">
                    <input type="file" class="fileInput" multiple  name="sellerlogo"  @change="upload1">
                    <i  class="el-icon-plus avatar-uploader-icon" ></i>
              </div></el-tooltip>
          </form>
        <el-form ref="form" :model="form" label-width="80px" class="regOA">
             <el-form-item label="商品名称" prop="title" 
                :rules="[{ required: true, message: '请输入商品名称', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                <el-input v-model="form.title"   placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            
            <el-form-item label="商品价格"  prop="price_o"
                :rules="[{ required: true, message: '请输入商品价格', trigger: 'blur' },
                         { validator: validatePrice, trigger:'change'}]">
                <el-input v-model="form.price_o" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品种类:" prop="selectedOptions">
                    <el-cascader
                        placeholder="请选择商品种类"
                        :options="options"
                        v-model="form.selectedOptions"
                      >
                    </el-cascader>
            </el-form-item>
             <el-form-item label="库存" prop="stock" 
                :rules="[{ required: true, message: '请输入库存量', trigger: 'blur' },
                         { validator: validateNum, trigger:'change'}]">
                <el-input v-model.number="form.stock"   placeholder="请输入库存量"></el-input>
            </el-form-item>
            <el-form-item label="发货地址" prop="address" 
                :rules="[{ required: true, message: '请输入发货地址（省-市）', trigger: 'blur' },
                { validator: validateAddress, trigger: 'change' }]">
                <el-input v-model="form.address" :rows="4"  placeholder="请输入发货地址"></el-input>
            </el-form-item>
            <el-form-item label="快递费用" prop="delivery" 
                :rules="[{ required: true, message: '请输入快递费用', trigger: 'blur' },
                    { validator: validatePrice, trigger:'change'}]">
                <el-input v-model="form.delivery" :rows="4"  placeholder="请输入快递费用"></el-input>
            </el-form-item>
             <el-form-item label="商品重量" prop="heavy" 
                :rules="[{ required: true, message: '请输入商品重量', trigger: 'blur' },
                { validator: validateNum, trigger:'change'}]">
                <el-input v-model.number="form.heavy" :rows="4"  placeholder="请输入商品重量"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" :style="{width:'60%'}" @click="updateSubmit('form')">修改</el-button>
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
        imgLogo:[], 
       // 表单信息
        form:{
            title:'',
            price_o:'',
            stock:'',
            address:'',
            delivery:'',
            heavy:'',
            selectedOptions:[],
            imgLogo:[],
            imgs:[]
        },
        //商品种类
        options: []
       
    };
  },
  async mounted(){
      const _this = this;
      const id = location.href.split('?')[1].split('=')[1];
      //商品种类
      await $.ajax({
                url:"http://localhost:2015/find/goods_kind",
                type:"GET",
                data:{
                },
                success:function(data){
                    _this.options = data;
                   
            
                }
            })
        
        //商品数据加载
        await $.ajax({
                url:"http://localhost:2015/find/goods/goodsId",
                type:"GET",
                data:{
                    goodsId:id
                },
                success:function(data){
                     _this.form = {
                        title:data.title,
                        price_o:data.price_o,
                        stock:data.stock,
                        address:data.address,
                        delivery:data.delivery,
                        heavy:data.heavy,
                        selectedOptions:[data.oId,data.kindId],
                        imgLogo:data.imgLogo?data.imgLogo.split(';'):[],
                        imgs:data.imgs?data.imgs.split(';'):[]
                    }
                }
            })
  },
  methods: {
      //确认添加事件
      updateSubmit(formName){
          const _this = this;
          this.$refs[formName].validate(async(valid) => {
          if (valid && this.form.imgLogo.length!=0 && this.form.imgs.length!=0) {
            await $.ajax({
                url:"http://localhost:2015/updateGoods",
                type:"POST",
                data:{
                    goodsId:location.href.split('?')[1].split('=')[1],
                    title:_this.form.title,
                    price_o:_this.form.price_o,
                    stock:_this.form.stock,
                    address:_this.form.address,
                    delivery:_this.form.delivery,
                    heavy:_this.form.heavy,
                    kindId:_this.form.selectedOptions[_this.form.selectedOptions.length-1],
                    imgLogo:_this.form.imgLogo.join(';'),
                    imgs:_this.form.imgs.join(';')
                },
                success:function(data){
                   if(data=='success'){
                       _this.$message({
                            message: '修改商品成功',
                            type: 'success'
                        });
                   }
                }
            })
          } else {
              if(valid){
                  _this.$message({
                            message: '请选择你需要上传的图片',
                            type: 'warning'
                        });
              }
          }
        });
      },
      //商品名称校验
      validateTitle(rule, value, callback){
        if (value.length>30) {
          callback(new Error('商品名称不超过30个字'));
        } else {
          callback();
        }
      },
      //校验发货地址
      validateAddress(rule, value, callback){
        if (value.length>=16) {
          callback(new Error('地址不超过16个字'));
        } else {
          callback();
        }
      },
      //校验钱
      validatePrice(rule, value, callback){
          if(!/(^[1-9]([0-9]+\.[0-9]{2})?$)|(^[0-9]\.[0-9]{2}?$)/.test(value)){
              callback(new Error('输入格式不正确，正确格式如：32.00'));
          }else{
              callback();
          }
          
      },
      //校验数字
      validateNum(rule, value, callback){
            if(!/^\d{1,}$/.test(value)){
              callback(new Error('输入格式不正确,请输入数字'));
          }else{
              callback();
          }
      },
    //   //页面显示
    //   showuserimg() {
    //     const _this = this;
	// 			var uploaderInput = $(".fileInput");
	// 			var imgFile = uploaderInput[0].files[0];
	// 			var fr = new FileReader();
	// 			fr.onload = function() {
    //                 _this.imgLogo.push(fr.result);
    //                 console.log(_this.imgLogo);
	// 			};
	// 			fr.readAsDataURL(imgFile);
	// 		},
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
                  console.log(data);
                _this.form.imgLogo.push('http://localhost/shopPc/public/logo/'+data);
              }
        });
      },
       upload1(){
        const _this = this;
         $.ajax({
          url:"http://localhost:2015/uploadLogo",
          type:"POST",
          async:false,
          processData:false,
              contentType:false,
              cache:false,
              data:new FormData($("#file1")[0]),
              success:function(data){
                  console.log(data);
                _this.form.imgs.push('http://localhost/shopPc/public/logo/'+data);
              }
        });
      },
      deleImg(src){
          var srcs =[];
          for(var i of this.form.imgLogo){
              if(src!=i){
                  srcs.push(i);
              }
          }
          this.form.imgLogo = srcs;
          
      },
       deleImg1(src){
          var srcs =[];
          for(var i of this.form.imgs){
              if(src!=i){
                  srcs.push(i);
              }
          }
          this.form.imgs = srcs;
          
      },
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
    width: 400px;
    position: relative;
    margin: 20px auto;
    overflow: hidden;
}
#file .fileName{
    width:60px;
    height: 60px;
    border:1px dashed darkgray;
    position: relative;
    float: left;
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
  width: 60px;
  height: 60px;
  margin: 0 5px;
  float: left;
}
#file1{
    width: 400px;
    position: relative;
    margin: 20px auto;
    overflow: hidden;
}
#file1 .fileName{
    width:60px;
    height: 60px;
    border:1px dashed darkgray;
    position: relative;
    float: left;
}
#file1 input{
    position: absolute;
  top:0;
  left:0px;
  z-index: 20;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0;
}
#file1 img{
  width: 60px;
  height: 60px;
  margin: 0 5px;
  float: left;
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