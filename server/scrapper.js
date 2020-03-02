const puppeteer = require('puppeteer');

async function scrapeLink(url){
        const browser =await puppeteer.launch()
        const page=await browser.newPage()        
        await page.goto(url)
        await page.waitFor(5000)// chờ 1 khoảng thời gian để page load
    if(checkCafe(url)){
        await page.exposeFunction('generateLink', (url, page) => {
            const arr = url.split('/');
            arr.pop()
            const t=arr.push(page)
            return arr.join('/');
         });
         await page.exposeFunction('stringIncrease', (str) => {
            let num=Number(str);
            while(String(num).length<str.length){
            let s='0';
            num=s+num;
            };
            return String(num);
         });
        const data=await page.evaluate(async (url)=>{
            const cafeArray=[];
            const options=document.querySelectorAll('option');
            const max=options[options.length-1].innerText//lấy text số(string)
            let char=1;
               while(char<=Number(max))
                {
                    link=await window.generateLink(url, await stringIncrease(String(char),Number(max)));
                    cafeArray.push(link);
                    char++;
                }
                return cafeArray;
            },url)
            const urls=await getSrc(data);
            await browser.close();
            //console.log(urls)
            return urls;
        }
    else
    {
        const arr=[];
        await page.waitForSelector('img',{//Chờ selector xuất hiện
            visible:true
        }).catch((err)=>{console.log('error selector',err)})
        //Execute code in DOM
        const data =await page.evaluate(()=>{
        const images=document.querySelectorAll('img')
        const urls=Array.from(images).map(v=>v.src)
            return urls;
        })
        await browser.close();
        console.log(data)
        return data;
    }
}
 
function checkCafe(url){
    const arr=url.split('/');
    if(arr.includes('hentai.cafe'))
    {
        return true;
    }
    return false;
}


async function getSrc(arr)
{
    const newArr=[]
    for(i of arr)
    {
        const browser =await puppeteer.launch()
        const page=await browser.newPage()   
        await page.goto(i)
        await page.waitFor(500)// chờ 1 khoảng thời gian để page load
        await page.waitForSelector('img',{//Chờ selector xuất hiện
            visible:true
        }).catch((err)=>{console.log('error selector',err)})
        const url = await page.evaluate(()=>{
            const image=document.querySelector('img')
            return image.src;
            })
            //console.log(url)
            newArr.push(url)
        await browser.close()//
    }
    return newArr;
}
module.exports=scrapeLink;
