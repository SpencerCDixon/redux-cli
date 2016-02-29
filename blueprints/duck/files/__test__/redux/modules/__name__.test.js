import reducer, { defaultState } from 'redux/modules/<%= name %>';
import deepFreeze from 'deep-freeze';

describe('(Redux) <%= name %>', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(defaultState);
    });
  });
});
