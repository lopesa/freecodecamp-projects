import $ from 'jquery';

var display = '',
equation = [],
previousAnswer,
currentInput = '',
operatorsOnly = /[*/+-]/,
operators = /[*/+-.]/,
signChangeStarted = false,



setDisplay = function setDisplay(value) {
	// console.log(typeof(value));
	
	if (typeof(value) === 'object') {
		value = value.join('');
	}
	display = value;
	
	console.log('display: ', display);
	
	$('#display').text(display);
},

interpretCurrentInput = function interpretCurrentInput() {
	var evaluatedEquation,
		originalEquation = equation;

		console.log('display.charAt(display.length))', display.charAt(display.length))

	if (display.charAt(display.length - 1) === '%') {
		
		if (operators.test(display.charAt(display.length))) {
			var operator = equation.pop();
		}
		// console.log('operator: ', operator);

		evaluatedEquation = eval(equation.join(''));
		// newEquation.push(evaluatedEquation, operator, parseInt(currentInput, 10) / 100);

		equation = originalEquation;

		// console.log('newEquation: ', newEquation)
		// console.log('evaluatedEquation: ', evaluatedEquation);
		// console.log('currentInput: ', currentInput)
		currentInput = parseInt(currentInput, 10) / 100 * evaluatedEquation;

		evaluatedEquation = '';
		// console.log('currentInput: ', currentInput)
	}

	else {
		currentInput = parseInt(currentInput, 10);
	}
},

enterItem = function enterItem(elem) {
	var thisKey = $(elem).html();
		// evaluatedEquation,
		// originalEquation = equation;

		
		console.log('equation', equation);

	if (operators.test(thisKey)) {

		
		if (signChangeStarted === true) {
			setDisplay(display.concat(')'));
			signChangeStarted = false;
		}

		console.log('last char of display; ', display.charAt(display.length));

		// if (display.charAt(display.length - 1) === '%') {
		// 	var operator = equation.pop();
		// 	// console.log('operator: ', operator);

		// 	evaluatedEquation = eval(equation.join(''));
		// 	// newEquation.push(evaluatedEquation, operator, parseInt(currentInput, 10) / 100);

		// 	equation = originalEquation;

		// 	// console.log('newEquation: ', newEquation)
		// 	// console.log('evaluatedEquation: ', evaluatedEquation);
		// 	// console.log('currentInput: ', currentInput)
		// 	currentInput = parseInt(currentInput, 10) / 100 * evaluatedEquation;

		// 	evaluatedEquation = '';
		// 	// console.log('currentInput: ', currentInput)
		// }

		// else {
		// 	currentInput = parseInt(currentInput, 10);
		// }

		interpretCurrentInput();
		
		// console.log('currentInput', currentInput);

		equation.push(currentInput, thisKey);

		// console.log('equation', equation);
		
		currentInput = '';
		
		// console.log(equation);
	}

	else {
		// console.log('signChangeStarted', signChangeStarted);
		currentInput = currentInput.concat(thisKey);
		// console.log(currentInput);
	}

	setDisplay(display.concat(thisKey));
},

evaluateEquation = function evaluateEquation() {
	var evaluatedEquation;
	
	// convert percents to decimal equivalents
	// makePercents();

	evaluatedEquation = eval(equation.join(''))
	// console.log(evaluatedEquation);

	setDisplay(evaluatedEquation);
	previousAnswer = evaluatedEquation;
	equation = [];
},

equals = function equals() {
	interpretCurrentInput();
	equation.push(currentInput);
	evaluateEquation();
},

allClear = function allClear() {
	equation = [];
	currentInput = '';
	setDisplay(equation);
},

backSpace = function backSpace() {
	console.log('current input:', currentInput);
	if (currentInput === '') {
		equation.pop();
		setDisplay(equation);
	}
	else {
		currentInput = Math.floor(currentInput/10);
		setDisplay(display.slice(0,-1));
	}
},

ans = function ans() {
	currentInput = previousAnswer.toString();
	setDisplay(currentInput);
},

posNeg = function posNeg() {
	var newDisplay,
	
		findLastOp = function findLastOp() {
			for (var i = display.length-1; i >= 0; i--) {
				if (display[i].search(operatorsOnly) !== -1) {
					return i;
				}
			}
		}

	if (currentInput === '') {
		currentInput = '-';
		signChangeStarted = true;
		setDisplay(display.concat('(-'))
		
	} else if (currentInput > 0) {
		currentInput = 0 - currentInput;
		
		newDisplay = display.slice(0, findLastOp() + 1)
			+ '(-'
			+ display.slice(findLastOp() + 1, display.length)
			+ ')';

		setDisplay(newDisplay);

	} else if (currentInput < 0) {
		currentInput = 0 - currentInput;

		newDisplay = display.slice(0, findLastOp() - 1)
			+ display.substring(findLastOp() + 1, display.length - 1);

		setDisplay(newDisplay);
	}	
},

enterPercent = function enterPercent() {
	// console.log('equation: ', equation.length);
	console.log('display:', display.charAt(display.length-1));
	if (display.length !== 0 && display.charAt(display.length) !== '%') {
		display = display + '%';
		// setDisplay(display);
	}
	else	{
		display = 'Wrong Format';
	}
	// else {
	// 	equation = equation.concat('%');
	// }
	setDisplay(display);
},

buildButtons = () => {
	Array.from(document.getElementsByClassName('jsEnterItem')).forEach( item  => {
		
		item.onclick = e => enterItem(e.target);
	});

	document.getElementsByClassName('jsEquals')[0].onclick = equals;
	document.getElementsByClassName('jsAllClear')[0].onclick = allClear;
	document.getElementsByClassName('jsBackSpace')[0].onclick = backSpace;
	document.getElementsByClassName('jsAns')[0].onclick = ans;
	document.getElementsByClassName('jsEnterPercent')[0].onclick = enterPercent;
	document.getElementsByClassName('jsPosNeg')[0].onclick = posNeg;
};


window.onload = function(){
	buildButtons();
}

// makePercents = function makePercents(){
// 	var newEntry = equationToArray().pop();
// 	var baseEntry = equationToArray().shift();
	
// 	equation = equationToArray();

// 	equation = equation.map(function(el){
// 		if (el.includes('%')) {
// 			el = el.substring(0, el.length - 1);
// 			el = el * .01 * baseEntry;
// 		}
// 		return el;
// 	})

// 	equation = equation.join('');
// };