import ejs from 'ejs';
import fs from 'fs';
import { outputFileSync } from 'fs-extra';
import { fileExists } from '../util/fs';

class FileInfo {
  constructor(args) {
    this.ui = args.ui;
    this.templateVariables = args.templateVariables; // locals passed to ejs template
    this.originalPath = args.originalPath;           // path to template
    this.mappedPath = args.mappedPath;               // destination path to be written to
  }

  writeFile() {
    this.ui.writeDebug('Attempting to write file: ', this.mappedPath);
    if (fileExists(this.mappedPath)) {
      this.ui.writeDebug(
        `Not writing file.  File already exists at: ${this.mappedPath}`
      );
    } else {
      const fileContent = this.renderTemplate();
      this.ui.writeDebug(`fileContent: ${fileContent}`);

      outputFileSync(this.mappedPath, fileContent);
      this.ui.writeCreate(this.mappedPath);
    }
    return;
  }

  renderTemplate() {
    let rendered;
    this.ui.writeDebug(`rendering template: ${this.originalPath}`);
    const template = fs.readFileSync(this.originalPath, 'utf8');

    try {
      rendered = ejs.render(template, this.templateVariables);
    } catch (err) {
      this.ui.writeDebug('couldnt render');
      err.message += ' (Error in blueprint template: ' + this.originalPath + ')';
      this.ui.writeError(`error was: ${err.message}`);
      throw err;
    }
    return rendered;
  }

  isFile() {
    const fileCheck = fs.lstatSync(this.originalPath).isFile();
    this.ui.writeDebug(`checking file: ${this.originalPath} - ${fileCheck}`);
    return fileCheck;
  }
}

export default FileInfo;
