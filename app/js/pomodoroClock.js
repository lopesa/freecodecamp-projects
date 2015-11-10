var time = 5000
var minutes;
var seconds;

function convertTime () {
	// console.log(time);
	// console.log("Minutes = " + minutes + "\nseconds = " + seconds);
	

	// convert milliseconds to minutes and seconds
	if (time >= 60000) {
		minutes = Math.floor(time / 60000);
		seconds = (time % 60000) / 1000;
	}
	else {
		minutes = 0;
		seconds = time / 1000;
	}

	// pad numbers 0-9 with a leading 0.
	// I can't believe there's not a native way to do this
	// https://css-tricks.com/forums/topic/add-0-before-single-digit-numbers-jquery/
	// return ((n = +n+1) < 10 ? "0" : "") + n;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
}

function changeTimeDisplay () {
	convertTime();
	// $('#time').text(timeInSeconds);
	$('#minutesDisplay').text(minutes);
	$('#secondsDisplay').text(seconds);
}

function addTime (event) {
	time += event.data.time;
	// console.log("time = " + time);
	changeTimeDisplay();
}

function subtractTime (event) {
	time -= event.data.time;
	// console.log("time = " + time);
	changeTimeDisplay();
}

function startClock() {
	if (time === 0) {
		console.log("ring!");
		return;
	}
	else {
		time -= 1000
		changeTimeDisplay();
		window.setTimeout(function() {
			startClock();
		}, 1000)
	}
}

$('#start-timer').on('click', startClock);

$('#addSecond').on('click', {time: 1000}, addTime);
$('#addMinute').on('click', {time: 60000}, addTime);

$('#subtractSecond').on('click', {time: 1000}, subtractTime);
$('#subtractMinute').on('click', {time: 60000}, subtractTime);




// clock();