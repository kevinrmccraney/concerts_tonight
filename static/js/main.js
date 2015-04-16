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
map.locate({setView: true, maxZoom: 13});

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
map.on('locationerror', onLocationError).setView([39.9975, -83.0074], 13);


// Using the core $.ajax() method
var promise = $.getJSON( 'http://api.seatgeek.com/2/events?geoip=true');
promise.then(function(data){
    var events = data.events;
    console.log(events);
    $.each(events, function(i){

            var marker = L.marker( [events[i]['venue']['location']['lat'], events[i]['venue']['location']['lon']]).addTo(map)
            .bindPopup('<h5>' +events[i]['title']+ ' at '+events[i]['venue']['name'] + '</h5>  starting at ' + events[i]['datetime_local'].slice(11, 16) + ". Don't be late!")
            .addTo(map)
            .on('mouseover', function(){
                this.openPopup();
            });

    });

});

//jquery button selection, not yet implemented
$("#today").click(function(){
});

$("#tomorrow").click(function(){
    map.addLayer(tomorrow);
    map.removeLayer(today);
    map.removeLayer(later);
});

$("#later").click(function(){
    map.addLayer(later);
    map.removeLayer(tomorrow);
    map.removeLayer(today);
});

$("#all").click(function(){
    map.addLayer(today);
    map.addLayer(tomorrow);
    map.addLayer(later);
});



// create markers
//L.marker([39.9975, -83.0024], {icon:iconBasic}).addTo(map)
//    .bindPopup('<p><h3>The {artist} Suftan Stevens</h3>{time} at {place}</p>')
//    .openPopup();