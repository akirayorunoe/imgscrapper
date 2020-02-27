const fs=require('fs')
const Path=require('path')
const axios =require('axios')

async function download(link){
    const url=link;
    const path=Path.resolve(__dirname,'files',`${link.split('/').pop()}`)
    const response=await axios({
        method:'GET',
        url:url,
        responseType:'stream'
    })
    response.data.pipe(fs.createWriteStream(path))
    return new Promise((resolve,reject)=>{
        response.data.on('end',()=>{
            resolve() 
        })
        response.data.on('error',(err)=>{
            reject(err)
        })
    })

}

module.exports=download;