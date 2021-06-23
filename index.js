const http      = require('http')
const puppeteer = require('puppeteer')

http.createServer(async function (req, res) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.setContent('<p style="color: red;">hello world</p>')
    const content = await page.content()
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(content)
    await page.close()
}).listen(3003)
