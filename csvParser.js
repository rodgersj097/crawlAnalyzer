const csv = require('csv-parser')
const fs = require('fs')

var fileNames = ['no_response_inlinks.csv']
var allFileData = [] 

function doCSVParse(filePath){ 
var rowData = []
fs.createReadStream(filePath)
    .pipe(csv({ separator: '\t'}))
    .on('data', (row) => {
         rowData.push(row)
         console.log(rowData)
    })
    .on('end',() => {
        console.log('CSV is readey')
        allFileData.push(rowData)
        rowData = []
    });
} 

fileNames.forEach(element => {
   doCSVParse(element) 
});

console.log(allFileData)