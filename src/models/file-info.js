import ejs from 'ejs';
import fs from 'fs';
import { outputFileSync } from 'fs-extra';

class FileInfo {
  constructor(args) {
    this.ui = args.ui;
    this.templateVariables = args.templateVariables; // locals passed to ejs template
    this.originalPath = args.originalPath;           // path to template
    this.mappedPath = args.mappedPath;               // destination path to be written to
  }

  writeFile() {
    const fileContent = this.renderTemplate();
    outputFileSync(this.mappedPath, fileContent);
    this.ui.writeCreate(this.mappedPath);
  }

  renderTemplate() {
    const template = fs.readFileSync(this.originalPath, 'utf8');
    return ejs.render(template, this.templateVariables);
  }

  isFile() {
    return fs.statSync(this.originalPath).isFile();
  }
}

export default FileInfo;
