// By: Chris LaCaille
// ~~ My javascript/jquery code for portfolio page - chrislacaille.com

$(function() {
	// Jumbotron and #about section vars 
	var $jumbotron = $(".jumbotron"),
		// $about = $("#about"), 
		$about_text = $("#about_text"),
		$about_text2 = $("#about_text2"),
		$projectImgs = $(".project-imgs");
// Astronaut animation vars
	var $astronaut = $("#astronaut"),
		$window = $(window),
		mouseX = 0,
		mouseY = 0,
		xp = 0,
		yp = 0;
// Ajax form vars
	var contactForm = $("form"),
		$userName = $("#userName"),
		$userEmail = $("#userEmail"),
		$userMsg = $("#userMsg"),
		$formMessages = $("#form-messages");
	// Navbar vars
	var $navbar = $("nav"),
		$titleMeta = $(".title-meta");

	
	// Change jumbotron to fit to viewport width/height
	// on page load
	function resizeJumbo() {
		$jumbotron.animate({
			"height": window.innerHeight
		});
	}
	resizeJumbo();
	
	// And re-size jumbotron when window size changes
	// $(window).resize(function() {
	// 	resizeJumbo();
	// });
// Smoother scrolling 
// Not self-executing so it works on dynamic 'click here' button
// in jumbotron - after typed runs
	function smoothScroll() {
		$("a[href*=#]").click(function() {
			if (location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && 
			location.hostname == this.hostname) {
				var $target = $(this.hash);
				$target = $target.length && $target || $("[name=" + this.hash.slice(1) +"]");
				if ($target.length) {
					var targetOffset = $target.offset().top - 150;
					$("html,body").stop(true);
					$("html,body").animate({scrollTop: targetOffset}, 1000);
					return false;
				}
			}
		});
	}
	smoothScroll();

// jumbotron 'typed' animated text
	$("#jumbotron-text").typed({
		strings: ["My name is <span class='blue-1'>Chris LaCaille</span>",
			"I <span class='blue-1'>build</span> websites... ^600 and <span class='blue-1'>apps</span>",
			"Check out my work!<br><a href='#projects-title' class='btn btn-lg blue-1'>Click Here</a>" ],
		typeSpeed: 11,
		startDelay: 2000,
		cursorChar: "108.315.25.00 - Initializing",
		callback: function() {
			$(".typed-cursor").fadeOut();
			smoothScroll();
		},
	});

// jumbotron mouse events
	$jumbotron.mousemove( function(e) {
		mouseX = e.pageX ;
		mouseY = e.pageY - 50; 
	});

// Astronaut Tween animation
// setInterval & Tween ( or css() ) is smoother than animate()
	setInterval(function(){
		// Damper on 10 .. can change ... higher is slower
		xp += (mouseX - xp) / 10;
		yp += (mouseY - yp) / 10;
		var yStopBottom = $(window).height() - 200,
			xStopRight = ($window.width() - 150);
		// Check to see if astronaught is within jumbotron
		if ( xp > 50 && xp < xStopRight && 
			yp > 0 && yp < yStopBottom ) 
		{
			TweenLite.to($astronaut, 1.5, 
						{ left:xp, top:yp, opacity: 1  });
		} else {
			TweenLite.to($astronaut, 1.2, 
						{ left:xp, top:yp, opacity: 0  });
		}
	}, 75);

	// ~~~~~~ WINDOW SCROLL events
	$about_text.hide(); // hide text to fade in
	$about_text2.hide(); // hide text to fade in
	
	// #about text fade in on scroll
	$window.on("scroll", function() {
		
		if ( $window.scrollTop() > 100) {
			$navbar.removeClass("static-nav").addClass("fixed-nav");
			$titleMeta.fadeOut();
		} else {
			$titleMeta.fadeIn();
			$navbar.removeClass("fixed-nav").addClass("static-nav");
		}
	});

// Project images hover effect
	$projectImgs.on("mouseover", function() {
		TweenLite.set($(this), {className: "+=contrast150"});
	});
	$projectImgs.on("mouseleave", function() {
		TweenLite.set($(this), {className: "-=contrast150"});
	});

// Contact form - AJAX
	$("form").on("submit", function(e) {
		e.preventDefault();
		contactForm.serialize();
		$.ajax({
			url: contactForm.attr("action"),
			type: "POST",
			data: {name: $userName.val(),
				email: $userEmail.val(),
				message: $userMsg.val()
			},
		})
		.done(function() {
			console.log("success");
			$formMessages.html("Message Sent.. Thank You! I'll get back to you ASAP.");
			$userName.val("");
			$userEmail.val("");
			$userMsg.val("");
		})
		.fail(function(data) {
			console.log("error sending form data...");
			// Set the message text.
			if (data.responseText !== "") {
				$formMessages.html(data.responseText);
			} else {
				$formMessages.html("Oops! An error occured and your message could not be sent.");
			}
		})
		.always(function() {
			console.log("complete");
		});
	
	}); // END AJAX


});   // end ready()






