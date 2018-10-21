const mapCore = require('./map-core.js');
const dataCore = require('./data-core.js');
const request = require('request');

/*
for(let i = 0; i < Object.keys(mapCore.markerData).length; i++) {
  mapCore.addMarkerToMap(47.655, -122.309 - (0.002 * i), mapCore.getMarkerOfType(Object.keys(mapCore.markerData)[i]));
}
*/

const categoryMap = {
  'bike theft': 'property-trespass',
  'theft': 'property-trespass',
  'hit and run': 'property-trespass',
  'trespass': 'property-trespass',
  'assault': 'assault',
  'vehicle prowling': 'property-trespass',
  'rape': 'rape',
  'mischief': 'other',
  'burglary': 'property-trespass',
  'liquor': 'substance',
  'marijuana': 'substance',
  'drug': 'substance',
  'controlled substance': 'substance',
  'VUCSA': 'substance'
}

function getCategory(row) {
  const desc = row['Offense Description'];

  for(let key of Object.keys(categoryMap)) {
    if(desc.toLowerCase().includes(key)) {
      return categoryMap[key];
    }
  }

  return 'other';
}

dataCore.onDataLoaded(function(data) {
  for(let i = 0; i < Object.keys(data).length; i++) {
    const row = data[i];

    if(row != null && row['Offense Description'] != null) {
      const category = getCategory(row);

      mapCore.addDomMarkerToMap(
        row['Latitude'], row['Longitude'], row, category
      );
    }
  }
});