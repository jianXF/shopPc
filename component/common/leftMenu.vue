<template>
    <div id="leftMenu">
            <el-row class="tac">
                <el-col >
            <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="0">
                <i class="el-icon-menu" style="color:white" ></i>
            </el-menu-item>
            <el-submenu v-for="obj in menus" :index="obj.index">
                <template slot="title" >
                <i :class="obj.icon"></i>
                <span v-text="obj.name"></span>
                </template>
                <el-menu-item-group >
                    <el-menu-item v-for="child in obj.children" :index="child.index" v-text="child.name" @click="clickMenus(child.path)"></el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            </el-menu>
        </el-col>
        </el-row>
    </div>
  
</template>

<script>
    export default{
        components:{
        	//xfooter
        },
        data(){
            return {
                menus:[
                    {
                        index:"1",
                        name:"商品管理",
                        icon:"el-icon-goods",
                        path:'',
                        children:[
                            {
                                index:"1-1",
                                name:'商品管理',
                                path:'/menus/goodsAdmin'
                            },
                            {
                                index:'1-2',
                                name:'新增商品',
                                path:'/menus/insertGoods'
                            }
                        ]
                    },{
                        index:"2",
                        name:"订单管理",
                        icon:"el-icon-tickets",
                        path:'',
                        children:[
                            {
                                index:"2-1",
                                name:'订单管理',
                                path:'/menus/orderAdmin'
                            },
                            {
                                index:'2-3',
                                name:'评论管理',
                                path:'/menus/conment'
                            }
                        ]
                    },{
                        index:"3",
                        name:"投诉",
                        icon:"el-icon-edit-outline",
                        path:'',
                        children:[{
                                index:'3-1',
                                name:'投诉查询',
                                path:'/menus/complaint'
                            }]
                    }
                ],
                menus1:[{
                        index:"1",
                        name:"商户管理",
                        icon:"el-icon-news",
                        path:'',
                        children:[{
                                index:'1-1',
                                name:'商户注册审核',
                                path:'/menus/sellerAdmin'
                            },{
                                index:'1-2',
                                name:'商户投诉统计',
                                path:'/menus/ComplaintStatistics'
                            }]
                        },
                        {
                        index:"2",
                        name:"商品管理",
                        icon:"el-icon-mobile-phone",
                        path:'',
                        children:[{
                                index:'2-1',
                                name:'种类管理',
                                path:'/menus/goodsKind'
                            }]
                        },
                        {
                        index:"3",
                        name:"用户管理",
                        icon:"el-icon-service",
                        path:'',
                        children:[{
                                index:'3-1',
                                name:'用户信息',
                                path:'/menus/userAdmin'
                            },{
                                index:'3-2',
                                name:'留言投诉',
                                path:'/menus/message'
                            }]
                        }
                ]
            }
        },
        methods:{
            //点击菜单跳转
            clickMenus(paths){
                this.$router.push({path:paths});
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted(){
            const type = sessionStorage.getItem('type');
            if(type=='2'){
                this.menus = this.menus1;
            }
        }
    }
</script>
<style scoped>
#leftMenu{
    position: fixed;
    left:0;
    top:0;
    float: left;
    width: 160px;
    height: 100%;
}
.el-submenu,.el-menu-item{
    min-width: 100%;
    width: 100%;
}
.el-menu-item-group{
    background: #494c4c;
}
.el-submenu .el-submenu__title:hover{
    background-color: #3f4246;
}
.el-radio-group{
    background-color: rgb(84, 92, 100);
}
.el-col{
    height: 100%;
}
.el-menu-vertical-demo{
    height: 100%;
    background-color: rgb(84, 92, 100);
}
.tac{
    height: 100%;
}
.el-menu{
    border: none;
}
</style>
