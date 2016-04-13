'use strict';

require('mocha');
var assert = require('assert');
var helpers = require('..');

describe('verb-repo-helpers', function() {
  it('should export a function', function() {
    assert.equal(typeof helpers, 'function');
  });
});
