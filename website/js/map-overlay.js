function getPopup() {
  return document.getElementById('map-popup');
}

function getPopupOverlay() {
  return document.getElementById('map-popup-overlay');
}

function showContent(text) {
  getPopup().innerHTML = text;
  getPopupOverlay().style.display = 'flex';
}

function hide() {
  getPopupOverlay().style.display = 'none';
}

getPopupOverlay().addEventListener('click', hide);
hide();

module.exports = {
  showContent
};