import Vue from "vue";
import "./template/base.css";
import $ from "jquery";
import "jquery.cookie";
//路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import ElementUI from 'element-ui';
Vue.use(ElementUI);


//最外层模块
import menus from "./component/outer/menus.vue";
import reg from "./component/outer/reg.vue";
import login from "./component/outer/login.vue";

//menus的子模块
import shouye from "./component/menus/shouye.vue";
import complaint from "./component/menus/complaint.vue";
import conment from "./component/menus/conment.vue";
import goodsAdmin from "./component/menus/goodsAdmin.vue";
import goodsKind from "./component/menus/goodsKind.vue";
import insertGoods from "./component/menus/insertGoods.vue";
import message from "./component/menus/message.vue";
import orderAdmin from "./component/menus/orderAdmin.vue";
import orderDetail from "./component/menus/orderDetail.vue";
import sellerAdmin from "./component/menus/sellerAdmin.vue";
import updateGoods from "./component/menus/updateGoods.vue";
import userAdmin from "./component/menus/userAdmin.vue";
import updateInfo from "./component/menus/updateInfo.vue";
import updatePassword from "./component/menus/updatePassword.vue";
import findSellerInfo from "./component/menus/findSellerInfo.vue";
import ComplaintStatistics from "./component/menus/ComplaintStatistics.vue";

//状态管理
import Vuex from 'vuex';
Vue.use(Vuex);

//配置路由
var router = new VueRouter({
    routes: [{
        path:"/",
        redirect:"/login"
    },{
        path:"/login",
        component: login
    }, {
        path: "/reg",
        component: reg
    },{
        path: "/menus",//选项卡
        component: menus,
        children: [{
            path: 'index',
            component: shouye
        },
        {
            path: 'complaint',
            component: complaint
        },
        {
            path: 'conment',
            component: conment
        },
        {
            path: 'goodsAdmin',
            component: goodsAdmin
        },
        {
            path: 'goodsKind',
            component: goodsKind
        },
        {
            path: 'insertGoods',
            component: insertGoods
        },
        {
            path: 'message',
            component: message
        },
        {
            path: 'orderAdmin',
            component: orderAdmin
        },
        {
            path: 'orderDetail',
            component: orderDetail
        },
        {
            path: 'sellerAdmin',
            component: sellerAdmin
        },
        {
            path: 'updateGoods',
            component: updateGoods
        },
        {
            path: 'userAdmin',
            component: userAdmin
        },
        {
            path: 'updateInfo',
            component: updateInfo
        },
        {
            path: 'updatePassword',
            component: updatePassword
        },
        {
            path:'findSellerInfo',
            component:findSellerInfo
        },
        {
            path:'ComplaintStatistics',
            component:ComplaintStatistics
        }
    ]
    }]
})

//配置状态
var store = new Vuex.Store({
    state:{

    }
})

new Vue({
    el: "#app",
    template: `
        <div id="box">
            <router-view></router-view>
        </div> 
    `,
    router,
    store
})

import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Tree,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Badge,
    Card,
    Rate,
    Steps,
    Step,
    Carousel,
    CarouselItem,
    Collapse,
    CollapseItem,
    Cascader,
    ColorPicker,
    Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    MessageBox,
    Message,
    Notification
  } from 'element-ui';
  
  Vue.use(Pagination);
  Vue.use(Dialog);
  Vue.use(Autocomplete);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Radio);
  Vue.use(RadioGroup);
  Vue.use(RadioButton);
  Vue.use(Checkbox);
  Vue.use(CheckboxButton);
  Vue.use(CheckboxGroup);
  Vue.use(Switch);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(DatePicker);
  Vue.use(TimeSelect);
  Vue.use(TimePicker);
  Vue.use(Popover);
  Vue.use(Tooltip);
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(Tag);
  Vue.use(Tree);
  Vue.use(Alert);
  Vue.use(Slider);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Progress);
  Vue.use(Badge);
  Vue.use(Card);
  Vue.use(Rate);
  Vue.use(Steps);
  Vue.use(Step);
  Vue.use(Carousel);
  Vue.use(CarouselItem);
  Vue.use(Collapse);
  Vue.use(CollapseItem);
  Vue.use(Cascader);
  Vue.use(ColorPicker);
  Vue.use(Container);
  Vue.use(Header);
  Vue.use(Aside);
  Vue.use(Main);
  Vue.use(Footer);
  
  Vue.use(Loading.directive);