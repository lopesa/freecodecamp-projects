(function($) {
	$(document).ready(function() {
		
		$.getJSON( "https://en.wikiquote.org/w/api.php?action=query&prop=extracts&format=json&pageids=5145&callback=?", function( data ) {

			var query = $(data.query.pages[5145].extract).filter('ul').each(function() {
				// console.log($(this).find('ul'));
				$(this).find('ul').remove();
			});
			

			query.appendTo('body');
			console.log(query);

		});

	});
})(jQuery);





