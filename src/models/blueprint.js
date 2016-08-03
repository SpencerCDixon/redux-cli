import path from 'path';
import _ from 'lodash';
import walkSync from 'walk-sync';
import fs from 'fs';

import { fileExists } from '../util/fs';
import mixin from '../util/mixin';
import { normalizeCasing } from '../util/text-helper';
import FileInfo from './file-info';
import config from '../config';

const { basePath } = config;

function generateLookupPaths(lookupPaths) {
  lookupPaths = lookupPaths || [];
  lookupPaths = lookupPaths.concat(Blueprint.defaultLookupPaths());
  return _.uniq(lookupPaths);
}

function dir(fullPath) {
  if (fileExists(fullPath)) {
    return fs.readdirSync(fullPath).map(function(fileName) {
      return path.join(fullPath, fileName);
    });
  } else {
    return [];
  }
}

export default class Blueprint {
  constructor(blueprintPath) {
    this.path = blueprintPath;
    this.name = path.basename(blueprintPath);
  }

  // HOOK: that can be overridden.  Defaults to look in <blueprint-name>/files.
  filesPath() {
    return path.join(this.path, 'files');
  }

  files() {
    if (this._files) { return this._files; }

    let filesPath = this.filesPath();

    if (fileExists(filesPath)) {
      this._files = walkSync(filesPath);
    } else {
      this._files = [];
    }
    return this._files;
  }

  static defaultLookupPaths() {
    return [
      path.resolve(path.join(basePath, 'blueprints')),
      path.resolve(__dirname, '..', '..', 'blueprints')
    ];
  }
  // find blueprint given a path or return error
  // look inside current project first and then redux-cli defaults
  static lookup(name, options = {}) {
    const lookupPaths = generateLookupPaths(options.paths);

    let lookupPath;
    let blueprintPath;

    for (let i = 0; (lookupPath = lookupPaths[i]); i++) {
      blueprintPath = path.resolve(lookupPath, name);

      if (fileExists(blueprintPath)) {
        return Blueprint.load(blueprintPath);
      }
    }

    if (!options.ignoreMissing) {
      throw new Error('Unknown blueprint: ' + name);
    }
  }

  // load in the blueprint that was found, extend this class to load it
  static load(blueprintPath) {
    let Constructor;
    const constructorPath = path.resolve(blueprintPath, 'index.js');

    if (fs.lstatSync(blueprintPath).isDirectory()) {
      if (fileExists(constructorPath)) {
        const blueprintModule = require(constructorPath);
        Constructor = mixin(Blueprint, blueprintModule);

        return new Constructor(blueprintPath);
      }
    }
  }

  static list(options = {}) {
    return generateLookupPaths(options.paths).map(lookupPath => {
      const blueprintFiles = dir(lookupPath);
      const packagePath = path.join(lookupPath, '../package.json');
      let source;

      if (fileExists(packagePath)) {
        source = require(packagePath).name;
      } else {
        source = path.basename(path.join(lookupPath, '..'));
      }

      const blueprints = blueprintFiles.map(filePath => {
        const blueprint = this.load(filePath);

        if (blueprint) {
          let description;
          const name = blueprint.name;

          if (blueprint.description) {
            description = blueprint.description();
          } else {
            description = 'N/A';
          }

          return {
            name,
            description
          };
        }
      });

      return {
        source,
        blueprints: _.compact(blueprints)
      };
    });
  }

  _fileMapTokens(options) {
    const standardTokens = {
      __name__: (options) => {
        const name = options.entity.name;
        const casing = options.settings.getSetting('fileCasing') || 'default';
        return normalizeCasing(name, casing);
      },
      __path__: (options) => {
        return options.originalBlueprintName;
      },
      __root__: (options) => {
        return options.settings.getSetting('sourceBase');
      },
      __test__: (options) => {
        return options.settings.getSetting('testBase');
      }
    };

    // HOOK: calling into the blueprints fileMapTokens() hook, passing along
    // an options hash coming from _generateFileMapVariables()
    const customTokens = this.fileMapTokens(options) || {};
    return Object.assign({}, standardTokens, customTokens);
  }

  generateFileMap(fileMapOptions) {
    const tokens = this._fileMapTokens(fileMapOptions);
    const fileMapValues = _.values(tokens);
    const tokenValues = fileMapValues.map(token => token(fileMapOptions));
    const tokenKeys = _.keys(tokens);
    return _.zipObject(tokenKeys, tokenValues);
  }

  // Set up options to be passed to fileMapTokens that get generated.
  _generateFileMapVariables(entityName, locals, options) {
    const originalBlueprintName = options.originalBlueprintName || this.name;
    const { settings, entity } = options;

    return {
      originalBlueprintName,
      settings,
      entity,
      locals
    };
  }

  // Given a file and a fileMap from locals, convert path names
  // to be correct string
  mapFile(file, locals) {
    let pattern, i;
    const fileMap = locals.fileMap || { __name__: locals.camelEntityName };
    for (i in fileMap) {
      pattern = new RegExp(i, 'g');
      file = file.replace(pattern, fileMap[i]);
    }
    return file;
  }

  _locals(options) {
    const entityName = options.entity && options.entity.name;
    const customLocals = this.locals(options);
    const fileMapVariables = this._generateFileMapVariables(entityName, customLocals, options);
    const fileMap = this.generateFileMap(fileMapVariables);

    const standardLocals = {
      pascalEntityName: normalizeCasing(entityName, 'pascal'),
      camelEntityName:  normalizeCasing(entityName, 'camel'),
      snakeEntityName: normalizeCasing(entityName, 'snake'),
      dashesEntityName: normalizeCasing(entityName, 'dashes'),
      fileMap
    };

    return Object.assign({}, standardLocals, customLocals);
  }

  _process(options, beforeHook, process, afterHook) {
    const locals = this._locals(options);
    return Promise.resolve()
      .then(beforeHook.bind(this, options, locals))
      .then(process.bind(this, locals))
      .then(afterHook.bind(this, options));
  }

  processFiles(locals) {
    const files = this.files();
    const fileInfos = files.map(file => this.buildFileInfo(locals, file));
    this.ui.writeDebug(`built file infos: ${fileInfos.length}`);
    const filesToWrite = fileInfos.filter(info => info.isFile());
    this.ui.writeDebug(`files to write: ${filesToWrite.length}`);
    filesToWrite.map(file => file.writeFile(this.dryRun));
  }

  buildFileInfo(locals, file) {
    const mappedPath = this.mapFile(file, locals);
    this.ui.writeDebug(`mapped path: ${mappedPath}`);

    return new FileInfo({
      ui: this.ui,
      templateVariables: locals,
      originalPath: this.srcPath(file),
      mappedPath: this.destPath(mappedPath),
      outputPath: this.destPath(file)
    });
  }

  // where the files will be written to
  destPath(mappedPath) {
    return path.resolve(basePath, mappedPath);
  }

  // location of the string templates
  srcPath(file) {
    return path.resolve(this.filesPath(), file);
  }

  /*
   * install options:

    const blueprintOptions = {
      originalBlueprintName: name,
      ui: this.ui,
      settings: this.settings,
      entity: {
        name: cliArgs.entity.name,
        options cliArgs.entity.options
      }
    };
  */
  install(options) {
    const ui = this.ui = options.ui;
    this.dryRun = options.dryRun;

    ui.writeInfo('installing blueprint...');
    return this._process(
      options,
      this.beforeInstall,
      this.processFiles,
      this.afterInstall
    ).then(() => {
      ui.writeInfo('finished installing blueprint.');
    });
  }

  // uninstall() {
  // }

  // HOOKS:
  locals() {}
  fileMapTokens() {}
  beforeInstall() {}
  afterInstall() {}

  // TODO: add uninstall hooks once support for uninstall exists
  // beforeUninstall() {}
  // afterUninstall() {}

  // HOOK: for normalizing entity name that gets passed in as an arg
  // via the CLI
  // normalizeEntityName(options) {
    // return normalizeEntityName(name);
  // }
}

