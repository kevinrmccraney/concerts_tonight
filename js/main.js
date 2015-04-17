// create a map in the map div
var map = L.map('map');

// add OpenStreetMap tile layer from MapBox
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Thanks, folks!',
}).addTo(map);

// using browser geolocation features, shows user their relative location
map.locate({setView: true, maxZoom: 13});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are somewhere around here.<br>Get it? <em>Around?</em> Because it's a circle!").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);

// if they deny geolocation, map center defaults to the Newport, in Columbus
function onLocationError(e) {
    alert(e.message);
}
map.on('locationerror', onLocationError).setView([39.9975, -83.0074], 13);

// Using getJSON to get data, and create markers
var promise = $.getJSON( 'http://api.seatgeek.com/2/events?geoip=true');
promise.then(function(data){
    var events = data.events;
    console.log(events);
    $.each(events, function(i){

            var marker = L.marker( [events[i]['venue']['location']['lat'], events[i]['venue']['location']['lon']]).addTo(map)
            .bindPopup('<b>' +events[i]['title']+ '</b> is at <b>'+
                events[i]['venue']['name'] + '</b>  starting at <b>' + events[i]['datetime_local'].slice(11, 16) + "</b>. Don't be late!")
            .addTo(map)
            .on('mouseover', function(){
                this.openPopup();
            });
    });
});