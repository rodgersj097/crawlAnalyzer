require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});

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
})