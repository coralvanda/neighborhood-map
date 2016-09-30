/*
var hideNav = function() {
    var sideBar = document.getElementById("side-bar");
    var mapDisplay = document.getElementById("map");
    if (sideBar.style.display !== 'none') {
        sideBar.style.display = 'none';
        mapDisplay.style.height = "100%";
    } else {
        sideBar.style.display = 'block';
        mapDisplay.style.height = "80%";
    }
};*/

var burgerIcon = document.getElementById("burger-icon");
burgerIcon.addEventListener('click', function() {
	var hidden = ko.observable(false);
	var mapDisplay = document.getElementById("map");
	if (hidden) {
		hidden = false;
		mapDisplay.style.height = "80%";
	} else {
		hidden = true;
		mapDisplay.style.height = "100%";
	}
});