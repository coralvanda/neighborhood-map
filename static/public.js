var privateLink = "http://maps.googleapis.com/maps/api/js?key=" +
        "GOOGLE_API_KEY_HERE&" +
        "libraries=places&callback=initMap";

var privateScript = document.createElement('script');
privateScript.src = privateLink;
privateScript.asnc;
privateScript.defer;
$('body').append(privateScript);