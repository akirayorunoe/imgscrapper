const express = require('express')
const app = express()
const port = 3000
const download=require('./axs')
const scrapper=require('./scrapper')

const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin",'*')//disable security on local
    res.header("Access-Control-Allow-Headers",'Content-Type')
    next()
});
const links=[]
app.get('/links', (req, res) => 
{
    console.log('connected')
})

app.post('/links', (req, res) => {
console.log(req.body.link)
if(req.body.download) {
    links.forEach((i,index) => {
        download(i,index)
    });
    res.send('download success')
    return;
}
scrapper(req.body.link).then((data)=>{
    for(let i of data)
    {
        links.push(i)
    }
    res.send(links)
    console.log('done')
})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))