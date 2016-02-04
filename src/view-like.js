const Promise = require('bluebird');
const getProxies = require('./loadProxies.js');
const like = require('./like.js');
const view = require('./canvote.js');
const request = require('request-promise');
const random = require('lodash/random');

module.exports = function viewAndLike(opts) {
  const times = +opts.times;
  const proxies = getProxies(times);
  const project = opts.project;
  const concurrency = +opts.concurrency;
  const cutoff = +opts.ratio;

  process.stdout.write(`\nRunning ${times} view/likes with ${cutoff} ration...\n`);

  let viewed = 0;
  let liked = 0;
  return Promise.map(proxies, proxy => {
    const jar = request.jar();
    const act = { project, jar, proxy };
    const thunk = random(1, true) < cutoff ? like : view;

    process.stdout.write('.');

    return Promise.resolve(act)
      .delay(random(100, 3000))
      .then(thunk)
      .reflect()
      .then(promise => {
        if (promise.isFulfilled() !== true) {
          return null;
        }

        viewed++;
        if (thunk === like) {
          liked++;
        }
      });
  }, { concurrency })
  .then(() => {
    process.stdout.write('\n');
    return `viewed: ${viewed}, liked: ${liked}`;
  });
};
