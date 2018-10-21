const mapCore = require('./map-core.js');

for(let i = 0; i < Object.keys(mapCore.markerData).length; i++) {
  mapCore.addMarkerToMap(47.655, -122.309 - (0.002 * i), mapCore.getMarkerOfType(Object.keys(mapCore.markerData)[i]));
}