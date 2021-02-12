const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response}`;
      callback(Error(msg), null);
    } else {
      const info = JSON.parse(body);
      callback(null, info.ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request('https://freegeoip.app/json/' + ip, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (response.statusCode !== 200) {
      callback('404 Error', null);
    } else {
      const info = JSON.parse(body);
      callback(null, {
        latitude: info.latitude,
        longitude: info.longitude
      });
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (response.statusCode !== 200) {
      callback('404 Error', null);
    } else {
      const info = JSON.parse(body);
      callback(null, info.response);
    }
  });
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log('It failed at fetching the IP');
    } else {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          console.log('It failed at fetching the coordinates');
        } else {
          fetchISSFlyOverTimes(coords, (error, data) => {
            if (error) {
              console.log('It failed at fetching fly times');
            } else {
              callback(null, data);
            }
          });
        }
      });
    }
  });
};

module.exports = {
  nextISSTimesForMyLocation
};