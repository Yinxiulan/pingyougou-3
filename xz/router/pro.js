const express = require('express');
//引入连接池模块
const pool = require('../pool.js');//引入上一级文件
//console.log(pool);
//创建路由
const r = express.Router();
//登录接口
r.get("/v1/login/:uname&:upwd", (req, res) => {
    // get方法可以验证
    // 检测接口：http://127.0.0.1:8080/pro/v1/login/dingding&123456
    var _uname = req.params.uname;
    var _upwd = req.params.upwd;
    var sql = "select * from xz_user where uname=? and upwd=?";
    pool.query(sql, [_uname, _upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(JSON.stringify({success:true}));
        } else {
            res.send(JSON.stringify({success:false}));
        }
    });
});

r.post('/v1/register', (req, res) => {
    //获取post请求的数据
    let obj = req.body;
    console.log(obj);
    //执行Sql命令
    pool.query('INSERT INTO xz_user SET ?', [obj], (err, result) => {
        if (err) throw err;
        console.log(result);
        //注册成功
        if (result.affectedRows > 1) {
            res.send(JSON.stringify({success:true}));
        } else {
            res.send(JSON.stringify({success:false}));
        }
    });

});














// if (!obj.email) {
// res.send({
// code: 403, msg: 'email required'
// });//出现多次响应，即send被多次调用
// return;
// }
// if (!obj.phone) {
// res.send({
// code: 404, msg: 'email required'
// });//出现多次响应，即send被多次调用
// return;
// }
//执行Sql命令








//查询所有用户
r.get("/v1/userlist", (req, res) => {
    // 检测接口：http://127.0.0.1:8080/pro/v1/userlist
    var sql = "select * from xz_user ";
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//根据Uid删除
r.delete("/v1/del/:uid", (req, res) => {
    // 检测：127.0.0.1:8080/pro/v1/del/2
    var _uid = req.params.uid;
    var sql = "delete from xz_user where uid=?";
    pool.query(sql, [_uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});

//根据uid查询信息
r.get("/v1/search/:uid", (req, res) => {
    var _uid = req.params.uid;
    var sql = "select * from xz_user where uid=?";
    pool.query(sql, [_uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send("0");
        }
    });
});

//根据uid修改用户信息
r.put("/v1/update", (req, res) => {
    var obj = req.body;
    var sql = "update xz_user set ? where uid=?";
    pool.query(sql, [obj, obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send("1");
        } else {
            res.send("0");
        }
    });
});


module.exports = r;