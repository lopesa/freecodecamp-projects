import $ from 'jquery';

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

	var numberOfQuotes = allQuotes.length;
	var quoteNumber = getRandomInt(0,numberOfQuotes-1);
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
			getNewQuote(getRandomInt(0,numberOfQuotes-1))
		}
	}

	function makeTweetButton(quoteNumber) {

		function addTweetButton () {
			twttr.widgets.createShareButton(
			  ' ',
			  document.getElementById('twitter'),
			  {
			    text: allQuotes[quoteNumber],
			    hashtags: 'CodeCommentComedy'
			  }
			)
		}

		function removeAndAddTwitterButton () {
			twttr.widgets.createShareButton(
			  ' ',
			  document.getElementById('twitter'),
			  {
			    text: allQuotes[quoteNumber],
			    hashtags: 'CodeCommentComedy'
			  }
			)
			.then( function( el ) {
			  window.setTimeout(function(){
				  $('#twitter').children().first().remove();
			  }, 100); 
			});
		}
		
		if($('#twitter').children().length === 0) {
			twttr.widgets.createShareButton(
			  ' ',
			  document.getElementById('twitter'),
			  {
			    text: allQuotes[quoteNumber],
			    hashtags: 'CodeCommentComedy'
			  }
			)
		}
		
		else {
			var first = $('#twitter').children().first();
			first.css('z-index', 5)
			removeAndAddTwitterButton()
		}
	}

window.onload = function() {


	setQuote(quoteNumber);
	makeTweetButton(quoteNumber);

	$('#new-quote').on('click', function() {
		getNewQuote(getRandomInt(0,numberOfQuotes-1))
		makeTweetButton(quoteNumber);
	})
	
};





