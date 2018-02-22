'use strict';

let nconf = require('nconf'),
    path = require('path');

let dddd = path.join(process.cwd(), 'config.json');

let zzz = process.cwd();
let kkk = __dirname;

nconf.argv()
  .env()
  .file({
    file: `${process.cwd()}/config.json`
  });

module.exports = nconf;
