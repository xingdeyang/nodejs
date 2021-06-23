const http      = require('http')
const puppeteer = require('puppeteer')

http.createServer(async function (req, res) {
    const browserFetcher = puppeteer.createBrowserFetcher()
    const revisionInfo = await browserFetcher.download('884014')
    const browser = await puppeteer.launch({
        headless: true,
        // root用户运行
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // connect browser超时
        executablePath: revisionInfo.executablePath
    })
    const page = await browser.newPage()
    await page.setContent('<p style="color: red;">hello world</p>')
    const content = await page.content()
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(content)
    await page.close()
}).listen(3003)
