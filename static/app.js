// Google Map API key AIzaSyCz4KE50vlj_IUxdao2tVokcSaN8GJIdb4

// Put the map on the page
var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 10
});


// Make a list of locations to add to the map
var model = {
    locations: [
        {
        	position: {lat: -34.385, lng: 150.645},
        	title: "Ancient",
            id: 1
        },
        {
        	position: {lat: -34.398, lng: 150.658},
        	title: "Bovine",
            id: 2
        },
        {
        	position: {lat: -34.4, lng: 150.648},
        	title: "Creative",
            id: 3
        },
        {
        	position: {lat: -34.6, lng: 150.848},
        	title: "Darned",
            id: 4
        },
        {
        	position: {lat: -34.5, lng: 150.540},
        	title: "Emus",
            id: 5
        }
    ]
}


function ViewModel() {
    var self = this;

    self.placeList = ko.observableArray([]);
    self.searchTerm = ko.observable("");
    self.myMap = ko.observable({
        lat: ko.observable(-34.397), 
        lng: ko.observable(150.644)
    });

    model.locations.forEach(function(place) {
        var marker = new google.maps.Marker(place);
        self.placeList.push(marker);
    });

    // Computed observable array for populating search results and markers
    self.searchResults = ko.computed(function() {
        return ko.utils.arrayFilter(self.placeList(), function(place) {
            if (place.title.search(self.searchTerm()) !== -1) {
                place.setMap(map);
                place.addListener( 'click', function() {
                    return self.selectPlace(this);
                });
                return true;
            } else {
                place.setMap(null);
                return false;
            }
        });
    });


    self.selectedPlaceIds = ko.observableArray([]);
    self.selectPlace = function(place) {
        if (self.selectedPlaceIds().indexOf(place.id) > -1) {
            self.selectedPlaceIds.remove(place.id);
            place.setAnimation(null);
        } else {
            self.selectedPlaceIds.push(place.id);
            place.setAnimation(google.maps.Animation.BOUNCE);
        }
    };

    self.navBar = ko.observable(true);
    self.hideSearch = function() {
        self.navBar(!self.navBar());
    };
}



ko.applyBindings(new ViewModel());