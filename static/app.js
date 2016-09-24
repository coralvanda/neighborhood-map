// Google Map API key AIzaSyCz4KE50vlj_IUxdao2tVokcSaN8GJIdb4

var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 8
	});

	var input = document.getElementById('pac-input');
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
}


/**
var model = {
	null;
}


var viewModel = {
	init: function() {
		model.init();
		view.init();
	}
}


var view = {
	null;
}


viewModel.init();
**/