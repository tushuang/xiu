require(["http://localhost:9000/js/conf/config.js"],function(){
    require(["jquery","optimize","template","ajaxMapping","cookie","parabola","common","carousel","magnifier"],function($,optimize,template,ajaxMapping,cookie,parabola,common){
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
            iconNum();
            //滚轮事件 
            $(window).on("scroll",optimize.debounce(function(){
                if( $(window).scrollTop()>850 ){
                    $(".topNav").css({
                        position:"fixed",
                        //top:"0px",
                        zIndex:"9999"
                    })
                    $(".topNav").animate({top:0},300);
                }else{
                    $(".topNav").css({
                        position:"",
                    })
                }
            },100,window));
        
            $("li.close>a").on("click",function(e){
                //阻止a标签的默认行为
                e.preventDefault?e.preventDefault():e.returnValue=false;
                $(".right-fix").css({display:"none"});
            })

            $(".comment-warp").load("http://localhost:9000/pages/templates/detail.html",function(){
                var map = new Map();
                $.ajax({
                    jsonp:"jsoncallback",
                    dataType:"jsonp",
                    url:ajaxMapping.comment,
                    success:function(data){
                        console.log(data);
                        data = data.comBO;
                        var i=0;
                        data.forEach(function(val,i){
                            map.set(i,{
                                userName:data[i].commentUser.userNick,
                                hasBuy:data[i].commentUser.hasBought,
                                comment:data[i].comment.commentContent,
                                goodsName:data[i].commentProd.prodName,
                                goodsUrl:data[i].commentProd.prodImgUrl
                            });
                            i++;
                        })
                        var text = template("commentTemp",{
                            list:map
                        })
                        $(".comment-warp").html( $(".comment-warp").html()+text );
                    }
                })
            })

            function iconNum(){
                if( cookie.getCookie("goods") !=null ){
                var cookieObj = JSON.parse(cookie.getCookie("goods"));
                var num = 0;
                cookieObj.forEach(function(item){
                    num+=parseInt(item.count);  
                }) 
               // $(".numRed").html( parseInt($(".numRed").html())+1);
               $(".numRed").html(num);  
                } 
            }
            $(".goodsMes").load("http://localhost:9000/pages/templates/detail.html",function(){
                var map = new Map();
                var str = window.location.hash;
                var id = str.split("#")[1].split("&")[0];
                var goodSn = str.split("#")[1].split("&")[1];

                $.ajax({ 
                    jsonp:"jsoncallback",
                    dataType:'jsonp',
                   // url:ajaxMapping.goodsDetail,
                    url : `http://portal.xiu.com/business/GoodsDetailMainCmd?goodsId=${id}&goodsSn=${goodSn}&sellType=5&_=1537160302533`,
                    success:function(data){
                        var url = data[0].productSkuJson.split(",")[4].substring(11,data[0].productSkuJson.split(",")[4].length-1);
                        map.set(0,{
                            goodsName:data[0].goodsDetailBean.goods.goodsName,
                            dicount:data[0].snProductInfo[0].preferential.detail[0].activityName,
                            time:data[0].snProductInfo[0].deliveryInfoVo.sendDate,
                            area:data[0].snProductInfo[0].deliveryInfoVo.sendAddress,
                            color:data[0].goodsDetailBean.colors[0].attrValue,
                            size:data[0].goodsDetailBean.sizes[0].attrValue,
                            url : url,
                            price : data[0].snProductInfo[0].XPrice,
                            brand : data[0].goodsDetailBean.goods.brandCNName,
                            originPrice :data[0].snProductInfo[0].MPrice
                        })
                        var text = template("goodsDetail",{
                            list:map
                        })
                        $(".goodsMes").html( $(".goodsMes").html() + text);
                         var magnifierConfig = {
                            magnifier : "#magnifier1",//最外层的大容器
                            width : 402,//承载容器宽
                            height : 538,//承载容器高
                            // moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                            zoom : 2//缩放比例
                        };
                    
                        magnifier(magnifierConfig);
                        //数量加减
                        $(".plus").on("click",function(){ 
                            var val = parseInt( $("#goodsNum").get(0).value);
                            $("#goodsNum").get(0).value = ++val;
                        });
                        $(".minus").on("click",function(){
                            var val = parseInt( $("#goodsNum").get(0).value);
                            if(val>1){
                                val = --val;  
                            }
                            $("#goodsNum").get(0).value = val;
                        })
                        
                        function setCookie2(cookieName){
                            var val = parseInt( $("#goodsNum").get(0).value);
                            var goods = {
                                "id" : id,
                                "name":map.get(0).goodsName,
                                "price":map.get(0).price,
                                "color":map.get(0).color,
                                "size":map.get(0).size,
                                "url":map.get(0).url,
                                "brand":map.get(0).brand,
                                "count":val,
                                "originPrice":map.get(0).originPrice
                            };

                            var cookieStr = cookie.getCookie("goods");
                            var cookieObj = null;
                            if(cookieStr == null){
                                cookieObj = [];
                            }else{
                                cookieObj = JSON.parse(cookieStr);
                            }
                            var isExist = cookieObj.some(function(item){
                                var res = item.id == goods.id;  
                                //if(res) item.count++;   
                                return res;
                            })
                            if(!isExist){ 
                                cookieObj.push(goods);
                            }
                            cookie.setCookie(cookieName,JSON.stringify(cookieObj),'/');
                        }
                        //立即购买
                        $("a.buy").on("click",function(){
                            setCookie2("goods");
                            window.location.href = "http://localhost:9000/pages/shoppingcart/shoppingcart.html";
                        })
                        //收藏
                        $("a.collect").on("click",function(){
                            setCookie2("collection");
                            //window.location.href = "http://localhost:9000/pages/shoppingcart/shoppingcart.html";
                        })
                        //加入购物车
                        $(".addShoppingcart").on("click",function(e){
                            var url = map.get(0).url +"g1_402_536.jpg";
                            var img = $("<img src="+url+">");
                            img.appendTo("body");
                            img.css({
                                width:"50px",
                                height:"50px", 
                                position:"fixed",
                                left: e.clientX + "px",
                                top: e.clientY + "px"
                            });
                            parabola.parabola(img.get(0),{
                                x:$(".right-fix").get(0).offsetLeft + 20,
                                y:$(".right-fix").get(0).offsetHeight + 56
                            },function(){
                                img.fadeOut(300);
                                iconNum();
                            });
                            setCookie2("goods");
                        })
                    }
                })
            })
            $(".goodsList").load("http://localhost:9000/pages/templates/detail.html",function(){
                var map = new Map();
                $.ajax({
                    jsonp:"jsoncallback",
                    dataType:'jsonp',
                    url:ajaxMapping.history,
                    success:function(data){
                        data = data[0];
                        data.forEach(function(val,i){
                            map.set(i,{
                                goodsName : data[i].brandName,
                                imgUrl : data[i].imgUrl,
                                goodsTitle : data[i].goodName
                            })
                        })
                        var text = template("history",{
                            list:map
                        });
                        $(".goodsList").html( $(".goodsList").html() + text );
                    }
                })
            }) 
        })  
    })

})