const http = require('http')
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('hello jenkins')
}).listen(3003)