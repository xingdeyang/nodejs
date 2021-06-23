// puppeteer 基于10.0.0, centos 7下运行正常
const http                  = require('http')
const puppeteer             = require('puppeteer')
const browserFetcher        = puppeteer.createBrowserFetcher()
let revisionInfo            = null

// puppeteer v6.0.0 是843427
browserFetcher.download('884014').then(data => {
    revisionInfo = data
})

http.createServer(async function (req, res) {
    let browser = null
    try {
        browser = await puppeteer.launch({
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
    } catch (e) {
        console.error(e)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('timeout, try later')
    } finally {
        browser && browser.close()
    }
}).listen(3003)
