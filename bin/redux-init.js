#!/usr/bin/env node --harmony

var co = require('co');
var prompt = require('co-prompt');
var chalk = require('chalk');

console.log('doing some stuff');

function green(text) {
  return chalk.bold.cyan(text);
}

co(function *() {
  var testPath = yield prompt('test path: ');
  var componentPath = yield prompt('component path: ');
  console.log(green('Your test path is: ' + testPath));
  console.log(green('Youre component path is: ' + componentPath));
  process.exit(0);
});

