import path from 'path';
import fs from 'fs';
import { fileExists } from './util/fs';

export default class ProjectSettings {
  constructor() {
    this.templatePath = path.join(
      path.dirname(module.id), '../templates/.reduxrc'
    );
  }

  settingsPath() {
    return path.join(process.env['PWD'], '.reduxrc');
  }

  settingsExist() {
    return fileExists(this.settingsPath());
  }
}
