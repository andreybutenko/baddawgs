const mapOverlay = require('./map-overlay.js');

// Set up credentials
const platform = new H.service.Platform({
  'app_id': 'bdoH4E9sAhEHXMos9IkW',
  'app_code': 'XrGZN4dOdJAGYHJJaF2FXQ',
  useHTTPS: true
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
  /*
  const svg =
    `<svg width="28" height="26" xmlns="http://www.w3.org/2000/svg">` +
      `<rect stroke="white" fill="${bgColor}" x="1" y="1" width="26" height="26" />` +
      `<text x="14" y="22" font-size="18pt" font-family="Arial" font-weight="bold" text-anchor="middle" fill="${color}">` +
        `${text}` +
      `</text>` +
    `</svg>`;

  const icon = new H.map.Icon(svg);
  return icon;
  */
  return { text, bgColor, color };
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

const markerData = {
  'rape': getIconForText('R', '#c0392b', '#ffffff'),
  'assault': getIconForText('A', '#d35400', '#ffffff'),
  'harassment': getIconForText('H', '#f39c12', '#ffffff'),
  'property-trespass': getIconForText('PT', '#2980b9', '#ffffff'),
  'substance': getIconForText('S', '#27ae60', '#ffffff'),
  'other': getIconForText('O', '#ffffff', '#000000')
}

function getMarkerOfType(name) {
  return markerData[name];
}

function addMarkerToMap(lat, lng, icon) {
  const marker = new H.map.Marker({ lat, lng }, { icon });
  map.addObject(marker);
  return marker;
}

function addDomMarkerToMap(lat, lng, row, symbolName) {
  const symbol = getMarkerOfType(symbolName);

  const outerElement = document.createElement('div');
  const innerElement = document.createElement('div');

  outerElement.style.userSelect = 'none';
  outerElement.style.webkitUserSelect = 'none';
  outerElement.style.msUserSelect = 'none';
  outerElement.style.mozUserSelect = 'none';
  outerElement.style.cursor = 'default';

  innerElement.style.color = symbol.color;
  innerElement.style.backgroundColor = symbol.bgColor;
  innerElement.style.border = '2px solid black';
  innerElement.style.font = 'normal 12px arial';
  innerElement.style.lineHeight = '12px'

  innerElement.style.paddingTop = '2px';
  innerElement.style.paddingLeft = '4px';
  innerElement.style.width = '16px';
  innerElement.style.height = '16px';

  innerElement.style.marginTop = '-8px';
  innerElement.style.marginLeft = '-8px';

  outerElement.appendChild(innerElement);

  innerElement.innerHTML = symbol.text;

  function showInfo(evt) {
    console.log(row);
    mapOverlay.showContent(`${row['Common Name'] || row['Address']}<br/>${row['Offense Description']}<br/>${row['Reported Date and Time']}`);
  };

  const icon = new H.map.DomIcon(outerElement, {
    onAttach: function(clonedElement, domIcon, domMarker) {
      clonedElement.addEventListener('click', showInfo);
    },
    onDetach: function(clonedElement, domIcon, domMarker) {
      clonedElement.removeEventListener('click', showInfo);
    }
  });

  const marker = new H.map.DomMarker({ lat, lng }, { icon });
  map.addObject(marker);
  return marker;
}

module.exports = {
  getMarkerOfType,
  addMarkerToMap,
  addDomMarkerToMap,
  markerData
}