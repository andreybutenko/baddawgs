const request = require('request');

let ready = false;
let data = {};
const callbacks = [];

request(`http://192.168.118.1:8080/crimes.json`, function(error, response, body) {
  if(error != null || response.statusCode != 200) {
    alert(`Got ${response.statusCode} code while getting data: ${JSON.toString(error)}`);
    return;
  }

  data = JSON.parse(body);
  ready = true;

  for(let i = 0; i < callbacks.length; i++) {
    callbacks[i](data);
  }
});

module.exports = {
  isReady: function() {
    return ready;
  },
  getData: function() {
    return ready ? data : null;
  },
  onDataLoaded: function(callback) {
    if(ready) {
      callback(data);
    }

    callbacks.push(callback);
  }
};