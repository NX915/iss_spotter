// index.js
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // console.log(passTimes);
  for (const time of passTimes) {
    let dateUTC = new Date(0);
    dateUTC.setUTCSeconds(time.risetime);
    console.log(`Next pass at ${dateUTC.toString()} for ${time.duration} seconds!`);
  }
});