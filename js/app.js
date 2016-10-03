/*
  Please add all Javascript code to this file.
  Sahar Jafari
  GA SF JS3
*/
'use strict';

(function() {
	google.load("feeds", "1");

	var takenFeed = {
		entries: []
	};

	function initialize() {
    var feed = new google.feeds.Feed("http://www.bbc.co.uk/nature/wildlife/by/latest.rss");
    feed.setNumEntries(8);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.load(function(result) {

      if (!result.error) {
      	var $xml = $(result.xmlDocument);
      	var items = $xml.find('item');
      	
      	console.log(result.xmlDocument);

      	items.each(function(i, item) {
      		var entry = {};
      		var date = $(item).find('pubDate').text();
      		var title = $(item).find('title').text();
      		var content = $(item).find('description').text();
      		var img = $(item).find(':nth(3)').attr('url');
      		var d = new Date(date);
      		//var month = d.getMonth() + 1;
      		var year = d.getFullYear();
      		console.log(year);

      		entry.contentSnippet = content.substr(0, 100) + '...';
      		entry.date = year; // TODO: Let's add moths too
      		entry.title = title;
      		entry.image = img;
      		entry.descriptions = content;
      		takenFeed.entries.push(entry); // push to entry to use the data for templating
      	})

	    	var source = $('#entries-template').html();

				var template = Handlebars.compile(source);
				
				var compileTemplate = template(takenFeed);

				$('#main').append(compileTemplate);
      }
    });
  }
  google.setOnLoadCallback(initialize);

  console.log(takenFeed);

	$('body').on('click', '.articleContent a' , function(event) {
		console.log(event.target);
		var ttl = $(event.target).text();
		//var desc = feed
		//var snippet = $(event.target).parent().siblings().text();

		// $(descriptions).each(function(index, d) {
		// 	if(d.substr(0, 100) === snippet) {
		// 		$('.container p').text(d);
		// 	}
		// });

		$('#popUp').removeClass('hidden loader'); // TODO: only .hidden should be removed (on load)
		$('.container h1').text(ttl);
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