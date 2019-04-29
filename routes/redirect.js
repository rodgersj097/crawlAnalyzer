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
const {worker} = require('worker_threads')

router.get('/', (req,res)=>{
    
    res.render('redirectCheck')
 })

router.get('/check', (req,res)=>{
   let {url} = req.query; 
   function addhttps(url){
      if(!/^(f|ht)tps?:\/\//i.test(url)){
         url = "https://" + url;
      }
      return url 
   }
   url = addhttps(url)

    console.log(url)
    request(url ,{followAllRedirects: true, method: 'HEAD', headers: {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.46 Safari/537.36"}}, (err, res, body)=>{
       if(err){
          console.log(err)
       }
       if(!res){
          console.log("url did not return a response")
          
       }
       if(res){
         let chain = res.request._redirect.redirects
         
       }
    }) 
       
       
})
 module.exports = router; 
 