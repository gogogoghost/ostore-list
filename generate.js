const fs=require('fs')

const popularIds=fs.readFileSync("popular.txt").toString().trim().split('\n')
const src=fs.readFileSync("all.txt").toString().trim().split('\n')

const popularList=[]
const appList=[]

let i=0;
while(i<src.length){
    const data={
        id:src[i++],
        name:src[i++],
        desc:src[i++],
        icon:src[i++],
        type:src[i++],
        version:src[i++]
    }
    appList.push(data)
    if(popularIds.find((id)=>id==data.id)){
        popularList.push(data)
    }
    i++;
}

fs.mkdirSync("dist",{
    recursive:true
})
fs.writeFileSync("dist/all.json",JSON.stringify(appList))
fs.writeFileSync("dist/popular.json",JSON.stringify(popularList))