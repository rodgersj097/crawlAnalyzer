const express = require('express'); 
const router = express.Router(); 
const db = require('../config/DBConnect')
const Link = require('../model/link')
const Sequelize = require('sequelize')
const Op = Sequelize.Op; 
const {spawn} = require('child_process')
//Get link list
router.get('/', (req,res) =>
 Link.findAll()
    .then(links => 
        res.render('links', {
            links
        }) )
    .catch(err => console.log(err))
 )

router.get('/check', (req,res) => {
   let {destination} = req.query 
   var bat = require.resolve('../results/link-crawl.bat')
   var config = 'C:/Users/rodgersja/Documents/SEO Spider Config.seospiderconfig'
   var ls = spawn(bat, ['--config', config], ['--crawl', destination] )

   ls.stdio.concat('data', function(data){
      console.log('stdout' + data)
   })
      ls.stderr.on('data', function(dta){
         console.log('stdout', + data)
      })
   ls.on('exit', function(code){
      console.log('Child Process exited with code ' + code)
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

module.exports = router; 