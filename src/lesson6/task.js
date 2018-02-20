require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
// с помощью Fetch API и swapi.co API получить следующие данные

const apiEndpoint = 'https://swapi.co/api';
// Климат на любой планете по её имени
// {planetName} – String
const getClimate = async (planetName) => {
  try{
    const response = await fetch(`${apiEndpoint}/planets/?search=${planetName}`);
    const json = await response.json();
    return json.results[0] ? json.results[0]['climate'] : undefined;
  }
  catch(error){
    console.error('Error:', error);
  }
  /*return await fetch(`${apiEndpoint}/planets/?search=${planetName}`)
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
    .catch(error => console.error('Error:', error));*/
};

// Получить информацию (Object) о любом персонаже по имени
// {name} – String
const getProfile = async (name) => {
  try{
    const response = await fetch(`${apiEndpoint}/people/?search=${name}`);
    const json = await response.json();
    return json.results[0] ? json.results[0] : undefined;
  }
  catch(error){
    console.error('Error:', error);
  }
};

// Получить список пилотов (имена в виде Array of Strings) космического корабля
// по его названию
// {starshipName} - String
const getPilots = async(starshipName) => {
  try{
    const response = await fetch(`${apiEndpoint}/starships/?search=${starshipName}`);
    const json = await response.json();
    return json.results[0] ? json.results[0] : undefined;
  }
  catch(error){
    console.error('Error:', error);
  }
};


export default {
  getClimate,
  getProfile,
  getPilots
};
