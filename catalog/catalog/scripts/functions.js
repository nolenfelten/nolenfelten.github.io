$(document).ready(function () {
    $("#myController").jFlow({
        controller: ".jFlowControl",
        slideWrapper: "#jFlowSlider",
        slides: "#mySlides",
        selectedWrapper: "jFlowSelected",
        width: "960px",
        height: "350px",
        duration: 400,
        prev: ".jFlowPrev",
        next: ".jFlowNext",
        auto: true
    });

    $().UItoTop({easingType: 'easeOutQuart'});
    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({social_tools: false})
});

jQuery(function () {
    jQuery('ul.nav').superfish();
});
