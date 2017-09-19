var express = require('express');
var router = express.Router();
let User = require('../models/user');
require('../until/dateformat');

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

// 更新购物车商品
router.post('/cart/update', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;
  User.update({ ...cookieUser, "cartList.productId": productId}, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }, (err) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message
      });
    } else {
      res.json({
        status: 200,
        msg: '修改购物车商品信息成功！'
      });
    }
  })
});

// 购物车商品全选
router.post('/cart/checkall', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  let checked = req.body.checked;
  User.findOne(cookieUser, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message
      });
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checked
        })
        user.save(() => {
          res.json({
            status: 200,
            msg: checked ? '全选' : '取消全选' + '操作成功'
          })
        })
      } else {
        res.json({
          status: 400,
          msg: '没找到用户数据!'
        });
      }
    }
  })
});

// 获得地址
router.get('/address', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  User.findOne(cookieUser, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.msg
      });
    } else {
      if (user) {
        res.json({
          status: 200,
          msg: '获得用户地址信息成功！',
          result: user.addressList
        })
      } else {
        res.json({
          status: 400,
          msg: '没有获得用户信息,请重新登录！'
        })
      }
    }
  });
});

// 设置默认地址
router.post('/address/setdefault', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  let addressId = req.body.addressId || '';
  User.findOne(cookieUser, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message
      });
    } else {
      if (user) {
        user.addressList.forEach((item) => {
          if (item.addressId == addressId) {
            item.checked = true
          } else {
            item.checked = false
          }
        });
        user.save(() => {
          res.json({
            status: 200,
            msg: '设置默认地址成功!'
          })
        })
      } else {
        res.json({
          status: 400,
          msg: '没找到用户信息！请重新登录!'
        })
      }
    }
  })
});

// 删除地址
router.post('/address/delete', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  let addressId = req.body.addressId || 0;
  User.update(cookieUser, {
    $pull: {
      addressList: {
        addressId
      }
    }
  }, (err) => {
    if(err) {
      res.json({
        status: 400,
        msg: err.msg
      })
    } else {
      res.json({
        status: 200,
        msg: '删除地址成功!'
      });
    }
  });
});

// 创建订单 
router.post('/createorder', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  let addressId = req.body.addressId;
  let price = req.body.price;
  User.findOne(cookieUser, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message
      })
    } else {
      if (user) {
        let address = {};
        let goodList = [];
        user.addressList.forEach((item) => {
          if (item.addressId == addressId) {
            address = item
          }
        });
        for (var i = 0; i < user.cartList.length; i++) {
          if (user.cartList[i].checked) {
            goodList.push(user.cartList[i]);
            user.cartList.splice(i, 1);
            i --;
          }
        }
        // user.cartList.forEach((item, index) => {
        //   if (item.checked) {
        //     goodList.push(item);
        //     user.cartList.splice(index, 1)
        //   }
        // })
        let company = '7758';
        let r1 = Math.floor(Math.random() * 10);
        let r2 = Math.floor(Math.random() * 10);
        let order = {
          orderId: company + r1 + new Date().Format('yyyyMMddhhmmss') + r2,
          orderAddress: address,
          orderPrice: price,
          orderGoodList: goodList,
          createTime: new Date().Format("yyyy-M-d hh:mm:ss")
        }
        user.orderList.push(order);
        user.save((err, user) => {
          if (err) {
            res.json({
              status: 400,
              msg: err.msg
            })
          } else {
            res.json({
              status: 200,
              result: {
                orderId: order.orderId
              },
              msg: '创建订单成功!'
            })
          }
        })
      } else {
        res.json({
          status: 400,
          msg: '请重新登录!'
        })
      }
    }
  });
});

// 获得订单信息
router.get('/order', (req, res, next) => {
  let cookieUser = JSON.parse(req.cookies.dumall);
  let orderId = req.query.orderId;
  User.findOne(cookieUser, (err, user) => {
    if (err) {
      res.json({
        status: 400,
        msg: err.message
      })
    } else {
      if (user) {
         let order = '';
         user.orderList.forEach((item) => {
            if (item.orderId == orderId) {
              order = item;
            }
         });
         if (order) {
           res.json({
             status: 200,
             msg: '获取订单信息成功!',
             result: {
               orderId: order.orderId,
               price: order.orderPrice
             }
           })
         } else {
           res.json({
             status: 300,
             msg: '此订单不存在!'
           })
         }
      } else {
        res.json({
          status: 400,
          msg: '用户信息未找到, 请重新登录!'
        })
      }
    }
  })
});
module.exports = router;
