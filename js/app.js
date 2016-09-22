/*
  Please add all Javascript code to this file.
  Sahar Jafari
  GA SF JS3
*/

(function() {
	$('.articleContent a').on('click', function() {
		$('#popUp').removeClass('hidden');
	});

	$('.closePopUp').on('click', function() {
		$('#popUp').addClass('hidden');
	});
})();