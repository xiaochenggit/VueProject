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

// 购物车列表
router.get('/cartlist', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  User.findOne(cookieUser, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message 
      })
    } else {
      if (user) {
        res.json({
          status: 200,
          msg: '获取购物车列表成功!',
          result: user.cartList
        })
      } else {
        res.json({
          status: 400,
          msg: '请重新登录!'
        })
      }
    }
  })
});

// 删除购物车商品
router.post('/cart/delete', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  let productId = req.body.productId || '';
  User.update(cookieUser, {
    $pull: {
      cartList: {
        productId: productId
      }
    }
  }, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message
      });
    } else {
      res.json({
        status: 200,
        msg: '删除商品成功!'
      });
    }
  })
});
module.exports = router;
