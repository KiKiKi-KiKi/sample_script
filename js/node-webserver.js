const http = require('http');

http.createServer((req, res) => {

    // HTTPヘッダを出力
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // レスポンスの中身を出力
    res.end('Hello World\n');

}).listen(3000);

console.log('Server running at http://localhost:3000/');
