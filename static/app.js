// Custom KO binding to slide the search/list panel in and out of view
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


// Create the map and place on the page
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
            id: 1,
            loc: {lat: 47.596756, lng: -122.327037}
        },
        {
        	position: {lat: 47.597431, lng: -122.326550},
        	title: "Kinokuniya Bookstore",
            id: 2,
            loc: {lat: 47.597431, lng: -122.326550}
        },
        {
        	position: {lat: 47.597078, lng: -122.327540},
        	title: "Samurai Noodle Restaurant",
            id: 3,
            loc: {lat: 47.597078, lng: -122.327540}
        },
        {
        	position: {lat: 47.598529, lng: -122.326421},
        	title: "International Model Toys",
            id: 4,
            loc: {lat: 47.598529, lng: -122.326421}
        },
        {
        	position: {lat: 47.596464, lng: -122.326079},
        	title: "Daiso Japan Variety Store",
            id: 5,
            loc: {lat: 47.596464, lng: -122.326079}
        }
    ]
}


function ViewModel() {
    var self = this;

    self.placeList = ko.observableArray([]);
    self.searchTerm = ko.observable("");
    self.placeAddress = ko.observable("");
    self.infoWindowText = "";

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

    self.requestTimeout = setTimeout(function() {
        self.infoWindowText = "Request timed out";
    }, 5000);

    // KO array to determine what places a user currently has selected
    self.selectedPlaceIds = ko.observableArray([]);
    self.selectPlace = function(place) {
        if (self.selectedPlaceIds().indexOf(place.id) > -1) {
            self.selectedPlaceIds.remove(place.id);
            place.setAnimation(null);
            self.infoWindow.close();
        } else {
            self.selectedPlaceIds.push(place.id);
            place.setAnimation(google.maps.Animation.BOUNCE);
            self.infoWindowText = place.title;
            self.infoWindow.setContent(self.infoWindowText);
            self.infoWindow.open(map, place);
            // Make an ajax request when place is selected and
            // display the returned info
            var latitude = place.loc.lat.toString();
            var longitude = place.loc.lng.toString();
            var dataLat = "lat=".concat(latitude);
            var dataLng = "lng=".concat(longitude);
            var dataUser = "username=coralvanda";
            $.ajax({
                url: "http://api.geonames.org/findNearestAddressJSON?",
                data: dataLat + "&" + dataLng + "&" + dataUser,
                dataType: "json",
                success: function(data, status, jqXHR) {
                    var formatedAddress = data.address.streetNumber;
                    formatedAddress += " " + data.address.street;
                    formatedAddress += " " + data.address.placename;
                    formatedAddress += ", " + data.address.adminCode1;
                    formatedAddress += " " + data.address.postalcode;
                    self.placeAddress(formatedAddress);
                    clearTimeout(self.requestTimeout);
                }
            })
        }
    };

    // The variable referenced by the custom binding to know when to
    // hide the search/list panel (controlled by the hamburger icon)
    self.navBar = ko.observable(true);
    self.hideSearch = function() {
        self.navBar(!self.navBar());
    };
}


ko.applyBindings(new ViewModel());

/* TODO:
 * 
 *  1 - fix issue with ajax data displaying the same for every <li>
 *  2 - add ability to keep multiple info windows open at once
 *  3 - fix issue with BOUNCE ending if text in the search bar changes
 */