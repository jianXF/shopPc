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
            :collapse="isCollapse"
            active-text-color="#ffd04b">
            <el-menu-item index="0">
                <i class="el-icon-menu" style="color:white" @click="changeCollapse"></i>
            </el-menu-item>
            <el-submenu v-for="obj in menus" :index="obj.index">
                <template slot="title" >
                <i :class="obj.icon"></i>
                <span v-text="obj.name"></span>
                </template>
                <el-menu-item-group >
                    <el-menu-item v-for="child in obj.children" :index="child.index" v-text="child.name"></el-menu-item>
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
                isCollapse:false,
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
                                path:''
                            },
                            {
                                index:'1-2',
                                name:'新增商品',
                                path:''
                            },
                            {
                                index:'1-3',
                                name:'修改商品',
                                path:''
                            },
                            {
                                index:'1-4',
                                name:'特价促销',
                                path:''
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
                                path:''
                            },
                            {
                                index:'2-2',
                                name:'订单详情',
                                path:''
                            },
                            {
                                index:'2-3',
                                name:'评论管理',
                                path:''
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
                                path:''
                            }]
                    }
                ]
            }
        },
        methods:{
            //改变菜单是否收起
            changeCollapse(){
                this.isCollapse = !this.isCollapse;
            },
            handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
        }
    }
</script>
<style scoped>
#leftMenu{
    position: fixed;
    left:0;
    top:0;
    width: 160px;
    height: 100%;
}
.el-submenu,.el-menu-item{
    min-width: 100%;
    width: 100%;
}
.el-menu-item-group{
    background: #727777;
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
