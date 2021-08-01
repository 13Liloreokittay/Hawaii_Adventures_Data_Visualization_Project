function createMap(beachConditions) {
  console.log(beachConditions);

  // Create the tile layer that will be the background of our map
  var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
  });

  var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Street Map": outdoorMap,
    "Satellite Map": satelliteMap,
    "Light Map": lightMap
  };

  // Create an overlayMaps object to hold the beach conditions layer
  var overlayMaps = {
    "Beach": beachConditions
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [20.438043, -157.462667],
    zoom: 8,
    layers: [outdoorMap, beachConditions]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(map);
}

// Store our API endpoint inside queryUrl
var queryData = "/assets/js/discover/hotels.json";
// var queryData = hotelData;

// Perform a GET request to the query URL
d3.json(queryData, function (data) {
  console.log(data);
});



// Perform query for csv data. Call createMarkers when complete
d3.json(queryData,

  function (response) {
    console.log(response);

    // Pull the "lat" and "lon" property off of response.data
    // var markers = response;

    // Initialize an array to hold beach markers
    var beachMarkers = [];

    // Loop through the stations array
    for (var i = 0; i < response.length; i++) {
// console.log(response[i].);
      // For each station, create a marker and bind a popup with the station's name
      var beachMarker = L.marker([response[i].lat, response[i].lon])
        .bindPopup("<h3>Island: " + response[i].island + "</h3>" +
          "<h3>Address: " + response[i].address + "</h3>" + "<hr>" +
          // "<h2>" + "Current Weather Conditions" + "</h2>" +
          "<h3>Name of Lodging: " + response[i].name + "</h3>" +
          "<h3>Type of Lodging: " + response[i].type + "</h3>" +
          "<h3>Opened: " + response[i].year_open + "</h3>");


      // Add the marker to the bikeMarkers array
      
      beachMarkers.push(beachMarker);
      console.log(beachMarker);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(beachMarkers));
  }
);