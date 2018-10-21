const mapCore = require('./map-core.js');
const request = require('request');

for(let i = 0; i < Object.keys(mapCore.markerData).length; i++) {
  mapCore.addMarkerToMap(47.655, -122.309 - (0.002 * i), mapCore.getMarkerOfType(Object.keys(mapCore.markerData)[i]));
}

request(`http://192.168.118.1:8080/crimes.csv`, function(error, response, body) {
  console.log(error, response)
  if(error != null || response.statusCode != 200) {
    alert(`Got ${response.statusCode} code while getting data: ${JSON.toString(error)}`);
    return;
  }

  //callback(address, JSON.parse(body).results[0].geometry.location);
});