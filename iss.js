const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const ipUrl = 'https://api.ipify.org?format=json';
  // use request to fetch IP address from JSON API
  request(ipUrl, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    // console.log(body);
    if (response.statusCode === 200) {
      body = JSON.parse(body);
      callback(null, body.ip);
    } else {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const coordUrl = 'https://ipvigilante.com/';
  request(coordUrl + ip, (err, response, body) => {
    if (err) return callback(err, null);
    if (response.statusCode === 200) {
      const {latitude, longitude} = JSON.parse(body).data;
      callback(null, {latitude, longitude});
    } else {
      const msg = `Status Code ${response.statusCode} when fetching coordinate. Response: ${body}`;
      callback(Error(msg), null);
    }
  });
};
const fetchISSFlyOverTimes = function(coord, callback) {
  const issUrl = `http://api.open-notify.org/iss-pass.json?lat=${coord.latitude}&lon=${coord.longitude}`;
  request(issUrl, (err, response, body) => {
    if (err) return callback(err, null);
    if (response.statusCode === 200) {
      callback(null, JSON.parse(body).response);
    } else {
      const msg = `Status Code ${response.statusCode} when fetching flyovers. Response: ${body}`;
      callback(Error(msg), null);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return console.log("fetch IP error" , error);
    fetchCoordsByIP(ip, (err, data) => {
      if (err) return console.log('fetch coordinates error: ', err);
      fetchISSFlyOverTimes(data, (err, data) => {
        if (err) return console.log('fetch flyover error: ', err);
        // console.log(data);
        callback(null, data);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };