const express = require('express');
//引入连接池模块
const pool = require('../pool.js');//引入上一级文件
//console.log(pool);
//创建路由
const r = express.Router();

//用户注册
r.post('/reg', (req, res) => {
    //获取post请求的数据
    let obj = req.body;
    console.log(obj);
    //验证数据是否为空
    if (!obj.uname) {
        res.send({
            code: 401, msg: 'uname required'
        });//出现多次响应，即send被多次调用
        return;
    }
    //密码电话邮箱都不能为空，同理
    if (!obj.upwd) {
        res.send({
            code: 402, msg: 'upwd required'
        });//出现多次响应，即send被多次调用
        return;
    }
    if (!obj.email) {
        res.send({
            code: 403, msg: 'email required'
        });//出现多次响应，即send被多次调用
        return;
    }
    if (!obj.phone) {
        res.send({
            code: 404, msg: 'email required'
        });//出现多次响应，即send被多次调用
        return;
    }
    //执行Sql命令
    pool.query('INSERT INTO xz_user SET ?', [obj], (err, result) => {
        if (err) throw err;
        console.log(result);
        //注册成功
        res.send({ code: 200, msg: 'reg sucess' });
    });

});

//用户登录
r.post('/login', (req, res) => {
    //获取post请求的数据
    let obj = req.body;
    console.log(obj);
    //验证数据是否为空
    if (!obj.uname) {
        res.send({ code: 401, msg: 'uname required' });
        return;
    }
    if (!obj.upwd) {
        res.send({ code: 402, msg: 'upwd required' });
        return;
    }
    //执行SQL命令，到数据库中查询是否有用户名和密码同时匹配
    pool.query('SELECT * FROM xz_user WHERE uname=?AND upwd=?', [obj.uname, obj.upwd], (err, result) => {
        if (err) throw err;
        //若返回的结果是一个空数组,即长度为0，则是登录失败
        console.log(result);
        if (result.length === 0) {
            res.send({ code: 301, msg: 'login err' });
        } else {
            res.send({ code: 200, msg: 'login sucess' });
        }
    });
    //res.send('登录成功');
});



module.exports = r;