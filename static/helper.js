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
};

var burgerIcon = document.getElementById("burger-icon");
burgerIcon.addEventListener('click', hideNav);