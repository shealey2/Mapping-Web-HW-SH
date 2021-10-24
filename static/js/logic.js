
// Creating the map object
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  
  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data,{
    
       
      pointToLayer: makemarkers,

      onEachFeature: function(feature, layer) {
        layer.bindPopup("Title: " + feature.properties.title);
      }

    }).addTo(myMap);


    //legend
    colors = ["#00FF00", "#99ff00", "#FFFF00", "#ff9900", "#FF3300", "#FF0000"];

    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend'),
                    categories = ['-10-10', '10-30', '30-50', '50-70', '70-90', '90+'],
                    labels =[];
      
      div.innerHTML += '<strong> Depth </strong> <br>'
    
      for (var i = 0; i < categories.length; i++) {
          div.innerHTML +=
              '<li style="background:' + colors[i] + '"></li> ' +
              categories[i] + '<br>';
      };
      return div;
   };
  legend.addTo(myMap);


  
  });
  

function makemarkers(feature, latlng){

  let options = {
    radius: Math.sqrt(feature.properties.mag)*5,
    fillColor: color(feature.geometry.coordinates[2]),
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }
  return L.circleMarker( latlng, options );
}




function color(depth)
{
  if (depth<=10) {
    return "#00FF00"}
  else if (depth<=30) {
     return "#99ff00"}
  else if (depth<=50) {
     return "#FFFF00"}
  else if (depth<=70) {
     return "#ff9900"}
  else if (depth<=90) {
     return "#FF3300"}
  else {
     return "#FF0000"}
 };




