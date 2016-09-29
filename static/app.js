// Google Map API key AIzaSyCz4KE50vlj_IUxdao2tVokcSaN8GJIdb4

var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 10
});

var input = document.getElementById('pac-input');
//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
var autocomplete = new google.maps.places.Autocomplete(input);




var model = {
    locations: [
        {
        	position: {lat: -34.385, lng: 150.645},
        	map: map,
        	title: "A"
        },
        {
        	position: {lat: -34.398, lng: 150.658},
        	map: map,
        	title: "B"
        },
        {
        	position: {lat: -34.4, lng: 150.648},
        	map: map,
        	title: "C"
        },
        {
        	position: {lat: -34.6, lng: 150.848},
        	map: map,
        	title: "D"
        },
        {
        	position: {lat: -34.5, lng: 150.540},
        	map: map,
        	title: "E"
        }
    ]
}


var viewModel = function() {
    var self = this;

    this.placeList = ko.observableArray([]);

    model.locations.forEach(function(place) {
        self.placeList.push(place);
        var marker = new google.maps.Marker(place);
        marker.setMap(map);
        marker.addListener('click', self.selectPlace);
    });

    this.selectedPlace = ko.observable();

    this.selectPlace = function(place) {
        self.selectedPlace(place);
        self.toggleBounce(place);
    };

    this.toggleBounce = function(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    };
}


var view = {

    hideNav: function() {
        var sideBar = document.getElementById("side-bar");
        var mapDisplay = document.getElementById("map");
        if (sideBar.style.display !== 'none') {
            sideBar.style.display = 'none';
            mapDisplay.style.height = "100%";
        } else {
            sideBar.style.display = 'block';
            mapDisplay.style.height = "80%";
        }
    }
};


ko.applyBindings(new viewModel());