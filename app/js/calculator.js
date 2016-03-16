// var display = 0;
// var operater = false;
// var firstOperand = false;

var equation = ''
var previousAnswer = '';


var setDisplay = function (newVal) {
	// display = newVal;
	$('#display').text(newVal);
};


var enterItem = function (elem) {
	var value = $(elem).html();

	equation = equation.concat(value);

	setDisplay(equation);
};

var evaluateEquation = function() {
	var evaluatedEquation = eval(equation);
	setDisplay(evaluatedEquation);
	previousAnswer = evaluatedEquation.toString();
	equation = '';
};

var allClear = function() {
	equation = '';
	setDisplay(equation);
}

var backSpace = function() {
	equation = equation.slice(0, equation.length-1)
	setDisplay(equation);
}

var ans = function() {
	equation = previousAnswer;
	setDisplay(equation);
}

var percent = function() {
	// if (firstOperand) {
	// 	var percentVal = display / 100 * firstOperand;
	// 	setDisplay(percentVal);
	// }
	// else {
		setDisplay(display / 100);
	// }
}

// function setOperater(op) {
// 	firstOperand = display;
// 	operater = op;
// 	display = 0;
// }

// function doMath() {
// 	var mathResult;
// 	switch (operater) {
// 		case "add":
// 			mathResult = Number(firstOperand) + Number(display);
// 			setDisplay(mathResult);
// 			break;
// 		case "subtract":
// 			mathResult = Number(firstOperand) - Number(display);
// 			setDisplay(mathResult);
// 			break;
// 		case "multiply":
// 			mathResult = Number(firstOperand) * Number(display);
// 			setDisplay(mathResult);
// 			break;
// 		case "divide":
// 			mathResult = Number(firstOperand) / Number(display);
// 			setDisplay(mathResult);
// 			break;
// 	}
// }




// function posNeg() {
// 	setDisplay(-display);
// }





