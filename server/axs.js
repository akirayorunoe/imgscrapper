const fs=require('fs')
const Path=require('path')
const axios =require('axios')

async function download(link,index){
    const url=link;
    let type='';
    // const reg=/\?(.*)/
    // if(link.includes('/')){link.split('/').pop()}
    // if(link.match(reg)){//match all after ?
    // link=link.replace(reg,'')
    // }
    link.includes('jpg')?type='.jpg':type='.png'
    const path=Path.resolve(__dirname,'files',`0${index}${type}`)
    const response=await axios({
        method:'GET',
        url:url,
        responseType:'stream'
    }).catch(err=>console.log(err))
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