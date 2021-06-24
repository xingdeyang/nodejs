const http                  = require('http')
const puppeteer             = require('puppeteer')
let browser                 = null

async function initBrowser () {
    try {
        browser = await puppeteer.launch({
            headless: true,
            // root用户运行
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        })
    } catch (e) {
        console.log('puppeteer启动webview异常')
        console.log(e)
    }
}
initBrowser()

http.createServer(async function (req, res) {
    console.log('新请求进入')
    let page = null
    try {
        page = await browser.newPage()
        await page.setContent('<p style="color: red;">hello world</p>')
        const content = await page.content()
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(content)
    } catch (e) {
        console.log(e)
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end('timeout, try later')
    } finally {
        page && page.close()
    }
}).listen(3003)
