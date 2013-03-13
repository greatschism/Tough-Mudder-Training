/* ============================================================
	Javascript for Tough Mudder Training App
============================================================ */

var currBootCamp = [],
	currExercise = {},
	currSec = 0,
	timeInterval,
	isLastExercise = false,
	ping = document.getElementById('ping');;

// click handler for Boot Camp Select buttons
bootCampSelectHandler = function(camp) {

	var selBootCamp = camp;

	// remove when second and third tier boot camps unlocked
	if (selBootCamp == 'Maybe Mudder' || selBootCamp == 'Tough Mudder') {
		alert('Sorry, this boot camp not supported at this time.');
		window.location = '#pageHome';
	}
	
	// loop through JSON and find selected boot camp
	$.each(JSON.bootCamps, function(index, bootCamp){
		
		// check to see which one you selected
		if (bootCamp.name == selBootCamp) {

			// set the currBootCamp variable to selected boot camp
			currBootCamp = bootCamp;
		}

	});

	$('#mudderling header h1').text(currBootCamp.name);

	currExercise = currBootCamp.obstacles[0]
	loadExercise(false);

}

// load in currently queued exercise
loadExercise = function(autostart) {

	if (currExercise.id == (currBootCamp.obstacles.length - 1)) {
		isLastExercise = true;
	}

	// name
	$('.exerciseInfo h2').text(currExercise.name);

	// group
	$('.exerciseInfo h5').text(currExercise.group);

	// description
	if (currExercise.description !== null) {
		var desc = currExercise.description;

		if (currExercise.description.length > 140) {
			desc = currExercise.description.substring(0, 140) + '...<br/><a href="#">Read more</a>';
		}

		$('.exerciseInfo p').html(desc);
	}

	// time
	currSec = currExercise.time;
	calculateTime(currSec);

	// run autostart or not
	if (autostart)
		timerStartClickHandler();

}

calculateTime = function(time) {
	var min = Math.floor(time / 60),
		sec = time - (min * 60);

	if (min < 10)
		min = '0' + min;

	if (sec < 10)
		sec = '0' + sec;
	

	$('.time p').text(min + ':' + sec);
}

// start the exercise timer
timerStartClickHandler = function() {

	clearInterval(timeInterval);
	timeInterval = setInterval(countdown, 1000);
	$('.timerStart').hide();
	$('.timerPause').show();

}

// pause the exercise timer
timerPauseClickHandler = function() {

	clearInterval(timeInterval);
	$('.timerPause').hide();
	$('.timerStart').show();

}

countdown = function() {

	if (currSec >= 1) {
		currSec = currSec - 1;
		calculateTime(currSec);
	} else {
		clearInterval(timeInterval);
		ping.play();

		if (!isLastExercise) {
			currExercise = currBootCamp.obstacles[currExercise.id + 1]
			loadExercise(true);
		} else {
			window.location = "#pageEnd";
		}
	}
}

resetWorkout = function() {
	currBootCamp = [];
	currExercise = {};
	currSec = 0;
	isLastExercise = false;
	clearInterval(timeInterval);

	$('.timerPause').hide();
	$('.timerStart').show();	
}

$(document).delegate('.ui-page', 'pagebeforeshow', function () {

	resetWorkout();

    if (this.id == 'mudderling') {
    	bootCampSelectHandler('Mudderling');
    }

	/*$('header .nextExercise').on('click', function(){
		currExercise = currBootCamp.obstacles[currExercise.id + 1]
		loadExercise();

		if (currExercise.id == (currBootCamp.obstacles.length - 1)) {
			$('header .nextExercise').off('click');
		}
	});*/

	$('.timerStart').on('click', timerStartClickHandler);
	$('.timerPause').on('click', timerPauseClickHandler);

});