import fs from 'fs';
import { ensureDirSync } from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

import { danger, create } from './util/textHelper';
import { fileExists } from './util/fs';
import config from './config';

const { pkgBasePath, basePath } = config;

export default class Generator {
  constructor(args) {
    this.sourceBase = args.sourceBase;
    this.creationPath = args.creationPath;
    this.componentName = args.componentName;
    this.templatePath = args.templatePath;
    this.testTemplatePath = args.testTemplatePath;
    this.testCreationPath = args.testCreationPath;
    this.extension = args.extension || 'js';
  }

  generate() {
    if (fileExists(this.componentPath())) {
      console.log(
        danger(`File already exists at path: ${this.componentPath()}.  Aborting generator`)
      );
      process.exit(1);
    } else {
      this.createComponent();
      this.createTest();
    }
  }

  createComponent() {
    const templatePath = path.join(pkgBasePath, '..', this.templatePath);
    const template = fs.readFileSync(templatePath, 'utf8');
    const file = ejs.render(template, { name: this.componentName });

    ensureDirSync(path.join(basePath, this.componentDirPath()));
    fs.writeFileSync(this.componentPath(), file);
    console.log(create(`${this.componentName} Component at: ${this.componentPath()}`));
  }

  createTest() {
    const templatePath = path.join(pkgBasePath, '..', this.testTemplatePath);
    const template = fs.readFileSync(templatePath, 'utf8');
    const file = ejs.render(template, { name: this.componentName });

    ensureDirSync(path.join(basePath, this.testDirPath()));
    fs.writeFileSync(this.componentTestPath(), file);
    console.log(create(`${this.componentName} Component test at: ${this.componentTestPath()}`));
  }

  componentPath() {
    const compPath = `${this.componentDirPath()}/${this.componentName}.${this.extension}`;
    return path.join(basePath, path.normalize(compPath));
  }

  componentTestPath() {
    const testPath = `${this.testDirPath()}/${this.componentName}.test.${this.extension}`;
    return path.join(basePath, path.normalize(testPath));
  }

  testDirPath() {
    return path.normalize(`${this.testCreationPath}/${this.creationPath}`);
  }

  componentDirPath() {
    return path.normalize(`${this.sourceBase}/${this.creationPath}`);
  }
}
