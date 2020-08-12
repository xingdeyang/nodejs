const http = require('http')
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('helloj enkins')
}).listen(3003)