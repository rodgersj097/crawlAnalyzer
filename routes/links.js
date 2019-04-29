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

//const csvParser = require('../csvParser')
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
//This method checks that status code of links sent in by an ajax request
router.get('/check', (req,res) => {
   //u se deconstrction to get the variables fromn the query 
  let { id, destination, index} = req.query
//request the destination link f
 request(destination, {followAllRedirects: true, method: 'HEAD', headers: {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.46 Safari/537.36"}})
   .on('response', function(response){
      //if the link is redirected we grab the redirected link on it and then perform the tests on it 
      if(response.request.uri.href != undefined ){ 
         console.log(response.request.uri.href)
         newDest = response.request.uri.href
         console.log(newDest)
         request(newDest)
            .on('response', function(responseRedirect){
               if(responseRedirect.statusCode === 403){
                  req.io.emit('success', {message : `${destination} has been Redirected! `, itemIndex: index} )
                   Link.destroy({
                      where: {
                         id: id
                      }
                   })
                   res.end()
                }
              else if(responseRedirect.statusCode === 200){
                  req.io.emit('success', {message : `${destination} has been fixed! Current Status: ${responseRedirect.statusCode} `, itemIndex: index} )
                   Link.destroy({
                      where: {
                         id: id
                      }
                   })
                   res.end()
                }
              else  if(responseRedirect.statusCode === 301){
                   req.io.emit('success301', {message : `${destination} has been redirected! Current status: ${responseRedirect.statusCode}. `, itemIndex: index}) 
                   console.log("Link fixed")
                   Link.destroy({
                      where: {
                         id: id
                      }
                   })
                   res.end()
                 }  
                 else{
                   req.io.emit('error', {message : `${destination} has not been fixed. current status Code: ${responseRedirect.statusCode} `, itemIndex: index}) 
                   console.log(`${responseRedirect.url} has not been fixed. Current status Code is ${responseRedirect.statusCode}`)
                   res.end();
                 }
            })
            .on('error', err => {
               console.log(err)
               res.end()
            })
            .on('finish', function(response){
               console.log("done")
            })
      }
//This is if the link is not redirected 
      if(response.statusCode === 200){
        req.io.emit('success', {data : `${destination} hasbeen fixed! Current Status: ${response.statusCode} `, itemIndex: index} )
         Link.destroy({
            where: {
               id: id
            }
         })
         res.end()
      }
    else  if(response.statusCode === 301){
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
         res.end();
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
