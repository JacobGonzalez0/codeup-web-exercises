/**********************************************
 * 			SETTING UP KEYS.JS
 *********************************************/
// TODO TOGETHER: Open .gitignore and add keys.js. Add keys.js file and import to mapbox html file. Your api keys are stored in keys.js and are added to the .gitignore so they are protected
import keys from "./keys.js";
//Using es6 import to keep the key out of sight even though normally its locked to a url
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [-98.4916, 29.4252]
});

/**********************************************
 * 			CUSTOMIZING THE MAP
 *********************************************/
// Predefined map styles --> https://docs.mapbox.com/mapbox-gl-js/api/#map
// A map center can be set by passing in the latitude and longitude coordinates of a location as an array [LONGITUDE_VALUE, LATITUDE_VALUE]
// Zoom levels range from 0 up to 24, with 0 being a global view and 24 being the most detailed at street level (the max zoom level depends on the location).

//TODO TOGETHER: Set map to san antonio area using the coordinates [-98.4916, 29.4252]

//TODO: Experiment with different map styles, zoom levels, and centers. You will need to reference the mapbox docs. (~15 minutes)


/**********************************************
 * 					MARKERS
 *********************************************/
// Marker Docs --> https://docs.mapbox.com/mapbox-gl-js/api/#marker
// Markers are specific locations on a map
//Use the .setLngLat() and .addTo() methods to add marker to the map

// TODO TOGETHER: Add a marker to the map using the following coordinates [-98.4916, 29.4260]. This marker will mark the Alamo on our map.
// TODO TOGETHER: Change the color of the marker
// var marker = new mapboxgl.Marker({
//     color: "#55FF11",
//     draggable: true
//     })
//     .setLngLat([-98.4916, 29.4260])
//     .addTo(map);


// TODO: Experiment with the color, and setting the LngLat
// TODO: Update the marker object to make the marker draggable. *Hint: reference the docs!


/**********************************************
 * 					POPUPS
 *********************************************/
// Popups are the info boxes that appear on a map and may describe a given location.
// Popup docs --> https://docs.mapbox.com/mapbox-gl-js/api/#popup


// TODO TOGETHER: Add a popup to the map over codeup. Set the html as a paragraph that says "Codeup Rocks!"
// TODO TOGETHER: Comment out the popup we just added. Add a popup to the alamo marker.
// var markerHeight = 50, markerRadius = 10, linearOffset = 25;
// var popupOffsets = {
// 'top': [0, 0],
// 'top-left': [0,0],
// 'top-right': [0,0],
// 'bottom': [0, -markerHeight],
// 'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
// 'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
// 'left': [markerRadius, (markerHeight - markerRadius) * -1],
// 'right': [-markerRadius, (markerHeight - markerRadius) * -1]
// };
// var popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
// .setLngLat([-98.4916, 29.4260])
// .setHTML("<h1>codeup rocks!</h1>")
// .setMaxWidth("300px")
// .addTo(map);


// TODO: Review the popup docs. What are some additional options we can pass to the popup?
// TODO: Try setting the text by using ".setText()" instead of ".setHTML()"

// var popup2 = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
// .setLngLat([-98.70, 29.30])
// .setText("This is using just the setText method")
// .setMaxWidth("300px")
// .addTo(map);

/**********************************************
 * 					Geocoder
 *********************************************/
// Geocoding Docs --> https://docs.mapbox.com/api/search/#geocoding


// TODO TOGETHER: Using the Geocoder helper function, log the coordinates of Codeup and recenter the map to focus on Codeup. Comment out previous map code.


//TODO: Using the geocode method above, add a marker at Codeup to the map
//TODO: Instead of setCenter try using map.jumpTo()
//TODO: Instead of setCenter try using map.flyTo()

geocode()

// TODO TOGETHER: Reverse Geocoding: Using the reverse geocoding method, enter the coordinates {lng: -98.4861, lat: 29.4260} to get a physical address for the alamo
// TODO: Reverse geocode coordinates of your choice using the reverse geocode method

