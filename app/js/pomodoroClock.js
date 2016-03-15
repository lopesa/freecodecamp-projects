(function($) {
	// set times and running times in microseconds
	var sessionSetTime= 1500000;
	var breakSetTime = 600000;

	var sessionTime = sessionSetTime;
	var breakTime = breakSetTime;

	// displayed times in an array of minutes and seconds
	var sessionTimeDisplay = [];
	var breakTimeDisplay = [];
	var sessionSetTimeDisplay = [];
	var breakSetTimeDisplay = [];

	var activeClock = 'session';
	var clockRunning = false;
	var timeoutID;

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
		
		if (whichClock === "session") {
			sessionTimeDisplay = convertTime(sessionTime);
			$('#sessionMinutesDisplay').text(sessionTimeDisplay[0]);
			$('#sessionSecondsDisplay').text(sessionTimeDisplay[1]);
		}
		else if (whichClock === "sessionSet") {
			sessionSetTimeDisplay = convertTime(sessionSetTime);
			$('#sessionSetMinutesDisplay').text(sessionSetTimeDisplay[0]);
			$('#sessionSetSecondsDisplay').text(sessionSetTimeDisplay[1]);
		}
		else if (whichClock === "break") {
			breakTimeDisplay = convertTime(breakTime);
			$('#breakMinutesDisplay').text(breakTimeDisplay[0]);
			$('#breakSecondsDisplay').text(breakTimeDisplay[1]);
		}
		else {
			breakSetTimeDisplay = convertTime(breakSetTime);
			$('#breakSetMinutesDisplay').text(breakSetTimeDisplay[0]);
			$('#breakSetSecondsDisplay').text(breakSetTimeDisplay[1]);
		}
	}

	function addTime (event) {
		// console.log(event.data.clock);
		if (clockRunning === false) {
			if (event.data.clock === "session") {
				sessionSetTime += 60000
				sessionTime = sessionSetTime;
				changeTimeDisplay("session");
				changeTimeDisplay("sessionSet");
			}
			else {
				breakSetTime += 60000;
				breakTime = breakSetTime;
				changeTimeDisplay("break");
				changeTimeDisplay("breakSet");
			}
		}
	}

	function subtractTime (event) {
		if (clockRunning === false) {
			if (event.data.clock === "session") {
				if (sessionSetTime > 60000) {
					sessionSetTime -= 60000;
					sessionTime = sessionSetTime;
					changeTimeDisplay("session");
					changeTimeDisplay("sessionSet");
				}
			}
			else {
				if (breakSetTime > 60000) {
					breakSetTime -= 60000;
					breakTime = breakSetTime;
					changeTimeDisplay("break");
					changeTimeDisplay("breakSet");
				}
			}
		}
	}

	function runSessionClock() {
		sessionTime -= 1000;

		if (sessionTime === 0) {
			changeTimeDisplay('session');
			changeIndicatorBar('session');

			setTimeout(function() {
				$('#session-bar-remainder-indicator').css('width', '100%');
			}, 1000);

			// switching background - yellow
			$('#session-bar-container').css('background-color', 'rgba(255, 240, 206, 0)')
			$('#break-bar-container').css('background-color', 'rgba(255, 240, 206, 1)')

			triggerAlarm('break');

			timeoutID = window.setTimeout(function() {
				sessionTime = sessionSetTime;
				changeTimeDisplay('session');
				activeClock = 'break';
			}, 1000)
		}

		else {
			changeTimeDisplay('session');
			changeIndicatorBar('session');
			timeoutID = window.setTimeout(function() {
				runSessionClock();
			}, 1000)
		}
	}

	function runBreakClock() {
		breakTime -= 1000

		if (breakTime === 0) {
			changeTimeDisplay('break');
			changeIndicatorBar('break');

			setTimeout(function() {
				$('#break-bar-remainder-indicator').css('width', '100%');
			}, 1000);

			// switching background
			$('#break-bar-container').css('background-color', 'rgba(255, 240, 206, 0)')
			$('#session-bar-container').css('background-color', 'rgba(255, 240, 206, 1)')

			triggerAlarm('session');

			timeoutID = window.setTimeout(function() {
				breakTime = breakSetTime;
				changeTimeDisplay('break');
				activeClock = 'session';
			}, 1000)
		}
		else {
			
			changeTimeDisplay('break');
			changeIndicatorBar('break');
			timeoutID = window.setTimeout(function() {
				runBreakClock();
			}, 1000)
		}
	}

	function toggleClock() {
		if (clockRunning === false) {
			if (activeClock === 'session') {
				runSessionClock();
			}
			else {
				runBreakClock();
			}
			clockRunning = true;
		}
		else {
			window.clearTimeout(timeoutID); // will do nothing if no timeout with id is present
			clockRunning = false;
		}
	}

	function setBarWidth() {
		if (sessionSetTime > breakSetTime) {
			$('#session-bar-indicator').css('width', '100%');
			var breakPercent = Math.round(breakSetTime / sessionSetTime * 1000) / 10 + '%';
			$('#break-bar-indicator').css('width', breakPercent);
		}
		else {
			$('#break-bar-indicator').css('width', '100%');
			var sessionPercent = Math.round(sessionSetTime / breakSetTime * 1000) / 10 + '%';
			$('#session-bar-indicator').css('width', sessionPercent);
		}
	}

	function changeIndicatorBar(clock) {
		if (clock === 'session') {
			var percent = sessionTime / sessionSetTime * 100 + '%'; 
			$('#session-bar-remainder-indicator').css('width', percent);
		}
		else {
			var percent = breakTime / breakSetTime * 100 + '%'; 
			$('#break-bar-remainder-indicator').css('width', percent);
		}
	}

	function startClock(clock) {
		if (clock === 'session') {
			runSessionClock();
		}
		else {
			runBreakClock();
		}
	}

	function triggerAlarm(newClock) {
		
		var startNewClock = function(event) {
			$('.alarm').remove();
			startClock(newClock);
		}
		
		$('body').prepend("<div class='alarm'></div>");
		
		$('.alarm').on('click', function(){
			$(this).remove();
			startClock(newClock);
		})
		
		$('.alarm').on('animationend', startNewClock);
	}

	changeTimeDisplay('session');
	changeTimeDisplay('sessionSet');
	changeTimeDisplay('break');
	changeTimeDisplay('breakSet');

	setBarWidth();

	$('#stopStart').on('click', toggleClock);

	$('#addSessionMinute').on('click', {clock: "session"}, function(e){
		addTime(e);
		setBarWidth();
	});
	$('#subtractSessionMinute').on('click', {clock: "session"}, function(e){
		subtractTime(e);
		setBarWidth();
	});

	$('#addBreakMinute').on('click', {clock: "break"}, function(e){
		addTime(e);
		setBarWidth();
	});
	$('#subtractBreakMinute').on('click', {clock: "break"}, function(e){
		subtractTime(e);
		setBarWidth();
	});

})(jQuery);