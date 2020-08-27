const request = require("request-promise-native");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function() {
  const ipUrl = 'https://api.ipify.org?format=json';
  // use request to fetch IP address from JSON API
  return request(ipUrl);
};

const fetchCoordsByIP = function(body) {
  const coordUrl = 'https://ipvigilante.com/';
  const ip = JSON.parse(body).ip;
  return request(coordUrl + ip);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body).data;
  const issUrl = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(issUrl);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response;
    });
};

module.exports = { nextISSTimesForMyLocation };