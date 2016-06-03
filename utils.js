'use strict';

var path = require('path');
var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('fs-exists-sync', 'existsSync');
require('get-pkg', 'getPkg');
require('get-value', 'get');
require('github-contributors', 'contributors');
require('helper-apidocs', 'apidocs');
require('helper-copyright', 'copyright');
require('helper-date', 'date');
require('helper-issue', 'issue');
require('helper-reflinks', 'reflinks');
require('helper-related', 'related');
require('mixin-deep', 'merge');
require = fn;

utils.exists = function(files, cwd) {
  files = utils.arrayify(files);
  var len = files.length;
  var idx = -1;
  while (++idx < len) {
    var file = files[idx];
    if (cwd) file = path.resolve(cwd, file);
    if (utils.existsSync(file)) {
      return true;
    }
  }
  return false;
};

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
