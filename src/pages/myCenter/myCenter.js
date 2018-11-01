require(["http://localhost:9000/js/conf/config.js"],function(){
    require(["jquery"],function($){
        $("div.left").on("click","p",function(){
            if($(this.nextElementSibling).css("display")=="block"){
                $(this.nextElementSibling).fadeOut(300);
                console.log(this);
                $(this.children[0]).css({
                    backgroundPosition :"right -11px"
                })
            }   
           else {
                $(this.nextElementSibling).fadeIn(300);
                $(this.children[0]).css({
                    backgroundPosition :"right 0"
                })
           }
        })
    })
})