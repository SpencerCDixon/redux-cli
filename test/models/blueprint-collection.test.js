import path from 'path';
import BlueprintCollection, {
  expandPath,
  parseBlueprintSetting
} from 'models/blueprint-collection';
import config from 'config';
import process from 'process';

const { basePath } = config;

const paths = {
  [path.resolve(basePath, 'test')]: ['fixtures', '/ghi', 'doh'],
  [path.resolve(basePath, 'test/fixtures')]: [
    '~doesNotExist7as84',
    './blueprints'
  ]
};

describe('(Model) BlueprintCollection', () => {
  describe('#all()', () => {
    it('should return an array of all blueprints in searchPaths', () => {
      const blueprints = new BlueprintCollection(paths);
      const result = blueprints.all();
      expect(result).to.be.an('Array');
      expect(result).toHaveLength(3);
      expect(result[0].name).toEqual('basic');
      expect(result[2].filesPath()).to.match(/fixtures\/blueprints\/duplicate/);
    });
  });

  describe('#generators()', () => {
    it('should return an array of all generator blueprints in searchPaths', () => {
      const blueprints = new BlueprintCollection(paths);
      const result = blueprints.generators();
      expect(result).to.be.an('Array');
      expect(result).toHaveLength(3);
      expect(result[0].name).toEqual('basic');
      expect(result[2].filesPath()).to.match(/fixtures\/blueprints\/duplicate/);
    });
  });

  describe('#allPossiblePaths', () => {
    test('returns a an array of blueprint paths', () => {
      const blueprints = new BlueprintCollection(paths);
      const result = blueprints.allPossiblePaths();

      expect(result[0]).toEqual(basePath + '/test/fixtures');
      expect(result[1]).toEqual('/ghi');
      expect(result[2]).toEqual(basePath + '/test/doh');
      expect(result[3].slice(process.env.HOME.length)).toEqual(
        '/doesNotExist7as84'
      );
      expect(result[4]).toEqual(basePath + '/test/fixtures/blueprints');
    });
  });
  describe('setSearchPaths', () => {
    test('', () => {
      const blueprints = new BlueprintCollection(paths);
      const result = blueprints.searchPaths;

      expect(result[0]).toEqual(basePath + '/test/fixtures');
      expect(result[1]).toEqual(basePath + '/test/fixtures/blueprints');
    });
  });
});

describe('#expandPath', () => {
  test('returns path if path starts with /', () => {
    const testPath = '/bruce';
    const resultPath = expandPath(basePath, testPath);
    expect(resultPath).toEqual(testPath);
  });

  test('returns path relative from home if path starts with ~', () => {
    const testPath = '~dick';
    const resultPath = expandPath(basePath, testPath);
    const expectedPath = process.env.HOME + path.sep + 'dick';
    expect(resultPath).toEqual(expectedPath);
  });

  test('returns path relative from home if path starts with ~/', () => {
    const testPath = '~/barbara';
    const resultPath = expandPath(basePath, testPath);
    const expectedPath = process.env.HOME + path.sep + 'barbara';
    expect(resultPath).toEqual(expectedPath);
  });

  test('returns path relative to basePath if does not start with "/" or "~"', () => {
    const testPath = 'alfred';
    const resultPath = expandPath(basePath, testPath);
    const expectedPath = basePath + path.sep + 'alfred';
    expect(resultPath).toEqual(expectedPath);
  });
});

describe('#lookupAll(name)', () => {
  test('returns empty array if blueprint for name', () => {
    const blueprints = new BlueprintCollection(paths);
    expect(blueprints.lookupAll('flyingGraysons')).toEqual([]);
  });
  test('returns an array of blueprints matching name', () => {
    const blueprints = new BlueprintCollection(paths);
    const allBasic = blueprints.lookupAll('basic');
    expect(allBasic).to.be.an('array');
    expect(allBasic.length).toEqual(2);
    expect(allBasic[0].name).toEqual('basic');
    expect(allBasic[1].name).toEqual('basic');
  });
});


describe('#lookup(name)', () => {
  test('returns falsy if no blueprint for name', () => {
    const blueprints = new BlueprintCollection(paths);
    expect(blueprints.lookup('flyingGraysons')).to.be.falsy;
  });
  test('returns a blueprint matching name', () => {
    const blueprints = new BlueprintCollection(paths);
    expect(blueprints.lookup('basic').name).toEqual('basic');
  });
  test('returns the first blueprint matching name', () => {
    const blueprints = new BlueprintCollection(paths);
    const basic = blueprints.lookup('basic');
    expect(basic.name).toEqual('basic');
    expect(blueprints.lookupAll('basic')[0]).toEqual(basic);
  });

});

describe('::parseBlueprintSetting', () => {
  const bpArr = ['./blueprints'];
  test('returns arr + bparr if is array', () => {
    const testSetting = ['jim'];
    const resultArr = parseBlueprintSetting(testSetting);
    const expectedArr = [...testSetting, ...bpArr];
    expect(resultArr).toEqual(expectedArr);
  });
  test('returns arr with name + bparr if is string', () => {
    const testSetting = 'leslie';
    const resultArr = parseBlueprintSetting(testSetting);
    const expectedArr = [testSetting, ...bpArr];
    expect(resultArr).toEqual(expectedArr);
  });
  test('returns bpArr if is boolean and is true', () => {
    const testSetting = true;
    const resultArr = parseBlueprintSetting(testSetting);
    expect(resultArr).toEqual(bpArr);
  });
  test('returns empty array if is boolean and is false', () => {
    const testSetting = false;
    const resultArr = parseBlueprintSetting(testSetting);
    expect(resultArr).toEqual([]);
  });
  test('returns bpArr if is undefined', () => {
    const testSetting = null;
    const resultArr = parseBlueprintSetting(testSetting);
    expect(resultArr).toEqual(bpArr);
  });
  test('returns bpArr if is number', () => {
    const testSetting = 42;
    const resultArr = parseBlueprintSetting(testSetting);
    expect(resultArr).toEqual(bpArr);
  });
});
