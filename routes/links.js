const express = require('express'); 
const router = express.Router(); 
const db = require('../config/DBConnect')
const Link = require('../model/link')


router.get('/', (req,res) =>
 Link.findAll()
    .then(links => {
        console.log(links)
        res.sendStatus(200);
    } )
    .catch(err => console.log(err))
 )

module.exports = router; 