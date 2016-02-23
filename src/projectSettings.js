import path from 'path';
import { copySync } from 'fs-extra';
import jf from 'jsonfile';
import { pwd } from 'shelljs';

import { fileExists } from './util/fs';
import config from './config';

const { basePath } = config;

export default class ProjectSettings {
  constructor() {
    this.loadSettings();
  }

  loadSettings() {
    if (this.settingsExist()) {
      this.settings = jf.readFileSync(this.settingsPath());
    } else {
      this.buildFromTemplate();
      this.settings = jf.readFileSync(this.settingsPath());
    }
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
    return path.join(pwd(), '.reduxrc');
  }

  settingsExist() {
    return fileExists(this.settingsPath());
  }

  getSetting(key) {
    return this.settings[key];
  }

  getAllSettings() {
    return this.settings;
  }

  setSetting(key, val) {
    this.settings[key] = val;
  }

  save() {
    jf.writeFileSync(this.settingsPath(), this.settings);
  }
}
