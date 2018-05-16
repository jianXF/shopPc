<template>
    <div>
        <div class="breadcrumb" @click="goBack">
             <i class="el-icon-arrow-left"></i><span>订单详情</span>
        </div>
        <el-steps :active="Number(form.status)" align-center :style="{width:'60%',margin:'30px auto'}">
            <el-step title="下单" :description="form.orderTime?form.orderTime.substr(0,8):''"></el-step>
            <el-step title="付款" :description="form.buyTime?form.buyTime.substr(0,8):''"></el-step>
            <el-step title="发货" :description="form.sendTime?form.sendTime.substr(0,8):''"></el-step>
            <el-step title="收货" :description="form.getTime?form.getTime.substr(0,8):''"></el-step>
            <el-step title="评价" :description="form.evaTime?form.evaTime.substr(0,8):''"></el-step>
            <el-step title="完成" ></el-step>
        </el-steps>
        <el-form ref="form" :model="form" label-width="80px" class="regOA">
             <el-form-item label="商品编号" prop="goodsId" >
                <el-input v-model="form.goodsId" disabled></el-input>
            </el-form-item>
             <el-form-item label="购买数量" prop="goodsNum" >
                <el-input v-model.number="form.goodsNum" disabled></el-input>
            </el-form-item>
            <el-form-item label="交易金额" prop="goodsPrice">
                <el-input v-model="form.goodsPrice"  disabled></el-input>
            </el-form-item>
            <el-form-item label="收货姓名" prop="addressName" 
             :rules="[{ required: true, message: '请输入收货姓名', trigger: 'blur' },
                { validator: validateName, trigger: 'change' }]">
                <el-input v-model.number="form.addressName" :disabled="form.status>2?true:false"   placeholder="请输入收货姓名"></el-input>
            </el-form-item>
            <el-form-item label="收货电话" prop="addressTel" 
                :rules="[{ required: true, message: '请输入收货电话', trigger: 'blur' },
                    { validator: validateTel, trigger: 'change' }]">
                <el-input v-model.number="form.addressTel"  :disabled="form.status>2?true:false"  placeholder="请输入收货电话"></el-input>
            </el-form-item> 
            <el-form-item label="收货地址" prop="address" 
            :rules="[{ required: true, message: '请输入收货地址', trigger: 'blur' },
                { validator: validateAddress, trigger: 'change' }]">
                <el-input type="textarea" v-model.number="form.address" :disabled="form.status>2?true:false" :rows="4"  placeholder="请输入收货地址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" :style="{width:'60%',margin:'auto'}" :disabled="form.status>2?true:false" 
                @click="updateSubmit('form')">修改</el-button>
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
        // 添加商品表单信息
        form:{
            goodsId:'',
            status:'1',
            goodsNum:'',
            goodsPrice:'',
            orderTime:'20140502',
            delivery:'',
            addressName:'',
            addressTel:'',
            address:''
        }
       
    };
  },
  async mounted(){
       const _this = this;
       var orderId = this.$router.history.current.query.orderId;
                await $.ajax({
                url:"http://localhost:2015/find/orderId",
                type:"get",
                data:{
                    orderId:orderId
                },
                success:function(data){
                    _this.form = data;
                    _this.form.status = _this.form.status+'';
                }
                })
  },
  methods: {
      //确认添加事件
      updateSubmit(formName){
          var orderId = this.$router.history.current.query.orderId;
          const _this = this;
          this.$refs[formName].validate(async(valid) => {
          if (valid) {
            await $.ajax({
                url:"http://localhost:2015/order/update",
                type:"POST",
                data:{
                    orderId:orderId,
                    addressName:_this.form.addressName,
                    addressTel:_this.form.addressTel,
                    address:_this.form.address 
                },
                success:function(data){
                    if(data="success"){
                        _this.$message({
                            message: '修改该订单收货信息成功',
                            type: 'success'
                          });
                    }
                }
            })
            await $.ajax({
                url:"http://localhost:2015/find/orderId",
                type:"get",
                data:{
                    orderId:orderId
                },
                success:function(data){
                    _this.form = data;
                    _this.form.status = _this.form.status+'';
                }
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置事件
      resetForm(formName){
          this.$refs[formName].resetFields();
          this.form.selectedOptions=[];
      },
      //收货人姓名名称校验
      validateName(rule, value, callback){
        if (value.length>16) {
          callback(new Error('商品名称不超过16个字'));
        } else {
          callback();
        }
      },
      //校验发货地址
      validateAddress(rule, value, callback){
        if (value.length>=100) {
          callback(new Error('地址不超过100个字'));
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
       goBack(){
          this.$router.go(-1);
      }
     
  }
};
</script>
<style scoped>
.findForm{
    width: 80%;
    margin:20px auto;
}
.regOA{
    width: 400px;
    margin: 0px auto;
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