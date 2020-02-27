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
    createLoading();
    const res=await fetch('http://localhost:3000/links')
    const links=await res.json();
    await links.forEach(link => {
        const tr=document.createElement('tr');
        const td1=document.createElement('td');
        const td2=document.createElement('td');
        const selection = newEl('input',{type:'checkbox',onclick:"onCheck()"});
        const textLink = newEl('a',{href:link,innerText:link});
        td1.appendChild(selection);
        td2.appendChild(textLink);
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
        container.appendChild(table);
        doneLoading();
        createLoading()
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

function submitLink()
{
    const h2=document.querySelector('h2')
    if(h2) return;
    const link=linkInput.value;
    fetch('http://localhost:3000/links',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({link})
    })
    loadLinks();
}

function download()
{ 
// const getLink=document.querySelectorAll('a')
// getLink.forEach(link=>{
//     let filename = link.href.split('/').pop();
//     link.setAttribute('download',filename)
//     link.addEventListener('click',e=>{e.preventDefault()
//     });
//     console.log(link.download,link.href,'download')
//     link.click();
// })
}

function sDownload()
{
    const getLink=document.querySelectorAll('a')
}

