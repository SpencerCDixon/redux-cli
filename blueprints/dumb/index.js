module.exports = {
  description() {
    return 'generates a dumb (pure) component';
  },
  fileMapTokens() {
    return {
      __dumb__: (options) => {
        return options.settings.getSetting('dumbPath');
      }
    }
  }
};
