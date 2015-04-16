// get the current date as an object for comparison
var currentDate = new Date();
var dd = currentDate.getDate()+1;
var mm = currentDate.getMonth()+1;
var yyyy = currentDate.getFullYear();

if(dd<10) {
    dd='0'+dd};

if(mm<10) {
    mm='0'+mm};

today = yyyy+'-'+mm+'-'+dd;

// create a map in the map div
var map = L.map('map');

// add OpenStreetMap tile layer from MapBox
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Thanks, folks!',
}).addTo(map);

// using browser geolocation features, shows user their relative location
map.locate({setView: true, maxZoom: 19});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are somewhere around here.<br>Get it? <em>Around?</em> Because it's a circle!").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);


// if they deny geolocation, map center defaults to the Newport
function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError).setView([39.9975, -83.0074], 16);


// Using the core $.ajax() method
var createMarkers = $.getJSON( 'http://api.seatgeek.com/2/events?geoip=true', 'datetime_utc.gte=' + today, function(data){

    for (var i=0; i < data.length; i++){
            console.log(data);
            var events = data.events;

        var marker = L.marker( [events[i].venue.location.lat, events[i].venue.location.lon], {icon: L.mapbox.marker.icon} )
        .addTo(map)
        .bindPopup('<h3>' +events[i].title+ '</h3> at '+events[i].venue.name + ' ' + events[i].datetime_local)
        .addTo(map).openPopup();




}});


// create markers
//L.marker([39.9975, -83.0024], {icon:iconBasic}).addTo(map)
//    .bindPopup('<p><h3>The {artist} Suftan Stevens</h3>{time} at {place}</p>')
//    .openPopup();