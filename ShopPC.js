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
            switch(results[0].status){
                case 1:
                        data.code = '-1';
                        data.message='管理员正在审核该用户信息，待审核通过后才可登录';
                        break;
                case 2:
                        data.code = '0';
                        data.data = results[0];
                        data.message="success";
                        break;
                case 3:
                        data.code = '-1';
                        data.message='审核失败，请联系商城管理员';
                        break;
                case 4:
                        data.code = '-1';
                        data.message='您已被注销，请联系商城管理员';
                        break;
            }
            
        }
        res.send(data);
    });
});
//管理员登录
app.post('/login/admin', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    console.log(regTime);
    var sql= `SELECT * FROM admin_info where userName='${req.body.userName}' and password='${req.body.password}'`;
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

//商品分类列表
app.get('/find/goods_kind', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM goods_kind`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            var option = [];
            for(var i of results){
                var opp = {};
                if(i.oId==0){
                    opp.value = i.kindId;
                    opp.label = i.name;
                    opp.children = [];
                    for(var j of results){
                        if(i.kindId==j.oId){
                            opp.children.push({value:j.kindId,label:j.name});
                        }
                        
                    }
                    option.push(opp);
                }
            }
           //console.log(option);
            res.send(option);
        });
});


//新增商品
app.post('/insertGoods', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql='INSERT INTO goods (sellerId,kindId,title,price_o,imgLogo,imgs,stock,sellnum,address,delivery,upTime,heavy,isSell,isBargain) VALUES '+`
    (${req.body.sellerId},${req.body.kindId},'${req.body.title}','${req.body.price_o}','${req.body.imgLogo}','${req.body.imgs}',${req.body.stock}
    ,0,'${req.body.address}','${req.body.delivery}','${regTime}',${req.body.heavy},1,0)`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});


//修改商品
app.post('/updateGoods', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql=`UPDATE goods SET kindId=${req.body.kindId},title='${req.body.title}',
    price_o='${req.body.price_o}',imgLogo='${req.body.imgLogo}',imgs='${req.body.imgs}',stock=${req.body.stock},address='${req.body.address}',
    delivery='${req.body.delivery}',heavy=${req.body.heavy} where goodsId=${req.body.goodsId}`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//显示所有商品
app.get('/find/goods', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM goods`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
           
        });
});
//通过商品id查找商品
app.get('/find/goods/goodsId', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM goods as b,goods_kind as a where goodsId=${req.query.goodsId} and b.kindId=a.kindId`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results[0]);
           
        });
});

//通过多种信息查找商品and upTime > ${req.query.date1} and upTime < ${req.query.date2}
app.get('/find/goodss', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var qq =  `select * from  goods as b,goods_kind as a where sellerId=${req.query.sellerId} and b.kindId=a.kindId and `;
        for(var i in req.query){
            if(i=='title'){
                qq+='`title` like '+`'%${req.query.title}%' and `
            }else if( i=='isSell' || i=='isBargain'){
                qq+=`${i}=${req.query[i]} and `;
            }else if(i=='kindId'){
                qq+=`b.kindId=${req.query[i]} and `;
            }
        }
        qq = qq.substr(0,qq.length-4);
        // var sql=`SELECT * FROM goods as b,goods_kind as a where sellerId=${req.query.sellerId} and b.kindId=a.kindId and `+'`title`'+
        // ` like '%${req.query.title}%' and b.kindId= ${req.query.kindId}`;
        console.log(qq);
        connection.query(qq, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
           
        });
});



//商品下架
app.get('/downGoods', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql=`UPDATE goods SET isSell=0 ,downTime = '${regTime}' where goodsId=${req.query.goodsId}`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//商品上架
app.get('/upGoods', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql=`UPDATE goods SET isSell=1 ,upTime = '${regTime}' where goodsId=${req.query.goodsId}`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//设置商品促销
app.post('/bargainGoods', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql=`UPDATE goods SET isBargain=1 ,bargaTime = '${regTime}' ,price_n = '${req.body.price_n}' where goodsId=${req.body.goodsId}`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//结束促销
app.get('/cancelBargain', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    const regTime = timeChange();
    var sql=`UPDATE goods SET isBargain=0 ,overTime = '${regTime}' where goodsId=${req.query.goodsId}`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});


//显示所有电商用户
app.get('/find/seller', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
        var sql=`SELECT * FROM seller_info`;
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
           
        });
});

//审核电商
app.get('/seller/check', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql='UPDATE seller_info SET `status`'+` = ${req.query.type} where sellerId = ${req.query.sellerId}` ;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {   
        if (error) throw error;
        res.send('success');
    });
});

//通过条件查询电商信息
app.get('/find/sellers', function(req,res) {
    res.append("Access-Control-Allow-Origin","*");
    var sql =  `select * from  seller_info where `;
    for(var i in req.query){
        if(i=='sellerTitle' || i=='tel'){
           sql+=`${i} like '%${req.query[i]}%' and `;
        }else if( i=='status'){
            sql+=`${i}=${req.query[i]} and `;
        }
    }
    sql = sql.substr(0,sql.length-4);
        connection.query(sql, function (error, results, fields) {   
            if (error) throw error;
            res.send(results);
           
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