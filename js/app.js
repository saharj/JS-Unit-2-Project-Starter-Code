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
    feed.setNumEntries(8);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.load(function(result) {

    	var feed = {
    		entries: []
    	};

      if (!result.error) {
      	console.log(result.xmlDocument);

      	var $xml = $(result.xmlDocument);
      	var items = $xml.find('item');

      	items.each(function(i, item) {
      		var entry = {};
      		var date = $(item).find('pubDate').text();
      		var title = $(item).find('title').text();
      		var img = $(item).find(':nth(3)').attr('url');
      		var d = new Date(date);
      		var month = d.getMonth();

      		entry.date = month + 1; // Still has works to do
      		entry.title = title;
      		entry.image = img;
      		feed.entries.push(entry);
      	})

	    	var source = $('#entries-template').html();

				var template = Handlebars.compile(source);
				
				var compileTemplate = template(feed);

				$('#main').append(compileTemplate);
      }
    });
  }
  google.setOnLoadCallback(initialize);


	$('body').on('click', '.articleContent a' , function() {
		console.log('clicked');
		$('#popUp').removeClass('hidden loader'); // TODO: only .hidden should be removed (on load)
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