/* ============================================================
	Javascript for Tough Mudder Training App
============================================================ */

var currBootCamp = [];

// click handler for Boot Camp Select buttons
bootCampSelectHandler = function() {
	selBootCamp = this.innerHTML;

	// remove when second and third tier boot camps unlocked
	if (selBootCamp == 'Maybe Mudder' || selBootCamp == 'Tough Mudder') {
		alert('Sorry, this boot camp not supported at this time.');
		return false;
	}
	
	// loop through JSON and find selected boot camp
	$.each(JSON.bootCamps, function(index, bootCamp){
		
		// check to see which one you selected
		if (bootCamp.name == selBootCamp) {

			// set the currBootCamp variable to selected boot camp
			currBootCamp = bootCamp;
		}

	});

	loadBootCamp();

}

// load currently selected boot camp
loadBootCamp = function() {
	// fade out select screen
	$('.boot-camp-select').fadeOut('fast', function() {
		
		// when finished, fade in boot camp screen
	});
}

$(document).ready(function(){

	$('.boot-camp-select button').on('click', bootCampSelectHandler);

});