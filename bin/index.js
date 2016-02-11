#!/usr/bin/env node --harmony

var program = require('commander');

program
  .version('0.0.1')
  .command('init', 'initialize .reduxrc file for project defaults')

program.parse(process.argv);
