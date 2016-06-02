var display = '',
equation = [],
previousAnswer,
currentInput = '',
operatorsOnly = /[*/+-]/,



setDisplay = function setDisplay(value) {
	// console.log(typeof(value));
	if (typeof(value) === 'object') {
		value = value.join('');
	}
	display = value;
	// console.log(value);
	$('#display').text(display);
},

enterItem = function enterItem(elem) {
	var operators = /[*/+-.]/,
		thisKey = $(elem).html();

		// console.log(thisKey);
		// console.log(currentInput);

	if (operators.test(thisKey)) {
		// console.log(true);

		currentInput = parseInt(currentInput, 10);

		equation.push(currentInput, thisKey);
		
		currentInput = '';
		
		console.log(equation);
	}

	else {
		currentInput = currentInput.concat(thisKey);
		// console.log(currentInput);
	}
	// var value = $(elem).html();
	// console.log(value);
	// equation.push($(elem).html());
	// console.log(equation);
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
	// console.log(currentInput);
	equation.push(currentInput);
	// console.log(equation);
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
		console.log(typeof(display));
		// currentInput.splice(-1,1);
		setDisplay(display.slice(0,-1));
	}
	// console.log(equation);

	// equation = equation.slice(0, equation.length-1)
},

ans = function ans() {
	equation = previousAnswer;
	setDisplay(equation);
},

// equationToArray = function equationToArray() {
// 	var re = /([^0-9\(\)\.%])/;
// 	// console.log(equation.split(re));
// 	return equation.split(re);
// },

posNeg = function posNeg() {
	// console.log('display.length: ', display.length);
	var newDisplay,
	
		findLastOp = function findLastOp() {
		// console.log(display.length)
		for (var i = display.length-1; i >= 0; i--) {
			// console.log('charAt ' + i + ': ', display.charAt(i))
			if (display[i].search(operatorsOnly) !== -1) {
				// console.log(display[i].search(operatorsOnly))
				// console.log(i);
				return i;
			}
		}
	}

	if (currentInput === '') {
		currentInput = '-';
		setDisplay(display.concat('(-'))
		
	} else if (currentInput > 0) {
		currentInput = 0 - currentInput;
		// findLastOp();
		// console.log('currentInput: ', currentInput);
		// console.log('equation: ', equation);
		// console.log('display: ', display);
		// console.log('findLastOp: ', findLastOp());
		// console.log('charAt: ', display.charAt(2))

		// console.log(typeof(display));
		// console.log(display.slice(0, findLastOp() + 1));
		// console.log(display.slice(findLastOp() + 1, display.length));
		
		newDisplay = display.slice(0, findLastOp() + 1)
			+ '(-'
			+ display.slice(findLastOp() + 1, display.length)
			+ ')';
		// console.log(newDisplay);

		setDisplay(newDisplay);

		console.log(currentInput);
		// setDisplay(function() {
		// 	return display.slice(0, findLastOp() + 1) +
		// 		'(-' +
		// 		display.slice(findLastOp(), display.length) +
		// 		')';
		// });
	} else if (currentInput < 0) {
		currentInput = 0 - currentInput;

		// console.log(display.slice(0, findLastOp() - 1));
		// console.log(display.substring(findLastOp() + 1, display.length - 1));

		newDisplay = display.slice(0, findLastOp() - 1)
			+ display.substring(findLastOp() + 1, display.length - 1);

		setDisplay(newDisplay);

		console.log(currentInput);
	}	
},

// posNeg = function posNeg() {
// 	console.log(equationToArray());
	
// 	var newEntry = equationToArray().pop();
	
// 	// if it's already negative, remove the parentheses
// 	if (newEntry[0] === '(') {
// 		newEntry = newEntry.slice(1,3);
// 	}
	
// 	var oppositeNewEntry = 0 - newEntry;

// 	// if it's now negative add the parentheses
// 	if (oppositeNewEntry < 0) {
// 		oppositeNewEntry = '(' + oppositeNewEntry + ')';
// 	}


// 	equation = equationToArray();
// 	equation.splice(-1,1);
// 	equation.push(oppositeNewEntry);
// 	equation = equation.join('');

// 	setDisplay(equation);
// },

enterPercent = function enterPercent() {
	if (equation.charAt(equation.length - 1) === '*') {
		equation = 'Wrong Format';
	}
	else {
		equation = equation.concat('%');
	}
	setDisplay(equation);
},

makePercents = function makePercents(){
	var newEntry = equationToArray().pop();
	var baseEntry = equationToArray().shift();
	
	equation = equationToArray();

	equation = equation.map(function(el){
		if (el.includes('%')) {
			el = el.substring(0, el.length - 1);
			el = el * .01 * baseEntry;
		}
		return el;
	})

	equation = equation.join('');
};