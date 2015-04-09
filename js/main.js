// create a map in the map div
var map = L.map('map');


// add OpenStreetMap tile layer from MapBox
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Thanks, folks!',
}).addTo(map);





//make the icons for the map
var iconUser = L.icon({
    iconUrl: 'images/user-icon.png',
    shadowUrl: 'images/marker-shadow.png',
});

//make the icons for the map
var iconBasic = L.icon({
    iconUrl: 'images/marker-icon.png',
    shadowUrl: 'images/marker-shadow.png',
});





// using browser geolocation features, shows user their relative location
map.locate({setView: true, maxZoom: 19});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng, {icon: iconUser}).addTo(map)
        .bindPopup("You are somewhere around here.<br>Get it? <em>Around?</em> Because it's a circle!").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);




// if they deny geolocation, map center defaults to the newport
function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError).setView([39.9975, -83.0074], 16);





// create markers
L.marker([39.9975, -83.0024], {icon:iconBasic}).addTo(map)
    .bindPopup('<p><h3>The {artist} Suftan Stevens</h3>{time} at {place}</p>')
    .openPopup();