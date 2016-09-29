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
        	title: "A"
        },
        {
        	position: {lat: -34.398, lng: 150.658},
        	title: "B"
        },
        {
        	position: {lat: -34.4, lng: 150.648},
        	title: "C"
        },
        {
        	position: {lat: -34.6, lng: 150.848},
        	title: "D"
        },
        {
        	position: {lat: -34.5, lng: 150.540},
        	title: "E"
        }
    ]
}


var ViewModel = function() {
    var self = this;

    this.placeList = ko.observableArray([]);

    model.locations.forEach(function(place) {
        var marker = new google.maps.Marker(place);
        marker.setMap(map);
        marker.addListener('click', function() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        });
        self.placeList.push( new Place(marker) );
    });

    this.selectedPlace = ko.observable();

    this.selectPlace = function(place) {
        self.selectedPlace(place);
        self.toggleBounce(place);
    };
}


var Place = function(data) {
    this.position = ko.observable(data.postiion);
    this.title = ko.observable(data.title);
};


ko.applyBindings(new ViewModel());