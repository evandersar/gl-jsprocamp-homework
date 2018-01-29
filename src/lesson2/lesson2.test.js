import lesson2 from '../src/lesson2/task.js';

const { sum, sumAll, pow, random } = lesson2;

describe('sum function', () => {
  test('sum works good', () => {
    expect(sum(1, 2)).toBe(3);
  });
});


describe('sumAll function', () => {
  test('sumAll works good', () => {
    expect(sumAll(1, 2, 3)).toBe(6);
  });
});


describe('pow function', () => {
  test('pow works good', () => {
    expect(pow(2, 3)).toBe(8);
  });
});

describe('random function', () => {
  test('random works good', () => {
    expect(random(1, 10)).toBeLessThanOrEqual(10);
    expect(random(1, 10)).toBeGreaterThanOrEqual(1);
  });
});
