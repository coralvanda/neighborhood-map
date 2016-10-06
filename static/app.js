// Google Map API key AIzaSyCz4KE50vlj_IUxdao2tVokcSaN8GJIdb4


// Put the map on the page
var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 10
});


//var input = document.getElementById('pac-input');
//var autocomplete = new google.maps.places.Autocomplete(input);

/*
ko.bindingHandlers.map = {
    init: function(element, valueAccessor, allBindingsAccessor, ViewModel) {
        var value = valueAccessor();
        var mapOjbect = ko.unwrap(value);
        mapOjbect.googleMap = new google.maps.Map(element, {
                center: {
                    lat: mapOjbect.lat(), 
                    lng: mapOjbect.lng()
                },
                zoom: mapOjbect.zoom
            }
        );
    }
}
*/



// Make a list of locations to add to the map
var model = {
    locations: [
        {
        	position: {lat: -34.385, lng: 150.645},
        	title: "Ancient"
        },
        {
        	position: {lat: -34.398, lng: 150.658},
        	title: "Bovine"
        },
        {
        	position: {lat: -34.4, lng: 150.648},
        	title: "Creative"
        },
        {
        	position: {lat: -34.6, lng: 150.848},
        	title: "Darned"
        },
        {
        	position: {lat: -34.5, lng: 150.540},
        	title: "Emus"
        }
    ]
}


function ViewModel() {
    var self = this;

    this.placeList = ko.observableArray([]);
    this.searchTerm = ko.observable("");
    this.myMap = ko.observable({
        lat: ko.observable(-34.397), 
        lng: ko.observable(150.644)
    });

    // Turn the locations into markers and put them on the map
    // and populate the ko.observableArray with the markers
    model.locations.forEach(function(place) {
        var marker = new google.maps.Marker(place);
        marker.setMap(map);
        marker.addListener('click', function() {
            self.selectPlace(this);
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        });
        self.placeList.push(marker);
    });

    this.searchResults = ko.computed(function() {
        this.results = ko.observableArray([]);
        self.placeList().forEach(function(marker) {
            if (marker.title.indexOf(self.searchTerm) !== -1) {
                this.results.push(marker)
                //marker.setMap(myMap);
            } else {
                //marker.setMap(null);
            }
        });
        return this.results();
    });

    this.selectedPlace = ko.observable();

    this.selectPlace = function(place) {
        self.selectedPlace(place);
    };

    this.checkSelected = ko.pureComputed(function(place) {
        if (place === self.selectedPlace()) {
            return true;
        } else {
            return false;
        }
    }, this);

    this.navBar = ko.observable(true);

    this.hideSearch = function() {
        self.navBar(!self.navBar());
    }
}

/*
var Place = function(data) {
    this.position = ko.observable(data.postiion);
    this.title = ko.observable(data.title);
};
*/


ko.applyBindings(new ViewModel());