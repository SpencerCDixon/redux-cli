import path from 'path';
import { copySync } from 'fs-extra';
import jf from 'jsonfile';
import { pwd } from 'shelljs';

import { fileExists } from '../util/fs';

/*
  Look into using Yam for finding settings so it will get the first
  .reduxrc it finds and use that for project settings just like how
  eslintrc and ember-cli works
*/

export default class ProjectSettings {
  constructor(relativePath) {
    this.relativePath = relativePath || '../../templates/.reduxrc';
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
      path.dirname(module.id), this.relativePath
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

  setAllSettings(json) {
    this.settings = json;
  }

  save() {
    jf.writeFileSync(this.settingsPath(), this.settings);
  }
}
