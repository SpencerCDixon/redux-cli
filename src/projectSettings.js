import path from 'path';
import { copySync } from 'fs-extra';
import { fileExists } from './util/fs';
import config from '../config';

const { basePath } = config;

export default class ProjectSettings {
  constructor() {
  }

  templatePath() {
    return path.join(
      path.dirname(module.id), '../templates/.reduxrc'
    );
  }

  buildFromTemplate() {
    copySync(this.templatePath(), this.settingsPath());
  }

  settingsPath() {
    return path.join(basePath, '.reduxrc');
  }

  settingsExist() {
    return fileExists(this.settingsPath());
  }
}
