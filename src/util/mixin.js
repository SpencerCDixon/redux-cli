// Simple mixin utility that acts like 'extends'
const mixin = (Parent, ...mixins) => {
  class Mixed extends Parent {}
  for (let mixin of mixins) {
    for (let prop in mixin) {
      Mixed.prototype[prop] = mixin[prop];
    }
  }
  return Mixed;
};

export default mixin;
