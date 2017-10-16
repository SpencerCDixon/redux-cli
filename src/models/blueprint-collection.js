import path from 'path';
import fs from 'fs';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import _isNil from 'lodash/isNil';
import _isBool from 'lodash/isBoolean';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _flatten from 'lodash/flatten';
import _uniq from 'lodash/uniq';
import Blueprint from './blueprint';

export default class BlueprintCollection {
  constructor(pathList) {
    this.pathList = pathList;
    this.setSearchPaths();
  }

  allPossiblePaths() {
    return _flatten(
      _map(this.pathList, (arr, base) => _map(arr, bp => expandPath(base, bp)))
    );
  }

  setSearchPaths() {
    this.searchPaths = _uniq(_filter(this.allPossiblePaths(), validSearchDir));
  }

  all() {
    // Is there a more idiomatic way to do this?  I miss ruby's ||=
    if (this.allBlueprints) {
      return this.allBlueprints;
    } else {
      return (this.allBlueprints = this.discoverBlueprints());
    }
  }

  generators() {
    // until we learn to tell generators apart from partials
    return _filter(this.all(), bp => bp.name);
  }

  allNames() {
    return _map(this.all(), bp => bp.name);
  }

  addBlueprint(path) {
    return Blueprint.load(path);
  }

  discoverBlueprints() {
    return _map(this.findBlueprints(), this.addBlueprint);
  }

  findBlueprints() {
    return _flatten(
      _map(this.searchPaths, dir => {
        const subdirs = _map(fs.readdirSync(dir), p => path.resolve(dir, p));
        return _filter(subdirs, d =>
          fs.existsSync(path.resolve(d, 'index.js'))
        );
      })
    );
  }

  lookupAll(name) {
    return _filter(this.all(), bp => bp.name === name);
  }

  lookup(name) {
    return this.lookupAll(name)[0];
  }
}

function validSearchDir(dir) {
  return fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();
}

export function expandPath(base, candidate) {
  let final;
  if (candidate[0] === '~') {
    const st = candidate[1] === path.sep ? 2 : 1;
    final = path.resolve(process.env.HOME, candidate.slice(st));
  } else if (candidate[0] === path.sep) {
    final = path.resolve(candidate);
    // } else if (candidate[0] === '@') {
    //   return path.join(npmPath,npm name, 'blueprints');
  } else {
    final = path.resolve(base, candidate);
  }
  return final;
}

export function parseBlueprintSetting(setting) {
  if (_isArray(setting)) {
    return [...setting, './blueprints'];
  } else if (_isString(setting)) {
    return [setting, './blueprints'];
  } else if (_isBool(setting)) {
    return setting ? ['./blueprints'] : [];
  } else if (_isNil(setting)) {
    return ['./blueprints'];
  } else {
    // No numbers,
    // raise error here?
    // console.error('Unknown blueprint type');
    return ['./blueprints'];
  }
}
