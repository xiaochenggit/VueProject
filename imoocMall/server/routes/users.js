var express = require('express');
var router = express.Router();
let User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 用户登录
router.post('/login', (req, res, next) => {
  let params = {
    ...req.body
  };
  User.findOne(params, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message
      });
    } else {
      if (user) {
        // 登录成功写入 cookie name val { 地址 时间}
        var userCookie = {
          userId: user.userId,
          userName: user.userName
        }
        res.cookie('dumall', JSON.stringify(userCookie), {
          path: '/',
          maxAge: 1000 * 60 * 60 * 1
        })
        res.json({
          status: 200,
          msg: '登录成功!',
          result: {
            userName: user.userName,
            userId: user.userId
          }
        });
      } else {
        res.json({
          status: 0,
          msg: '账号或密码不正确！'
        })
      }
    }
  })
});

// 用户登出
router.post('/logout', (req, res, next) => {
  res.cookie('dumall', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: 200,
    msg: '用户登出成功！'
  })
});

// 验证是否登录
router.get('/cheklogin', (req, res, next) => {
  if (req.cookies.dumall) {
    res.json({
      status: 200,
      msg: '已登录!',
      result: req.cookies.dumall
    })
  } else {
    res.json({
      status: 400,
      msg: '未登录!'
    })
  }
});
module.exports = router;
