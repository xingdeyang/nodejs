const http = require('http')
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('hellojenkins')
}).listen(3003)