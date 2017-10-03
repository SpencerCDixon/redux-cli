import path from 'path';
import Blueprint from 'models/blueprint';

const fixtureBlueprints = path.resolve(
  __dirname,
  '..',
  'fixtures',
  'blueprints'
);
const basicBlueprint = path.join(fixtureBlueprints, 'basic');

describe('(Model) Blueprint', () => {
  const blueprint = new Blueprint(basicBlueprint);

  describe('#description', () => {
    test('returns a description', () => {
      expect(blueprint.description()).to.match(/Generates a new basic/);
    });
  });

  describe('#filesPath', () => {
    test('returns a default of "files" ', () => {
      const expectedPath = path.join(basicBlueprint, 'files');
      expect(blueprint.filesPath()).toEqual(expectedPath);
    });
  });

  describe('#files', () => {
    test('returns an array of files in blueprint', () => {
      const files = blueprint.files();
      const expectedFiles = ['expected-file.js'];
      expect(files).toEqual(expectedFiles);
    });

    test('defaults to empty array when no files', () => {
      const blueprint = new Blueprint('ridiculous/path/that/doesnt/exist');
      expect(blueprint.files()).toEqual([]);
    });
  });

  describe('.load', () => {
    test('loads a blueprint from a path', () => {
      const blueprint = Blueprint.load(basicBlueprint);
      expect(blueprint.name).toEqual('basic');
    });
  });
});
