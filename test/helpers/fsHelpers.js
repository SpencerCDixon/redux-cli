import path from 'path';
import fs from 'fs';
import { fileExists } from 'util/fs';
import { flatten, includes } from 'lodash';
// import fse from 'fs-extra';

const rootPath = process.cwd();

export const expectFilesEqual = (pathToActual, pathToExpected) => {
  const actual = fs.readFileSync(pathToActual, 'utf8');
  const expected = fs.readFileSync(pathToExpected, 'utf8');

  expect(actual).to.eql(expected);
};

export const expectFileToNotExist = (pathToFile) => {
  const exists = fileExists(pathToFile);
  expect(exists).to.be.false;
};

// options can include arrays with contains/doesNotContain
export const expectFile = (file, options) => {
  const filePath = path.join(rootPath, file);
  const exists = fileExists(filePath);

  expect(exists).to.equal(true, `expected ${file} to exist`);

  if (!options) {
    return;
  }

  const actual = fs.readFileSync(filePath, 'utf8');

  if (options.contains) {
    flatten([options.contains]).forEach(expected => {
      let pass;

      if (expected.test) {
        pass = expected.test(actual);
      } else {
        pass = includes(actual, expected);
      }

      if (pass) {
        expect(true).to.equal(true, `expected ${file} to contain ${expected}`);
      } else {
        throw new EqualityError(`expected: ${file}`, actual, expected);
      }
    });
  }
};


function EqualityError(message, actual, expected) {
  this.message = message;
  this.actual = actual;
  this.expected = expected;
  this.showDiff = true;
  Error.captureStackTrace(this, module.exports);
}

EqualityError.prototype = Object.create(Error.prototype);
EqualityError.prototype.name = 'EqualityError';
EqualityError.prototype.constructor = EqualityError;
