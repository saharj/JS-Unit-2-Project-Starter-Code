/*
  Please add all Javascript code to this file.
  Sahar Jafari
  GA SF JS3
*/
'use strict';

(function() {

	google.load("feeds", "1");

	function initialize() {
    var feed = new google.feeds.Feed("http://www.bbc.co.uk/nature/wildlife/by/latest.rss");
    
    feed.load(function(result) {

    	//var feed = result.feed;

      if (!result.error) {
      	console.log(result.feed);
	    	var source = $('#entries-template').html();

				var template = Handlebars.compile(source);
				
				var compileTemplate = template(result.feed);

				$('#main').append(compileTemplate);

        // var container = $('#main');
        // for (var i = 0; i < result.feed.entries.length; i++) {
        // 	(function() {
        // 		var index = i;
	       //    var entryTitle = result.feed.entries[index].title;
	       //    //console.log(entryTitle);
        // 	})();
        // }
      }
    });
  }
  google.setOnLoadCallback(initialize);


	$('.articleContent a').on('click', function() {
		$('#popUp').removeClass('hidden loader'); // TODO: only .hidden should be removed
	});

	$('.closePopUp').on('click', function() {
		$('#popUp').addClass('hidden');
	});

	// TODO: Go back to the first page
	// $('.container a').on('click', function() {

	// });

	$('#search a').on('click', function() {
		if($('#search input').css('visibility') === 'visible') {
			$('#search input').css('visibility', 'hidden');
			setTimeout(function() {
				$('.container ul').css('width', '');
			}, 300);
		} else {
			$('#search input').css('visibility', 'visible');
			$('#search input').css('width', '170px');
			$('.container ul').css('width', '74%');
		}
	});
})();