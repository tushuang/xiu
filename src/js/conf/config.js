console.log("配置文件加载了!!!");

requirejs.config({
    baseUrl : "localhost:9000",
    paths : {
        "jquery" :  "https://cdn.bootcss.com/jquery/2.2.4/jquery",
        "bootstrap" : "https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min",
        "carousel" : "/js/plugin/carousel",
        "template" : "/js/lib/template-web",
        "optimize" : "/js/mylib/optimize",
        "ajaxMapping" : "/js/conf/ajaxMapping",
        "paging" : "/js/plugin/jquerypage",
        "magnifier" : "/js/plugin/magnifier"
    } 
})