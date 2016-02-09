(function($) {
	// quotes from here (curation):
	// http://www.javacodegeeks.com/2011/07/funny-source-code-comments.html
	// originally from here:
	// http://stackoverflow.com/questions/184618/what-is-the-best-comment-in-source-code-you-have-ever-encountered

	var allQuotes = [
		"// sometimes I believe compiler ignores all my comments",

		"Exception up = new Exception('Something is really wrong.');<br>throw up; //ha ha",

		"//When I wrote this, only God and I understood what I was doing<br>//Now, God only knows",

		"// I dedicate all this code, all my work, to my wife, Darlene, who will<br>// have to support me and our three children and the dog once it gets<br>// released into the public.",
		"// drunk, fix later",
		"// Magic. Do not touch.",
		"return 1; # returns 1",
		"/////////////////////////////////////// this is a well commented line",
		"// I am not sure if we need this, but too scared to delete.",
		"// I am not responsible of this code.<br>// They made me write it, against my will.",
		"//Dear future me. Please forgive me.",
		"//I can’t even begin to express how sorry I am.",
		"options.BatchSize = 300; //Madness? THIS IS SPARTA!",
		"// I have to find a better job",
		"// hack for ie browser (assuming that ie is a browser)",
		"} catch (PartInitException pie) {<br>// Mmm… pie<br>}",
		"try {<br>}<br>catch (SQLException ex) {<br>// Basically, without saying too much, you’re screwed. Royally and totally.<br>}<br>catch(Exception ex)<br>{<br>//If you thought you were screwed before, boy have I news for you!!!<br>}",
		"// Catching exceptions is for communists",
		"// If you’re reading this, that means you have been put in charge of my previous project.<br>// I am so, so sorry for you. God speed.",
		"// if i ever see this again i’m going to start bringing guns to work",
		"// The magnitude of this hack compares favorably with that of the national debt.",
		"//ALL YOUR BASE ARE BELONG TO US",
		"// If this code works, it was written by Paul. If not, I don’t know who wrote it",
		"//You are not expected to understand this",
		"/**<br>* If you don’t understand this code, you should be flipping burgers instead.<br>*/",
		"catch (Ex as Exception)<br>{<br>// oh crap, we should do something.<br>}",
		"// TODO make this work",
		"// This is crap code but it’s 3 a.m. and I need to get this working."
	];

	var quoteNumber = getRandomInt(0,29);
	var newQuoteNumber;


	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function setQuote(quoteNumber) {
		$('#quote').html("<code>" + allQuotes[quoteNumber] + "</code>");
	}

	function getNewQuote(newQuoteNumber) {
		if (newQuoteNumber !== quoteNumber) {
			setQuote(newQuoteNumber);
			quoteNumber = newQuoteNumber;
		}
		else {
			getNewQuote(getRandomInt(0,29))
		}
	}




	$(document).ready(function() {


		
		
		// console.log(allQuotes[quoteNumber]);

		// $(allQuotes[quoteNumber]).appendTo('body');

		// $('#quote').html("<code>" + allQuotes[quoteNumber] + "</code>");
		setQuote(quoteNumber);

		$('#new-quote').on('click', function() {
			getNewQuote(getRandomInt(0,29))
			// console.log("get a new quote");
		})


		// $.getJSON( "https://en.wikiquote.org/w/api.php?action=query&prop=extracts&format=json&pageids=5145&callback=?", function( data ) {

		// 	var query = $(data.query.pages[5145].extract).filter('ul').each(function() {
		// 		// console.log($(this).find('ul'));
		// 		$(this).find('ul').remove();
		// 	});

			

		// 	// query.appendTo('body');
		// 	console.log(query);

		// });

	});
})(jQuery);





