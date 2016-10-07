// Google Map API key AIzaSyCz4KE50vlj_IUxdao2tVokcSaN8GJIdb4

ko.bindingHandlers.slideVisible = {
    update: function(element, valueAccessor) {
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        var duration = 100;
        if (valueUnwrapped == true) {
            $(element).slideDown(duration, function() {
                $("#map").height("70%");
            });            
        } else {
            $(element).slideUp(duration);
            $("#map").height("100%");
        }
    }
};


// Put the map on the page
var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 47.597516, lng: -122.326390},
	  zoom: 17
});


// Make a list of locations to add to the map
var model = {
    locations: [
        {
        	position: {lat: 47.596756, lng: -122.327037},
        	title: "Uwajimaya Asian Supermarket",
            id: 1
        },
        {
        	position: {lat: 47.597431, lng: -122.326550},
        	title: "Kinokuniya Bookstore",
            id: 2
        },
        {
        	position: {lat: 47.597078, lng: -122.327540},
        	title: "Samurai Noodle Restaurant",
            id: 3
        },
        {
        	position: {lat: 47.598529, lng: -122.326421},
        	title: "International Model Toys",
            id: 4
        },
        {
        	position: {lat: 47.596464, lng: -122.326079},
        	title: "Daiso Japan Variety Store",
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

    self.infoWindow = new google.maps.InfoWindow({
        content: ""
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
            self.infoWindow.close();
        } else {
            self.selectedPlaceIds.push(place.id);
            place.setAnimation(google.maps.Animation.BOUNCE);
            self.infoWindow.setContent(place.title);
            self.infoWindow.open(map, place);
        }
    };

    self.navBar = ko.observable(true);
    self.hideSearch = function() {
        self.navBar(!self.navBar());
    };
}



ko.applyBindings(new ViewModel());

/* TODO:
 * 
 *  1 - done
 *  2 - done
 *  3 - fix issue with BOUNCE ending if text in the search bar changes
 *  4 - add 3rd party API
 */