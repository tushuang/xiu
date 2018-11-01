

require(["../../js/conf/config.js"],function(){
    require(["jquery","optimize","template","ajaxMapping","cookie"],function($,optimize,template,ajaxMapping,cookie){
        console.log("模块被加载了");
        $(function(){
             var cookieObj = JSON.parse( cookie.getCookie("goods"));
             console.log(cookieObj,cookieObj.length);
            if(cookieObj != null && cookieObj.length!=0){
                $(".empty-cart").css({
                    display:"none"
                })
                $(".content").css({
                    display:"block"
                })
            }else{
                $(".empty-cart").css({
                    display:"block"
                })
                $(".content").css({
                    display:"none"
                })
            }

            $(".content").load("http://localhost:9000/pages/templates/shoppingcart.html",function(){
                var cookieObj = JSON.parse(cookie.getCookie("goods"));
                if( cookieObj){
                    var text = template("cart",{
                        list:cookieObj
                    });
                    $(".content").html( $(".content").html() + text );

                }
                
               
                $("table").on("click","span",function(){
                    if(this.className == "plus"){
                        var val = parseInt( this.previousElementSibling.value);
                        this.previousElementSibling.value = ++val;
                    }
                    if( this.className == "minus"){
                        console.log(this.nextElementSibling.value);
                        var val = parseInt( this.nextElementSibling.value);
                        if(val>1){
                            val = --val;  
                        }
                        this.nextElementSibling.value = val;
                    }
                    calculate();
                })
                //判断checked属性是否为true 
                function calculate(){
                    var price=0;
                    var flag=true;
                    var num =0;
                    var val =0;
                    var allnum = 0;
                    var originPrice = 0;
                    var preferentialPrice = 0;
                    var discount = 0;
                    $.each($(".select"),function(i,item){
                        if( item.checked == true  && getComputedStyle( item.parentNode.parentNode).display == "table-row"){ 
                            num = parseInt( item.parentNode.parentNode.children[3].children[1].value); //得到当前输入框的值
                            val = item.parentNode.parentNode.children[2].children[1].innerHTML;//得到当前商品的价格
                            val = parseInt(val.substring(1,val.length));
                            originPrice = item.parentNode.parentNode.children[2].children[0].innerHTML; //原价
                            originPrice = parseInt(originPrice.substring(1,originPrice.length));
                            allnum +=num;
                            price+=val*num;
                            discount += (originPrice - val)*num;
                            //$(".all-price").html("￥"+ price);
                        }else{
                            flag=false;
                        }
                        //price+=(val*num);
                        allPrice = price;
                        $(".all-price").html("￥"+ allPrice);
                        $("b.num").html(allnum);
                        $(".preferential").html(discount);
                        $(".preferential-price").html(allPrice+discount);
                        console.log(price);
                    })
                    return flag;
                }
                function backgroundColor(){
                    $.each($(".select"),function(i,item){
                        if(item.checked == true){
                            item.parentNode.parentNode.style.background = "#fff4e8";
                        }else if(item.checked == false ){
                            item.parentNode.parentNode.style.background = "white";
                        }
                    })
                }
                calculate();
                backgroundColor();
                $(".select").on("click",function(){
                    if(calculate()){
                        $(".selectAll").get(0).checked = true;
                    }else{
                        $(".selectAll").get(0).checked = false;
                    }
                    calculate();
                    backgroundColor();
                })
                $(".selectAll").on("click",function(){  //全选按钮
                    if($(".selectAll").get(0).checked == true){
                        $.each($(".select"),function(i,item){
                            item.checked = true;
                        })
                    }
                    backgroundColor();
                })
                $(".delete-goods").on("click",function(){  //删除商品的同时需要删除cookie
                    this.parentNode.parentNode.style.display="none";
                    var id = this.parentNode.parentNode.id;
                    var cookieObj = JSON.parse(cookie.getCookie("goods"));
                    cookieObj.forEach(function(item,index){
                        if(item.id == id){
                            cookieObj.splice(index,index+1);
                        }
                    })
                    cookie.setCookie("goods",JSON.stringify(cookieObj),75000,'/');
                   // document.cookie = "goods="+JSON.stringify(cookieObj)+";path='/'";
                    calculate();
                    location.reload();
                })
                $(".deleteAll").on("click",function(){
                    if($(".deleteAll").get(0).checked == true){
                        $.each($(".select"),function(i,item){
                            item.checked = true;
                        })
                    }
                    backgroundColor();
                    location.reload();
                })

                 $(".deleteAllBtn").on("click",function(){
                    if($(".deleteAll").get(0).checked == true){
                        $(".goods").css({
                            display:"none"
                        })
                    }
                })
                
            })

            $(".collection-wrap").load("http://localhost:9000/pages/templates/shoppingcart.html",function(){
                var cookieObj = JSON.parse(cookie.getCookie("collection"));
                if(cookieObj){
                    var text = template("collection",{
                        list:cookieObj
                    })
                    $(".collection-wrap").html( $(".collection-wrap").html()+text );
                    var flag = true;
                    $(".collect-btn").on("click",function(){
                        if(flag){
                            $(".collection-wrap").css("display","none");
                            $(".collect-btn").html("+");
                            flag=false;
                        }
                        else  {
                            $(".collection-wrap").css("display","block");
                            $(".collect-btn").html("-");
                            flag=true;
                        }
                    })
                }
                
            })

            
        })
       
    })
})