import lesson6 from '../src/lesson6/task.js';

const { getClimate, getProfile, getPilots } = lesson6;

describe('getClimate function', () => {
  test('getClimate works good', () => {
    return getClimate('Tatooine')
      .then(res => expect(res).toEqual('arid'));
  });
});


describe('getProfile function', () => {
  test('getProfile works good', () => {
    return getProfile('R2-D2')
      .then(res => expect(res.height).toEqual('96'));
  });
});


describe('getPilots function', () => {
  test('getPilots works good', () => {
    return getPilots('Millennium Falcon')
      .then(res => expect(res.pilots[1]).toEqual('https://swapi.co/api/people/14/'));
  });
});
