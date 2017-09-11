let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

// 创建一个 HTTP 代理服务器
const server = http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    pathname = pathname.substring(1);
    fs.readFile(pathname, (err,data) => {
        if (err) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data.toString());
        }
        res.end();
    });
    // const srvUrl = url.parse(`http://${req.url}`);
});

server.listen(3000, () => {
    console.log('请在3000 端口打开服务！');
});