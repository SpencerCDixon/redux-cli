import getEnvironment from 'cli/environment';
import UI from 'models/ui';
import ProjectSettings from 'models/project-settings';

jest.mock('models/ui');
jest.mock('models/project-settings');

describe('(CLI) Environment', () => {
  describe('#getEnvironment', () => {
    it('returns { ui, settings }', () => {
      const env = getEnvironment();
      expect(Object.keys(env).sort()).toEqual(['settings', 'ui']);
    });
    it('returns { ui: UI, settings: ProjectSettings }', () => {
      const env = getEnvironment();
      expect(env.ui).toBeInstanceOf(UI);
      expect(env.settings).toBeInstanceOf(ProjectSettings);
    });
    it('returns a singleton', () => {
      const env1 = getEnvironment();
      const env2 = getEnvironment();
      expect(env2).toBe(env1);
    });
  });
});
