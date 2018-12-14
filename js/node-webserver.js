const http = require('http');
const fs   = require('fs');
const path = require('path');
const port  = 3000;

const getType = (url) => {
  const extname = path.extname(url);
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  };
  return ( extname in types )? types[extname] : "text/plain";
};

const server = http.createServer((req, res) => {
  const url = path.relative('/', req.url);

  console.log(url, fs.existsSync(url));
  if( req.url === '/' || url === 'index.html' ) {
    // HTTPヘッダを出力
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // レスポンスの中身を出力
    res.end('Hello World\n');
  } else if( fs.existsSync(url) ) {
      fs.readFile(url, (err, data) => {
        if(!err) {
          res.writeHead(200, {'Content-Type': getType(url)});
          res.end(data);
        } else {
          res.statusCode = 500;
          res.end();
        }
      });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 file not found!\n');
  }
}).listen(port);

console.log('Server running at http://localhost:3000/');
