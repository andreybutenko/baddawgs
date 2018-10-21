const POPUP = 'map-popup';
const OVERLAY = 'map-popup-overlay';
const TITLE = 'map-popup-title';
const LOCATION = 'map-popup-location';
const TIME = 'map-popup-time';
const CASE = 'map-popup-case';
const CLOSE = 'map-popup-close';

function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}

function showPopup(row) {
  document.getElementById(OVERLAY).style.display = 'flex';
  document.getElementById(TITLE).innerHTML = row['Offense Description'];
  document.getElementById(LOCATION).innerHTML = `${(row['Common Name'] || '')}${row['Common Name'] && row['Address'] ? '<br/>' : ''}${toTitleCase(row['Address']) || ''}`;
  document.getElementById(LOCATION).innerHTML = `${(row['Common Name'] || '')}${row['Common Name'] && row['Address'] ? '<br/>' : ''}${toTitleCase(row['Address']) || ''}`;
  document.getElementById(TIME).innerHTML = row['Reported Date and Time'];
  document.getElementById(CASE).innerHTML = `${row['Case Number']} ${row['Case Disposition']}`;
}

function hide() {
  document.getElementById(OVERLAY).style.display = 'none';
}

document.getElementById(OVERLAY).addEventListener('click', hide);
document.getElementById(CLOSE).addEventListener('click', hide);
hide();

module.exports = {
  showPopup
};