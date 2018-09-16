require(["http://localhost:9000/js/conf/config.js"],function(){
    require(["jquery","optimize","template","ajaxMapping","bootstrap","carousel","magnifier"],function($,optimize,template,ajaxMapping){
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
                console.log($(this));
                $("#input-text").get(0).value = $(this).html();
                $(".droplist").css({display:"none"});
            })

            var magnifierConfig = {
                magnifier : "#magnifier1",//最外层的大容器
                width : 402,//承载容器宽
                height : 538,//承载容器高
                // moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                zoom : 2//缩放比例
            };
         
            magnifier(magnifierConfig);
        

        })
            
    })

})