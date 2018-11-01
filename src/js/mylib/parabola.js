define(function(){
    return {
        parabola:function(ele,stop,callback){
            //先获取做抛物线运动的小球的起始位置
            var starPos = {
                x:ele.offsetLeft,
                y:ele.offsetTop
            };
            var a = -0.005; //a为负数表示开口向下
            // 获取结束小球的坐标
            var endPos = {
                x:stop.x - starPos.x,   //是相对于运动小球的的坐标
                y:-(stop.y - starPos.y)  //浏览器top方向与y轴相反
            };
            //求出b
            var b = (endPos.y - (a*endPos.x*endPos.x))/endPos.x;
            var offsetX = 0;  //代表x轴
            var t = setInterval(function(){
                var x = starPos.x + offsetX;
                var y = starPos.y - (a*offsetX*offsetX + b*offsetX) ;
                offsetX+=13;
                ele.style.left = x + "px";
                ele.style.top = y + "px";
                if( parseInt(ele.style.left) >= stop.x){
                    ele.style.left = stop.x + "px";
                    callback?callback():"";
                    clearInterval(t);
                }
            },60)
        }
    }
})