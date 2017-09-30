export const escapeRegEx = str => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

// TODO: make this available if/when it's needed
// export const escapedRegEx = str => new RegExp(escapeRegEx(str));

export const lineRegEx = (...pieces) =>
  new RegExp('(^|\\n)\\s*' + pieces.map(escapeRegEx).join('\\s+') + '(\\n|$)');
