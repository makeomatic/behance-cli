const request = require('request-promise');
const getProxy = require('./loadProxies.js');

module.exports = function performLike(opts) {
  const jar = opts.jar = opts.jar || request.jar();
  const proxy = opts.proxy = opts.proxy || getProxy();

  return request({
    url: 'https://www.behance.net/c/v',
    proxy,
    qs: {
      e: 'project',
      id: opts.project,
    },
    jar,
    simple: false,
    json: true,
    resolveWithFullResponse: true,
  })
  .then(data => {
    if (data.body.v === '1') {
      return true;
    }

    throw new Error(`cant vote`);
  });
};
