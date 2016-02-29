module.exports = {
  description() {
    return 'generates a blueprint and definition';
  },

  fileMapTokens() {
    return {
      __path__: (options) => {
        return options.originalBlueprintName + 's';
      }
    };
  },

  beforeInstall() {
    console.log('Before installation hook!');
  },

  afterInstall() {
    console.log('After installation hook!');
  }
};
