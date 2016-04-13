'use strict';

require('mocha');
var App = require('templates');
var assert = require('assert');
var helpers = require('..');
var app;

describe('asyncHelper.read', function() {
  beforeEach(function() {
    app = new App();
    app.use(helpers);

    app.engine('md', require('engine-base'));
    app.create('partials', { viewType: 'partial' });
    app.create('pages');
  });

  it('should read a file', function(cb) {
    app.page('note.md', {content: 'foo <%= read("test/fixtures/abc.md") %> bar'});

    app.render('note.md', function(err, res) {
      if (err) return cb(err);
      assert.equal(res.content, 'foo AAABBBCCC bar');
      cb();
    });
  });

  it('should error when a file does not exist', function(cb) {
    app.page('note.md', {content: 'foo <%= read("test/fixtures/fofofofofo.md") %> bar'});

    app.render('note.md', function(err, res) {
      assert(err);
      assert.equal(err.code, 'ENOENT');
      cb();
    });
  });

  it('should read a file from a partial', function(cb) {
    app.partial('a.md', {content: '<%= read("test/fixtures/abc.md") %>'});
    app.page('note.md', {content: 'foo <%= partial("a.md") %> bar'});

    app.render('note.md', function(err, res) {
      if (err) return cb(err);
      assert.equal(res.content, 'foo AAABBBCCC bar');
      cb();
    });
  });
});
