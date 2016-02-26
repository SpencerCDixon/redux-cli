import { test, cd, pwd } from 'shelljs';
import fs from 'fs';
import denodeify from 'denodeify';

import Task from '../models/task';

const mkdir = denodeify(fs.mkdir);

export default class extends Task {
  run(options) {
    this.ui = options.ui;
    const dirName = this.dirName = options.dirName;
    this.confirmDir();

    this.ui.writeInfo('Creating new directory...');
    return mkdir(this.dirName)
      .then(() => {
        this.ui.writeCreate(`Created directory: ${this.dirName}`);
        const oldDirectory = pwd();
        cd(dirName);
        return { initialDirectory: oldDirectory };
      });
  }

  confirmDir() {
    if (test('-d', this.dirName)) {
      this.ui.writeError(`${this.dirName} directory already exists!  Please choose another name`);
      process.exit(1);
    }
  }
}
