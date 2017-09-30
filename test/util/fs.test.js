import { fileExists, readFile } from 'util/fs';
import fse from 'fs-extra';
import fs from 'fs';
import path from 'path';

describe('(Util) fs', () => {
  describe('#fileExists', () => {
    test('returns true when file exists', () => {
      const finalPath = path.join(process.cwd(), 'tmp/example.js');
      fse.outputFileSync(finalPath, 'path');

      expect(fileExists(finalPath)).toBe(true);
      fse.removeSync(finalPath);
    });

    test('returns false when file doesnt exist', () => {
      expect(fileExists('tmp/some/random/path')).toBe(false);
    });

    test('throws error when not file present error', () => {
      const error = {
        message: 'random error',
        code: 'random code'
      };
      sinon.stub(fs, 'accessSync').throws(error);

      try {
        fileExists('tmp/example.js');
        expect('should not get here').toEqual(true);
      } catch (e) {
        expect(e.code).toEqual('random code');
      } finally {
        fs.accessSync.restore();
      }
    });
  });

  describe('#readFile', () => {
    const finalPath = path.join(process.cwd(), 'tmp/example.js');

    beforeEach(() => {
      fse.outputFileSync(finalPath, 'file to be read');
    });

    afterEach(() => {
      fse.removeSync(finalPath);
    });

    test('lets you pass in relative path', () => {
      const file = readFile('tmp/example.js');
      expect(file).toEqual('file to be read');
    });
  });
});
