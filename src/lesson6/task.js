require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
// с помощью Fetch API и swapi.co API получить следующие данные

const apiEndpoint = 'https://swapi.co/api';
// Климат на любой планете по её имени
// {planetName} – String
const getClimate = function(planetName) {
  return fetch(`${apiEndpoint}/planets/?search=${planetName}`)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(json) {
      //console.log('json => ', json.results[0]['climate']);
      return json.results[0]['climate'];
    })
    .catch(error => console.error('Error:', error));
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = function(name) {
  return fetch(`${apiEndpoint}/people/?search=${name}`)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(json) {
      //console.log('json => ', json.results[0]);
      return json.results[0];
    })
    .catch(error => console.error('Error:', error));
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = function(starshipName) {
  return fetch(`${apiEndpoint}/starships/?search=${starshipName}`)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(json) {
      //console.log('json => ', json.results[0]);
      return json.results[0];
    })
    .catch(error => console.error('Error:', error));
}


export default {
  getClimate,
  getProfile,
  getPilots
}
