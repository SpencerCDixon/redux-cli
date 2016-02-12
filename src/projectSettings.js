import path from 'path';
import { fileExists } from './util/fs';
import config from '../config';

const { basePath } = config;

export default class ProjectSettings {
  constructor() {
    this.templatePath = path.join(
      path.dirname(module.id), '../templates/.reduxrc'
    );
  }

  settingsPath() {
    return path.join(basePath, '.reduxrc');
  }

  settingsExist() {
    return fileExists(this.settingsPath());
  }
}
