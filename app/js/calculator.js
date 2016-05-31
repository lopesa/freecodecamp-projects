var equation = '';
var previousAnswer = '';


var setDisplay = function setDisplay(newVal) {
	$('#display').text(newVal);
};

var enterItem = function enterItem(elem) {
	var value = $(elem).html();
	equation = equation.concat(value);
	setDisplay(equation);
};

var evaluateEquation = function evaluateEquation() {
	var evaluatedEquation;
	
	// convert percents to decimal equivalents
	makePercents();

	evaluatedEquation = eval(equation)

	setDisplay(evaluatedEquation);
	previousAnswer = evaluatedEquation.toString();
	equation = '';
};

var allClear = function allClear() {
	equation = '';
	setDisplay(equation);
}

var backSpace = function backSpace() {
	equation = equation.slice(0, equation.length-1)
	setDisplay(equation);
}

var ans = function ans() {
	equation = previousAnswer;
	setDisplay(equation);
}

var equationToArray = function equationToArray() {
	var re = /([^0-9\(\)\.%])/;
	// console.log(equation.split(re));
	return equation.split(re);
};


var posNeg = function posNeg() {
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
}

var enterPercent = function enterPercent() {
	if (equation.charAt(equation.length - 1) === '*') {
		equation = 'Wrong Format';
	}
	else {
		equation = equation.concat('%');
	}
	setDisplay(equation);
}

var makePercents = function makePercents(){
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
}