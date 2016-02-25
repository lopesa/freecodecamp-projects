function permAlone(str) {
    var strAsArray = [];
    var permutations = [];
    var permutation = [];
    


    var counter = 1;
    var currentIndex = 0;

    function makePermutations() {
        if (currentIndex < strAsArray.length) {
            if (counter === 1) {
                permutation = strAsArray.slice(0);
                var newFirst = permutation.splice(currentIndex, 1)
                permutation.unshift(newFirst[0]);
                permutations.push(permutation);
                counter++
                makePermutations()
            }  
            else {
                flipLastTwo();
                permutations.push(permutation);
                counter = 1;
                currentIndex++;
                makePermutations();
            } 
        }
        else {
            // console.log(permutations);
            // return permutations;
            return;

        }    
    }
    

    function flipLastTwo() {
        permutation = permutation.slice(0);
        var last = permutation.pop();
        permutation.splice(1, 0, last)
    }
    
    // string into array
    var i = 0;
    while (i < str.length) {
        strAsArray.push(str[i]);
        i++;
    }

    // create intial permutation array, just the string as an array
    
    // was creating a reference to the aray without slice
    // that's news, knew it about objects
    // didn't think it was true for arrays
    // permutation = strAsArray.slice(0);
    
    permutation = strAsArray.slice(0);
    makePermutations();

    return permutations;



}

permAlone('abc');
