$(window).load(function(){$(".se-pre-con").fadeOut("slow")}),$(function(){$("a.page-scroll").bind("click",function(e){var a=$(this);$("html, body").stop().animate({scrollTop:$(a.attr("href")).offset().top},1500,"easeInOutExpo"),e.preventDefault()})}),$("body").scrollspy({target:".navbar-fixed-top"}),$(".navbar-collapse ul li a").click(function(){$(".navbar-toggle:visible").click()});var wow=new WOW({boxClass:"wow",animateClass:"animated",offset:200,mobile:!1,live:!0,callback:function(e){}});wow.init(),$(document).ready(function(){$("#owl-testimonials").owlCarousel({navigation:!0,slideSpeed:300,pagination:!1,singleItem:!0,autoPlay:!0,stopOnHover:!0,autoHeight:!0,navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]})}),$(window).load(function(){if($("#gallery-masonry").length>0){var e=$("#gallery-masonry").isotope({itemSelector:".single-item",layoutMode:"fitRows",transitionDuration:".6s",hiddenStyle:{opacity:0,transform:"scale(.85)"},visibleStyle:{opacity:1,transform:"scale(1)"}});$("#gallery-masonry-sort a").on("click",function(a){a.preventDefault();var i=$(this);if(i.parent("li").hasClass("active"))return!1;i.parent("li").addClass("active").siblings("li").removeClass("active");var t=i.data("target");return e.isotope({filter:t}),i})}}),$(document).ready(function(){$("#iframe").click(function(){$("section#iframe iframe").css("pointer-events","auto")}),$("#iframe").mouseleave(function(){$("section#iframe iframe").css("pointer-events","none")})}),$(".gallery-item").magnificPopup({type:"image",gallery:{enabled:!0}}),$(document).ready(function(){$("#bgvideo").backgroundVideo({pauseVideoOnViewLoss:!1})});