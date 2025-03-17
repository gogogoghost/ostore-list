const AdmZip = require("adm-zip");
const fs=require('fs')

fs.mkdirSync("output",{
    recursive:true
})


const filePath=process.argv[2]

const zip = new AdmZip(filePath);
const manifest=JSON.parse(zip.getEntry("manifest.webmanifest").getData().toString())

const id=manifest.id
const name=manifest.name
const desc=manifest.description
const version=manifest.b2g_features.version

const imgInfo=manifest.icons[0]
const imgType=imgInfo.type.split('/')[1]
const imgSize=imgInfo.sizes.split('x')[0]
let imgSrc=imgInfo.src
if(imgSrc.startsWith('/')){
    imgSrc=imgSrc.substring(1)
}
const imgData=zip.getEntry(imgSrc).getData()
const imgOutputName=imgSize+"."+imgType
fs.writeFileSync("output/"+imgOutputName,imgData)

const outputZipName=id+"_"+version+".zip"
fs.copyFileSync(filePath,"output/"+outputZipName)

console.log(id)
console.log(name)
console.log(desc)
console.log(imgOutputName)
console.log("app")
console.log(version)