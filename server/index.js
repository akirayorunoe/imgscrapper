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
    // [{
    //     link:'https://img2.gelbooru.com/samples/ed/a8/sample_eda8d74f2c7175bad8182ec7595cdbc8.jpg',     
    // },{
    //     link:'https://img2.gelbooru.com/samples/ed/a8/sample_eda8d74f2c7175bad8182ec7595cdbc8.jpg',
    //     }]
    //res.send(links)
})

app.post('/links', (req, res) => {
console.log(req.body.link)
if(req.body.download) {
    links.forEach(i => {
        download(i)
    });
    res.send('download success')
    return;
}
const linkData=scrapper(req.body.link).then((data)=>{
    for(let i of data)
    {
        links.push(i)
    }
    res.send(links)
    console.log(data,'done')
})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))