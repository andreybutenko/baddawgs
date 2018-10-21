const request = require('request');
const API_KEY = 'AIzaSyDL-SEvxjaNMQruNKh1MxGB9LIxrlmH7g8';

function getCoordinatesForAddress(address, callback) {
  const encodedAddress = address.split(' ').join('+')
  request(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`, function(error, response, body) {
    if(error != null || response.statusCode != 200) {
      alert(`Got ${response.statusCode} code while geocoding: ${JSON.toString(error)}`);
      return;
    }

    callback(address, JSON.parse(body).results[0].geometry.location);
  });
}

getCoordinatesForAddress('1600+Amphitheatre+Parkway,+Mountain+View,+CA', console.log);

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY