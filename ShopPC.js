var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var multer = require("multer");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//配置静态文件
app.use(express.static('../public'));
//实例化express
var connection = mysql.createConnection({
    host:"rm-wz9mx3p81r9b6sxr9yo.mysql.rds.aliyuncs.com",
    user:"jian",
    password:"Jxl95913",
    database:"farmshop"
	});
connection.connect();

// 上传图片
var storage = multer.diskStorage({
	//存储文件地方
	destination: function(req, res, cb) {
		cb(null, "./public/logo");
	},
	//存储文件名字
	filename: function(req, file, cb) {
		var fileFormat = file.originalname.split(".");
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat [fileFormat.length - 1])
	}
})
//配置上传参数
var upload = multer({
	storage: storage
})
app.post("/uploadLogo", upload.any(), function(req, res) {
	res.append("Access-Control-Allow-Origin", "*");
	if(req.files.length == 0) {
		res.send('');
	} else {
        console.log(req.files[0]);
		res.send(req.files[0].filename);
	}
	//console.log(req.files[0])
})

//手机号查重
app.post('/reg/checkTel', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`SELECT * FROM seller_info where tel='${req.body.tel}'`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        if(results.length==0){
            res.send('success');
        }else{
            res.send('该手机号已被注册');
        }
        
    });
});

//电商登录
app.post('/login/seller', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    console.log(regTime);
    var sql= `SELECT * FROM seller_info where tel='${req.body.tel}' and password='${req.body.password}'`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        const data={
            code:'',
            data:{},
            message:''
        }
        if(results.length == 0){
            data.code = '-1';
            data.message='用户名或密码错误';
        }else{
            data.code = '0';
            data.data = results[0];
            data.message="success";
        }
        res.send(data);
    });
});

//用户注册
app.post('/reg', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql='INSERT INTO seller_info(tel,`password`,img,sellerTitle,`desc`,goodNum,goodsell,regTime,`status`) VALUES '+`
    ('${req.body.tel}','${req.body.password}','http://localhost/shopPc/public/logo/${req.body.img}','${req.body.sellerTitle}','${req.body.desc}',0,0,${regTime},'1')`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//修改用户信息
app.post('/updateInfo', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
   // update `seller_info` set password`='123456789' where `sellerIid`=7;
   if(!req.body.img.includes('http:')){
    req.body.img = 'http://localhost/shopPc/public/logo/'+req.body.img;
   }
    var sql='UPDATE seller_info SET `desc` ='+` '${req.body.desc}' ,tel = '${req.body.tel}', sellerTitle = '${req.body.sellerTitle}' ,
    img = '${req.body.img}' where sellerId=${req.body.sellerId}`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//通过sellerId返回信息
app.get('/find/sellerId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql= `SELECT * FROM seller_info where sellerId='${req.query.sellerId}'`;
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send(results[0]);
    });
});

//修改密码-核对
app.post('/updatePassword/check', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql1='SELECT * FROM seller_info where `password` ='+ `${req.body.oldpass} and sellerId='${req.body.sellerId}'`;
    connection.query(sql1, function (error, results, fields) {   
        if (error) throw error;
        if(results.length==0){
            res.send({code:'-1',message:'原密码输入错误'});
        }else{
            res.send({code:'0'});
        }
    });
});

//修改密码
app.post('/updatePassword/update', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql2='UPDATE seller_info SET `password` ='+` '${req.body.newpass}' where sellerId=${req.body.sellerId}`;
        connection.query(sql2, function (error, results, fields) {   
            if (error) throw error;
            res.send('密码修改成功');
        });
});
app.listen(2015);
console.log("开启服务器");

//时间函数
function timeChange(){ 
    var time = new Date();
    return ""+time.getFullYear()+stringNum(time.getMonth())+stringNum(time.getDate())+stringNum(time.getHours())+stringNum(time.getMinutes())+stringNum(time.getSeconds())+"";
}
function stringNum(ti){
    if(ti<10){
        ti="0"+ti;
    }
    return ti;
}