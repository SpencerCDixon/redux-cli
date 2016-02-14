import path from 'path';

let config = {
  basePath: process.env['PWD'],
  pkgBasePath: path.dirname(module.id)
};

export default config;
