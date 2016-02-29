import path from 'path';
import { fileExists } from '../util/fs';
import mixin from '../util/mixin';
import walkSync from 'walk-sync';
import _ from 'lodash';
import { normalizeCasing } from '../util/text-helper';

function generateLookupPaths(lookupPaths) {
  lookupPaths = lookupPaths || [];
  lookupPaths = lookupPaths.concat(Blueprint.defaultLookupPaths());
  return _.uniq(lookupPaths);
}

export default class Blueprint {
  constructor(blueprintPath) {
    this.path = blueprintPath;
    this.name = path.basename(path);
  }

  // Hook that can be overridden.  Defaults to look
  // in blueprint/files.
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

    if (fileExists(constructorPath)) {
      const blueprintModule = require(constructorPath);
      Constructor = mixin(Blueprint, blueprintModule);

      return new Constructor(blueprintPath);
    }
    return;
  }

  _fileMapTokens(options) {
    const standardTokens = {
      __name__: (options) => {
        const name = options.entity.name;
        const casing = options.settings.getSetting('fileCasing');
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
  _generateFileMapVariables(locals, options) {
    const originalBlueprintName = options.originalBlueprintName || this.name;
    const { settings, entity } = options;

    return {
      originalBlueprintName,
      settings,
      entity,
      locals
    };
  }

  _locals(options) {
  }

  _process(options, beforeHook, process, afterHook) {
    const locals = this._locals(options);
    return Promise.resolve()
      .then(beforeHook.bind(this, options, locals))
      .then(process.bind(this, locals))
      .then(afterHook.bind(this, options));
  }

  processFiles() {
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
    const ui       = this.ui = options.ui;
    const settings = this.settings = options.settings;

    ui.writeInfo('installing blueprint...');

    return this._process(
      options,
      this.beforeInstall,
      this.processFiles,
      this.afterInstall
    ).finally(() => {
      ui.writeInfo('finished installing blueprint.');
    });
  }

  // uninstall() {
  // }

  // hooks
  locals() {}
  fileMapTokens() {}
  beforeInstall() {}
  afterInstall() {}
  // beforeUninstall() {}
  // afterUninstall() {}

  // hook for normalizing entity name that gets passed in as an arg
  // via the CLI
  // normalizeEntityName(options) {
    // return normalizeEntityName(name);
  // }
}

