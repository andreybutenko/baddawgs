// Set up credentials
const platform = new H.service.Platform({
  'app_id': 'bdoH4E9sAhEHXMos9IkW',
  'app_code': 'XrGZN4dOdJAGYHJJaF2FXQ'
});

// Set up layers
const defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
const map = new H.Map(
  document.getElementById('map-container'),
  defaultLayers.normal.map,
  {
    zoom: 15,
    center: { lat: 47.655, lng: -122.308 }
  }
);

// Make the map interactive! MapEvents enables the event system. Behavior implements default interactions for pan/zoom (also on mobile touch environments)
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
const ui = H.ui.UI.createDefault(map, defaultLayers);

function getIconForText(text, bgColor, color) {
  const svg =
    `<svg width="28" height="26" xmlns="http://www.w3.org/2000/svg">` +
      `<rect stroke="white" fill="${bgColor}" x="1" y="1" width="26" height="26" />` +
      `<text x="14" y="22" font-size="18pt" font-family="Arial" font-weight="bold" text-anchor="middle" fill="${color}">` +
        `${text}` +
      `</text>` +
    `</svg>`;

  const icon = new H.map.Icon(svg);
  return icon;
}

function getIconForEmoji(emoji) {
  const svg =
    `<svg width="28" height="28" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="14" y="24" font-size="18pt" font-family="Arial" font-weight="bold" text-anchor="middle" fill="white">` +
        `${emoji}` +
      `</text>` + 
    `</svg>`;

  const icon = new H.map.Icon(svg);
  return icon;
}

// bike theft, theft, hit and run, trespass, harassment, assault, vehcle prowling, rape

const markerData = {
  'bike-theft': getIconForEmoji('🚲'),
  'theft': getIconForEmoji('😠'),
  'hit-and-run': getIconForEmoji('🚗'),
  'trespass': getIconForText('T', '#000000', '#ffffff'),
  'assault': getIconForText('A', '#ff0000', '#ffffff'),
  'vehicle-prowling': getIconForText('P', '#000000', '#ffffff'),
  'rape': getIconForText('R', '#ff0000', '#ffffff')
}

function getMarkerOfType(name) {
  return markerData[name];
}

function addMarkerToMap(map, lat, lng, icon) {
  const marker = new H.map.Marker({ lat, lng }, { icon });
  map.addObject(marker);
  return marker;
}

for(let i = 0; i < Object.keys(markerData).length; i++) {
  addMarkerToMap(map, 47.655, -122.309 - (0.002 * i), getMarkerOfType(Object.keys(markerData)[i]));
}