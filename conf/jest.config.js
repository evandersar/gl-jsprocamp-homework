const path = require('path');

module.exports = {
  rootDir: path.join(process.cwd(), './'),
  collectCoverage: true,
  verbose: true,
  roots: ['__tests__/lesson5.test.js']
};
