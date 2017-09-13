let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');
let User = require('../models/user');

// 连接MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/dumall');

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected success');
});

mongoose.connection.on('error', () => {
    console.log('MongoDB connected fail');
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connected disconnected');
});

/* 商品列表 */
router.get('/', (req, res, next) => {
    /**
     * {Number} page 页码 默认1
     * {Number} pageSize 每页条目 默认10
     * {Number} sort 排序方法 1 为升序 -1 为降序 默认升序
     * {String} priceSection 价格区间
     * {Object} params 查找参数
     * skip 跳过的条目 (page - 1) * pageSize
     */
    let page = parseInt(req.query.page || 1);
    let pageSize = parseInt(req.query.pageSize || 10);
    let sort = req.query.sort || 1;
    let skip = (page - 1) * pageSize;
    let priceSection = req.query.priceSection || 'All';
    var params = {};
    if (priceSection != 'All') {
        priceSection = JSON.parse(priceSection);
        // 价格区间
        params['prodcutPrice']  = {
            $gt: priceSection.startPrice,
            $lte: priceSection.endPrice
        }
    }
    // skip跳过条目 limit裁剪条目 sort 排序
    Goods.find(params).skip(skip).limit(pageSize).sort({
        'prodcutPrice': sort
    }).exec((err,docs) => {
        if(err) {
            res.json({
                status: 400,
                msg: err.message
            });
        } else {
            res.json({
                status: 200,
                msg: '获取商品成功!',
                counts: docs.length,
                list: docs
            });
        }
    })
});

// 加入到购物车
router.post('/addCart', (req, res, next) => {
    let productId = req.body.productId;
    let userId = '1';
    User.findOne({ userId }, (err, user) => {
       if (err) {
            res.json({
                status: 400,
                msg: err.message
            });
       } else {
           if (user) {
               let isUserHave = false;
               user.cartList.forEach((item) => {
                 if(item.productId == productId) {
                     isUserHave = true;
                     item.productNum ++
                     return;
                 }
               });
               user.save((err) => {
                    if (err) {
                        res.json({
                            status: 400,
                            msg: err.message
                        });
                    } else {
                        res.json({
                            status: 200,
                            msg: '添加购物车成功!'
                        });
                    }
               });
               if (!isUserHave) {
                    Goods.findOne({ productId }, (err, good) => {
                        if (err) {
                            res.json({
                                status: 400,
                                msg: err.message
                            });
                        } else {
                            if (good) {
                                var newGood = {
                                    ...good._doc,
                                    checked: true,
                                    productNum: 1
                                };
                                user.cartList.push(newGood);
                                user.save((err, user) => {
                                    if (err) {
                                        res.json({
                                            status: 400,
                                            msg: err.message
                                        });
                                    } else {
                                        res.json({
                                            status: 200,
                                            msg: '添加购物车成功!'
                                        });
                                    }
                                });
                            }
                        }
                    }); 
                }
           }
       }
    })
});

module.exports = router;
