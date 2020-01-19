$("main, section").hide(); // set display: none to main and section divs in css to stop flash


$("#splash").show();


TweenMax.from("#splash",0.5,{
	delay:1,
	opacity:0
});

TweenMax.from("#splash header",0.5,{
	
	delay:1.5,
	y: -$('#splash header').outerHeight(),
	ease: Sine.easeout
});

TweenMax.from("#splash footer",0.25,{
	
	delay: 1.5,
	y: $('#splash footer').outerHeight(),
	ease: Sine.easeout
});

TweenMax.from("#splash img",0.5,{
	delay:1.5,
	scale:0,
	opacity:0,
	ease:Sine.easeout
});

TweenMax.to("#splash",0.5,{
	delay:3,
	opacity:0,
	ease:Sine.easeout,
	onComplete:loadLanding
});

function loadLanding(){
	
	$("main, section").hide().css({opacity:1});
	$("#landing").show();
    
TweenMax.from("#landing",0.5,{
	delay:1,
	opacity:0
});


TweenMax.staggerFrom('.landingLogos',0.5,{
	delay:1,
	opacity:0,
	y: -50
},0.25);

$("#logo1").click(function(){
	TweenMax.to("#landing",0.5,{
		
		opacity:0,
		onComplete:loadRest,
		onCompleteParams:['#rest1','#048a0a']
	});
});


$("#logo2").click(function(){
	TweenMax.to("#landing",0.5,{
		
		opacity:0,
		onComplete:loadRest,
		onCompleteParams:['#rest2','#5d3601']
	});
});
	
$("#logo3").click(function(){
	TweenMax.to("#landing",0.5,{
		
		opacity:0,
		onComplete:loadRest,
		onCompleteParams:['#rest3','#fd5656']
	});
});
};

function loadRest(restID, highlightColour) {
    
    // hide landing screen
    $("#landing").hide();

    // display selected restaurant screen
    $(restID).show();

    // animate on the restaurant
    TweenMax.from(restID + " header", 0.5, {
        delay: 0.25,
        y: -$(restID + " header").outerHeight(),
        ease: Sine.easeOut
    });

    TweenMax.from(restID + " footer", 0.5, {
        delay: 0.25,
        y: $(restID + " footer").outerHeight(),
        ease: Sine.easeOut
    });

    // display home section
    $(restID + " .home").show();

    // animate on home section
    TweenMax.from(restID + " .home", 0.5, {
        delay: 0.75,
        opacity: 0,
		scale:0
    });

    // loop through and reveal all elements on home screen with .reveal class applied
    $(restID + " .home .reveal").each(function(i) {

        TweenMax.from(this, 1, {
            delay: 1.25 + i * 0.15,
            opacity: 0,
            y: 100,
            ease: Elastic.easeOut
        });

    });
    
    // highlight home icon in footer on restaurant load
    $(".homeIcon").css({background: highlightColour}).addClass("active");
	
    
    // set up section nav - highlight and load section


	var icons = restID + " .homeIcon, " + restID + " .specialsIcon, " + restID + " .reservationsIcon";
	console.log(icons);
	
	$(icons).click(function(){
		if(!$(this).hasClass("active")){
			$(icons).css({background:'none'}).removeClass('active');
			$(this).css({background:highlightColour});
			$(this).addClass('active');
			
			loadSection(restID+" section", restID+" "+ $(this).attr("data-section"));
			
		}
		
	});
}

// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////

// function for loading internal restaurant sections
function loadSection(prevSection, nextSection) {
	
	console.log("loading section: " +nextSection)
;
    // fade out previous section
    TweenMax.to(prevSection, 0.5, {
        opacity: 0,
        onComplete: function() {
            // hide and reset previous section
            $(prevSection).hide().css({opacity: 1});
            // display next section and auto scroll to top of page
            $(nextSection).show().scrollTop(0);
        }
    });

    // animate on next section
    TweenMax.from(nextSection, 0.5, {
        delay: 0.5,
        opacity: 0
    });

    // loop through and reveal all elements on next screen with .reveal class applied
    $(nextSection + " .reveal").each(function(i) {

        TweenMax.from(this, 1, {
            delay: 1 + i * 0.15,
            opacity: 0,
            x: -100,
            ease: Sine.easeOut
        });

    });

}

// set up reservations submit button
$(".reserve").click(function(e) {
    
    // stops default processing for form
    e.preventDefault();
    
    alert("Reservations have been made."); // replace with reveal of actual content
    
});

// set up hamburger menu to reveal main menu
$('.hamburger').click(function(){
	
	if($(".hamburger").attr("data-click-state")==1){
		
		$("#menu").show();
		$('.hamburger').attr("data-click-state",0);
		$(".hamburger").attr('src',"img/hamburger2close.gif");
		
		TweenMax.to(".rest", 0.5,{
			x:310,
			ease:Sine.easeOut
		});
		
	}else{
		$(".hamburger").attr("data-click-state",1);
		$(".hamburger").attr("src","img/close2hamburger.gif");
		
		TweenMax.to('.rest',0.5,{
			x:0,
			ease:Sine.easeIn,
			onComplete:function(){
				$("#menu").hide();
			}
		});
	}
});
	

// set up main menu links
// go back to landing screen
	$("#backToLanding").click(function(){
		
		$('.hamburger').attr("data-click-state",1);
		$(".hamburger").attr("src", "img/hamburger.gif");
		
		TweenMax.to('.rest',0.5,{
			x:0,
			ease:Sine.easeIn,
			onComplete:function(){
				TweenMax.to(".rest",0.5,{
					opacity:0,
					ease:Ease.easeIn,
					onComplete:loadLanding
				});
			}
		});
	});


// reveal FoE about info      
$("#contact").click(function(){
	alert("click contact");
});

$("#about").click(function(){
	alert("click about");
});