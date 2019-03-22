const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: ''

}); 

con.connect(function(err){ 
    if(err) throw err; 
    console.log("Connected to Database")
    var sql = "Insert into node_js.links VALUES (Type, Source, Destination, Size , AltText, Anchor, StatusCode,Status, Follow)"
        
})