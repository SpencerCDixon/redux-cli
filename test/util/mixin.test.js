import mixin from 'util/mixin';

class Parent {
  testFunction() {
    return 'inside parent';
  }
}

describe('(Util) mixin', () => {
  test('creates a new constructor with functions mixed in', () => {
    const Child = {
      testFunction: () => {
        return 'inside mixin';
      }
    };

    const Constructor = mixin(Parent, Child);
    const instance = new Constructor();
    expect(instance.testFunction()).toEqual('inside mixin');
  });
});
