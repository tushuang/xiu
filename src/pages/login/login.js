require(["http://localhost:9000/js/conf/config.js"],function(){
    require(["jquery","optimize","cookie"],function($,optimize,cookie){
        $(function(){
            var cookieStr = cookie.getCookie("client");
           if(cookieStr) {
                var cookieObj = JSON.parse(cookieStr);
                $(".phoneNum").get(0).value =cookieObj.number;
            }
           
                //表单验证 str
            $(".phoneNum").on("blur",function(){
                var val = $(".number").get(0).value;
                if(/\D/.test(val) || val.length!=11){
                    $(".tipNumber").css({
                        display:"block"
                    })
                }else{
                    $(".tipNumber").css({
                        display:"none"
                    })
                }
            })
            $(".emailNum").on("click",function(){
                $(".title2").css("display","none");
                $(".emailNum").attr("placeholder","手机号/邮箱/用户名");
            })
            $(".phoneNum").on("click",function(){
                $(".title1").css("display","none");
                $(".phoneNum").attr("placeholder","手机号");
            })
            //四位数字验证码
            $("#code").on("blur",function(){
                var val = $(".code").get(0).value;
                if(/\D/.test(val)){
                    $(".tipCode").css({
                        display:"block"
                    })
                }else if(val.length!=4){
                    $(".tipCode").css({
                        display:"block"
                    })
                }else{
                    $(".tipCode").css({ 
                        display:"none"
                    })
                }
            })
            //短信登录和密码登录
            $("span.note").on("click",function(){               
                this.className = "note clicked";       
                $("span.password").get(0).className = "password";
                $(".loginType1").css("display","block");
                $(".loginType2").css("display","none");
            })
            $("span.password").on("click",function(){
                this.className = "password clicked";             
                $("span.note").get(0).className = "note";
                $(".loginType1").css("display","none");
                $(".loginType2").css("display","block");
                $(".tipNumber").css("display","none");
            })
            $(".login").on("click",function(e){
                e.preventDefault?e.preventDefault():e.returnValue=false;
                console.log($("#code").value != undefined,$(".phoneNum").value!=undefined );
                if($(".tipCode").css("display") =="none" && $(".tipNumber").css("display") =="none" && $("#code").get(0).value !="" && $(".phoneNum").get(0).value!=""){
                    var num= $(".phoneNum").get(0).value;
                    var obj = {
                        "number":num,
                        "clientName":"xiu"+num.substring(7,num.length)
                    };
                    cookie.setCookie("client",JSON.stringify(obj),"/");
                    window.location.href="http://localhost:9000";
                }else{
                    $(".tipCode").css({
                        display:"block"
                    })
                    $(".tipNumber").css({
                        display:"block"
                    })
                }
            })
        })
        
    })
})