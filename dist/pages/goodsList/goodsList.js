require(["http://localhost:9000/js/conf/config.js"],function(){require(["jquery","optimize","template","ajaxMapping","paging","bootstrap","carousel"],function(a,b,c,d){a(function(){a(".carousel-content").carousel({carousel:".carousel",indexContainer:".img-index",timing:3e3,animateTime:700,autoPlay:!0,direction:"left"}),a("#input-text").on("input",b.throttle(function(){var b=this.get(0).value;a.ajax({type:"get",url:"http://localhost:9000/proxy/search.xiu.com/ajax/autocomplete.htm?jsoncallback=jQuery17207773954956291034_1536757373699&q="+b+"&limit=10&timestamp=1536757377890&mkt=xiu&_=1536757377890",success:function(b){var c=/^\w*\(/;if(b=b.replace(c,"").replace(/\)$/,""),b=JSON.parse(b),a(".droplist").css({display:"block"}),a(".droplist").html(""),null!=b)for(var d,e=0;e<b.length;e++)d=a("<li></li>"),a(d).html(b[e].display),a(d).appendTo(a(".droplist"))}})},100,a("#input-text"))),a("body,document").on("click",function(){a(".droplist").css({display:"none"})}),a(window).on("scroll",function(){a(".droplist").css({display:"none"})}),a(".droplist").on("click","li",function(){a("#input-text").get(0).value=a(this).html(),a(".droplist").css({display:"none"})}),a(".tcdPageCode").createPage({pageCount:10,current:1,backFn:function(){}});var e=new Map;a(".goodslistwrap").load("http://localhost:9000/pages/templates/goodList.html",function(){a.ajax({type:"get",dataType:"jsonp",jsonpCallback:"cb",url:d.goodsList2,success:function(b){var b=b[0],f=0;for(var g in b)e.set(f,{id:b[g].goodsId,name:b[g].brandEnName,price:b[g].finalPrice,discountPrice:b[g].xiuPrice,detail:b[g].goodsName,url:b[g].goodsImg}),f++;var h=new Map;a.ajax({type:"get",dataType:"jsonp",jsonpcallback:"cb",url:d.goodsList2Size,success:function(b){var b=b[0];for(var[f,g]of e)for(var i in b)i==g.id&&h.set(f,{size:b[i]});var j=new Map;a.ajax({type:"get",dataType:"jsonp",jsonpCallback:"cb",url:d.goodsList2Dis,success:function(b){var b=b[0];for(var[d,f]of e)for(var g in b)b[g].productId==f.id&&j.set(d,{discount:b[g]});var i=c("goodslist",{list:e,listSize:h,listDis:j});a(".goodslistwrap").html(a(".goodslistwrap").html()+i),console.log(h.get(0).size.length),console.log(h.get(0).size[0].s),a(".goodslist").on("mouseover",function(){a(this).css({background:"rgba(255,255,255,0.8)"});var b=this.children[0].children[0].children[1];a(b).stop().animate({bottom:0},300);var c=this.children[0].children[0].children[2];a(c).stop().animate({bottom:-25},300),a(this).on("mouseout",function(){a(this).css({background:"#efefef"}),a(b).stop().animate({bottom:-68},300);var c=this.children[0].children[0].children[2];a(c).stop().animate({bottom:0},300)})})}})}})}})}),a(window).on("scroll",function(){300<a(window).scrollTop()?(a(".header-bottom").css({position:"fixed",background:"#333333",opacity:.9,zIndex:"9999"}),a(".header-bottom").stop().animate({top:0,left:0},100),a(".banner>.nav").css({position:"fixed",opacity:.9,zIndex:"9999"}),a(".banner>.nav").stop().animate({top:"43px",left:0},100)):(a(".header-bottom").css({position:"relative",background:"#333333",margin:0,zIndex:"9999"}),a(".banner>.nav").css({position:"relative",opacity:1,zIndex:"9999"}),a(".banner>.nav").stop().animate({top:"0",left:0},100))})})})});