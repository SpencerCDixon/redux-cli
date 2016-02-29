module.exports = {
  fileMapTokens: function(options) {
    return {
      __duck__: function(options) {
        return options.settings.getSetting('duckPath');
      }
    };
  }
};
