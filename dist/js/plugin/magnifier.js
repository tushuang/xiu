define(["jquery"],function(){(function(a){var b={magnifier:".magnifier",container:".magnifier-container",containerImg:".images-cover",view:".magnifier-view",width:400,height:400,moveView:".move-view",moveWidth:null,zoom:4,thumbnail:".magnifier-line > ul",assembly:".magnifier-btn",index:0};window.magnifier=function(c){if("object"==typeof c)for(var d in c)b[d]=c[d];var f=this;f.magnifier=a(b.magnifier),f.container=f.magnifier.find(b.container),f.view=f.magnifier.find(b.view),f.moveView=f.magnifier.find(b.moveView),f.thumbnail=f.magnifier.find(b.thumbnail),f.assembly=f.magnifier.find(b.assembly),f.containerImg=f.magnifier.find(b.containerImg);var e=f.containerImg;f.magnifier.css({width:b.width}),f.container.css({width:b.width,height:b.height}),f.view.css({width:b.width,height:b.height});var g,h;g=b.moveWidth?b.moveWidth:b.width/b.zoom,h=g,f.moveView.css({width:g,height:h});var i,j,k,l,m,n,o;f.eqImg=function(){function a(){0==c.width&&(c.onload=a);var p;c.width>c.height?(m=b.width,n=c.height/(c.width/b.width),p="top:50%;margin-top:"+-n/2+"px"):(m=b.width,n=b.height,p="left:50%;margin-left:"+-m/2+"px"),e.empty().append("<img src=\""+d+"\" width=\""+m+"\" height=\""+n+"\" style=\""+p+"\" />"),o=b.width/g,f.view.empty().append("<img src=\""+d+"\" width=\""+m*o+"\" height=\""+n*o+"\" />"),i=(b.width-m)/2,j=b.width-i-g+1,k=(b.height-n)/2,l=b.height-k-h+1}var c=new Image,d=f.thumbnail.find("img").eq(b.index).attr("src");c.src=d,containerWidth=b.width,containerHeight=b.height,f.thumbnail.find(">*").removeClass("active").eq(b.index).addClass("active"),a()},f.eqImg(),f.moveFn=function(c){var d=c.clientX-f.magnifier.offset().left-g/2,e=c.clientY-f.magnifier.offset().top+a(document).scrollTop()-h/2;endX=d>i?d<j?d:j:i,endY=e>k?e<l?e:l:k,endY=0<endY?endY>b.width-h?b.height-h:endY:0,f.moveView.css({left:endX,top:endY,display:"block"}),positionX=(endX-(b.width-m)/2)*o,positionY=(endY-(b.height-n)/2)*o,f.view.css({display:"block"}).find("img").css({"margin-left":-positionX,"margin-top":-positionY})},f.container.on("mousemove",function(a){f.moveFn(a)}).on("mouseleave",function(){f.moveView.hide(),f.view.hide()});var p=f.thumbnail.find(">*"),q=p.length;return f.imgMove=function(a){a?b.index++:b.index--;var c=Math.ceil(b.width/p.width()/2);if(q<c)return!1;0>b.index?b.index=0:b.index>q-c?b.index=q-c:b.index;var d=p.width()*b.index-p.width();f.thumbnail.css({left:(0<d?-d:0)+"px"})},f.assembly.find(">*").on("click",function(){f.imgMove(a(this).index())}),p.on("click",function(){b.index=a(this).index(),f.eqImg()}),f.setIndex=function(a){b.index=a?a:0},f}})(jQuery)});