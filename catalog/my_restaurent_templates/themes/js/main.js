$(document).ready(function() {
	// Apply Bootstrap Scrollspy to show active navigation link based on page scrolling
	$('.navbar').scrollspy();
    
    // Scroll page with easing effect
    $('.navbar ul li a').bind('click', function(e) {
        e.preventDefault();
        target = this.hash;
        $.scrollTo(target, 1500, {
        	easing: 'easeOutCubic'
        });

        $(".btn-navbar").click();
   	});

	// Show/Hide Sticky "Go top" button
	$(window).scroll(function(){
		if($(this).scrollTop()>200){
			$(".go-top").fadeIn(200);
		}
		else{
			$(".go-top").fadeOut(200);	
		}
	});

	// Scroll Page to Top when clicked on "go top" button
	$(".brand, .go-top").click(function(event){
		event.preventDefault();

		$.scrollTo('#home', 1500, {
        	easing: 'easeOutCubic'
        });
	});

	// Scroll Page to "Contact" section
	$("#connect-now").click(function(event){
		event.preventDefault();

		$.scrollTo('#contact', 1500, {
        	easing: 'easeOutCubic'
        });
	});
	

	// Sliding Background Images
	$.vegas('slideshow', {
        delay:7000,
        preload: false,
        backgrounds:[
            {src : 'themes/images/food6.png', fade: 2000},
            {src : 'themes/images/food7.png', fade: 2000},
            {src : 'themes/images/food2.png', fade: 2000},
            {src : 'themes/images/food3.png', fade: 2000},
            {src : 'themes/images/food4.png', fade: 2000},
            {src : 'themes/images/food1.png', fade: 2000},
            {src : 'themes/images/food5.png', fade: 2000},
            {src : 'themes/images/food6.png', fade: 2000}

        ]
    })('overlay');


    // Apply Card scrolling effect on Portfolio
	var $frame = $('#the-portfolio');
	var $wrap  = $frame.parent();

	// Call Sly on frame for Portfolio effect
	$frame.sly({
		horizontal: 1,
		itemNav: 'forceCentered',
		smart: 1,
		activateMiddle: 1,
		activateOn: 'click',
		mouseDragging: 1,
		touchDragging: 1,
		releaseSwing: 1,
		startAt: 2,
		scrollBar: $wrap.find('.scrollbar'),
		scrollBy: 1,
		speed: 300,
		elasticBounds: 1,
		easing: 'swing',
		dragHandle: 1,
		dynamicHandle: 1,
		clickBar: 1,

		// Buttons
		prev: $wrap.find('.prev'),
		next: $wrap.find('.next')
	});

	// make only center image clickable for zoom using prettyphoto
	$('#the-portfolio li').click(function(ele){
		if($(this).hasClass('active')){
			this_image = $(this).find("img").attr("src");
			$.fn.prettyPhoto({
				social_tools:''
			});
			$.prettyPhoto.open(this_image,'','');
		}
	})
	
});


