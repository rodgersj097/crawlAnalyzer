const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const db = require('./config/DBConnect')
const fs = require('fs')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
//const csv = require('./csvParser')
//handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',

}))
app.set('view engine', 'handlebars')

var hbs = require("handlebars")
//this method strips the "" in the destination varible in the ajax request on check function 
hbs.registerHelper('fix', function(context) {
    
    return JSON.stringify(context).replace(/"/g, ' ')

});

const PORT = process.env.PORT || 8090; 
server.listen(PORT, console.log(`Server started on port ${PORT}`))





//set public 
app.use(express.static(path.join(__dirname,"/public/" )))
//index route 
app.get('/', (req,res) => res.render('index', {layout: 'landing'}))

//test DB 
db.authenticate()
    .then(() => console.log('Database connected .. '))
    .catch(err => console.log('Error' + err))


app.get('/', (req,res)  => res.send('INDEX'))

app.use(function(req,res,next){
    req.io = io ; 
    next();
})


//Link Routes
app.use('/links', require('./routes/links'))


