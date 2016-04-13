'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

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

/**
 * Expose `utils` modules
 */

module.exports = utils;
