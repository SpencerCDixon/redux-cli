import path from 'path';
import { fileExists } from '../util/fs';
import mixin from '../util/mixin';

export default class Blueprint {
  constructor(options) {
    this.ui = options.ui;
  }

  // find blueprint given a path or return error
  // look inside current project first and then redux-cli defaults
  static lookup() {
  }

  // load in the blueprint that was found, extend this class to load it
  static load(blueprintPath, options = {}) {
    let Constructor;
    const constructorPath = path.resolve(blueprintPath, 'index.js');

    if (fileExists(constructorPath)) {
      const blueprintModule = require(constructorPath);
      Constructor = mixin(Blueprint, blueprintModule);

      // not sure if I want this to return the new instance
      // or the constructor yet.
      return new Constructor(options);
    }
    return;
  }

  testFunction() {
    console.log('inside blueprint');
  }

  anotherFunction() {
    console.log('inside blueprint');
  }

  install() {
  }

  uninstall() {
  }

  // hooks
  beforeInstall() {}
  afterInstall() {}
  beforeUninstall() {}
  afterUninstall() {}

  process() {
  }
}
