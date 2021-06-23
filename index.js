const http                  = require('http')
const puppeteer             = require('puppeteer')
const browserFetcher        = puppeteer.createBrowserFetcher()
let revisionInfo            = null

browserFetcher.download('843427').then(data => {
    revisionInfo = data
})

http.createServer(async function (req, res) {
    console.log('新请求进入')
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
        console.log(e)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('timeout, try later')
    } finally {
        browser && browser.close()
    }
}).listen(3003)
