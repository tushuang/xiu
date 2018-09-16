//先加载配置文件

require(["js/conf/config.js"],function(){
    require(["jquery","optimize","template","ajaxMapping","bootstrap","carousel"],function($,optimize,template,ajaxMapping){
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

        //搜索框
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
                }
            })
            
        })
        function goodlistCB(data){
        }
    });
    })  
})  