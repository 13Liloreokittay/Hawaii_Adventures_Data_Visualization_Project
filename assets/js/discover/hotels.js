function createMap(hotelMarkers) {
  console.log(hotelMarkers);

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
    "Hotels": hotelMarkers
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [20.438043, -157.462667],
    zoom: 8,
    layers: [outdoorMap, hotelMarkers]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
  }).addTo(map);
}

// Store our API endpoint inside queryUrl
// var queryData = "/assets/js/discover/hotelData.geojson";
var queryData = "/assets/js/discover/hotelData.geojson";

d3.json(queryData, function(data) {
 
  createFeatures(data.features);
  console.log(data.features);
});

function createFeatures(hotelData) {
  function onEachFeaturePrep(feature, layer) {
    layer.bindPopup("<h4>" + feature.properties.name + "</h4>" + "<hr>" +
      "<h6>" + feature.properties.island + "</h6>" +
      "<h6>" + feature.properties.name + "</h6>");
  }

  var hotelMarkers = L.geoJSON(hotelData, { 
    onEachFeature: onEachFeaturePrep
  });

  createMap(hotelMarkers);
}