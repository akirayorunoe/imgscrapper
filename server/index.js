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


app.get('/links', (req, res) => 
{
    const links=[{
        link:'https://img2.gelbooru.com/samples/ed/a8/sample_eda8d74f2c7175bad8182ec7595cdbc8.jpg',     
    },{
        link:'https://img2.gelbooru.com/samples/ed/a8/sample_eda8d74f2c7175bad8182ec7595cdbc8.jpg',
        }]
    res.send(links)
})

app.post('/links', (req, res) => {
console.log(req.body)
//
res.send('success')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))