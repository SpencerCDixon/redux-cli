import path from 'path';
import fse from 'fs-extra';
import fs from 'fs';
import FileInfo from 'models/file-info';
import MockUI from '../helpers/mock-ui';
import { expectFileToNotExist } from '../helpers/fs-helpers';

const originalPath = path.join(
  __dirname,
  '..',
  'fixtures',
  'file-info-template.txt'
);
const mappedPath = path.join(
  __dirname,
  '..',
  '..',
  'tmp',
  'path-to-overwrite.txt'
);
const ui = new MockUI('DEBUG');

describe('(Model) FileInfo', () => {
  beforeEach(() => {
    ui.clear();
  });

  describe('#isFile', () => {
    test('return true if original path is a file', () => {
      const info = new FileInfo({
        templateVariables: {},
        ui,
        originalPath,
        mappedPath
      });
      expect(info.isFile()).toBe(true);
    });

    test('returns false if original path is bogus', () => {
      const info = new FileInfo({
        templateVariables: {},
        ui,
        originalPath: path.join(__dirname, 'bogus', 'path', 'here'),
        mappedPath
      });
      expect(info.isFile()).toBe(false);
    });
  });

  describe('#writeFile', () => {
    describe('when file already exists', () => {
      test('throws warning to ui and doesnt overwrite old file', () => {
        const existingPath = path.join(
          __dirname,
          '..',
          '..',
          'tmp',
          'path-to-overwrite-a.txt'
        );
        fse.outputFileSync(existingPath, 'some contennt');

        const info = new FileInfo({
          templateVariables: {},
          mappedPath: existingPath,
          ui,
          originalPath
        });
        info.writeFile();
        expect(ui.errors).toMatch(/Not writing file/);
        fse.remove(existingPath);
      });
    });

    describe('when no file exists', () => {
      test('writes the file', () => {
        const noFilePath = path.join(
          __dirname,
          '..',
          '..',
          'tmp',
          'path-to-overwrite-b.txt'
        );
        const info = new FileInfo({
          templateVariables: { name: 'rendered ejs string' },
          mappedPath: noFilePath,
          ui,
          originalPath
        });
        info.writeFile();

        const expectedString = 'rendered ejs string\n';
        const actualString = fs.readFileSync(noFilePath, 'utf8');
        expect(expectedString).toEqual(actualString);
        expect(ui.output).toMatch(/create/);
        fse.remove(noFilePath);
      });
    });

    describe('when dry run option is enabled', () => {
      test('should not write the file', () => {
        const dryRunPath = path.join(
          __dirname,
          '..',
          '..',
          'tmp',
          'path-to-overwrite-c.txt'
        );

        const info = new FileInfo({
          templateVariables: { name: 'rendered ejs string' },
          mappedPath: dryRunPath,
          ui,
          originalPath
        });
        info.writeFile(true);

        expectFileToNotExist(dryRunPath);
        expect(ui.output).toMatch(/would create/);
      });
    });
  });

  describe('#renderTempalte', () => {
    test('renders ejs template with the template variables', () => {
      const info = new FileInfo({
        templateVariables: { name: 'rendered ejs string' },
        ui,
        originalPath,
        mappedPath
      });
      const expectedString = 'rendered ejs string\n';
      expect(info.renderTemplate()).to.eq(expectedString);
    });
  });

  describe('::removeEjsExt', () => {
    test('it should not change any path that does not end in ejs', () => {
      const removeEjsExt = FileInfo.removeEjsExt;
      let path = '/test/path/file.js';
      expect(removeEjsExt(path)).toEqual(path);
      path = '/test/path/file.foo.bar.ejs.html';
      expect(removeEjsExt(path)).toEqual(path);
    });
    test('it should remove the last and only the last ejs', () => {
      const removeEjsExt = FileInfo.removeEjsExt;
      let path = '/test/path/file.js';
      expect(removeEjsExt(path + '.ejs')).toEqual(path);
      path = '/test/path/file.foo.bar.ejs.html';
      expect(removeEjsExt(path + '.EJS')).toEqual(path);
    });
  });
});
