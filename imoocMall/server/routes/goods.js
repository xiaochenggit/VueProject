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
    Goods.find({}, (err, docs) => {
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
    });
});

module.exports = router;
