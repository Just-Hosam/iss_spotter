const { nextISSTimesForMyLocation, fetchISSFlyOverTimes, fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//   } else {
//     console.log('It worked! Returned IP:' , ip);
//   }
// });

// fetchCoordsByIP('174.0.9.16', (error, data) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//   } else {
//     console.log('It did work!', data);
//   }
// });

// fetchISSFlyOverTimes({ latitude: 51.0207, longitude: -114.1011 }, (error, data) => {
//   if (error) {
//     console.log('It did NOT work!', error);
//   } else {
//     console.log('It did work!', data);
//   }
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log('It did NOT work!', error);
  } else {
    printPassTimes(passTimes);
  }
});