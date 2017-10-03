module.exports = {
  description() {
    return 'Generates a dumb (aka Pure) component';
  },
  fileMapTokens() {
    return {
      __dumb__: options => {
        return options.settings.getSetting('dumbPath');
      }
    };
  }
};
