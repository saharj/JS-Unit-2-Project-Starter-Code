/*
  Please add all Javascript code to this file.
  Sahar Jafari
  GA SF JS3
*/
'use strict';

(function() {
	google.load("feeds", "1");
	$('#popUp').removeClass('hidden');

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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

		// Selecting each source changes the URL
    switch(txt) {
    	case 'Wildlife Updates':
    		url += "wildlife/by/updated.rss";
    		break;
    	case 'Collections':
    		url += "collections.rss";
    		break;
    	default:
    		url += "wildlife/by/latest.rss";
    }

    var feed = new google.feeds.Feed(url)

    feed.setNumEntries(20);
    feed.setResultFormat(google.feeds.Feed.XML_FORMAT);
    feed.load(function(result) {


      if (!result.error) {
      	// Show the loader page while loading
      	$('#popUp').removeClass('loader');
      	$('#popUp').addClass('hidden');

      	// Empty the feed
      	takenFeed.entries = [];

      	var $xml = $(result.xmlDocument);
      	var items = $xml.find('item');
      	
      	items.each(function(i, item) {
      		var entry = {};
      		var date = $(item).find('pubDate').text();
      		var title = $(item).find('title').text();
      		var content = $(item).find('description').text();
      		var link = $(item).find('link').text();
      		var img = $(item).find(':nth(3)').attr('url');
      		var d = new Date(date);
      		var month = months[d.getMonth()];
      		var year = d.getFullYear();

      		entry.contentSnippet = content.substr(0, 100) + '...';
      		entry.date = month + ' ' + year;
      		entry.title = title;
      		entry.image = img;
      		entry.link = link;
      		entry.descriptions = content;
      		// push to entry to use the data for templating
      		takenFeed.entries.push(entry);
      	})
      	console.log(takenFeed.entries);

      	// Templating for the list in main page
	    	var source = $('#entries-template').html();
				var template = Handlebars.compile(source);
				var compileTemplate = template(takenFeed);
				$('#main').html(compileTemplate);
      } else {
      	$('#popUp').removeClass('loader');
      	$('#popUp').addClass('hidden');
      	$('#main').text('Sorry! There seems to be a problem loading the page. Please try later!')
      }
    });
  }
  google.setOnLoadCallback(initialize);

  // Open each article
	$('body').on('click', '.articleContent a' , function(event) {
		var ttl = $(event.target).text();
		var articleIndex = $(event.target).parent().attr('href');
		// remove the # from articleIndex
		var index = articleIndex.replace('#', '');
		console.log(index);

		$('.container p').html(takenFeed.entries[index].descriptions);

		$('#popUp').removeClass('hidden');
		$('.container h1').text(ttl);
		$('.popUpAction').attr('href', takenFeed.entries[index].link)
	});

	// Clicking on the link in popUp closes the popUp
	$('.popUpAction').on('click', function() {
		$('#popUp').addClass('hidden');
		$('#logo h1').text('Feedr');
	});

	// Close the popUp window
	$('.closePopUp').on('click', function() {
		$('#popUp').addClass('hidden');
		$('#logo h1').text('Feedr');
	});

	// Clicking on logo redirects to the first page	
	$('.container a').on('click', function() {
		$('#popUp').addClass('loader');
		$('#popUp').removeClass('hidden');
		$('#logo').attr('href', '#Latest Wildlife');
		$('#srcName').text('Latest Wildlife');
		initialize();
	});

	// Clicking on the items in Source List
	$('#srcList').on('click', 'li', function(e) {
		$('#popUp').addClass('loader');
		$('#popUp').removeClass('hidden');
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