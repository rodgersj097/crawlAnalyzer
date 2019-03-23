const express = require('express'); 
const router = express.Router(); 
const db = require('../config/DBConnect')
const Link = require('../model/link')
const Sequelize = require('sequelize')
const Op = Sequelize.Op; 
//Get link list
router.get('/', (req,res) =>
 Link.findAll()
    .then(links => 
        res.render('links', {
            links
        }) )
    .catch(err => console.log(err))
 )


//Add a link 
router.post('/add', (req, res) =>{
    const data = { 
        type: 'HREF',
        source: "https://stg-www.worldvision.ca/privacy-and-security",
        destination: "https://my.worldvision.ca/home/index",
        size: "0",
        altText:"",
        anchor: "My World Vision",
        statusCode:"404",
        status:"Not Found",
        follow: "true"
    }

    let{type, source,destination,size,altText,anchor,statusCode,status,folow} = data

    //Ibsert into tble=[]
    Link.create({ 
        type, 
        source,
        destination, 
        size,
        altText,
        anchor, 
        statusCode,
        status
      
       
    })
    .then(link => res.redirect('/links'))
    .catch(err => console.log(err))
 
} )

//search for links 
router.get('/search', (req,res) => { 
    let {term} = req.query; 
    //make lowercase 
    term = term.toLowerCase(); 

    Link.findAll({ where: {statusCode : {[Op.like] : '%' + term + '%' } } }  )
    .then(links => res.render('links', {links}))
    .catch(err => console.log(err))


});

module.exports = router; 