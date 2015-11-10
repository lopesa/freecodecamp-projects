var sessionTime = 1500000;
var breakTime = 300000;

function convertTime (time) {
	// console.log("Minutes = " + minutes + "\nseconds = " + seconds);
	var minutes;
	var seconds;
	
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

	return [minutes, seconds];
}

function changeTimeDisplay (whichClock) {
	var sessionTimeDisplay = [];
	var breakTimeDisplay = [];

	if (whichClock === "session") {
		sessionTimeDisplay = convertTime(sessionTime);
		$('#sessionMinutesDisplay').text(sessionTimeDisplay[0]);
		$('#sessionSecondsDisplay').text(sessionTimeDisplay[1]);
	}
	else {
		breakTimeDisplay = convertTime(breakTime);
		$('#breakMinutesDisplay').text(breakTimeDisplay[0]);
		$('#breakSecondsDisplay').text(breakTimeDisplay[1]);
	}
}

function addTime (event) {
	// console.log(event.data.clock);
	if (event.data.clock === "session") {
		sessionTime += 60000;
		changeTimeDisplay("session");
	}
	else {
		breakTime += 60000;
		changeTimeDisplay("break");
	}
}

function subtractTime (event) {
	if (event.data.clock === "session") {
		sessionTime -= 60000;
		changeTimeDisplay("session");
	}
	else {
		breakTime -= 60000;
		changeTimeDisplay("break");
	}
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

$('#addSessionMinute').on('click', {clock: "session"}, addTime);
$('#subtractSessionMinute').on('click', {clock: "session"}, subtractTime);

$('#addBreakMinute').on('click', {clock: "break"}, addTime);
$('#subtractBreakMinute').on('click', {clock: "break"}, subtractTime);





// clock();