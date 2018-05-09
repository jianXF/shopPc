<template>
    <div id="header">
        <div class="title">
            <img :src="user.logo" alt="" :style="{opacity:type=='1'?'1':'0'}">
            <el-dropdown @command="clickMenu">
                <span class="el-dropdown-link">
                    <span v-text="user.title"></span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="i in menus" :command="i.path" v-text="i.title"></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
  
</template>

<script>
import src from "../../img/user.jpg";
    export default{
        components:{
        	//xfooter
        },
        data(){
            return {
                type:'1',
                user:{
                    logo:src,
                    title:'哈开始觉得'
                },
                menus:[
                    {
                        id:1,
                        title:'修改店铺信息',
                        path:'/menus/updateInfo'
                    },
                     {
                         id:2,
                        title:'修改密码',
                        path:'/menus/updatePassword'
                    },{
                        id:3,
                        title:'退出',
                        path:''
                    }
                ],
                menus1:[
                    {
                        id:1,
                        title:'退出',
                        path:''
                    }
                ]
                
            }
        },
        methods:{
            //点击跳转页面
            clickMenu(command){
                if(command!=""){
                    this.$router.push({path:command});
                }else{
                    this.$confirm('是否退出登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        this.$router.push({path:"/login"});
                    }).catch(() => {
                              
                    });
                }
                    
                
            }
        },
        mounted(){
             const type = sessionStorage.getItem('type');
            if(type=='2'){
                this.menus = this.menus1;
                this.type='2';
            }
        }
    }
</script>
<style scoped>
#header{
    position: fixed;
    top:0px;
    left:0px;
    width: 100%;
    height:55px;
    background-color: rgb(84, 92, 100);
    color: white;
    z-index: 2000;
}
.title{
    float: right;
    margin-right: 5%;
}
 img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 7px;
}
.el-dropdown-link span,.el-dropdown-link i{
    color: white;
}
.el-dropdown{
    display: block;
    margin-top: -31px;
    margin-left: 50px;
}
</style>
