// var climateData = "/assets/js/discover/climateData.json";

// // Fetch the JSON data and console log it
// d3.json(climateData, function (data) {
//     console.log(data);
//   });

// var xvar = [];
// var yvar = [];

// Plotly.d3.json(climateData, function (response) {
//     for (var i = 0; i < response.length; i++){
//         x.push(response.Hilo[i][1])
//         y.push(response.Hilo[i][2])
//     }
//      var trace = {
//         x: xvar,
//         y: yvar
//      }

//      var layout = {
//         title: "Jan Rain",
//         xaxis: { title: "x axis" },
//         yaxis: { title: "y axis"}
//       };



// })

// Plotly.newPlot("plot", trace, layout);



let climateData = "/assets/js/discover/climateData.json";

d3.json(climateData, function (data) {
        console.log(data);
      });

Plotly.d3.json(climateData, function (response) {
    let xl = []
    let yl = []

    for (var i = 0; i < response.length; i++) {
        xl.push(response[i].Hilo.Year)
        yl.push(response[i].Hilo.Jan)
    }
    console.log(xl);
    console.log(yl);

    let trace = {
        x: xl,
        y: yl
    }
    Plotly.plot("plot", [trace]);
})