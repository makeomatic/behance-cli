# behance-cli

[![Greenkeeper badge](https://badges.greenkeeper.io/makeomatic/behance-cli.svg)](https://greenkeeper.io/)

```sh
Vitalys-iMac:behance-cli vitaly$ ./bin/index.js -h
Usage: bin/index.js <command> [options]

Commands:
  like       likes behance project
  canvote    can ip vote?
  view-like  adds views and likes to the project

Options:
  -p, --project      project id                                       [required]
  -c, --concurrency  concurrency of requests                       [default: 10]
  -r, --ratio        ratio of likes vs views                      [default: 0.1]
  -h, --help         Show help                                         [boolean]
  -t, --times                                                       [default: 1]

Examples:
  bin/index.js like -p 23123122

(c) Makeomatic 2016
```