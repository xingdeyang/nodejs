const http      = require('http')
const puppeteer = require('puppeteer')

http.createServer(async function (req, res) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent('<p style="color: red;">hello world</p>')
    const content = await page.content()
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(content)
}).listen(3003)