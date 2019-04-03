require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});

<<<<<<< HEAD
var ul = document.querySelector('ul')
const button = ul.querySelector('.checkButton');
button.addEventListener('click', function(){
    Links.checkLinks(ul.querySelector('#destination').value())


=======
$(".btn").on('click', function(){
    console.log("button Clicked ")
    $.ajax({
        url:"/check/",
        type: "POST", 
        data: {
            id: $(this.id).val(), 
            destination: $("dest").val()
        }, 
        complete: function(){
            console.log("process complete")
        },
        success: function(data){
            $(".gig ul").attr("blink_me")
        }, 
        error: function(){
            console.log("error")
        }

})
>>>>>>> 329758922fb7aa224ef876327889c3a137e4c79b
})