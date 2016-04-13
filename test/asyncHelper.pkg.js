'use strict';

require('mocha');
var App = require('templates');
var assert = require('assert');
var helpers = require('..');
var app;

describe('asyncHelper.pkg', function() {
  beforeEach(function() {
    app = new App();
    app.use(helpers);

    app.engine('md', require('engine-base'));
    app.create('partials', { viewType: 'partial' });
    app.create('pages');
  });

  it('should get a property from the given package.json', function(cb) {
    app.page('note.md', {content: 'foo <%= pkg("assemble", "license") %> bar'});

    app.render('note.md', function(err, res) {
      if (err) return cb(err);
      assert.equal(res.content, 'foo MIT bar');
      cb();
    });
  });
});
