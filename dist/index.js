require(["js/conf/config.js"],function(){require(["jquery","optimize","template","ajaxMapping","bootstrap","carousel"],function(a,b,c,d){a(function(){a(".carousel-content").carousel({carousel:".carousel",indexContainer:".img-index",timing:3e3,animateTime:700,autoPlay:!0,direction:"left"}),a("#input-text").on("input",b.throttle(function(){var b=this.get(0).value;a.ajax({type:"get",url:"http://localhost:9000/proxy/search.xiu.com/ajax/autocomplete.htm?jsoncallback=jQuery17207773954956291034_1536757373699&q="+b+"&limit=10&timestamp=1536757377890&mkt=xiu&_=1536757377890",success:function(b){var c=/^\w*\(/;if(b=b.replace(c,"").replace(/\)$/,""),b=JSON.parse(b),a(".droplist").css({display:"block"}),a(".droplist").html(""),null!=b)for(var d,e=0;e<b.length;e++)d=a("<li></li>"),a(d).html(b[e].display),a(d).appendTo(a(".droplist"))}})},100,a("#input-text"))),a("body,document").on("click",function(){a(".droplist").css({display:"none"})}),a(window).on("scroll",function(){a(".droplist").css({display:"none"})}),a(".droplist").on("click","li",function(){console.log(a(this)),a("#input-text").get(0).value=a(this).html(),a(".droplist").css({display:"none"})}),a(".shortcut").on("mouseover","span",function(){a(this).animate({marginLeft:0},200),a(this).on("mouseout",function(){a(this).animate({marginLeft:20},200)})}),a(".wrap").load("http://localhost:9000/pages/templates/index.html",function(){a.ajax({type:"get",url:"http://localhost:9000/JSON/index.json",success:function(b){var d=c("tempImg",{list:b});a(".wrap").html(a(".wrap").html()+d)}})}),a(".commend-wrap").load("http://localhost:9000/pages/templates/index.html",function(){a.ajax({type:"get",url:"http://localhost:9000/JSON/index2.json",success:function(b){var d=c("tempImg2",{list:b});a(".commend-wrap").html(a(".commend-wrap").html()+d),console.log(a("div.changeOpacity")),a("div.changeOpacity").on("mouseover",function(){console.log("123"),a(this).stop().animate({opacity:.3},100),a(this).on("mouseout",function(){a(this).stop().animate({opacity:0},100)})})}})}),a(".find-goods-content").load("http://localhost:9000/pages/templates/index.html",function(){a.ajax({type:"get",jsonpCallback:"goodlistCB",url:d.goodsList,dataType:"jsonp",success:function(b){var b=b[0],d=new Map,e=0;for(item in b)d.set(e,{id:b[item].goodsId,name:b[item].brandEnName,price:b[item].finalPrice,detail:b[item].goodsName,url:b[item].goodsImg}),e++;var f=c("goods",{list:d});a(".find-goods-content").html(a(".find-goods-content").html()+f);var g=a(".find-goods-content > li").get();g.forEach(function(a,b){0==(b+1)%4&&(a.className="last")})}})})})})});