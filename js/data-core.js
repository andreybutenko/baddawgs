const request = require('request');
const categories = require('./categories.js');
const filters = require('./filters.js');

let ready = false;
let data = [];
const callbacks = [];

request(`http://127.0.0.1:8080/crimes.json`, function(error, response, body) {
  if(error != null || response.statusCode != 200) {
    alert(`Got ${response.statusCode} code while getting data: ${JSON.toString(error)}`);
    return;
  }

  const rawData = JSON.parse(body);

  for(let key in rawData) {
    data.push(rawData[key]);
  }

  data = data
    .filter(row => row != null && row['Offense Description'] != null)
    .map(row => {
      return {
        ...row,
        category: categories.getCategory(row)
      };
    });

  console.log(data);

  ready = true;

  for(let i = 0; i < callbacks.length; i++) {
    callbacks[i](data);
  }

  filters.onFiltersChange(allowed => {
    const filtered = data.filter(row => allowed.includes(row.category))
    for(let i = 0; i < callbacks.length; i++) {
      callbacks[i](filtered);
    }
  });
});

request(`http://baddawgs.org/crimes.json`, function(error, response, body) {
  if(error != null || response.statusCode != 200) {
    alert(`Got ${response.statusCode} code while getting data: ${JSON.toString(error)}`);
    return;
  }

  const rawData = JSON.parse(body);

  for(let key in rawData) {
    data.push(rawData[key]);
  }

  data = data
    .filter(row => row != null && row['Offense Description'] != null)
    .map(row => {
      return {
        ...row,
        category: categories.getCategory(row)
      };
    });

  console.log(data);

  ready = true;

  for(let i = 0; i < callbacks.length; i++) {
    callbacks[i](data);
  }

  filters.onFiltersChange(allowed => {
    const filtered = data.filter(row => allowed.includes(row.category))
    for(let i = 0; i < callbacks.length; i++) {
      callbacks[i](filtered);
    }
  });
});

request(`https://crimedb.azurewebsites.net/crimes.json`, function(error, response, body) {
  if(error != null || response.statusCode != 200) {
    alert(`Got ${response.statusCode} code while getting data: ${JSON.toString(error)}`);
    return;
  }

  const rawData = JSON.parse(body);

  for(let key in rawData) {
    data.push(rawData[key]);
  }

  data = data
    .filter(row => row != null && row['Offense Description'] != null)
    .map(row => {
      return {
        ...row,
        category: categories.getCategory(row)
      };
    });

  console.log(data);

  ready = true;

  for(let i = 0; i < callbacks.length; i++) {
    callbacks[i](data);
  }

  filters.onFiltersChange(allowed => {
    const filtered = data.filter(row => allowed.includes(row.category))
    for(let i = 0; i < callbacks.length; i++) {
      callbacks[i](filtered);
    }
  });
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