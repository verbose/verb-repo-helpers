'use strict';

const fs = require('fs');
const path = require('path');

function define(obj, key, fn) {
  Object.defineProperty(obj, key, { get: fn });
}

/**
 * Lazily require module dependencies in a way that is
 * friendly to both node.js and web/browserify/webpack.
 */

define(exports, 'formatPeople', () => require('format-people'));
define(exports, 'apidocs', () => require('helper-apidocs'));
define(exports, 'contributors', () => require('github-contributors'));
define(exports, 'copyright', () => require('helper-copyright'));
define(exports, 'date', () => require('helper-date'));
define(exports, 'get', () => require('get-value'));
define(exports, 'getPkg', () => require('get-pkg'));
define(exports, 'issue', () => require('helper-issue'));
define(exports, 'isValid', () => require('is-valid-app'));
define(exports, 'merge', () => require('mixin-deep'));
define(exports, 'reflinks', () => require('helper-reflinks'));
define(exports, 'related', () => require('helper-related'));

exports.anyExists = function(files, cwd) {
  for (let file of [].concat(files || [])) {
    if (cwd) file = path.resolve(cwd, file);
    if (fs.existsSync(file)) {
      return true;
    }
  }
  return false;
};

