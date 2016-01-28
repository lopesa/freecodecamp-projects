///////////////////////////////////////////////////////////////////
// Flatten a nested array. You must account for varying levels of nesting.
///////////////////////////////////////////////////////////////////

function steamroller(arr) {
	
	var test = arr.filter(function(elem) {
		return Array.isArray(elem)
	});
	
	if (test.length === 0) {
		return arr;
	}

	else {

		var newArray = [];
		
		arr.forEach(function(elem) {
			
			if (Array.isArray(elem)) {
				elem.forEach(function(subElem) {
					newArray.push(subElem);
				});
			}
			else {
				newArray.push(elem);
			}

		});

		return steamroller(newArray);
	}
}

// test
steamroller([1, [2], [3, [[4]]]]);






///////////////////////////////////////////////////////////////////
// Drop the elements of an array (first argument),
// starting from the front, until the predicate (second argument) returns true.

// Return the rest of the array, otherwise return an empty array.
///////////////////////////////////////////////////////////////////

function drop(arr, func) {
	var i = 0;
	originalArrayLength = arr.length;
	
	while (i < originalArrayLength) {
		
		if (func(arr[0]) === false) {
			arr.shift();
		}

		i++;
	}
	
	return arr;
}

// test

drop([1, 2, 3, 4], function(n) {return n >= 3;}) // [3,4]








///////////////////////////////////////////////////////////////////
// Create a function that looks through an array (first argument)
// and returns the first element in the array that passes a truth test (second argument).
///////////////////////////////////////////////////////////////////

function find(arr, func) {
	arr = arr.filter(func);
	return arr[0]
}

// test

find([1, 2, 3, 4], function(num){ return num % 2 === 0; });





///////////////////////////////////////////////////////////////////
// Find the smallest common multiple of the provided parameters
// that can be evenly divided by both, as well as by all
// sequential numbers in the range between these parameters.
///////////////////////////////////////////////////////////////////

function smallestCommons(arr) {
	// build the array from the endpoints
	var small;
	var big;
	var fullArr = [];
	
	if (arr) {
		arr[0] < arr[1] ? (small = arr[0], big = arr[1]) : (small = arr[1], big = arr[0]);
	}
	else {
		return 1;
	}
	// console.log("small is " + small + ", big is " + big);
	while (small <= big) {
		fullArr.push(small);
		small++;
	}
	// array built


	function testTheArray (fullArray, denom) {

		filteredArray = fullArray.filter(function(elem) {
			return denom % elem === 0;
		});

		while( filteredArray.length !== fullArray.length ){
			denom++;
			filteredArray = fullArray.filter(function(elem) {
				return denom % elem === 0;
			});
		}

		return denom;		
	}
	
	return testTheArray(fullArr, 1);
}

// recursive version that throws stack overflow, I don't see why.
// throws stack overflow @ smallestCommons([1,10]);, but not smallestCommons([1,9]);
// so, I solved this above NOT using recursion. Was using recursion not possible
// on this one?
function smallestCommonsNOTWORKING(arr) {
	// build the array from the endpoints
	var small;
	var big;
	var fullArr = [];

	arr[0] < arr[1] ? (small = arr[0], big = arr[1]) : (small = arr[1], big = arr[0]);
	// console.log("small is " + small + ", big is " + big);
	while (small <= big) {
		fullArr.push(small);
		small++;
	}
	// array built

	var flag = "fail";

	function testTheArray (fullArray, denom) {


		if (flag !== "fail") {
			// console.log("fucking fuck")
			return denom;
		}
		else {
			flag = "pass"
			denom++;
		}

		fullArray.forEach(function(elem) {
			if (denom % elem !== 0) {
				flag = "fail";
			}
		})

		return testTheArray(fullArr, denom);
		// var i = 0;
		
		// while (i < fullArray.length) {
		// 	if (denom % fullArray[i] !== 0) {
		// 		flag = "fail";
		// 		// break;
		// 	}
		// 	// else {
		// 	i++;
		// 	// }
		// }
	}

	return testTheArray(fullArr, 1);
}

// test 

smallestCommons([1,5]);






///////////////////////////////////////////////////////////////////
// Sum all primes
///////////////////////////////////////////////////////////////////

function sumPrimes(num) {
	var sum = 2
	
	for (var i = 2; i <= num; i++) {

		var prime = false;
		
		for (var j = 2; j < i; j++) {
			
			if (i % j === 0) {
				prime = false;
				break;
			}
			else {
				prime = true;
			}
		}

		if (prime === true) {
			sum += i;
		}

		prime = false;
	}

	return sum;
}


// test
sumPrimes(10);




///////////////////////////////////////////////////////////////////
// Sum all odd Fibonacchi Numbers
///////////////////////////////////////////////////////////////////

function sumFibs(num) {
	
	var sequence = [1];
	var sum = 1;
	
	function internal(seq) {
		current = seq[seq.length - 1];
		seq.length > 1 ? previous = seq[seq.length - 2] : previous = 0;

		if (current + previous <= num) {
			sequence.push(current + previous);
			
			if ((current + previous) % 2 != 0) {
				sum += (current + previous);
				console.log(sum);
			}
			
			return internal(sequence);
		}
		
		else {
			return sum
		}
	}
	return internal(sequence);;
}

// test
sumFibs(4);





///////////////////////////////////////////////////////////////////
// Convert a string to spinal case.
// Spinal case is all-lowercase-words-joined-by-dashes.
///////////////////////////////////////////////////////////////////

function spinalCase(str) {
	// "It's such a fine line between stupid, and clever."
	// --David St. Hubbins

	// todo, the cleanUpSpaces function is a last minute fix and shows flawed logic in the initial
	// design. Fix that. But for now this works and my head hurts.

	// to note though: what happened is I didn't read the specs well enough from the outset.
	var re = /[A-Z]/;
	var reAnyLetter = /[A-Za-z0-9]/;
	var spaces = /\s/;

	function replaceCaps(str){
		// if no caps, just return it, ie if we're done with this recursion
		if (str.match(re) === null) {
			return str;
		}
		// if there are caps...
		// todo: figure out if there's a better way than this nested if then thing
		// it IS only nested one level though
		else {
			// if first cap is first letter, lowercase it and send it back into the loop
			if (str.indexOf(str.match(re)) === 0) {
				str = str.replace(re, str.match(re)[0].toLowerCase());
				return replaceCaps(str);
			}
			// if it's not the first letter and there's NOT another letter preceding it
			// replace that character with the dash and replace the cap with the lowercase
			else if (str.charAt(str.indexOf(str.match(re)) - 1).match(reAnyLetter) === null) {
				var newReplace = str.charAt(str.indexOf(str.match(re)) - 1);
			
				str = str.replace(newReplace, "-");
				str = str.replace(re, str.match(re)[0].toLowerCase());

				return replaceCaps(str);
			}
			// else it must be another letter next to it
			else {
				console.log("gets here in previous IS a letter?")
				str = str.replace(re, "-" + str.match(re)[0].toLowerCase());
				return replaceCaps(str);
			}
		}
	}

	function cleanUpSpaces(str) {
		if (str.match(spaces) === null) {
			return str;
		}
		else {
			str = str.replace(spaces, "-");
			return str;
		}
	}
	
	str = replaceCaps(str);
	str = cleanUpSpaces(str);
	return str;
}

// test
spinalCase('This Is Spinal Tap');




///////////////////////////////////////////////////////////////////
// Convert the characters &, <, >, " (double quote),
// and ' (apostrophe), in a string to their corresponding HTML entities.
///////////////////////////////////////////////////////////////////

function convert(str) {

	// & = &amp;
	// < = &lt;
	// > = &gt;
	// " = &quot;
	// ' = &apos;
	var re = /[&<>"']/g

	function replacer(match) {
		switch (match) {
			case "&":
				return "&amp;";
				break;
			case "<":
				return "&lt;";
				break;
			case ">":
				return "&gt;";
				break;
			case '"':
				return "&quot;";
				break;
			case "'":
				return "&apos;";
				break;
		}
	}

	str = str.replace(re, replacer);

	return str;
}

// test
convert("Dolce & Gabbana");





///////////////////////////////////////////////////////////////////
// Write a function that takes two or more arrays and returns a new array
// of unique values in the order of the original provided arrays.
///////////////////////////////////////////////////////////////////

function unite(arr1, arr2, arr3) {

	var argumentsArray = [];
	var i = 0;

	function compare(a, b) {
		var newArray = []
		
		if (a && b) {
			newArray = b.filter(function(elem) {
				return a.indexOf(elem) == -1;
			});
		}

		return a.concat(newArray);
	};

	// make the Arguments object into a real array.
	while (i < arguments.length) {
		argumentsArray.push(arguments[i]);
		i++;
	}

	// do the reduce.

	// subtle-ish note. the following does not work (and cost me some time to think about)
	// arr1 = argumentsArray.reduce(compare());
	// but it makes sense bc that executes compare before the reduce, i think. duh.

	arr1 = argumentsArray.reduce(compare);

	return arr1;

}

// test
unite([1, 3, 2], [5, 2, 1, 4], [2, 1]);






///////////////////////////////////////////////////////////////////
// Check if a value is classified as a boolean primitive. Return true or false.
///////////////////////////////////////////////////////////////////

function boo(bool) {
	if (bool === true || bool === false) {
		bool = true;
	}
	else bool = false;

	return bool;
}

// test
boo(null);




///////////////////////////////////////////////////////////////////
// Find the missing letter in the passed letter range and return it.
///////////////////////////////////////////////////////////////////

function fearNotLetter(str) {
	var i = 0;
	var currentCode = str.charCodeAt(i);
	
	while (i < str.length) {
		if (i < str.length - 1 && currentCode + 1 != str.charCodeAt(i+1)) {
			// str = str.replace(str.charAt(i), String.fromCharCode(currentCode, currentCode+1));
			// return str;
			return String.fromCharCode(currentCode+1);
		}
		else {
			i++;
			currentCode = str.charCodeAt(i);
		}
	}		
}

// test
fearNotLetter("abce");




///////////////////////////////////////////////////////////////////
// The DNA strand is missing the pairing element.
// Take each character, get its pair, and return the results as a 2d array.
///////////////////////////////////////////////////////////////////

function pair(str) {
	str = str.split("");
	str = str.map(function(elem) {
		elem = elem.split("");
		switch (elem[0]) {
			case "G":
				elem.push("C");
				break;
			case "C":
				elem.push("G");
				break;
			case "A":
				elem.push("T");
				break;
			case "T":
				elem.push("A");
				break;
		}

		return elem;
	})
	return str;
}

// test
pair("GCG");




///////////////////////////////////////////////////////////////////
// Translate the provided string to pig latin.
///////////////////////////////////////////////////////////////////

function translate(str) {
	// do all ops on string before converting to array
	var firstVowel = /[aeiou]+/gi.exec(str);

	var firstConsonantGroup = /[^aeiou]+/gi.exec(str);
	var beginRemove = firstConsonantGroup.index;
	var qtyRemove = firstConsonantGroup[0].length;
	
	// only turn to array at this point
	str = str.split("");
	
	if (firstVowel.index != 0) {
		var removed = str.splice(beginRemove, qtyRemove)
		removed = removed.join("")
		str.push(removed);
		str.push("ay");
	}
	else {
		str.push("way");
	}
	str = str.join("");
	return str;
}


// test
translate("consonant");



///////////////////////////////////////////////////////////////////
// Perform a search and replace on the sentence using the arguments provided
// and return the new sentence.
///////////////////////////////////////////////////////////////////

function myReplace(str, before, after) {
	str = str
		.split(" ").map(function(elem) {
			if (elem === before) {
				if (before.charAt(0) === before.charAt(0).toUpperCase()) {
					after = after.split("");
					after.splice(0, 1, after[0].toUpperCase());
					after = after.join("");
				}
				elem = after;
			}
			return elem;
		})
		.join(" ")
	return str;
}

// test
myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");






///////////////////////////////////////////////////////////////////
// Make a function that looks through an array of objects (first argument)
// and returns an array of all objects that have matching property
// and value pairs (second argument).
///////////////////////////////////////////////////////////////////

function where(collection, source) {
	var arr = [];
	
	if (source) {
		var checkerKeys = Object.keys(source);
	}
	
	if (collection) {
		collection.forEach(function(elem) {
			var flag = true;
			for (var key in source) {
				if (elem.hasOwnProperty(key)) {
					if (elem[key] != source[key]) {
						flag = false;
					}
				}
				else {
					flag = false;
				}
			}

			if (flag === true) {
				arr.push(elem);
			}
		});
	}

	return arr;
}

// test
where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });




///////////////////////////////////////////////////////////////////
// Roman numeral converter
///////////////////////////////////////////////////////////////////

function convert(num) {
	var buildupArray = [];

	if (num >= 10) {
		var numberOfX = Math.floor(num / 10);
		
		while (numberOfX > 0) {
			buildupArray.push('X')
			numberOfX --;
		}

		num = num % 10;
	}

	if (num == 9) {
		buildupArray.push('IX');
		num = 0;
	}

	if (num < 9) {
		var numberOfV = Math.floor(num / 5);
		
		while (numberOfV > 0) {
			buildupArray.push('V');
			numberOfV --;
		}

		num = num % 5;
	}

	if (num == 4) {
		buildupArray.push('IX');
		num = 0;
	}

	if (num < 4) {
		while (num > 0) {
			buildupArray.push('I');
			numberOfV --;
			num--
		}
	}

	if (num == 0) {
		num = buildupArray.join("");
		return num;
	}
	return num;
}

// test
convert(36);



///////////////////////////////////////////////////////////////////
// Diff two arrays
///////////////////////////////////////////////////////////////////

function diff(arr1, arr2) {
	var newArr = [];
	
	function compare(a, b) {
		var newArray = []
		
		if (a && b) {
			newArray = a.filter(function(elem) {
				return b.indexOf(elem) == -1;
			});
		}

		return newArray;
	}

	return newArr.concat(compare(arr1, arr2), compare(arr2, arr1));
}

// test
diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);




///////////////////////////////////////////////////////////////////
// Sum All Numbers in a Range
///////////////////////////////////////////////////////////////////

function sumAll(arr) {
	var max = Math.max.apply(null, arr);
	var min = Math.min.apply(null, arr);

	var builtArray = function(min, max) {
		var newArray = [];
		
		while (min <= max) {
			console.log('it gets here');
			newArray.push(min);
			min ++
		}
		return newArray;
	}

	var finalSum = builtArray(min, max).reduce(function(a,b) {
		return a + b;
	});

	return finalSum;
}

// test
sumAll([1, 4]);






///////////////////////////////////////////////////////////////////
// Return the lowest index at which a value (second argument)
// should be inserted into an array (first argument)
// once it has been sorted.
///////////////////////////////////////////////////////////////////

function where(arr, num) {
	var n = 0
	while (n <= arr.length) {
		if (num <= arr[n]) {
			return n;
		}
		n++;
	};

	n = arr.length;
	return n;
}

// test
where([40, 60], 50);




///////////////////////////////////////////////////////////////////
// Remove all elements from an array that are of the same value
// as any number of arguments
///////////////////////////////////////////////////////////////////

function destroyer(arr) {
	// standard line to convert from arguments sorta array
	// to a real array with all array methods

	// actually it kinda looks like this is bad for optimization later per mdn
	var args = Array.prototype.slice.call(arguments);
	testee = args.shift([0]);
	tester = args;

	var finalArray = testee.filter(function(testeeElem) {
		return tester.indexOf(testeeElem) == -1;
	});
	return finalArray;
}

// test
destroyer([1, 2, 3, 1, 2, 3], 2, 3);




///////////////////////////////////////////////////////////////////
// Remove all falsy values from an array.
///////////////////////////////////////////////////////////////////

function bouncer(arr) {
	arr = arr.filter(function(elem) {
		return Boolean(elem) != false;
	})
	return arr;
}

// test
bouncer([7, "ate", "", false, 9]);






///////////////////////////////////////////////////////////////////
// Return true if the string in the first element of the array
// contains all of the letters of the string in the
// second element of the array
///////////////////////////////////////////////////////////////////

function mutation(arr) {
	var contains = arr[0].toLowerCase().split("");
	var contained = arr[1].toLowerCase().split("");

	arr = true

	contained.forEach(function(elem) {
		if (contains.indexOf(elem) === -1) {
			arr = false;
			return;
		}
	});

	return arr;
}

// test
mutation(["hello", "hey"]);




///////////////////////////////////////////////////////////////////
// Return the remaining elements of an array after chopping off n elements from the head.
///////////////////////////////////////////////////////////////////

function slasher(arr, howMany) {
	arr.length > howMany ? arr = arr.slice(howMany, arr.length) : arr = [];

	return arr;
}

// test
slasher([1, 2, 3], 2);




///////////////////////////////
// splits an array into groups
///////////////////////////////

function chunk(arr, size) {

	var newArray = [];
	var newSubArray = [];
	
	arr.forEach(function(elem) {
		if (newSubArray.length < size) {
			newSubArray.push(elem);
		}
		else {
			newArray.push(newSubArray);
			newSubArray = [];
			newSubArray.push(elem);
		}
	})

	if (newSubArray.length != 0) {
		newArray.push(newSubArray);
	}

	arr = newArray;

	return arr;
}

// test
chunk(["a", "b", "c", "d"], 2);





///////////////////////////////
// Repeat a string
///////////////////////////////

function truncate(str, num) {
	if (str.length > num){
		var newStrTextLength;
		num > 3 ? newStrTextLength = num - 3 : newStrTextLength = num;
		
		str = str.slice(0, newStrTextLength) + "...";
	}
	return str;
}

truncate("A-tisket a-tasket A green and yellow basket", 11);





///////////////////////////////
// Repeat a string
///////////////////////////////

function repeat(str, num) {
	var args = [];
	while (num >= 1) {
		args.push(str);
		num --
	}
	str = args.join("");
  return str;
}

// test
repeat("abc", 3);




///////////////////////////////
// Check if a string (first argument) ends with the given target string
///////////////////////////////

function end(str, target) {
	return str.substr(-target.length, target.length) === target ? true : false;
}

// test
end("Bastian", "n");






///////////////////////////////
// Return largest numbers in arrays
///////////////////////////////

function largestOfFour(arr) {
	arr = arr.map(function(a) {
		a.reduce(function(b,c) {
			b > c ? a = b : a = c;
			return a;
		});
		return a;
	});
  return arr;
}

// test
largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);




///////////////////////////////
// Title case a sentence
///////////////////////////////

function titleCase(str) {
	str = str
		.toLowerCase()
		.split(" ")
		.map(function(item) {
			item = item.charAt(0).toUpperCase() + item.slice(1);
			return item;
		})
		.join(" ");

  return str;
}

// test
titleCase("I'm a little tea pot");




///////////////////////////////
// Find the longest word in a string
///////////////////////////////

function findLongestWord(str) {
	str.split(" ").reduce(function(a,b){
		a.length > b.length ? str = a : str = b;
		return str;
	});
	return str.length;
}

function reverseString(str) {
  var str = str.split("").reverse();
  return str;
}

// test
reverseString("A man, a plan, a canal. Panama");




///////////////////////////////
// Factorialize a number
///////////////////////////////

function factorialize(num) {
	var temp = 1;
	while (num > 1) {
		temp *= num;
		num--;
	}
	num = temp;
  return num;
}

// test
factorialize(5);




///////////////////////////////
// Check for palindromes
///////////////////////////////

function palindrome(str) {

	var cleanString = str.toLowerCase().replace(/[^A-Za-z0-9]/gi, "");

	function reverseString(cleanString) {
		var revString = cleanString.split("").reverse().join("");
		return revString;
	}

	var revStr = reverseString(cleanString);

	if (revStr === cleanString) {

		return true;
	}
	else {return false;}
}

// test
palindrome("eye");



///////////////////////////////
// Reverse a string
///////////////////////////////

function reverseString(intstr) {
	var intstr = intstr.toLowerCase().replace(/[^A-Za-z0-9]/gi, "").split("").reverse().join("");
	return intstr;
}
reverseString();

// test
reverseString("hello");

