// Google Map API key AIzaSyCz4KE50vlj_IUxdao2tVokcSaN8GJIdb4

var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 8
});

var input = document.getElementById('pac-input');
//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
var autocomplete = new google.maps.places.Autocomplete(input);






var myList = [
    {
    	position: {lat: -34.395, lng: 150.645},
    	map: map,
    	title: "A"
    },
    {
    	position: {lat: -34.398, lng: 150.648},
    	map: map,
    	title: "B"
    },
    {
    	position: {lat: -34.395, lng: 150.648},
    	map: map,
    	title: "C"
    }
]


var viewModel = {
	init: function() {
	    view.populateMarkers();
	},

	buildList: function(itemList) {
	var self = this;
	this.placeList = ko.observableArray(itemList);
	}
}


var view = {
	populateMarkers: function() {
		myList.forEach(function(location) {
			var marker = new google.maps.Marker(location);
			marker.setMap(map);
		})
	}
};


ko.applyBindings(new viewModel.buildList(myList));
viewModel.init();