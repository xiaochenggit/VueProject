let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');

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

/* GET goods page. */
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

module.exports = router;
