
require(["http://localhost:9000/js/conf/config.js"],function(){
    require(["jquery","optimize","template","ajaxMapping","paging","common","carousel"],function($,optimize,template,ajaxMapping,paging,common){
        $(function(){
            common.input();
            common.onload();
            loadPage1();
            $(".tcdPageCode").createPage({
                pageCount:2,
                current:1,
                backFn:function(p){
                }
            });
            var map = new Map();
            var sizeMap = new Map();
            var disMap = new Map();

            function loadPage1(){
                $(".goodslistwrap").load("http://localhost:9000/pages/templates/goodList.html",function(){
                    $.ajax({
                        dataType: "jsonp",
                        jsonp: "jsoncallback",
                        url: ajaxMapping.goodsList2, 
                        jsonpCallback: "cbk1111"
                    }).then(function(){
                        return $.ajax({    // 返回一个promise对象  jquery发ajax请求 封装的ajax函数 本来就是一个promise对象
                            dataType: "json",
                            url: ajaxMapping.goodsList2Size,   //尺码
                            success : function(data){
                                window.cbk2222(data);
                            }
                        })
                    }).then(function(){
                        $.ajax({
                            dataType: "jsonp",
                            jsonp: "jsoncallback",
                            url: ajaxMapping.goodsList2Dis,  //折扣
                            jsonpCallback: "cbk3333"
                        }) 
                    })
                })
            }
            function loadPage2(){
                $(".goodslistwrap").load("http://localhost:9000/pages/templates/goodList.html",function(){
                    $.ajax({
                        dataType: "jsonp",
                        jsonp:"jsoncallback",
                        url: "http://localhost:9000/proxy/my.xiu.com/v3/activityExt/goodsList?&sns=29000071%2C2A000309%2C10615928%2C61044150%2C10618033%2C61044481%2CG1000252%2C61044061%2C11789837%2C10618029%2C11531096%2C21019087%2C10349867%2C24020227%2C11462261%2C61045026%2C61045027%2C13090763%2C13090769%2C13090772%2C11731387%2C11669781%2C10373761%2C10511101%2C61044620%2C81113872%2C10463378%2C10571533%2C81113866%2C74246864&_=1537323955453", 
                        success: function(data){
                            var data = data[0];
                            var i = 0;
                            for(var item in data){
                                map.set(i,{
                                    id : data[item].goodsId,
                                    name : data[item].brandEnName,
                                    price : data[item].finalPrice,
                                    discountPrice : data[item].xiuPrice,
                                    detail : data[item].goodsName,
                                    url : data[item].goodsImg,
                                    goodsSn : data[item].goodsSn
                                });
                                i++;
                            }                        
                            $.ajax({
                                dataType: "jsonp",
                                jsonp:"callback",
                                url:"http://localhost:9000/proxy/search.xiu.com/skulist.html?ids=52711271%2C52709331%2C54253779%2C52864565%2C54809802%2C53538658%2C52317001%2C52857874%2C56964274%2C54809677%2C40671821%2C57252323%2C38794593%2C52967100%2C35721783%2C57027915%2C57027714%2C55497626%2C55690512%2C55690515%2C49677989%2C46581463%2C40071053%2C46245889%2C54149002%2C41090229%2C43710825%2C49778401%2C41090201%2C43036602%2C40071167%2C51875752&_=1537323955447",   //尺码
                                success: function(data){                           
                                    var data = data[0];
                                    for(var [key,val] of map){
                                        for(var item in data){                                    
                                            if(item == val.id){
                                                sizeMap.set(key,{
                                                    size:data[item]
                                                });
                                            }
                                        }
                                    } 
                                $.ajax({
                                        dataType: "jsonp",
                                        jsonp:"jsoncallback",
                                        url: "http://localhost:9000/proxy/my.xiu.com/v3/GoodsDetailFixCmd/list?sns=29000071%2C2A000309%2C10615928%2C61044150%2C10618033%2C61044481%2CG1000252%2C61044061%2C11789837%2C10618029%2C11531096%2C21019087%2C10349867%2C24020227%2C11462261%2C61045026%2C61045027%2C13090763%2C13090769%2C13090772%2C11731387%2C11669781%2C10373761%2C10511101%2C61044620%2C81113872%2C10463378%2C10571533%2C81113866%2C74246864%2C10373754%2C10596515&_=1537323955454",  //折扣
                                        success: function(data){
                                            var data = data[0];
                                            for(var [key,val] of map){
                                                for(var item in data){
                                                    if(data[item].productId == val.id){
                                                        disMap.set(key,{
                                                            discount:data[item]
                                                        });
                                                    }
                                                }
                                            } 
                                            var text = template("goodslist",{
                                                list:map,
                                                listSize:sizeMap,
                                                listDis:disMap
                                            });
                                            $(".goodslistwrap").html( $(".goodslistwrap").html() + text );                   
                                            pageEvent();
                                        }
                                    }) 
                                }
                            })
                        }
                    })
                })
            }  
            $(".tcdPageCode").on("click","a",function(e){
                console.log(e.target,this);
                if(e.target.className == "prevPage"){
                    loadPage1();
                    console.log("加载前一页");
                }
                if(e.target.className == "nextPage"){
                    loadPage2();
                }
            })  
            //滚轮事件 
            $(window).on("scroll",function(){
                if( $(window).scrollTop() > 300 ){
                    $(".header-bottom").css({
                        position:"fixed",
                        background: "#333333",
                        opacity:0.9,
                        zIndex:"9999"
                    })
                    $(".header-bottom").stop().animate({
                        top:0,
                        left:0
                    },100);
                    $(".banner>.nav").css({
                        position:"fixed",
                        opacity:0.9,
                        zIndex:"9999"
                    })
                    $(".banner>.nav").stop().animate({
                        top:"43px",
                        left:0
                    },100)
                }else{
                    $(".header-bottom").css({
                        position:"relative",
                        background: "#333333",
                        margin:0,
                        zIndex:"1"
                    })
                    $(".banner>.nav").css({
                        position:"relative",
                        opacity:1,
                        zIndex:"1"
                    })
                    $(".banner>.nav").stop().animate({
                        top:"0",
                        left:0
                    },100)
                }
            })

            window.cbk1111 = function(data) {
                console.log("请求成功1",data);
                var data = data[0];
                var i = 0;
                for(var item in data){
                    map.set(i,{
                        id : data[item].goodsId,
                        name : data[item].brandEnName,
                        price : data[item].finalPrice,
                        discountPrice : data[item].xiuPrice,
                        detail : data[item].goodsName,
                        url : data[item].goodsImg,
                        goodsSn : data[item].goodsSn
                    });
                    i++;
                }
            }
            window.cbk2222 = function(data) {
                console.log("请求成功2",data);                          
                var data = data[0];
                for(var [key,val] of map){
                    for(var item in data){                                    
                        if(item == val.id){
                            sizeMap.set(key,{
                                size:data[item]
                            });
                        }
                    }
                } 
            }
            window.cbk3333 = function(data) {
                console.log("请求成功3",data);
                var data = data[0];
                for(var [key,val] of map){
                    for(var item in data){
                        if(data[item].productId == val.id){
                            disMap.set(key,{
                                discount:data[item]
                            });
                        }
                    }
                } 
                var text = template("goodslist",{
                    list:map,
                    listSize:sizeMap,
                    listDis:disMap
                });
                $(".goodslistwrap").html( $(".goodslistwrap").html() + text );

                pageEvent();
            }
            
            function pageEvent(){
                $(".goodslist").on("mouseover",function(){
                    $(this).css({
                        background:"rgba(255,255,255,0.8)"
                    });
                    var sizeBox = this.children[0].children[0].children[1];
                    $(sizeBox).stop().animate({
                        bottom:0
                    },300);
                    var discountBox = this.children[0].children[0].children[2];
                    $(discountBox).stop().animate({
                        bottom:-25
                    },300)
                    $(this).on("mouseout",function(){
                        $(this).css({
                            background:"#efefef"
                        });
                        $(sizeBox).stop().animate({
                            bottom:-68
                        },300);
                        var discountBox = this.children[0].children[0].children[2];
                        $(discountBox).stop().animate({
                            bottom:0
                        },300)
                    })
                })
            }
        })
    })
})