import fs from 'fs';
import { outputFileSync } from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

import { create, error, normalizeCasing } from '../util/textHelper';
import { fileExists } from '../util/fs';
import config from '../config';

const { pkgBasePath, basePath } = config;

class Generator {
  constructor(args) {
    // generator specific settings
    this.creationPath     = args.creationPath;
    this.componentName    = args.componentName;
    this.templatePath     = args.templatePath;
    this.testTemplatePath = args.testTemplatePath;

    // template rendering
    this.renderArgs = args.renderArgs;

    // project wide settings
    this.sourceBase    = args.settings.getSetting('sourceBase');
    this.testBase      = args.settings.getSetting('testBase');
    this.fileCasing    = args.settings.getSetting('fileCasing') || 'default';
    this.fileExtension = args.settings.getSetting('fileExtension') || 'js';
  }

  generate() {
    if (fileExists(this.componentPath())) {
      error(`File already exists at path: ${this.componentPath()}.  Aborting generator`);
      throw new Error('Not going to generate file since it already exists');
    } else {
      this.createComponent();
      this.createTest();
    }
  }

  createComponent() {
    const file = this.renderTemplate(this.templatePath);
    outputFileSync(this.componentPath(), file);
    create(`${this.componentPath()}`);
  }

  createTest() {
    const file = this.renderTemplate(this.testTemplatePath);
    outputFileSync(this.componentTestPath(), file);
    create(`${this.componentTestPath()}`);
  }

  componentPath() {
    const fileName = normalizeCasing(this.componentName, this.fileCasing);
    const compPath = `${this.componentDirPath()}/${fileName}.${this.fileExtension}`;
    return path.join(basePath, path.normalize(compPath));
  }

  componentTestPath() {
    const fileName = normalizeCasing(this.componentName, this.fileCasing);
    const testPath = `${this.testDirPath()}/${fileName}.test.${this.fileExtension}`;
    return path.join(basePath, path.normalize(testPath));
  }

  testDirPath() {
    return path.normalize(`${this.testBase}/${this.creationPath}`);
  }

  componentDirPath() {
    return path.normalize(`${this.sourceBase}/${this.creationPath}`);
  }

  renderTemplate(templatePath, args) {
    const finalPath = path.join(pkgBasePath, '..', templatePath);
    const template = fs.readFileSync(finalPath, 'utf8');
    const ejsArgs = Object.assign({}, this.renderArgs, args);
    return ejs.render(template, ejsArgs);
  }
}

export default Generator;
