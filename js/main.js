/*MAIN JS*/ 

(function($) {
	"use strict";
   $(window).load(function() {
    	$("#loader").fadeOut("slow", function(){
        $("#preloader").delay(150).fadeOut("slow");
      });       
  	})

  	setTimeout(function() {
   	  $('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });
  	}, 100);

  	$(".fluid-video-wrapper").fitVids();

	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });
	
   var toggleButton = $('.menu-toggle'), nav = $('.main-navigation');
   toggleButton.on('click', function(e) {
		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();
	});
  	nav.find('li a').on("click", function() {    		
   	toggleButton.toggleClass('is-clicked'); 
   	nav.fadeOut();   		  
  	});

	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	
	sections.waypoint( {
       handler: function(direction) {
		   var active_section;
			active_section = $('section#' + this.element.id);
			if (direction === "up") active_section = active_section.prev();
			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			
         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");
		}, 
		offset: '25%'
	});

  	$('.smoothscroll').on('click', function (e) {
	 	e.preventDefault();
   		var target = this.hash,
    	$target = $(target);
    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });
  	});  
  
	var pxShow = 300;
	var fadeInTime = 400; 
	var fadeOutTime = 400;
	jQuery(window).scroll(function() {
		if (!( $("#header-search").hasClass('is-visible'))) {
			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}
		}		
	});		
})(jQuery);

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 5) || 5000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
