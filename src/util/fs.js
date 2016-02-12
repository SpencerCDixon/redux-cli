import fs from 'fs';

/*
 Node deprecated existsSync so this is a simple
 helper function wrapping try/catch around the new
 recommended approach of accessSync
 https://nodejs.org/api/fs.html#fs_fs_existssync_path
 */
export const fileExists = (filename) => {
  try {
    fs.accessSync(filename);
    return true;
  } catch (e) {
    return false;
  }
};
