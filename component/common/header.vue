<template>
    <div id="header">
        <div class="title">
            <img :src="user.logo" alt="">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <span v-text="user.title"></span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="i in menus" v-text="i.title"></el-dropdown-item>
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
                user:{
                    logo:src,
                    title:'哈开始觉得'
                },
                menus:[
                    {
                        id:1,
                        path:'',
                        title:'修改店铺信息'
                    },
                     {
                         id:2,
                        path:'',
                        title:'修改密码'
                    },{
                        id:3,
                        path:'',
                        title:'退出'
                    }
                ]
                
            }
        },
        methods:{
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
