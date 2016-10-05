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
			{src: 'Wildlife Updates'},
			{src: 'Collections'}
		]
	}

	// Templating for the Source List
	var source = $('#sources-template').html();
	var template = Handlebars.compile(source);
	var compileTemplate = template(sources);
	$('#srcList').append(compileTemplate);

	function initialize() {
		var url = 'http://www.bbc.co.uk/nature/';

		var txt = $('#srcName').text();
		console.log(txt);

		// Selecting each source changes the URL
    switch(txt) {
    	case 'Wildlife Updates':
    		url += "updated.rss";
    		break;
    	case 'Collections':
    		url += "collections.rss";
    		break;
    	default:
    		url += "wildlife/by/latest.rss";
    }
    console.log(url);

    var feed = new google.feeds.Feed(url)

    feed.setNumEntries(8);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.load(function(result) {


      if (!result.error) {
      	// Show the loader page while loading
      	$('#popUp').removeClass('loader');
      	$('#popUp').addClass('hidden');

      	var $xml = $(result.xmlDocument);
      	var items = $xml.find('item');
      	
      	//console.log(result.xmlDocument);

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

      	// Templating for the list in main page
	    	var source = $('#entries-template').html();
				var template = Handlebars.compile(source);
				var compileTemplate = template(takenFeed);
				$('#main').append(compileTemplate);
      }
    });
  }
  google.setOnLoadCallback(initialize);

  // Open each article
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

	// Close the popUp window
	$('.closePopUp').on('click', function() {
		$('#popUp').addClass('hidden');
	});

	// Clicking on logo redirects to the first page      *TODO*
	$('.container a').on('click', function() {
		$('#logo').attr('href', '#');
	});

	// Clicking on the items in Source List
	$('#srcList').on('click', 'li', function(e) {
		$('#popUp').addClass('loader');
		$('#popUp').removeClass('hidden');
		//$('#main').empty();
		$('#srcName').text($(event.target).text());
		initialize();
	});

	// Clicking on the search icon expands the box
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