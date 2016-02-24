import fs from 'fs';
import { outputFileSync } from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { depascalize, pascalize, camelize } from 'humps';

import { create, error } from '../util/textHelper';
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

    // project wide settings
    this.sourceBase         = args.settings.getSetting('sourceBase');
    this.testBase           = args.settings.getSetting('testBase');
    this.fileCasing         = args.settings.getSetting('fileCasing') || 'default';
    this.fileExtension      = args.settings.getSetting('fileExtension') || 'js';
    this.wrapFilesInFolders = args.settings.getSetting('wrapFilesInFolders') || false;
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

  normalizeCasing(string) {
    if (this.fileCasing === 'snake') {
      return depascalize(pascalize(string));
    } else if (this.fileCasing === 'pascal') {
      return pascalize(string);
    } else if (this.fileCasing === 'camel') {
      return camelize(string);
    } else {
      return string;
    }
    return string;
  }

  componentPath() {
    const fileBase = this.normalizeCasing(this.componentName);
    let compPath = `${this.componentDirPath()}/`;
    if (this.wrapFilesInFolders) compPath += `${fileBase}/`;
    compPath += `${fileBase}.${this.fileExtension}`;
    return path.join(basePath, path.normalize(compPath));
  }

  componentTestPath() {
    const fileBase = this.normalizeCasing(this.componentName);
    let testPath = `${this.testDirPath()}/`;
    if (this.wrapFilesInFolders) testPath += `${fileBase}/`;
    testPath += `${fileBase}.test.${this.fileExtension}`;
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
    const ejsArgs = Object.assign({}, {name: this.componentName}, args);
    return ejs.render(template, ejsArgs);
  }
}

export default Generator;
