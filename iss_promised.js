const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = dataIP => {
  const ip = JSON.parse(dataIP).ip;
  return request('https://freegeoip.app/json/' + ip);
};

const fetchISSFlyOverTimes = dataCoords => {
  const coords = JSON.parse(dataCoords);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => JSON.parse(data).response);
};

module.exports = {
  nextISSTimesForMyLocation
}