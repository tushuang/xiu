
require(["http://localhost:9000/js/conf/config.js"],function(){
    require(["jquery","optimize","template","ajaxMapping","paging","bootstrap","carousel"],function($,optimize,template,ajaxMapping,paging){
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
                $("#input-text").get(0).value = $(this).html();
                $(".droplist").css({display:"none"});
            });

            $(".tcdPageCode").createPage({
                pageCount:10,
                current:1,
                backFn:function(p){
                }
            });

            var map = new Map();
            $(".goodslistwrap").load("http://localhost:9000/pages/templates/goodList.html",function(){
                $.ajax({
                    type:"get",
                    dataType: "jsonp",
                    jsonpCallback: "cb",
                    url: ajaxMapping.goodsList2, 
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
                                url : data[item].goodsImg
                            });
                            i++;
                        }
                    
                        var sizeMap = new Map();
                        $.ajax({
                            type:"get",
                            dataType: "jsonp",
                            jsonpcallback: "cb",
                            url: ajaxMapping.goodsList2Size,   //尺码
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
                            var disMap = new Map();
                            $.ajax({
                                    type:"get",
                                    dataType: "jsonp",
                                    jsonpCallback: "cb",
                                    url: ajaxMapping.goodsList2Dis,  //折扣
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
                                        console.log(sizeMap.get(0).size.length);
                                        console.log(sizeMap.get(0).size[0].s);
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
                            }
                        })
                    }
                })
                

            


            })
            function cb(){

            }
           
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
                        zIndex:"9999"
                    })
                    $(".banner>.nav").css({
                        position:"relative",
                        opacity:1,
                        zIndex:"9999"
                    })
                    $(".banner>.nav").stop().animate({
                        top:"0",
                        left:0
                    },100)
                }
            })


        })
        
        //加载模板
       
        //鼠标划入事件
       
    })
})