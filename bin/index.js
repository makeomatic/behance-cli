#!/usr/bin/env node

'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const ld = require('lodash');

const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('like', 'likes behance project')
  .command('canvote', 'can ip vote?')
  .command('view-like', 'adds views and likes to the project')
  .demand(1)
  .example('$0 like -p 23123122')
  .alias('f', 'file')
  .demand('p')
  .describe('p', 'project id')
  .alias('p', 'project')
  .nargs('p', 1)
  .describe('c', 'concurrency of requests')
  .alias('c', 'concurrency')
  .default('c', 10)
  .alias('t', 'times')
  .default('t', 1)
  .describe('r', 'ratio of likes vs views')
  .alias('r', 'ratio')
  .default('r', 0.1)
  .help('h')
  .alias('h', 'help')
  .epilog('(c) Makeomatic 2016')
  .argv;

let command;
try {
  require('babel-register');
  command = require(`../src/${argv._}`);
} catch (e) {
  command = require(`../lib/${argv._}`);
}

// now perform the command
command(argv)
  .then(data => process.stdout.write(`${argv._} response: ${String(data)}\n`))
  .catch(err => process.stderr.write(`${argv._} error: ${err.message}\n`));
