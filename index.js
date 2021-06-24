const http                  = require('http')
const puppeteer             = require('puppeteer')
let browser                 = null
let stream                  = require('stream')
const browserFetcher        = puppeteer.createBrowserFetcher()
let revisionInfo            = null

async function initBrowser () {
    try {
        browser = await puppeteer.launch({
            headless: true,
            // root用户运行设置，内存限制取消
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
            executablePath: revisionInfo.executablePath
        })
    } catch (e) {
        console.log('puppeteer启动webview异常')
        console.log(e)
    }
}

// puppeteer v6.0.0 是843427
browserFetcher.download('843427').then(data => {
    revisionInfo = data
    initBrowser()
})

http.createServer(async function (req, res) {
    console.log('新请求进入')
    let page = null
    try {
        page = await browser.newPage()
        await page.goto('https://www.qq.com/')
        const pdfBuffer = await page.pdf()
        let readStream = new stream.PassThrough()
        readStream.end(pdfBuffer)
        readStream.pipe(res)
    } catch (e) {
        console.log(e)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('timeout, try later')
    } finally {
        page && page.close()
    }
}).listen(3003)
