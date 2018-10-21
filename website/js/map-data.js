const mapCore = require('./map-core.js');
const dataCore = require('./data-core.js');
const request = require('request');

dataCore.onDataLoaded(function(data) {
  for(let i = 0; i < Object.keys(data).length; i++) {
    const row = data[i];

    mapCore.addDomMarkerToMap(
      row['Latitude'], row['Longitude'], row, row.category
    );
  }
});