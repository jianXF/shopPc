<template>
    <div class="kindAdminOA">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            prop="kind_f"
            label="商品总类型"
            :rules="[
            { required: true, message: '请选择需要增加的子类型', trigger: 'blur' }
            ]"
        >
            <el-select v-model="dynamicValidateForm.kind_f" placeholder="请选择状态">
                <el-option  v-for="i in kinddata" :label="i.name" :value="i.kindId"></el-option>
            </el-select>

        </el-form-item>
        <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'子类型' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
            required: true, message: '域名不能为空', trigger: 'blur'
            }"
        >
            <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button @click="addDomain">新增子类型</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
  
</template>

<script>
  
    export default{
        components:{
           
        },
        data(){
            return {
                kinddata:[{
                    kindId:1,
                    name:'衣服'
                },{
                    kindId:2,
                    name:'食物'
                },{
                    kindId:3,
                    name:'生活用品'
                }],
                dynamicValidateForm: {
                    domains: [{
                        value: '324'
                    }],
                    kind_f: ''
            }
            }
        },
         methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.dynamicValidateForm.domains)
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
                });
            }
         }
    }
</script>
<style scoped>
.kindAdminOA{
    
}
.demo-dynamic{
    width: 60%;
    margin:auto;
    margin-top: 100px;
}
.demo-dynamic .el-input,.demo-dynamic .el-select{
    width: 80%;
}

</style>