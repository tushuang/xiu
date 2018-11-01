define(function(){
    return {
        getCookie : function(key){
            var cookiestr = document.cookie;
            var list = cookiestr.split("; ");
            for(i in list){
                var str = list[i].split("=");
                if(str[0] == key) return str[1];
            }
            return null;
        },
        setCookie : function(key,value,expires,path){
            switch(arguments.length){ //判断参数 的个数
                case 0:
                case 1:throw new Error("参数传错了");
                case 2:{
                    document.cookie = key +"="+ value;
                }break;
                case 3:{
                    var parm = arguments[2];
                    if(typeof parm == "number"){
                        var d = new Date();
                        d.setSeconds(d.getSeconds()+parm);
                        document.cookie = key +"="+ value+";expires="+d;
                    }else{
                        document.cookie = key +"="+ value+";path="+parm;
                    }
                };break;
                case 4:{
                    var d = new Date();
                    d.setSeconds(d.getSeconds()+ expires);
                    document.cookie = key +"="+ value+";expires="+d+";path="+path;
                }
                
            }
        }

         
    }
})
