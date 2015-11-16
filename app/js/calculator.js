var display = 0;
var operater = false;
var firstOperand;

function enterNumber(elem) {
	var value = $(elem).html();
	
	if (display === 0) {
		setDisplay(value);
	}
	else {
		var newDisplay = display.concat(value);
		setDisplay(newDisplay);
	}
}

function setOperater(op) {
	firstOperand = display;
	operater = op;
	display = 0;
}

function doMath() {
	var mathResult;
	switch (operater) {
		case "add":
			mathResult = Number(firstOperand) + Number(display);
			setDisplay(mathResult)
			break;
		case "subtract":
			mathResult = Number(firstOperand) - Number(display);
			setDisplay(mathResult)
			break;
		case "multiply":
			mathResult = Number(firstOperand) * Number(display);
			setDisplay(mathResult)
			break;
		case "divide":
			mathResult = Number(firstOperand) / Number(display);
			setDisplay(mathResult)
			break;
	}
}
 

function setDisplay(newVal) {
	display = newVal;
	$('#display').text(newVal);
}