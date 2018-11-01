define(["jquery","cookie","optimize","template"],function($,cookie,optimize,template){
    return {
        onload : function(callback){
            cookieObj = JSON.parse( cookie.getCookie("goods")); 
            if(cookieObj){
                $(".cart-wrap").load("http://localhost:9000/pages/templates/common.html",function(){
                    var text = template("shoppingCart",{
                        list:cookieObj
                    });
                    $(".cart-wrap").html( $(".cart-wrap").html()+text);
                    allNum();
                    $(".cartDelete").on("click",function(){ 
                       $(this.parentNode).css("display","none");
                       var id = this.parentNode.className;
                       var cookieObj = JSON.parse(cookie.getCookie("goods"));
                       cookieObj.forEach(function(item,index){
                           if(item.id == id){
                               cookieObj.splice(index,index+1);
                           }
                       })
                      cookie.setCookie("goods",JSON.stringify(cookieObj),750000,"/");
                      allNum();
                    })
                    function allNum(){
                        var cookieObj = JSON.parse(cookie.getCookie("goods"));
                        var num = 0;
                        cookieObj.forEach(function(item){
                            num+=parseInt(item.count);
                        })

                        $(".leftLi a em").html(num);
                    }
                    callback?callback():"";
                })
            }
            
        },
        input : function(){
            $("#input-text").on("input",optimize.throttle(function(){  //使用函数节流 减少对服务器的请求次数
                //记录下输入框的值
                var val = this.get(0).value;
                $.ajax({
                    type:"get", 
                    //路径放回的不是一个json数据 所以不能设置格式
                    url:"http://localhost:9000/proxy/search.xiu.com/ajax/autocomplete.htm?jsoncallback=jQuery17207773954956291034_1536757373699&q="+val+"&limit=10&timestamp=1536757377890&mkt=xiu&_=1536757377890",
                    success : function(data){
                        var reg = /^\w*\(/;
                        data = data.replace(reg,"").replace(/\)$/,"");
                        data = JSON.parse(data);
                        $(".droplist").css({display:"block"});
                        $(".droplist").html("");
                        if(data == null) return;
                        for(var i=0;i<data.length;i++){
                            var oli = $("<li></li>");//创建li
                            $(oli).html(data[i].display);
                            $(oli).appendTo($(".droplist"));
                        }
                    }
                })
            },100,$("#input-text")))

            $("body,document").on("click",function(){  //绑定在body和document身上 兼容 Chrome是body生效 
                $(".droplist").css({display:"none"});
            })
            $(window).on("scroll",function(){        //滚轮移动时 消失
                $(".droplist").css({display:"none"});
            })
            $(".droplist").on("click","li",function(e){  //点击li把文字填入输入框
                console.log($(this));
                $("#input-text").get(0).value = $(this).html();
                $(".droplist").css({display:"none"});
            })
        }
    }
})