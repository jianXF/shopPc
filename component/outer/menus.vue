<template>
    <div >
        <xheader />
        <router-view :style="{marginLeft:'160px',marginTop:'55px'}"></router-view>
        <xleftMenu />
    </div>
  
</template>

<script>
    import xleftMenu from "../common/leftMenu.vue";
    import xheader from "../common/header.vue"
    export default{
        components:{
            xleftMenu,
            xheader
        }
    }
</script>