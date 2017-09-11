const https = require('https');
const util = require('util');
const href = 'https://www.imooc.com/index/getstarlist';

https.get(href, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        let result = JSON.parse(data);
        console.log('result' + util.inspect(result));
    });
});