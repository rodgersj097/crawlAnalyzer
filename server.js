const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./config/DBConnect')
const fs = require('fs')
const app = express() 
//const csv = require('./csvParser')
//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//set public 
app.use(express.static(path.join(__dirname, 'public' )))

    
//index route 
app.get('/', (req,res) => res.render('index', {layout: 'landing'}))

//test DB 
db.authenticate()
    .then(() => console.log('Database connected .. '))
    .catch(err => console.log('Error' + err))

const PORT = process.env.PORT || 8090; 

app.get('/', (req,res)  => res.send('INDEX'))

//Link Routes
app.use('/links', require('./routes/links'))



app.listen(PORT, console.log(`Server started on port ${PORT}`))