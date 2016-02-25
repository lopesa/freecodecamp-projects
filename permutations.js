function permAlone(str) {
  var strAsArray = [];
  var i = 0;
    while (i < str.length) {
        strAsArray.push(str[i]);
        i++;
    }

  // permutation = permutation.slice(0);
  // var newArray = 

  strAsArray.forEach(function(el) {
  	var orig = strAsArray.slice(0);
  	var next = orig.splice(0, 1)
  	console.log("orig is" + orig);
  	console.log("strAsArray is" + strAsArray)
  })

  // return strAsArray;
}

permAlone('abcd');