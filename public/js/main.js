require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});

var ul = document.querySelector('ul')
const button = ul.querySelector('.checkButton');
button.addEventListener('click', function(){
    Links.checkLinks(ul.querySelector('#destination').value())


})