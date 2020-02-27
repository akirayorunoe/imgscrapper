
const puppeteer = require('puppeteer');
async function scrapeLink(url){

        const browser =await puppeteer.launch()
        const page=await browser.newPage()
    await page.goto(url)
    await page.waitFor(10000)// chờ 1 khoảng thời gian để page load
    await page.waitForSelector('img',{//Chờ selector xuất hiện
        visible:true
    }).catch((err)=>{console.log('error slector',err)})
    //Execute code in DOM
    const data =await page.evaluate(()=>{
        const images=document.querySelectorAll('img')
        const urls=Array.from(images).map(v=>v.src)
        return urls;
    })
    //console.log('data:',data)
    return data;
}
    


module.exports=scrapeLink;
