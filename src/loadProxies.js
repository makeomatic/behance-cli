const fs = require('fs');
const path = require('path');
const proxies = fs.readFileSync(path.resolve(__dirname, '../proxies.txt'), 'utf-8').split('\n');
const ld = require('lodash');

module.exports = function getProxy(size = 1) {
  return size > 1 ? ld.sampleSize(proxies, size) : ld.sample(proxies);
};
