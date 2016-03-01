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
    if (fileExists(this.mappedPath)) {
      this.ui.writeError(
        `Not writing file.  File already exists at: ${this.mappedPath}`
      );
    } else {
      const fileContent = this.renderTemplate();
      outputFileSync(this.mappedPath, fileContent);
      this.ui.writeCreate(this.mappedPath);
    }
  }

  renderTemplate() {
    const template = fs.readFileSync(this.originalPath, 'utf8');
    return ejs.render(template, this.templateVariables);
  }

  isFile() {
    return fileExists(this.originalPath);
  }
}

export default FileInfo;
