var time = 1000
var timeInSeconds;

timeInSeconds = time / 1000;

function clock() {
	window.setTimeout(function() {
		console.log("ring!!!!!, (it's a start)");
	}, time)
}

$('#time').text(timeInSeconds + " seconds");

$('#start-timer').on('click', clock)

// clock();