const Promise = require('bluebird');
const request = require('request-promise');
const canVote = require('./canvote.js');
const getProxy = require('./loadProxies.js');

module.exports = function performLike(opts) {
  const jar = opts.jar = opts.jar || request.jar();
  const proxy = opts.proxy = opts.proxy || getProxy();

  return Promise
    .resolve(opts)
    .then(canVote)
    .then(() => (
      request({
        url: 'https://www.behance.net/c/a',
        proxy,
        qs: {
          e: 'project',
          id: opts.project,
        },
        jar,
        simple: false,
        resolveWithFullResponse: true,
      })
    ))
    .get('statusCode');
};
