let user = require('./User');
console.log(user.sayHello());

let http = require('http');
let url = require('url');
let util = require('util');

// 创建一个 HTTP 代理服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const srvUrl = url.parse(`http://${req.url}`);
    res.end('okay ' + util.inspect(srvUrl));
});

server.listen(3000, () => {
    console.log('请在3000 端口打开服务！');
});