<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="findform" :model="form" label-width="80px" class="findForm">
           <el-row type="flex" class="row-bg" justify="center">
               <el-col :span="12">
                    <el-form-item label="订单编号" prop="orderId" 
                        :rules="[{ required: false, message: '请输入商品编号', trigger: 'blur' },
                                { type: 'number', message: '输入格式不正确，请输入数字'}]">
                        <el-input v-model.number="findform.orderId"   placeholder="请输入商品编号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-form-item>
                        <el-button  type="primary" @click="findSubmit('findform')">查询</el-button>
                    </el-form-item>
                </el-col>
           </el-row>
        </el-form>


        <el-form ref="form" :model="form" label-width="80px" class="regOA">
             <el-form-item label="商品编号" prop="goodsId" >
                <el-input v-model="form.goodsId" disabled></el-input>
            </el-form-item>
             <el-form-item label="订单状态:" prop="kindId" >
                        <el-select v-model="form.kindId" disabled>
                        <el-option label="待付款" value="1"></el-option>
                        <el-option label="待发货" value="2"></el-option>
                        <el-option label="待评价" value="3"></el-option>
                        <el-option label="完成" value="4"></el-option>
                        </el-select>
                    </el-form-item>
             <el-form-item label="成交数量" prop="goodsNum" >
                <el-input v-model.number="form.goodsNum" disabled></el-input>
            </el-form-item>
            <el-form-item label="成交金额" prop="goodsPrice">
                <el-input v-model="form.goodsPrice"  disabled></el-input>
            </el-form-item>
            <el-form-item label="下单时间" prop="orderTime" >
                 <el-date-picker format="yyyyMMdd" disabled value-format="yyyyMMdd" type="date" placeholder="选择日期" v-model="form.orderTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="收货姓名" prop="addressName" 
             :rules="[{ required: true, message: '请输入收货姓名', trigger: 'blur' },
                { validator: validateName, trigger: 'change' }]">
                <el-input v-model.number="form.addressName"   placeholder="请输入收货姓名"></el-input>
            </el-form-item>
            <el-form-item label="收货电话" prop="addressTel" 
                :rules="[{ required: true, message: '请输入收货电话', trigger: 'blur' },
                    { validator: validateTel, trigger: 'change' }]">
                <el-input v-model.number="form.addressTel"   placeholder="请输入收货电话"></el-input>
            </el-form-item> 
            <el-form-item label="收货地址" prop="address" 
            :rules="[{ required: true, message: '请输入收货地址', trigger: 'blur' },
                { validator: validateAddress, trigger: 'change' }]">
                <el-input type="textarea" v-model.number="form.address" :rows="4"  placeholder="请输入收货地址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" :style="{width:'60%',margin:'auto'}" @click="updateSubmit('form')">修改</el-button>
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
        //查询表单信息
        findform:{
            orderId:''
        },
        // 添加商品表单信息
        form:{
            goodsId:'',
            kindId:'1',
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
  methods: {
      findSubmit(formName){

      },
      //确认添加事件
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
</style>