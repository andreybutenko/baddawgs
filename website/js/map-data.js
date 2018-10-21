const mapCore = require('./map-core.js');
const dataCore = require('./data-core.js');
const request = require('request');

for(let i = 0; i < Object.keys(mapCore.markerData).length; i++) {
  mapCore.addMarkerToMap(47.655, -122.309 - (0.002 * i), mapCore.getMarkerOfType(Object.keys(mapCore.markerData)[i]));
}


function getCategory(row) {
  const desc = row['Offense Description'];
  //if(desc.contains())
}

dataCore.onDataLoaded(function(data) {
  for(let i = 0; i < Math.min(Object.keys(data).length, 10); i++) {
    getCategory(data[i]);
  }
});