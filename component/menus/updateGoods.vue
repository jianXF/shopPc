<template>
    <div>
        <div class="breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/menus/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <el-form ref="findform" :model="form" label-width="80px" class="findForm">
           <el-row type="flex" class="row-bg" justify="center">
               <el-col :span="12">
                    <el-form-item label="商品编号" prop="goodsId" 
                        :rules="[{ required: false, message: '请输入商品编号', trigger: 'blur' },
                                { type: 'number', message: '输入格式不正确，请输入数字'}]">
                        <el-input v-model.number="findform.goodsId"   placeholder="请输入商品编号"></el-input>
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
             <el-form-item label="商品名称" prop="title" 
                :rules="[{ required: true, message: '请输入商品名称', trigger: 'blur' },
                        { validator: validateTitle, trigger: 'change' }]">
                <el-input v-model="form.title"   placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            
            <el-form-item label="商品价格"  prop="price_o"
                :rules="[{ required: true, message: '请输入商品价格', trigger: 'blur' },
                         { type: 'number', message: '输入格式不正确，请输入数字'}]">
                <el-input v-model.number="form.price_o" placeholder="请输入商品价格"></el-input>
            </el-form-item>
            <el-form-item label="商品种类:">
                    <el-cascader
                        placeholder="请选择商品种类"
                        :options="options"
                        v-model="form.selectedOptions">
                    </el-cascader>
            </el-form-item>
             <el-form-item label="库存" prop="stock" 
                :rules="[{ required: true, message: '请输入库存量', trigger: 'blur' },
                        { type: 'number', message: '输入格式不正确，请输入数字'}]">
                <el-input v-model.number="form.stock"   placeholder="请输入库存量"></el-input>
            </el-form-item>
            <el-form-item label="发货地址" prop="address" 
                :rules="[{ required: true, message: '请输入发货地址（省-市）', trigger: 'blur' },
                { validator: validateAddress, trigger: 'change' }]">
                <el-input v-model="form.desc" :rows="4"  placeholder="请输入发货地址"></el-input>
            </el-form-item>
            <el-form-item label="快递费用" prop="delivery" 
                :rules="[{ required: true, message: '请输入快递费用', trigger: 'blur' },
                { type: 'number', message: '输入格式不正确，请输入数字'}]">
                <el-input v-model.number="form.delivery" :rows="4"  placeholder="请输入快递费用"></el-input>
            </el-form-item>
             <el-form-item label="商品重量" prop="heavy" 
                :rules="[{ required: true, message: '请输入商品重量', trigger: 'blur' },
                { type: 'number', message: '输入格式不正确，请输入数字'}]">
                <el-input v-model.number="form.heavy" :rows="4"  placeholder="请输入商品重量"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" :style="{width:'40%'}" @click="updateSubmit('form')">添加</el-button>
                <el-button  type="primary" :style="{width:'40%'}" @click="resetForm('form')">重置</el-button>
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
            goodsId:''
        },
        // 添加商品表单信息
        form:{
            title:'',
            price_o:'',
            stock:'',
            address:'',
            delivery:'',
            heavy:'',
            selectedOptions:[]  
        },
        //商品种类
        options: [{
          value: '1',
          label: '指南',
          children: [{
            value: '2',
            label: '设计原则'
            },{
              value: '3',
              label: '一致'
            }, {
              value: '4',
              label: '反馈'
            }, {
              value: '5',
              label: '效率'
            }, {
              value: '6',
              label: '可控'
            }]},{
            value: '7',
            label: '导航',
            children: [{
              value: '8',
              label: '侧向导航'
            }, {
              value: '9',
              label: '顶部导航'
            }]
        }]
       
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
      //商品名称校验
      validateTitle(rule, value, callback){
        if (value.length>16) {
          callback(new Error('商品名称不超过16个字'));
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