const container= document.querySelector('.container');
const table=document.createElement('table');
const linkInput=document.querySelector('.link-input')
const loading=true;

function doneLoading()
{
    return !loading;
}

function createLoading(loading)
{  
    const h2=document.querySelector('h2')
    if(h2) return;
    if(loading===false) {
        h2.remove();
        return;
    }
    const loadingText = newEl('h2',{innerText:'Now loading...'});
    container.appendChild(loadingText);
    return loadingText;
}

async function loadLinks(){
    debugger;
    const res=await fetch('http://localhost:3000/links').then(x=>console.log('2'));
    const links=await res.json();
    await links.forEach(link => {
        const textLink = newEl('a',{href:link,innerText:link});
       container.append(textLink);
        })
}

function newEl(type,attrs={}){
    const el=document.createElement(type);
    for(let attr in attrs){
        const value=attrs[attr];
        if(attr=='innerText') {el.innerText=value}//nếu el có con là text
        else el.setAttribute(attr,value);//thuộc tính, giá trị
    }
    return el;
}


linkInput.addEventListener("keydown", function(event) {
    if(event.which===13)
    submitLink();
})

async function submitLink()
{
    const h2=document.querySelector('h2')
    if(h2) return;
    const link=linkInput.value;
    fetch('http://localhost:3000/links',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({link})
    })
    await loadLinks();
}

function download()
{ 
const download='download'
fetch('http://localhost:3000/links',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({download})
    })
}

function sDownload()
{
    const getLink=document.querySelectorAll('a')
}

