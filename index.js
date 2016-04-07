/*!
 * verb-repo-helpers (https://github.com/verbose/verb-repo-helpers)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('verb-repo-helpers');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('verb-repo-helpers')) return;

    this.define('helpers', function() {
      debug('running helpers');
      
    });
  };
};
