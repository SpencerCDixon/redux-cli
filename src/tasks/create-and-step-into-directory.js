import { test, cd, exec } from 'shelljs';
import fs from 'fs';
import denodeify from 'denodeify';

import Task from '../models/task';

const mkdir = denodeify(fs.mkdir);

export default class extends Task {
  constructor(environment) {
    super(environment);
  }

  run(options) {
    this.dirName = options.dirName;
    this.confirmDir();

    this.ui.writeInfo('Creating new directory...');
    return mkdir(this.dirName)
      .then(() => {
        this.ui.writeCreate(`Created directory: ${this.dirName}`);
        cd(this.dirName);
        this.initGit();
      });
  }

  confirmDir() {
    if (test('-d', this.dirName)) {
      this.ui.writeError(`${this.dirName} directory already exists!  Please choose another name`);
      process.exit(1);
    }
  }

  initGit() {
    this.ui.writeInfo('Setting up tracking with git...');
    exec('git init', {silent: true});
  }
}
