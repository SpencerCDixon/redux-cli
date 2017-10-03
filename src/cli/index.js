import getParser from './parser';

module.exports = getParser().parse(process.argv.slice(2));
