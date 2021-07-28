var tableData = data;
var tbody = d3.select("tbody");

// read data from data.js into table on html using JS
tableData.forEach(function(ufoData) {
  console.log(ufoData);
  var row = tbody.append("tr");

  Object.entries(ufoData).forEach(function([key, value]) {
    console.log(key, value);
    var cell = row.append("td");
    cell.text(value);
  });
});

console.log(tableData);

// filter the data
var form = d3.select("#datetime");
var button = d3.select("#filter-btn");

// Assign handler function to target objects in HTML file
form.on("submit", runFilter);
button.on("click", runFilter);

// Declare handler function
function runFilter() {
  d3.event.preventDefault();
  // assign input value in the form to variable
  var dateInput = d3.select("#datetime").property("value").trim();
  var cityInput = d3.select("#city").property("value").toLowerCase().trim();
  var stateInput = d3.select("#state").property("value").toLowerCase().trim();
  var countryInput = d3.select("#country").property("value").toLowerCase().trim();
  var shapeInput = d3.select("#shape").property("value").toLowerCase().trim();
  
  // track of inputs on console log
  console.group(`Date: ${dateInput}`);
  console.group(`City: ${cityInput}`);
  console.group(`State: ${stateInput}`);
  console.group(`Country: ${countryInput}`);
  console.group(`Shape: ${shapeInput}`);

  // empty the table object before appending filter results
  tbody.html("");

  // Filter sightings to specified date
  var results = tableData.filter(sighting => (sighting.datetime == dateInput || dateInput == "") &&
                                (sighting.city == cityInput || cityInput == "") &&
                                (sighting.state == stateInput || stateInput == "") &&
                                (sighting.country == countryInput || countryInput == "") &&
                                (sighting.shape == shapeInput || shapeInput == "")
                                );
  
  
  results.forEach((uforesults) => {
    var row = tbody.append("tr");
    Object.entries(uforesults).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
  }

  