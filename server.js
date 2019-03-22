const express = require('express')
const app = express() 
const csv = require('csv-parse')
const fs = require('fs')
const csvParser = require('./csvParser')



app.get('/', function(req,res) {
    res.sendFile(__dirname+"/index.html")
})



app.listen(8090, function() { 
    console.log("server started on port 8090");
})