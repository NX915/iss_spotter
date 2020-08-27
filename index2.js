const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (const time of passTimes) {
      let dateUTC = new Date(0);
      dateUTC.setUTCSeconds(time.risetime);
      console.log(`Next pass at ${dateUTC.toString()} for ${time.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log('Error!: ', error.message);
  });