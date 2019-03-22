const mysql = require('mysql')
var knex = require('knex')({
    client: 'mysql', 
    connection:{ 
        host: "localhost",
        user: 'root',
        password: '',
        database: 'node_js',
        charset: 'utf-8'
    }
})

knex.schema.createTable('users', function(table) { 
    table.increments(); 
    table.string('Type')
    table.string('Source')
    table.string('Destination')
    table.integer('Size')
    table.string('AltText')
    table.string('Anchor')
    table.integer('StatusCode')
    table.string('Status')
    table.string('Follow')
    table.timestamps() 
})



var bookshelf = require('bookshelf')(knex); 

var link = bookshelf.Model.extend({
    tablename: 'links'
})

