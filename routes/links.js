const express = require('express'); 
const router = express.Router(); 
const db = require('../config/DBConnect')
const Link = require('../model/link')
const Sequelize = require('sequelize')
const Op = Sequelize.Op; 
const {spawn} = require('child_process')
var request = require('request')
const formidable = require('formidable')
const fs = require('fs')
const csvParser = require('../csvParser')
//Get link list
router.get('/', (req,res) =>{
var totalRows; 
Link.count()
   .then(count => totalRows = count)
      

 Link.findAll()
    .then(links => 
        res.render('links', {
            links, totalRows
        }) )
    .catch(err => console.log(err))
      })

router.get('/check', (req,res) => {
  let { id, destination, index} = req.query
 request(destination)
   .on('response', function(response){
      if(response.statusCode === 200){
        req.io.emit('success', {data : `${destination} hasbeen fixed! Current Status: ${response.statusCode} `, itemIndex: index} )
         Link.destroy({
            where: {
               id: id
            }
         })
         res.end()
      }
      if(response.statusCode === 301){
         req.io.emit('success301', {message : `${destination} has been redirected! Current status: ${response.statusCode}. `, itemIndex: index}) 
         console.log("Link fixed")
         Link.destroy({
            where: {
               id: id
            }
         })
         res.end()
       }  
       else{
         req.io.emit('error', {message : `${destination} has not been fixed. `, itemIndex: index}) 
         console.log("error not fixed")
       }
   
      })
   .on('error', err => {
      console.log(err)
      res.end()
   })
   .on('finish', function(response){
      console.log("done")
   })
   
})

//search for links 
router.get('/search', (req,res) => { 
    let {term} = req.query; 
    //make lowercase 
    term = term.toLowerCase(); 
    Link.findAll({ 
        where: {
            [Op.or]: [
                {
                    type : {[Op.like] : '%' + term + '%' }
                 },
                 {
                    source : {[Op.like] : '%' + term + '%' }   
                 },
                 {
                    destination : {[Op.like] : '%' + term + '%' }   
                 },
                 {
                    size : {[Op.like] : '%' + term + '%' }   
                 },
                 {
                    altText : {[Op.like] : '%' + term + '%' }   
                 },
                 {
                    anchor : {[Op.like] : '%' + term + '%' }   
                 },
                 {
                    statusCode : {[Op.like] : '%' + term + '%' }   
                 },
                 {
                    status : {[Op.like] : '%' + term + '%' }   
                 },
                 {
                    follow : {[Op.like] : '%' + term + '%' }   
                 }
                ]
        
                } } )  
    .then(links => res.render('links', {links}))
    .catch(err => console.log(err))


});

//File Uploader
router.get('/upload',(req,res)=>{
   res.render('form')
})

//take in filr 
router.post('/fileUpload', (req,res)=>{
   var form = new formidable.IncomingForm().parse(req)
      .on('fileBegin', (name, file)=>{
         file.path =  'C:/Users/rodgersja/Desktop/crawlAnalyzer/results/' + file.name 
         fileName =  'C:/Users/rodgersja/Desktop/crawlAnalyzer/results/' + file.name 
      })

      .on('field', (name, field) => {
         console.log('Field', name, field)
      })
      .on('error', (err)=>{
         console.log(err); 
         req.io.emit('fileUploadError', {
            data: `File upload error`
         })
      })
      .on('end', (name, file) => { 
         req.io.emit('fileuploaded', {
            data: `${file} has been uploaded`
         })
         

         res.setTimeout(2000, ()=>{
         res.redirect('/links')
      })
      })
})
 


module.exports = router; 
