const csv = require('csv-parser')
const fs = require('fs')
const Link = require('./model/link')
const cron  = require('node-cron')
var fileNames = ['no_response_inlinks.csv']
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
var allFileData = [] 


//Parse CSV and then create each row
function doCSVParse(filePath){ 
var rowData = []
fs.createReadStream(filePath)
    .pipe(csv({ separator: ','}))
    .on('data', (row) => {
         rowData.push(row)
        CreateLink(row)
    })
    .on('end',() => {
        console.log('CSV is readey')
        allFileData.push(rowData)
        rowData = []
        
    });
} 

function CreateLink(row){
const data = { 
    type: row[Object.keys(row)[0]],
    source: row[Object.keys(row)[1]],
    destination: row[Object.keys(row)[2]] ,
    size: row[Object.keys(row)[3]],
    altText:row[Object.keys(row)[4]],
    anchor: row[Object.keys(row)[5]],
    statusCode: row[Object.keys(row)[6]],
    status: row[Object.keys(row)[7]],
    follow: row[Object.keys(row)[8]]
}

let{type,source,destination,size,altText,anchor,statusCode,status,follow} = data
//Insert into tble=[]
Link.findOrCreate({ 
    where: {
    type, 
    source,
    destination, 
    size,
    altText,
    anchor, 
    statusCode,
    status,
    follow
    } 
})
.then(console.log('link created'))
.catch(err => console.log(err))

Link.destroy({
    where : 
    { 
        destination: {[Op.like]: '%bbb%'}
    }
})

};

//start csv Parse 
cron.schedule("* * * * 1", function(){
fileNames.forEach(element => {
    doCSVParse(element) 
 });

});






