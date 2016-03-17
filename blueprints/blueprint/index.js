module.exports = {
  description() {
    return 'Generates a blueprint template for creating new blueprints';
  },

  beforeInstall() {
    console.log('Before installation hook!');
  },

  afterInstall() {
    console.log('After installation hook!');
  }
};
