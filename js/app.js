/*
  Please add all Javascript code to this file.
  Sahar Jafari
  GA SF JS3
*/
'use strict';

(function() {
	google.load("feeds", "1");
	$('#popUp').removeClass('hidden');

	var takenFeed = {
		entries: []
	};
	var sources = {
		list: [
			{src: 'Latest Wildlife'},
			{src: 'Wildlife updates '},
			{src: 'Collections'}
		]
	}

	var source = $('#sources-template').html();
	var template = Handlebars.compile(source);
	var compileTemplate = template(sources);
	$('#srcList').append(compileTemplate);

	function initialize() {
    var feed = new google.feeds.Feed("http://www.bbc.co.uk/nature/wildlife/by/latest.rss");
    feed.setNumEntries(8);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.load(function(result) {

      if (!result.error) {
      	$('#popUp').removeClass('loader');
      	$('#popUp').addClass('hidden');

      	var $xml = $(result.xmlDocument);
      	var items = $xml.find('item');
      	
      	console.log(result.xmlDocument);

      	items.each(function(i, item) {
      		var entry = {};
      		var date = $(item).find('pubDate').text();
      		var title = $(item).find('title').text();
      		var content = $(item).find('description').text();
      		var link = $(item).find('link').text();
      		var img = $(item).find(':nth(3)').attr('url');
      		var d = new Date(date);
      		//var month = d.getMonth() + 1;
      		var year = d.getFullYear();

      		entry.contentSnippet = content.substr(0, 100) + '...';
      		entry.date = year; // TODO: Let's add moths too
      		entry.title = title;
      		entry.image = img;
      		entry.link = link;
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

	$('body').on('click', '.articleContent a' , function(event) {
		var ttl = $(event.target).text();
		var desc, link;										// TODO: define these
		//var snippet = $(event.target).parent().siblings().text();

		// $(descriptions).each(function(index, d) {
		// 	if(d.substr(0, 100) === snippet) {
 		$('.container p').text(desc);
		// 	}
		// });

		$('#popUp').removeClass('hidden loader'); // TODO: only .hidden should be removed (on load)
		$('.container h1').text(ttl);
		$('.popUpAction').attr('href', link)
	});

	$('.closePopUp').on('click', function() {
		$('#popUp').addClass('hidden');
	});

	// TODO: Go back to the first page
	// $('.container a').on('click', function() {

	// });

	$('#srcList').on('click', 'li', function(e) {
		$('#srcName').text($(event.target).text());
	});

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