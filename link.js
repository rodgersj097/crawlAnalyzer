var bookshelf = require('bookshelf')(knex); 

var Link = bookshelf.Model.extend({
    tableName: 'links',
    hasTimeStamps: true,

    verifyPassword: function(password){
        return this.get('password') === password; 
    }
} , { 
    byEmail: function(email) { 
        return this.forge().query()
    }
}
})