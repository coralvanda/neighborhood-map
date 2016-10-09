# Neighborhood Map Project

## What is this?

This is a project developed for the Udacity Full-Stack Developer
Nanodegree program.  It makes use of the following:
 1. Knockout to handle separation of concerns
 2. jQuery to allow for simpler DOM manipulation and AJAX requests
 3. Google Maps API to display the map and markers
 4. [GeoNames API](http://www.geonames.org/export/) to display address info

## How to run

Install all files and subdirectories in one directory.  Use a valid
Google Map API key, and insert that value at the indicated location in
the `static/public.js` file.  In `main.html`, change the final `<script>`
tag source to point to the `public.js` file.  Then use a web browser to
open the `main.html` file.  Users may select items by clicking
on the names in the list, or by clicking on the markers on the map.  The
most recently selected location will display address information below its
name in the list.  Users may also type into the search bar to filter items
in the list and their associated markers.