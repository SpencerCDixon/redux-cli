import path from 'path';
import Blueprint from 'models/blueprint';
import config from 'config';

const { basePath } = config;

const fixtureBlueprints = path.resolve(__dirname, '..', 'fixtures', 'blueprints');
const basicBlueprint    = path.join(fixtureBlueprints, 'basic');

describe('(Model) Blueprint', () => {
  const blueprint = new Blueprint(basicBlueprint);

  describe('#filesPath', () => {
    test('returns a default of "files" ', () => {
      const expectedPath = path.join(basicBlueprint, 'files');
      expect(blueprint.filesPath()).toEqual(expectedPath);
    });
  });

  describe('#files', () => {
    test('returns an array of files in blueprint', () => {
      const files = blueprint.files();
      const expectedFiles = [
        'expected-file.js'
      ];
      expect(files).toEqual(expectedFiles);
    });

    test('defaults to empty array when no files', () => {
      const blueprint = new Blueprint('ridiculous/path/that/doesnt/exist');
      expect(blueprint.files()).toEqual([]);
    });
  });

  describe('.defaultLookupPaths', () => {
    test(
      'returns an array with all potential paths blueprints can live',
      () => {
        const expectedFiles = [
          path.join(basePath, 'blueprints'),
          path.join(__dirname, '..', '..', 'blueprints')
        ];
        expect(Blueprint.defaultLookupPaths()).toEqual(expectedFiles);
      }
    );
  });

  describe('.lookup', () => {
    test('throws error when it cant find blueprint', () => {
      expect(() => Blueprint.lookup('sdlfkjskf')).toThrowError(/Unknown blueprint:/);
    });

    test('it returns loaded blueprint when found', () => {
      const blueprint = Blueprint.lookup(basicBlueprint);
      expect(blueprint.path).toEqual(basicBlueprint);
      expect(blueprint.name).toEqual('basic');
    });
  });
});
