import getParser from './parser';
import getHandler from './handler';

function cli() {
  const parser = getParser();
  const handler = getHandler();
  const argv = parser.parse(process.argv.slice(2));
  handler.handle(argv, parser);
}

module.exports = cli;
