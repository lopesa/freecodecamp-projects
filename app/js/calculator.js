var display = '',
equation = [],
previousAnswer,
currentInput = '',



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
		console.log(currentInput);
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
	equation.push(currentInput);
	evaluateEquation();
},

allClear = function allClear() {
	equation = [];
	setDisplay(equation);
},

backSpace = function backSpace() {

	// equation = equation.slice(0, equation.length-1)
	setDisplay(equation);
},

ans = function ans() {
	equation = previousAnswer;
	setDisplay(equation);
},

equationToArray = function equationToArray() {
	var re = /([^0-9\(\)\.%])/;
	// console.log(equation.split(re));
	return equation.split(re);
},


posNeg = function posNeg() {
	console.log(equationToArray());
	
	var newEntry = equationToArray().pop();
	
	// if it's already negative, remove the parentheses
	if (newEntry[0] === '(') {
		newEntry = newEntry.slice(1,3);
	}
	
	var oppositeNewEntry = 0 - newEntry;

	// if it's now negative add the parentheses
	if (oppositeNewEntry < 0) {
		oppositeNewEntry = '(' + oppositeNewEntry + ')';
	}


	equation = equationToArray();
	equation.splice(-1,1);
	equation.push(oppositeNewEntry);
	equation = equation.join('');

	setDisplay(equation);
},

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