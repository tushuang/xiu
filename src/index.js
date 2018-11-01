//先加载配置文件

require(["js/conf/config.js"],function(){
    require(["jquery","template","ajaxMapping","cookie","common","carousel"],function($,template,ajaxMapping,cookie,common){
       $(function(){
        $(".carousel-content").carousel({
            carousel : ".carousel",//轮播图容器
            indexContainer : ".img-index",//下标容器
            //prev : ".carousel-prev",//左按钮
            //next : ".carousel-next",//右按钮
            timing : 3000,//自动播放间隔
            animateTime : 700,//动画时间
            autoPlay : true,//是否自动播放 true/false
            direction : "left",//滚动方向 right/left
        });
        common.input();
        common.onload();
        //shortcut鼠标over时animation 改变span的margin-left
        $(".shortcut").on("mouseover","span",function(){
            //直接写this 是原生js
            $(this).animate({marginLeft:0},200);

            $(this).on("mouseout",function(){
                $(this).animate({marginLeft:20},200);
            })
        })
        //模板index
        $(".wrap").load("http://localhost:9000/pages/templates/index.html",function(){  //路径是temp模板
            $.ajax({
                type : "get",
                url : "http://localhost:9000/JSON/index.json",
                success : function(data){
                    var text = template("tempImg",{
                        list:data
                    });
                    $(".wrap").html( $(".wrap").html()+text );
                }
            })
        }) 
        //模板index2
        $(".commend-wrap").load("http://localhost:9000/pages/templates/index.html",function(){
            $.ajax({
                type:"get",
                url:"http://localhost:9000/JSON/index2.json",
                success : function(data){
                    var text = template("tempImg2",{
                        list:data
                    });
                    $(".commend-wrap").html( $(".commend-wrap").html()+text );

                     console.log( $("div.changeOpacity"));
                    $("div.changeOpacity").on("mouseover",function(){
                        console.log("123");
                        $(this).stop().animate({
                        opacity:0.3
                        },100);
                        $(this).on("mouseout",function(){
                            $(this).stop().animate({
                                opacity:0
                            },100);
                        })
                    })
                }
            }) 
        })
        console.log($("ul.left li:first a").html());
        $(".find-goods-content").load("http://localhost:9000/pages/templates/index.html",function(){
            $.ajax({
                type:"get",
                jsonpCallback:"goodlistCB",
                url : ajaxMapping.goodsList,
                dataType:"jsonp",
                success : function(data){
                    var data = data[0];
                    var goodsdetail = new Map();
                    var i=0;
                   for( item in data){
                        goodsdetail.set(i,{
                            id : data[item].goodsId,
                            name : data[item].brandEnName,
                            price : data[item].finalPrice,
                            detail : data[item].goodsName,
                            url : data[item].goodsImg
                        });
                        i++;
                    }
                    var text = template("goods",{
                        list:goodsdetail
                    })
                    $(".find-goods-content").html( $(".find-goods-content").html()+text );
                    var goodsList = $(".find-goods-content > li").get();
                    goodsList.forEach(function(item,index){
                        if((index+1)%4 == 0 ) item.className = "last";
                    })
                    if(cookie.getCookie("client")){
                        var cookieStr = cookie.getCookie("client");
                        var cookieObj = JSON.parse(cookieStr);
                        var name =  cookieObj.clientName;
                        $("ul.left li:first a").html("<em class='enter'>你好，"+ name +"</em><em class='quit'>【退出】</em>");
                        $("ul.left li:first a").on("click",function(e){
                           e.preventDefault?e.preventDefault():e.returnValue=false;
                        })
                        $(".enter").on("click",function(){
                            window.location.href = "";
                        })
                        $(".quit").on("click",function(){
                            cookie.setCookie("client","","/");
                            window.location.href = "http://localhost:9000";
                        })
                    }
                }
            })
            
        })
        function goodlistCB(data){
        }  
    });
    })  
})  